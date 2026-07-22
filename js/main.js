/* ==========================================================================
   main.js — global boot: mount shared UI, wire auth forms, scroll reveals
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    // 1. Render header, footer, modals (icons already inlined as strings)
    if (window.Components) Components.mount();
    // Hydrate any <i data-icon> placeholders authored directly in the page
    if (window.hydrateIcons) hydrateIcons(document);

    wireAuthForms();
    setupReveals();
    markActiveNav();
  });

  /* ---- Login & Signup: validate -> simulate async -> login -> redirect ---- */
  function wireAuthForms() {
    var loginForm = document.getElementById("login-form");
    var signupForm = document.getElementById("signup-form");

    if (loginForm && window.Validate) {
      Validate.attach(loginForm, {
        "#login-email": ["required", "email"],
        "#login-password": ["required", { min: 6 }]
      }, function (form) {
        submitAuth(form, function () {
          var email = form.querySelector("#login-email").value.trim();
          Auth.login({ email: email, name: Auth.nameFromEmail(email) });
          window.location.href = "index.html";
        });
      });
    }

    if (signupForm && window.Validate) {
      var terms = document.getElementById("signup-terms");
      if (terms) terms.setAttribute("data-required", "");
      Validate.attach(signupForm, {
        "#signup-name": ["required", "name"],
        "#signup-email": ["required", "email"],
        "#signup-phone": ["required", "phone"],
        "#signup-password": ["required", { min: 8 }]
      }, function (form) {
        submitAuth(form, function () {
          var email = form.querySelector("#signup-email").value.trim();
          var name = form.querySelector("#signup-name").value.trim();
          Auth.login({ email: email, name: name });
          window.location.href = "index.html";
        });
      });
    }
  }

  /* Simulated network delay with a loading button + optional injected error */
  function submitAuth(form, onDone) {
    var btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.classList.add("is-loading"); btn.disabled = true; }
    clearFormNote(form);
    setTimeout(function () {
      // Mock validation always succeeds for well-formed input (per brief),
      // but we demonstrate an error path for a specific test email.
      var email = (form.querySelector('input[type="email"]') || {}).value || "";
      if (/fail@/.test(email)) {
        if (btn) { btn.classList.remove("is-loading"); btn.disabled = false; }
        showFormNote(form, "Those credentials didn't match. Please try again.");
        return;
      }
      onDone();
    }, 900);
  }

  function showFormNote(form, msg) {
    var note = form.querySelector(".form-note--error");
    if (!note) {
      note = document.createElement("p");
      note.className = "form-note form-note--error";
      form.insertBefore(note, form.firstChild);
    }
    note.textContent = msg;
  }
  function clearFormNote(form) {
    var note = form.querySelector(".form-note--error");
    if (note) note.textContent = "";
  }

  /* ---- Scroll reveal via IntersectionObserver (JS only toggles a class) ---
     Robust pattern: anything already in view on load is revealed immediately
     (so above-the-fold content is never left blank if IO is slow/quirky),
     the rest reveal on scroll, and a timeout fallback guarantees visibility. */
  function setupReveals() {
    var els = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!els.length) return;

    var reveal = function (el) { el.classList.add("is-visible"); };
    var inView = function (el) {
      var r = el.getBoundingClientRect();
      return r.top < (window.innerHeight || document.documentElement.clientHeight) * 0.92 && r.bottom > 0;
    };

    // 1) reveal everything currently in the viewport right away
    els.forEach(function (el) { if (inView(el)) reveal(el); });

    if (!("IntersectionObserver" in window)) {
      els.forEach(reveal);
      return;
    }

    // 2) observe the rest for scroll-triggered reveals
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { reveal(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { if (!el.classList.contains("is-visible")) io.observe(el); });

    // 3) scroll/resize fallback — guarantees reveals even where IO is flaky.
    //    (JS only toggles a class; the animation itself stays pure CSS.)
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var remaining = document.querySelectorAll(".reveal:not(.is-visible)");
        remaining.forEach(function (el) { if (inView(el)) reveal(el); });
        ticking = false;
        if (!remaining.length) {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // 4) last-resort safety: if nothing ever triggers (headless envs, no scroll,
    //    IO unsupported), reveal any still-hidden elements so content is never lost.
    setTimeout(function () {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach(reveal);
    }, 2500);
  }
  // re-scan when dynamic content is injected (grids, lists)
  document.addEventListener("content:ready", setupReveals);

  /* Active nav is handled in components.js via data-active — nothing to do here.
     (Kept as a no-op hook in case page-specific highlighting is needed later.) */
  function markActiveNav() {}
})();
