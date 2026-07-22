/* ==========================================================================
   auth.js — mock authentication state (localStorage, no backend)
   ========================================================================== */
(function () {
  "use strict";

  var KEY = "rideindia_auth";

  var Auth = {
    get: function () {
      try { return JSON.parse(localStorage.getItem(KEY)); }
      catch (e) { return null; }
    },
    isLoggedIn: function () { return !!this.get(); },
    login: function (user) {
      var data = Object.assign({ name: "Priya Sharma", email: "" }, user || {});
      localStorage.setItem(KEY, JSON.stringify(data));
      document.dispatchEvent(new CustomEvent("auth:change", { detail: data }));
      return data;
    },
    logout: function () {
      localStorage.removeItem(KEY);
      document.dispatchEvent(new CustomEvent("auth:change", { detail: null }));
    },
    /** Derive a display name from an email if the user typed one. */
    nameFromEmail: function (email) {
      if (!email) return "Priya Sharma";
      var handle = email.split("@")[0].replace(/[._-]+/g, " ");
      return handle.replace(/\b\w/g, function (c) { return c.toUpperCase(); });
    }
  };

  window.Auth = Auth;
})();
