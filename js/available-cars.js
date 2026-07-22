/* ==========================================================================
   available-cars.js — render fleet, live filter (by type) + sort
   ========================================================================== */
(function () {
  "use strict";

  var state = { filter: "All", sort: "recommended" };

  document.addEventListener("DOMContentLoaded", function () {
    if (!window.DATA) return;
    buildChips();
    wireSort();
    render();
  });

  function types() {
    var set = ["All"];
    DATA.cars.forEach(function (c) { if (set.indexOf(c.type) < 0) set.push(c.type); });
    return set;
  }

  function buildChips() {
    var host = document.getElementById("filter-chips");
    host.innerHTML = types().map(function (t) {
      return '<button class="chip' + (t === state.filter ? " is-active" : "") + '" data-type="' + t + '">' + t + "</button>";
    }).join("");
    host.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      state.filter = chip.getAttribute("data-type");
      host.querySelectorAll(".chip").forEach(function (c) { c.classList.toggle("is-active", c === chip); });
      render();
    });
  }

  function wireSort() {
    var sel = document.getElementById("sort-select");
    var btn = sel.querySelector(".select__button");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      sel.setAttribute("aria-expanded", sel.getAttribute("aria-expanded") === "true" ? "false" : "true");
    });
    sel.querySelectorAll(".select__option").forEach(function (opt) {
      opt.addEventListener("click", function () {
        state.sort = opt.getAttribute("data-sort");
        sel.querySelectorAll(".select__option").forEach(function (o) { o.classList.toggle("is-active", o === opt); });
        document.getElementById("sort-label").textContent = opt.textContent;
        sel.setAttribute("aria-expanded", "false");
        render();
      });
    });
    document.addEventListener("click", function () { sel.setAttribute("aria-expanded", "false"); });
  }

  function getList() {
    var list = DATA.cars.slice();
    if (state.filter !== "All") list = list.filter(function (c) { return c.type === state.filter; });
    if (state.sort === "price-asc") list.sort(function (a, b) { return a.rate - b.rate; });
    else if (state.sort === "price-desc") list.sort(function (a, b) { return b.rate - a.rate; });
    else if (state.sort === "rating") list.sort(function (a, b) { return b.rating - a.rating; });
    return list;
  }

  function render() {
    var host = document.getElementById("car-grid");
    var list = getList();
    document.getElementById("results-count").textContent =
      list.length + " car" + (list.length === 1 ? "" : "s") + " found for Mumbai, Jan 15 — Jan 19";

    if (!list.length) {
      host.innerHTML = '<div class="empty-state" style="grid-column:1/-1;">' + icon("search") +
        "<p>No vehicles match this filter. Try another category.</p></div>";
      return;
    }

    host.innerHTML = list.map(function (c, i) {
      return '' +
      '<article class="car-card reveal' + (i % 3 ? " reveal--delay-" + (i % 3) : "") + '">' +
        '<a class="car-card__img" href="car-details.html?car=' + c.id + '" style="background-image:url(\'' + c.img + '\')" aria-label="' + c.name + '"></a>' +
        '<div class="car-card__body">' +
          '<div><h3 class="car-card__name">' + c.name + '</h3>' +
          '<span class="badge">' + c.type + '</span></div>' +
          '<div class="car-specs">' +
            '<span>' + icon("users") + c.seats + ' Seats</span>' +
            '<span>' + icon("settings") + c.transmission + '</span>' +
            '<span>' + icon("fuel") + c.fuel + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="car-card__footer">' +
          '<div class="car-card__price"><b>₹' + c.rate.toLocaleString("en-IN") + '</b><small>per day</small></div>' +
          '<a class="btn btn--primary" href="car-details.html?car=' + c.id + '">Book Now</a>' +
        '</div>' +
      '</article>';
    }).join("");

    if (window.hydrateIcons) hydrateIcons(host);
    document.dispatchEvent(new Event("content:ready"));
    // reveal newly added
    host.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
