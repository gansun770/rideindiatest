/* ==========================================================================
   modal.js — generic modal controller + auth (login/signup) behaviour
   Handles: open/close, ESC, outside click, focus trap, panel switching.
   ========================================================================== */
(function () {
  "use strict";

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
  var lastFocused = null;

  function root() { return document.getElementById("auth-modal"); }

  function openAuth(panel) {
    var el = root();
    if (!el) return;
    lastFocused = document.activeElement;
    showPanel(panel || "login");
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    // focus first input after transition frame
    requestAnimationFrame(function () {
      var first = el.querySelector(".auth-panel.is-active input");
      if (first) first.focus();
    });
  }

  function close() {
    var el = root();
    if (!el || !el.classList.contains("is-open")) return;
    el.classList.remove("is-open");
    el.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function showPanel(name) {
    var el = root();
    el.querySelectorAll(".auth-panel").forEach(function (p) {
      p.classList.toggle("is-active", p.getAttribute("data-panel") === name);
    });
  }

  function trap(e) {
    var el = root();
    if (!el || !el.classList.contains("is-open") || e.key !== "Tab") return;
    var nodes = Array.prototype.slice.call(el.querySelectorAll(FOCUSABLE))
      .filter(function (n) { return n.offsetParent !== null; });
    if (!nodes.length) return;
    var first = nodes[0], last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function init() {
    // Openers anywhere on the page
    document.addEventListener("click", function (e) {
      var opener = e.target.closest("[data-auth-open]");
      if (opener) { e.preventDefault(); openAuth(opener.getAttribute("data-auth-open")); return; }

      var closer = e.target.closest("[data-modal-close]");
      if (closer) { e.preventDefault(); close(); return; }

      var switcher = e.target.closest("[data-switch]");
      if (switcher) {
        e.preventDefault();
        showPanel(switcher.getAttribute("data-switch"));
        var el = root();
        var inp = el.querySelector(".auth-panel.is-active input");
        if (inp) inp.focus();
      }

      // password visibility toggle (used in modal + payment)
      var pt = e.target.closest("[data-password-toggle]");
      if (pt) {
        var input = pt.parentElement.querySelector("input");
        var toShow = input.type === "password";
        input.type = toShow ? "text" : "password";
        pt.innerHTML = icon(toShow ? "eye" : "eye-off");
        pt.setAttribute("aria-label", toShow ? "Hide password" : "Show password");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
      trap(e);
    });

    // expose
    window.Modal = { openAuth: openAuth, close: close, showPanel: showPanel };
  }

  document.addEventListener("DOMContentLoaded", init);
})();
