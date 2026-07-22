/* ==========================================================================
   booking.js — Booking Details form + summary sidebar
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    if (!window.DATA) return;
    var b = Booking.get();
    var car = DATA.carById(b.carId);
    var days = b.days || 3;

    renderSummary(car, b, days);
    prefill();
    wire(car, b, days);
  });

  function renderSummary(car, b, days) {
    var subtotal = car.rate * days;
    document.getElementById("summary").innerHTML = '' +
      '<img class="summary__img" src="' + (car.detailImg || car.img) + '" alt="' + car.name + '">' +
      '<div class="summary__type">' + car.type + '</div>' +
      '<div class="summary__name">' + car.name + '</div>' +
      '<hr class="summary__rule">' +
      '<div class="summary__dates">' +
        '<div class="summary__date"><small>Pick-up</small><b>' + fmtDate(b.pickup) + '</b></div>' +
        icon("arrow-right") +
        '<div class="summary__date" style="text-align:right;"><small>Return</small><b>' + fmtDate(b.return) + '</b></div>' +
      '</div>' +
      '<div class="summary__pill" style="margin-top:var(--space-4);"><span class="muted" style="color:var(--color-muted)">Duration</span><b>' + days + ' Day' + (days > 1 ? "s" : "") + '</b></div>' +
      '<hr class="summary__rule">' +
      '<div class="summary__total"><span class="label">Total Amount</span><span class="amount">' + inr(subtotal) + '</span></div>';
    if (window.hydrateIcons) hydrateIcons(document.getElementById("summary"));
  }

  function prefill() {
    if (window.Auth && Auth.isLoggedIn()) {
      var u = Auth.get();
      if (u.name) document.getElementById("bk-name").value = u.name;
      if (u.email) document.getElementById("bk-email").value = u.email;
    }
  }

  function wire(car, b, days) {
    Validate.attach(document.getElementById("booking-form"), {
      "#bk-name": ["required", "name"],
      "#bk-email": ["required", "email"],
      "#bk-phone": ["required", "phone"],
      "#bk-license": ["required", { min: 5 }],
      "#bk-location": ["required"]
    }, function (form) {
      var btn = form.querySelector('button[type="submit"]');
      btn.classList.add("is-loading"); btn.disabled = true;
      Booking.set({
        name: document.getElementById("bk-name").value.trim(),
        email: document.getElementById("bk-email").value.trim(),
        phone: document.getElementById("bk-phone").value.trim(),
        license: document.getElementById("bk-license").value.trim(),
        location: document.getElementById("bk-location").value.trim(),
        notes: document.getElementById("bk-notes").value.trim(),
        subtotal: car.rate * days
      });
      setTimeout(function () { window.location.href = "payment.html"; }, 700);
    });
  }
})();
