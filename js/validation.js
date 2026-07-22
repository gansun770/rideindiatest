/* ==========================================================================
   validation.js — reusable form validation (vanilla)
   Rules are declared per-input via data-* or passed to Validate.form().
   ========================================================================== */
(function () {
  "use strict";

  var RE = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    phone: /^[+]?[\d][\d\s-]{8,14}\d$/,
    card: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
    expiry: /^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/,
    cvv: /^\d{3,4}$/,
    name: /^[a-zA-ZÀ-ſ .'-]{2,}$/
  };

  var MESSAGES = {
    required: "This field is required.",
    email: "Enter a valid email address.",
    phone: "Enter a valid phone number.",
    min: "Must be at least {n} characters.",
    match: "Values do not match.",
    card: "Enter a valid 16-digit card number.",
    expiry: "Use MM/YY format.",
    cvv: "Enter a valid 3–4 digit CVV.",
    name: "Enter a valid name.",
    terms: "Please accept to continue."
  };

  /* Validate a single field element ([data-field] wrapper containing input). */
  function checkField(field, rules) {
    var input = field.querySelector("input, textarea, select");
    if (!input) return true;
    var value = (input.value || "").trim();
    var error = "";

    for (var i = 0; i < rules.length && !error; i++) {
      var r = rules[i];
      if (r === "required" && !value) error = MESSAGES.required;
      else if (value) { // format rules only run when there is a value
        if (r === "email" && !RE.email.test(value)) error = MESSAGES.email;
        else if (r === "phone" && !RE.phone.test(value)) error = MESSAGES.phone;
        else if (r === "name" && !RE.name.test(value)) error = MESSAGES.name;
        else if (r === "card" && !RE.card.test(value)) error = MESSAGES.card;
        else if (r === "expiry" && !RE.expiry.test(value)) error = MESSAGES.expiry;
        else if (r === "cvv" && !RE.cvv.test(value)) error = MESSAGES.cvv;
        else if (typeof r === "object" && r.min && value.length < r.min)
          error = MESSAGES.min.replace("{n}", r.min);
        else if (typeof r === "object" && r.matchWith) {
          var other = document.getElementById(r.matchWith);
          if (other && other.value !== input.value) error = r.message || MESSAGES.match;
        }
      }
    }
    setFieldError(field, error);
    return !error;
  }

  function setFieldError(field, message) {
    var slot = field.querySelector("[data-error-text]");
    if (message) {
      field.classList.add("has-error");
      field.classList.remove("is-valid");
      if (slot) slot.textContent = message;
    } else {
      field.classList.remove("has-error");
      var input = field.querySelector("input, textarea, select");
      if (input && input.value.trim()) field.classList.add("is-valid");
    }
  }

  /* Attach: config = { "#input-id": ["required","email"], ... } */
  function attach(form, config, onSubmit) {
    if (!form) return;
    var entries = Object.keys(config).map(function (sel) {
      var input = form.querySelector(sel);
      return { input: input, field: input && input.closest("[data-field]"), rules: config[sel] };
    }).filter(function (e) { return e.input && e.field; });

    entries.forEach(function (e) {
      e.input.addEventListener("blur", function () { checkField(e.field, e.rules); });
      e.input.addEventListener("input", function () {
        if (e.field.classList.contains("has-error")) checkField(e.field, e.rules);
      });
    });

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var ok = true;
      entries.forEach(function (e) { if (!checkField(e.field, e.rules)) ok = false; });
      // checkbox "terms" style requirement
      var termsBox = form.querySelector('input[type="checkbox"][data-required]');
      if (termsBox && !termsBox.checked) {
        ok = false;
        var note = form.querySelector("[data-terms-error]");
        if (note) { note.textContent = MESSAGES.terms; note.style.display = "block"; }
      }
      if (ok && typeof onSubmit === "function") onSubmit(form);
    });
    return { validate: function () {
      var ok = true;
      entries.forEach(function (e) { if (!checkField(e.field, e.rules)) ok = false; });
      return ok;
    }};
  }

  window.Validate = { attach: attach, checkField: checkField, RE: RE, setFieldError: setFieldError };
})();
