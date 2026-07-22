/* ==========================================================================
   confirmation.js — show booking summary from the draft, then clear it
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    if (!window.DATA) return;
    var b = Booking.get();
    var car = DATA.carById(b.carId);
    var total = b.total || car.rate * (b.days || 3);
    var bookingId = b.bookingId || "RI-2026-8842";

    document.getElementById("confirm-sub").textContent =
      "Your reservation for " + car.name + " has been successfully placed.";

    var dates = b.pickup && b.return
      ? fmtDate(b.pickup) + " – " + fmtDate(b.return)
      : "July 10 – 13, 2026";

    document.getElementById("confirm-details").innerHTML =
      row("Booking ID", bookingId) +
      row("Car Model", car.name) +
      row("Dates", dates) +
      row("Total Paid", inr(total));

    // The reservation is "made" — clear the working draft so a refresh is stable.
    Booking.clear();
  });

  function row(label, val) {
    return '<div class="confirm-details__row"><span class="muted">' + label + '</span><b>' + val + "</b></div>";
  }
})();
