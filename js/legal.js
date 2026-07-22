/* ==========================================================================
   legal.js — build TOC from h2 headings, smooth scroll + scroll-spy
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var toc = document.getElementById("legal-toc");
    var body = document.querySelector("[data-legal-body]");
    if (!toc || !body) return;

    var heads = body.querySelectorAll("h2[id]");
    toc.innerHTML = Array.prototype.map.call(heads, function (h) {
      return '<a href="#' + h.id + '">' + h.textContent + "</a>";
    }).join("");

    var links = toc.querySelectorAll("a");
    links.forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var target = document.getElementById(a.getAttribute("href").slice(1));
        if (target) window.scrollTo({ top: target.offsetTop - 100, behavior: "smooth" });
      });
    });

    if ("IntersectionObserver" in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            links.forEach(function (a) {
              a.style.color = a.getAttribute("href") === "#" + en.target.id ? "var(--color-primary)" : "";
              a.style.fontWeight = a.getAttribute("href") === "#" + en.target.id ? "600" : "";
            });
          }
        });
      }, { rootMargin: "-100px 0px -70% 0px" });
      heads.forEach(function (h) { spy.observe(h); });
    }
  });
})();
