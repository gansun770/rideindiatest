/* ==========================================================================
   home.js — renders the data-driven grids on the Home page
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    if (!window.DATA) return;

    renderCategories();
    renderBenefits();
    renderReviews();
    renderLocations();

    // re-run reveal observer now that dynamic content exists
    document.dispatchEvent(new Event("content:ready"));
  });

  function stars(n) {
    var out = "";
    for (var i = 0; i < n; i++) out += icon("star", "icon--fill");
    return '<div class="stars" aria-label="' + n + ' out of 5 stars">' + out + "</div>";
  }

  function renderCategories() {
    var host = document.getElementById("category-grid");
    if (!host) return;
    host.innerHTML = DATA.categories.map(function (c, i) {
      return '' +
      '<article class="category-card reveal' + delay(i) + '">' +
        '<div class="category-card__img" style="background-image:url(\'' + c.img + '\')"></div>' +
        '<div class="category-card__body">' +
          '<div class="category-card__row">' +
            '<h3 class="category-card__title">' + c.name + '</h3>' +
            '<span class="category-card__price">' + c.price + '</span>' +
          '</div>' +
          '<span class="category-card__feature">' + icon(c.icon) + c.feature + '</span>' +
        '</div>' +
        '<div class="category-card__footer">' +
          '<a class="link-arrow" href="available-cars.html">View Options ' + icon("arrow-right") + '</a>' +
        '</div>' +
      '</article>';
    }).join("");
  }

  function renderBenefits() {
    var host = document.getElementById("benefits-grid");
    if (!host) return;
    host.innerHTML = DATA.benefits.map(function (b, i) {
      return '' +
      '<article class="benefit-card reveal' + delay(i % 3) + '">' +
        '<span class="benefit-card__icon">' + icon(b.icon) + '</span>' +
        '<div><h3>' + b.title + '</h3><p>' + b.text + '</p></div>' +
      '</article>';
    }).join("");
  }

  function renderReviews() {
    var host = document.getElementById("reviews-grid");
    if (!host) return;
    host.innerHTML = DATA.reviews.map(function (r, i) {
      return '' +
      '<article class="review-card reveal' + delay(i) + '">' +
        '<div>' + stars(r.stars) +
          '<p class="review-card__quote">' + r.quote + '</p>' +
        '</div>' +
        '<div class="review-card__author">' +
          '<img class="review-card__avatar" src="' + r.img + '" alt="' + r.name + '" loading="lazy">' +
          '<div><div class="review-card__name">' + r.name + '</div>' +
          '<div class="review-card__role">' + r.role + '</div></div>' +
        '</div>' +
      '</article>';
    }).join("");
  }

  function renderLocations() {
    var host = document.getElementById("locations-grid");
    if (!host) return;
    host.innerHTML = DATA.locations.map(function (l, i) {
      return '' +
      '<a class="location-card reveal' + delay(i % 3) + '" href="available-cars.html" style="background-image:url(\'' + l.img + '\')">' +
        '<div class="location-card__inner">' +
          '<div class="location-card__name">' + l.name + '</div>' +
          '<div class="location-card__count">' + icon("car") + l.count + '</div>' +
        '</div>' +
      '</a>';
    }).join("");
  }

  function delay(i) { return i ? " reveal--delay-" + Math.min(i, 3) : ""; }
})();
