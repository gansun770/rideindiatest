/* ==========================================================================
   faqs.js — categorized accordion + live search filter
   ========================================================================== */
(function () {
  "use strict";

  var FAQS = [
    { cat: "Booking & Reservations", items: [
      { q: "How do I book a vehicle with RideIndia?", a: "Select your pickup location, dates, and browse the available fleet. Choose your vehicle, add any necessary coverages, complete the instant digital verification process, and confirm your reservation with a secure payment. The entire process takes under two minutes." },
      { q: "What documents do I need to present at the time of pickup?", a: "You need to provide a valid Indian Driving License, an Aadhaar card or Passport for identity proof, and the digital booking confirmation. Foreign nationals must provide an International Driving Permit along with their passport." },
      { q: "Can I modify my booking after confirmation?", a: "Yes, modifications can be made up to 24 hours prior to the scheduled pickup time. Go to your dashboard, click on 'Manage Booking', and select your new dates or vehicle. Rate changes may apply depending on availability." },
      { q: "How do I extend my ongoing rental?", a: "You can extend your booking directly via the 'My Bookings' section in your account. Extension requests are subject to vehicle availability and must be initiated at least 6 hours before your scheduled return time." }
    ]},
    { cat: "Payments & Pricing", items: [
      { q: "Is insurance included in the booking cost?", a: "Absolutely. Comprehensive damage protection and third-party liability insurance are standard on every rental. For ultimate peace of mind, you can opt for Zero Liability coverage during checkout." },
      { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards, UPI, and net banking. All transactions are secured with bank-grade encryption." },
      { q: "Is there a security deposit?", a: "A refundable security deposit may be held on your card at pickup depending on the vehicle category. It is released within 5–7 business days after the car is returned in good condition." }
    ]},
    { cat: "Vehicle Information", items: [
      { q: "Are the vehicles well-maintained and sanitised?", a: "Every vehicle undergoes a multi-point inspection and thorough sanitisation before each rental, so you always drive away in a safe, clean car." },
      { q: "Is there a limit on kilometers I can drive?", a: "Most rentals include unlimited kilometers. Any package-specific limits are always shown transparently on the car details page before you book." }
    ]},
    { cat: "Cancellation & Refunds", items: [
      { q: "What is your cancellation policy?", a: "Cancel free of charge up to 24 hours before pickup for a full refund. Cancellations within 24 hours may incur a nominal fee as shown at checkout." },
      { q: "How long do refunds take?", a: "Approved refunds are processed back to your original payment method within 5–7 business days." }
    ]},
    { cat: "Account & Support", items: [
      { q: "How do I contact customer support?", a: "Our team is available 24/7 via live chat, email at hello@rideindia.in, and phone at +91 1800 123 4567." },
      { q: "Where can I find my invoice and payment details?", a: "Invoices are available anytime in your account under the 'Billing' section." }
    ]}
  ];

  document.addEventListener("DOMContentLoaded", function () {
    renderCats();
    render(FAQS);
    wireSearch();
  });

  function slug(s) { return s.toLowerCase().replace(/[^a-z]+/g, "-"); }

  function renderCats() {
    document.getElementById("faq-cats").innerHTML = FAQS.map(function (g) {
      return '<a href="#' + slug(g.cat) + '">' + g.cat + "</a>";
    }).join("");
  }

  function render(groups) {
    var host = document.getElementById("faq-content");
    if (!groups.length) {
      host.innerHTML = '<div class="empty-state">' + icon("search") + "<p>No answers match your search.</p></div>";
      return;
    }
    host.innerHTML = groups.map(function (g) {
      return '<div class="faq-group" id="' + slug(g.cat) + '">' +
        '<h2 class="faq-group__title">' + g.cat + '</h2>' +
        '<div class="accordion">' + g.items.map(item).join("") + '</div></div>';
    }).join("");
    wireAccordion(host);
    if (window.hydrateIcons) hydrateIcons(host);
  }

  function item(it) {
    return '<div class="accordion__item">' +
      '<button class="accordion__header" aria-expanded="false">' + it.q + '<i data-icon="plus"></i></button>' +
      '<div class="accordion__panel"><div class="accordion__panel-inner">' + it.a + '</div></div>' +
    '</div>';
  }

  function wireAccordion(root) {
    root.querySelectorAll(".accordion__header").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var it = btn.closest(".accordion__item");
        var panel = it.querySelector(".accordion__panel");
        var open = it.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(open));
        panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0";
      });
    });
  }

  function wireSearch() {
    var input = document.getElementById("faq-search");
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      if (!q) { render(FAQS); return; }
      var filtered = FAQS.map(function (g) {
        return { cat: g.cat, items: g.items.filter(function (it) {
          return (it.q + " " + it.a).toLowerCase().indexOf(q) > -1;
        })};
      }).filter(function (g) { return g.items.length; });
      render(filtered);
    });
  }
})();
