/* ==========================================================================
   components.js — renders shared Header, Footer and Auth modals.
   Works over file:// (no fetch/partials). Populates:
     <header id="site-header" data-active="home">
     <footer id="site-footer">
     <div id="modal-root">  (auto-created if missing)
   ========================================================================== */
(function () {
  "use strict";

  /* Primary nav — label + target page + anchor id for scroll links */
  var NAV = [
    { label: "Vehicles", href: "available-cars.html" },
    { label: "Locations", href: "index.html#locations" },
    { label: "Pricing", href: "index.html#categories" },
    { label: "Business", href: "index.html#why" },
    { label: "Support", href: "help-center.html" }
  ];

  function headerHTML(active) {
    var links = NAV.map(function (n) {
      var path = n.href.split("#")[0];
      // Only distinct pages get the active state — home-anchor links never do.
      var isActive = active && path === active && path !== "index.html";
      return '<a class="navbar__link' + (isActive ? " is-active" : "") + '" href="' + n.href + '">' + n.label + "</a>";
    }).join("");

    return '' +
    '<nav class="navbar" aria-label="Primary">' +
      '<div class="container navbar__inner">' +
        '<a class="brand" href="index.html" aria-label="RideIndia home">' +
          '<span class="brand__mark">' + icon("car-front") + '</span>' +
          '<span class="brand__name">RideIndia</span>' +
        '</a>' +
        '<div class="navbar__links" id="nav-links">' + links + '</div>' +
        '<div class="navbar__actions" id="nav-actions"></div>' +
        '<button class="navbar__toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">' +
          icon("menu") +
        '</button>' +
      '</div>' +
    '</nav>';
  }

  function actionsHTML() {
    if (window.Auth && Auth.isLoggedIn()) {
      var user = Auth.get();
      var initials = (user.name || "U").trim().charAt(0).toUpperCase();
      return '' +
      '<div class="user-chip" id="user-chip" role="button" tabindex="0" aria-haspopup="true" aria-expanded="false">' +
        '<span class="user-chip__avatar">' + initials + '</span>' +
        '<span class="user-chip__name">' + escapeHtml(user.name) + '</span>' +
        '<span class="user-chip__caret">' + icon("chevron-down") + '</span>' +
        '<div class="user-menu" role="menu">' +
          '<a class="user-menu__item" href="index.html" role="menuitem">' + icon("user") + 'My Profile</a>' +
          '<a class="user-menu__item" href="confirmation.html" role="menuitem">' + icon("ticket") + 'My Bookings</a>' +
          '<a class="user-menu__item" href="help-center.html" role="menuitem">' + icon("settings") + 'Support</a>' +
          '<button class="user-menu__item" id="logout-btn" role="menuitem">' + icon("log-out") + 'Sign Out</button>' +
        '</div>' +
      '</div>';
    }
    return '' +
      '<a class="navbar__signin" href="#" data-auth-open="login">Sign In</a>' +
      '<button class="btn btn--primary btn--pill" data-auth-open="signup">Sign Up</button>';
  }

  function footerHTML() {
    return '' +
    '<footer class="footer" id="footer">' +
      '<div class="container footer__inner">' +
        '<div class="footer__grid">' +
          '<div class="footer__brandcol">' +
            '<a class="brand" href="index.html">' +
              '<span class="brand__mark">' + icon("car-front") + '</span>' +
              '<span class="brand__name">RideIndia</span>' +
            '</a>' +
            '<p class="footer__about">India\'s trusted car rental platform. Simple booking, transparent pricing, flexible options across 500+ cities.</p>' +
            '<div class="footer__socials">' +
              social("facebook") + social("twitter") + social("instagram") + social("linkedin") +
            '</div>' +
          '</div>' +
          '<div class="footer__col">' +
            '<h4>Quick Links</h4>' +
            '<div class="footer__links">' +
              '<a class="footer__link" href="available-cars.html">Vehicles</a>' +
              '<a class="footer__link" href="index.html#locations">Locations</a>' +
              '<a class="footer__link" href="index.html#categories">Pricing</a>' +
              '<a class="footer__link" href="index.html#why">Business</a>' +
            '</div>' +
          '</div>' +
          '<div class="footer__col">' +
            '<h4>Support</h4>' +
            '<div class="footer__links">' +
              '<a class="footer__link" href="help-center.html">Help Center</a>' +
              '<a class="footer__link" href="faqs.html">FAQs</a>' +
              '<a class="footer__link" href="contact-us.html">Contact Us</a>' +
              '<a class="footer__link" href="terms-of-service.html">Terms &amp; Conditions</a>' +
            '</div>' +
          '</div>' +
          '<div class="footer__col">' +
            '<h4>Contact</h4>' +
            '<div class="footer__contact">' +
              '<span class="footer__contact-item">' + icon("mail") + '<span>hello@rideindia.in</span></span>' +
              '<span class="footer__contact-item">' + icon("phone") + '<span>+91 1800 123 4567</span></span>' +
              '<span class="footer__contact-item">' + icon("map-pin") + '<span>205, Bandra Kurla Complex, Mumbai, MH</span></span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="footer__bottom">' +
          '<hr class="footer__rule">' +
          '<div class="footer__legal">' +
            '<span class="footer__copy">© 2026 RideIndia. All rights reserved.</span>' +
            '<div class="footer__legal-links">' +
              '<a class="footer__link" href="privacy-policy.html">Privacy Policy</a>' +
              '<a class="footer__link" href="cookie-policy.html">Cookie Policy</a>' +
              '<a class="footer__link" href="terms-of-service.html">Terms of Service</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</footer>';
  }

  function social(name) {
    return '<a class="footer__social" href="#" aria-label="' + name + '">' + icon(name) + '</a>';
  }

  /* ---- Auth modal markup (login + signup share one card container) ---- */
  function modalHTML() {
    return '' +
    '<div class="modal-root" id="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title" aria-hidden="true">' +
      '<div class="modal__backdrop" data-modal-close></div>' +
      '<div class="modal__dialog">' +
        '<div class="modal__card modal__card--md" role="document">' +
          '<button class="modal__close" data-modal-close aria-label="Close dialog">' + icon("x") + '</button>' +

          /* ---------------- LOGIN PANEL ---------------- */
          '<div class="auth-panel" data-panel="login">' +
            '<div class="modal__head">' +
              '<h2 class="modal__title" id="auth-title">Welcome back</h2>' +
              '<p class="modal__subtitle">Enter your details to sign in and manage your bookings.</p>' +
            '</div>' +
            '<form class="modal__form" id="login-form" novalidate>' +
              field("login-email", "email", "Email Address", "mail", "you@example.com") +
              passwordField("login-password", "Password") +
              '<div class="modal__options">' +
                '<label class="checkbox"><input type="checkbox" checked><span class="checkbox__box">' + icon("check") + '</span>Remember me</label>' +
                '<a class="modal__forgot" href="#">Forgot Password?</a>' +
              '</div>' +
              '<button class="btn btn--primary btn--block" type="submit">Login</button>' +
            '</form>' +
            '<p class="modal__foot">Don\'t have an account? <a class="modal__switch" href="#" data-switch="signup">Sign up free</a></p>' +
          '</div>' +

          /* ---------------- SIGNUP PANEL ---------------- */
          '<div class="auth-panel" data-panel="signup">' +
            '<div class="modal__head">' +
              '<h2 class="modal__title">Create Account</h2>' +
              '<p class="modal__subtitle">Sign up to start your journey, search fleets, and hit the road.</p>' +
            '</div>' +
            '<form class="modal__form" id="signup-form" novalidate>' +
              field("signup-name", "text", "Full Name", "user", "Enter your full name") +
              field("signup-email", "email", "Email Address", "mail", "Enter your email") +
              field("signup-phone", "tel", "Phone Number", "phone", "Enter phone number") +
              passwordField("signup-password", "Password", "Create a secure password") +
              '<label class="checkbox"><input type="checkbox" id="signup-terms"><span class="checkbox__box">' + icon("check") + '</span>I agree to the <a href="terms-of-service.html" target="_blank">Terms of Service</a> and <a href="privacy-policy.html" target="_blank">Privacy Policy</a></label>' +
              '<button class="btn btn--primary btn--block" type="submit">Sign Up</button>' +
            '</form>' +
            '<p class="modal__foot">Already have an account? <a class="modal__switch" href="#" data-switch="login">Sign In</a></p>' +
          '</div>' +

        '</div>' +
      '</div>' +
    '</div>';
  }

  function field(id, type, label, ic, placeholder) {
    return '' +
    '<div class="field" data-field>' +
      '<label class="field__label" for="' + id + '">' + label + '</label>' +
      '<div class="field__control">' + icon(ic) +
        '<input id="' + id + '" name="' + id + '" type="' + type + '" placeholder="' + placeholder + '" autocomplete="off">' +
      '</div>' +
      '<span class="field__error">' + icon("info") + '<span data-error-text></span></span>' +
    '</div>';
  }

  function passwordField(id, label, placeholder) {
    return '' +
    '<div class="field" data-field>' +
      '<label class="field__label" for="' + id + '">' + label + '</label>' +
      '<div class="field__control">' + icon("lock") +
        '<input id="' + id + '" name="' + id + '" type="password" placeholder="' + (placeholder || "Enter your password") + '" autocomplete="off">' +
        '<button type="button" class="field__toggle" data-password-toggle aria-label="Show password">' + icon("eye-off") + '</button>' +
      '</div>' +
      '<span class="field__error">' + icon("info") + '<span data-error-text></span></span>' +
    '</div>';
  }

  function escapeHtml(s) {
    return String(s || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---- Render + wire ---- */
  function renderActions() {
    var host = document.getElementById("nav-actions");
    if (host) host.innerHTML = actionsHTML();
  }

  function mount() {
    var header = document.getElementById("site-header");
    if (header) header.innerHTML = headerHTML(header.getAttribute("data-active"));

    var footer = document.getElementById("site-footer");
    if (footer) footer.innerHTML = footerHTML();

    var modalRoot = document.getElementById("modal-root");
    if (!modalRoot) {
      modalRoot = document.createElement("div");
      modalRoot.id = "modal-root";
      document.body.appendChild(modalRoot);
    }
    modalRoot.innerHTML = modalHTML();

    renderActions();

    // Mobile menu toggle
    var toggle = document.getElementById("nav-toggle");
    var links = document.getElementById("nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }

    // User menu open/close + logout
    document.addEventListener("click", function (e) {
      var chip = document.getElementById("user-chip");
      if (!chip) return;
      if (chip.contains(e.target)) {
        if (e.target.closest("#logout-btn")) {
          Auth.logout();
          window.location.href = "index.html";
          return;
        }
        if (e.target.closest(".user-menu__item")) return; // let link navigate
        var open = chip.getAttribute("aria-expanded") === "true";
        chip.setAttribute("aria-expanded", String(!open));
      } else {
        chip.setAttribute("aria-expanded", "false");
      }
    });

    // Re-render nav actions when auth state changes
    document.addEventListener("auth:change", renderActions);
  }

  window.Components = { mount: mount, renderActions: renderActions };
})();
