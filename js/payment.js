/* ==========================================================================
   payment.js — tabs, card input formatting + validation, mock pay
   ========================================================================== */
(function () {
  "use strict";

  var TAX_RATE = 0.18;

  document.addEventListener("DOMContentLoaded", function () {
    if (!window.DATA) return;
    var b = Booking.get();
    var car = DATA.carById(b.carId);
    var days = b.days || 3;
    var subtotal = car.rate * days;
    var taxes = Math.round(subtotal * TAX_RATE);
    var total = subtotal + taxes;

    Booking.set({ taxes: taxes, total: total });
    renderSummary(car, b, days, subtotal, taxes, total);
    setAmount(total);
    formatCardInputs();
    wireTabs();
    wireForms(total);
  });

  function renderSummary(car, b, days, subtotal, taxes, total) {
    document.getElementById("summary").innerHTML = '' +
      '<h2 style="font-family:var(--font-head);font-weight:800;font-size:1.5rem;margin-bottom:var(--space-5);">Booking Summary</h2>' +
      '<div style="display:flex;gap:var(--space-4);align-items:center;">' +
        '<img src="' + (car.detailImg || car.img) + '" alt="' + car.name + '" style="width:100px;height:75px;object-fit:cover;border-radius:var(--radius-md);">' +
        '<div><div class="summary__name" style="font-size:var(--fs-lg);">' + car.name + '</div>' +
        '<div class="summary__type">' + car.type + '</div></div>' +
      '</div>' +
      '<hr class="summary__rule">' +
      row("Pick-up", fmtDate(b.pickup)) + row("Return", fmtDate(b.return)) + row("Duration", days + " days") +
      '<hr class="summary__rule">' +
      row("Rental (" + inr(car.rate) + " × " + days + " days)", inr(subtotal)) +
      row("Insurance", "Included") +
      row("Taxes (18%)", inr(taxes)) +
      '<hr class="summary__rule">' +
      '<div class="summary__total"><span class="label">Total Amount</span><span class="amount">' + inr(total) + '</span></div>' +
      '<p class="secure-note">' + icon("shield-check") + ' Your payment is 100% secure and encrypted</p>';
  }
  function row(label, val) {
    return '<div class="summary__row"><span class="muted">' + label + '</span><span class="val">' + val + '</span></div>';
  }

  function setAmount(total) {
    document.getElementById("pay-amount").textContent = inr(total);
    document.querySelectorAll(".pay-amount-mirror").forEach(function (el) { el.textContent = inr(total); });
  }

  function wireTabs() {
    var tabs = document.querySelectorAll(".tab");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var name = tab.getAttribute("data-tab");
        tabs.forEach(function (t) { t.classList.toggle("is-active", t === tab); });
        document.querySelectorAll(".tab-panel").forEach(function (p) {
          p.classList.toggle("is-active", p.getAttribute("data-panel") === name);
        });
      });
    });
  }

  /* Real-time formatting: card groups of 4, expiry MM / YY, cvv digits */
  function formatCardInputs() {
    var card = document.getElementById("pay-card");
    card.addEventListener("input", function () {
      var v = card.value.replace(/\D/g, "").slice(0, 16);
      card.value = v.replace(/(.{4})/g, "$1 ").trim();
    });
    var exp = document.getElementById("pay-exp");
    exp.addEventListener("input", function () {
      var v = exp.value.replace(/\D/g, "").slice(0, 4);
      exp.value = v.length > 2 ? v.slice(0, 2) + " / " + v.slice(2) : v;
    });
    var cvv = document.getElementById("pay-cvv");
    cvv.addEventListener("input", function () { cvv.value = cvv.value.replace(/\D/g, "").slice(0, 4); });
  }

  function wireForms(total) {
    Validate.attach(document.getElementById("card-panel"), {
      "#pay-name": ["required", "name"],
      "#pay-card": ["required", "card"],
      "#pay-exp": ["required", "expiry"],
      "#pay-cvv": ["required", "cvv"]
    }, pay);

    Validate.attach(document.getElementById("upi-panel"), {
      "#upi-id": ["required", { min: 4 }]
    }, pay);

    Validate.attach(document.getElementById("netbank-panel"), {
      "#bank": ["required", { min: 2 }]
    }, pay);
  }

  function pay(form) {
    var btn = form.querySelector('button[type="submit"]');
    btn.classList.add("is-loading"); btn.disabled = true;
    setTimeout(function () {
      Booking.set({ bookingId: "RI-2026-" + Math.floor(1000 + Math.random() * 9000) });
      window.location.href = "confirmation.html";
    }, 1100);
  }
})();
