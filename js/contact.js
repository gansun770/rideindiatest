/* ==========================================================================
   contact.js — validate + simulate message submission
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    if (!window.Validate) return;
    var form = document.getElementById("contact-form");
    Validate.attach(form, {
      "#ct-name": ["required", "name"],
      "#ct-email": ["required", "email"],
      "#ct-phone": ["required", "phone"],
      "#ct-subject": ["required"],
      "#ct-message": ["required", { min: 10 }]
    }, function (form) {
      var btn = form.querySelector('button[type="submit"]');
      btn.classList.add("is-loading"); btn.disabled = true;
      setTimeout(function () {
        btn.classList.remove("is-loading"); btn.disabled = false;
        form.reset();
        form.querySelectorAll(".field").forEach(function (f) { f.classList.remove("is-valid", "has-error"); });
        var note = document.getElementById("ct-success");
        note.textContent = "✓ Thanks! Your message has been sent — we'll reply within 24 hours.";
        note.style.display = "block";
        setTimeout(function () { note.style.display = "none"; }, 6000);
      }, 1000);
    });
  });
})();
