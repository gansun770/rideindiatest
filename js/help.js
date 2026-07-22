/* ==========================================================================
   help.js — common-questions accordion + search jump
   ========================================================================== */
(function () {
  "use strict";

  var QA = [
    { q: "How do I cancel or change my booking?", a: "You can manage your booking from your account dashboard. Some changes may have fees depending on your policy." },
    { q: "Where can I find my invoice and payment details?", a: "Invoices are available in your account under \"Billing\"." },
    { q: "What documents do I need to pick up my vehicle?", a: "A valid driver's license and a government-issued photo ID. Foreign nationals also need an International Driving Permit." },
    { q: "Can I add a driver or change the pickup location?", a: "Some changes are allowed before pickup, depending on availability. Manage these from the 'My Bookings' section." },
    { q: "How does the insurance coverage work?", a: "Comprehensive damage protection and third-party liability are included on every rental. Optional Zero Liability coverage is available at checkout." }
  ];

  document.addEventListener("DOMContentLoaded", function () {
    var host = document.getElementById("help-accordion");
    host.innerHTML = QA.map(function (it, i) {
      return '<div class="accordion__item' + (i === 0 ? " is-open" : "") + '">' +
        '<button class="accordion__header" aria-expanded="' + (i === 0) + '">' + it.q + '<i data-icon="plus"></i></button>' +
        '<div class="accordion__panel"' + (i === 0 ? ' style="max-height:200px;"' : "") + '><div class="accordion__panel-inner">' + it.a + '</div></div>' +
      '</div>';
    }).join("");
    if (window.hydrateIcons) hydrateIcons(host);

    host.querySelectorAll(".accordion__header").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".accordion__item");
        var panel = item.querySelector(".accordion__panel");
        var open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(open));
        panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0";
      });
    });

    var search = document.getElementById("help-search");
    var form = search.closest("form");
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      document.getElementById("help-accordion").scrollIntoView({ behavior: "smooth" });
    });
  });
})();
