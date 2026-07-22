/* ==========================================================================
   car-details.js — populate details from ?car=<id>, live price, book flow
   ========================================================================== */
(function () {
  "use strict";

  var car, days = 3;

  document.addEventListener("DOMContentLoaded", function () {
    if (!window.DATA) return;
    var id = new URLSearchParams(location.search).get("car");
    car = DATA.carById(id);
    populate();
    wireDates();
    document.getElementById("book-btn").addEventListener("click", book);
  });

  function starsHtml(rating) {
    var full = Math.round(rating);
    var out = "";
    for (var i = 0; i < 5; i++) out += icon("star", i < full ? "icon--fill" : "");
    return out;
  }

  function populate() {
    document.title = car.name + " — RideIndia";
    document.getElementById("crumb-name").textContent = car.name;
    var img = document.getElementById("detail-img");
    img.src = car.detailImg || car.img; img.alt = car.name;
    document.getElementById("detail-cat").textContent = car.type;
    document.getElementById("detail-title").textContent = car.name;
    document.getElementById("detail-stars").innerHTML = starsHtml(car.rating);
    document.getElementById("detail-rating-text").textContent = car.rating + "/5 (" + car.reviews + " Reviews)";
    document.getElementById("detail-price").textContent = "₹" + car.rate.toLocaleString("en-IN") + " /day";
    document.getElementById("detail-desc").textContent = car.desc;

    document.getElementById("spec-grid").innerHTML = [
      { icon: "fuel", label: "Fuel Type", value: car.fuel },
      { icon: "settings", label: "Transmission", value: car.transmission },
      { icon: "users", label: "Seats", value: car.seats + " Seater" },
      { icon: "gauge", label: "Mileage", value: car.mileage }
    ].map(function (s) {
      return '<div class="spec-card"><span class="spec-card__icon">' + icon(s.icon) +
        '</span><small>' + s.label + '</small><b>' + s.value + "</b></div>";
    }).join("");

    document.getElementById("feature-list").innerHTML =
      ["Great on fuel", "Easy to park", "Perfect for city drives", "Air conditioned"].map(function (f) {
        return '<li><span class="feature-check">' + icon("check") + "</span>" + f + "</li>";
      }).join("");

    if (window.hydrateIcons) hydrateIcons(document);
    updatePrice();
  }

  function wireDates() {
    document.getElementById("pickup-date").addEventListener("change", updatePrice);
    document.getElementById("return-date").addEventListener("change", updatePrice);
  }

  function updatePrice() {
    var p = new Date(document.getElementById("pickup-date").value);
    var r = new Date(document.getElementById("return-date").value);
    var diff = Math.round((r - p) / 86400000);
    days = diff > 0 ? diff : 1;
    var subtotal = car.rate * days;
    document.getElementById("rate-line").textContent = "₹" + car.rate.toLocaleString("en-IN") + " × " + days + " day" + (days > 1 ? "s" : "");
    document.getElementById("subtotal").textContent = "₹" + subtotal.toLocaleString("en-IN");
  }

  function book() {
    Booking.set({
      carId: car.id,
      pickup: document.getElementById("pickup-date").value,
      return: document.getElementById("return-date").value,
      days: days
    });
    window.location.href = "booking-details.html";
  }
})();
