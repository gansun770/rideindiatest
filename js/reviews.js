/* ==========================================================================
   reviews.js — rating breakdown, star filter + sort
   ========================================================================== */
(function () {
  "use strict";

  var IMG = "assets/img/";
  var REVIEWS = [
    { stars: 5, name: "Priya S.",  role: "Business Traveler", img: IMG + "d07aa5b51e02.png", date: 6,  text: "The booking process was incredibly smooth. I found the perfect Innova for my family trip to Goa in under a minute, and the pricing was exactly what was quoted — no surprises!" },
    { stars: 5, name: "Rajesh K.", role: "Tourist",           img: IMG + "1982d18fae68.png", date: 5,  text: "I love the flexible pickup options. Being able to get the car delivered to my hotel in Jaipur saved me so much time during my Rajasthan trip." },
    { stars: 5, name: "Ananya M.", role: "Daily Commuter",    img: IMG + "eb9ef5b2207c.png", date: 4,  text: "Best rental experience I have ever had. The electric vehicle selection is fantastic, and the insurance included gives real peace of mind on long drives." },
    { stars: 4, name: "Vikram D.", role: "Weekend Explorer",  img: IMG + "d07aa5b51e02.png", date: 8,  text: "Great value for money and the Thar was in immaculate condition. Pickup took a few extra minutes but the staff were friendly and professional." },
    { stars: 5, name: "Sneha R.",  role: "Frequent Renter",   img: IMG + "eb9ef5b2207c.png", date: 12, text: "I've rented from RideIndia four times now. Transparent pricing, clean cars, and their 24/7 support genuinely picks up. Highly recommended." },
    { stars: 4, name: "Arjun P.",  role: "First-time User",   img: IMG + "1982d18fae68.png", date: 15, text: "The app made everything simple. Would have loved a wider choice of automatic hatchbacks, but overall a smooth, honest service." },
    { stars: 5, name: "Meera J.",  role: "Family Trip",       img: IMG + "d07aa5b51e02.png", date: 20, text: "Doorstep delivery of a spotless Innova Crysta for our Kerala vacation. The kids loved the space and I loved the zero hassle." },
    { stars: 3, name: "Karan V.",  role: "Business Traveler", img: IMG + "1982d18fae68.png", date: 22, text: "Decent experience. The car was fine, though the return process could be a little quicker at peak hours. Support resolved my query the same day." }
  ];

  var BREAKDOWN = [ { s: 5, p: 78 }, { s: 4, p: 15 }, { s: 3, p: 4 }, { s: 2, p: 2 }, { s: 1, p: 1 } ];
  var state = { filter: 0, sort: "recent" };

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("summary-stars").innerHTML = starRow(5);
    renderBreakdown();
    buildFilters();
    wireSort();
    render();
  });

  function starRow(n) {
    var out = "";
    for (var i = 0; i < 5; i++) out += icon("star", i < n ? "icon--fill" : "");
    return out;
  }

  function renderBreakdown() {
    document.getElementById("rating-breakdown").innerHTML = BREAKDOWN.map(function (b) {
      return '<div style="display:flex;align-items:center;gap:16px;margin-bottom:12px;">' +
        '<span style="width:60px;font-size:var(--fs-sm);color:var(--color-muted);">' + b.s + ' Star' + (b.s > 1 ? "s" : "") + '</span>' +
        '<span style="flex:1;height:8px;background:var(--color-surface-2);border-radius:4px;overflow:hidden;">' +
          '<span style="display:block;height:100%;width:' + b.p + '%;background:var(--color-star);border-radius:4px;"></span>' +
        '</span>' +
        '<span style="width:40px;text-align:right;font-size:var(--fs-sm);color:var(--color-muted-2);">' + b.p + '%</span>' +
      '</div>';
    }).join("");
  }

  function buildFilters() {
    var host = document.getElementById("review-filters");
    var labels = [{ v: 0, t: "All" }, { v: 5, t: "5 Stars" }, { v: 4, t: "4 Stars" }, { v: 3, t: "3 Stars" }, { v: 2, t: "2 Stars" }, { v: 1, t: "1 Star" }];
    host.innerHTML = labels.map(function (l) {
      return '<button class="chip' + (l.v === state.filter ? " is-active" : "") + '" data-stars="' + l.v + '">' + l.t + "</button>";
    }).join("");
    host.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      state.filter = +chip.getAttribute("data-stars");
      host.querySelectorAll(".chip").forEach(function (c) { c.classList.toggle("is-active", c === chip); });
      render();
    });
  }

  function wireSort() {
    var sel = document.getElementById("review-sort");
    sel.querySelector(".select__button").addEventListener("click", function (e) {
      e.stopPropagation();
      sel.setAttribute("aria-expanded", sel.getAttribute("aria-expanded") === "true" ? "false" : "true");
    });
    sel.querySelectorAll(".select__option").forEach(function (opt) {
      opt.addEventListener("click", function () {
        state.sort = opt.getAttribute("data-sort");
        sel.querySelectorAll(".select__option").forEach(function (o) { o.classList.toggle("is-active", o === opt); });
        document.getElementById("rsort-label").textContent = opt.textContent;
        sel.setAttribute("aria-expanded", "false");
        render();
      });
    });
    document.addEventListener("click", function () { sel.setAttribute("aria-expanded", "false"); });
  }

  function render() {
    var list = REVIEWS.slice();
    if (state.filter) list = list.filter(function (r) { return r.stars === state.filter; });
    if (state.sort === "recent") list.sort(function (a, b) { return a.date - b.date; });
    else if (state.sort === "high") list.sort(function (a, b) { return b.stars - a.stars; });
    else if (state.sort === "low") list.sort(function (a, b) { return a.stars - b.stars; });

    var host = document.getElementById("review-list");
    if (!list.length) { host.innerHTML = '<div class="empty-state" style="grid-column:1/-1;">' + icon("star") + "<p>No reviews with this rating yet.</p></div>"; return; }

    host.innerHTML = list.map(function (r) {
      return '<article class="review-card">' +
        '<div><div class="stars">' + starRow(r.stars) + '</div>' +
        '<p class="review-card__quote">' + r.text + '</p></div>' +
        '<div class="review-card__author">' +
          '<img class="review-card__avatar" src="' + r.img + '" alt="' + r.name + '" loading="lazy">' +
          '<div><div class="review-card__name">' + r.name + '</div><div class="review-card__role">' + r.role + ' &middot; ' + r.date + ' days ago</div></div>' +
        '</div>' +
      '</article>';
    }).join("");
  }
})();
