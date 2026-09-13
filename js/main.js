/* ==========================================================================
   Shariq & Eenara — Dholki Invitation
   Shared behaviour across all pages
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------- Bunting flags ---------------- */
  document.querySelectorAll(".bunting").forEach(function (row) {
    var count = window.innerWidth < 600 ? 16 : 30;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < count; i++) frag.appendChild(document.createElement("span"));
    row.appendChild(frag);
  });

  /* ---------------- Mobile nav (full-screen overlay) ---------------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".mobile-menu");
  var closeBtn = document.querySelector(".mobile-menu-close");

  function closeNav() {
    if (!toggle || !menu) return;
    toggle.classList.remove("open");
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  }

  function openNav() {
    if (!toggle || !menu) return;
    toggle.classList.add("open");
    menu.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.contains("open");
      isOpen ? closeNav() : openNav();
    });
    closeBtn && closeBtn.addEventListener("click", closeNav);
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* mark active page in both the desktop and mobile nav */
  var here = (window.location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a, .mobile-menu-links a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === here || (here === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  /* ---------------- Countdown ---------------- */
  // Dholki: 29 October 2026, 8:00 PM Pakistan Standard Time (UTC+5)
  var TARGET = new Date("2026-10-29T20:00:00+05:00").getTime();

  function paint(el, days, hours, mins, secs) {
    el.querySelector('[data-unit="days"]').textContent = String(days).padStart(2, "0");
    el.querySelector('[data-unit="hours"]').textContent = String(hours).padStart(2, "0");
    el.querySelector('[data-unit="mins"]').textContent = String(mins).padStart(2, "0");
    el.querySelector('[data-unit="secs"]').textContent = String(secs).padStart(2, "0");
  }

  function tickCountdowns() {
    var now = Date.now();
    var diff = TARGET - now;
    var boxes = document.querySelectorAll(".countdown");
    var messages = document.querySelectorAll(".countdown-done-msg");

    if (diff <= 0) {
      boxes.forEach(function (b) { b.style.display = "none"; });
      messages.forEach(function (m) { m.style.display = "block"; });
      return;
    }

    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var mins = Math.floor((diff % 3600000) / 60000);
    var secs = Math.floor((diff % 60000) / 1000);

    boxes.forEach(function (b) { paint(b, days, hours, mins, secs); });
  }

  if (document.querySelector(".countdown")) {
    tickCountdowns();
    setInterval(tickCountdowns, 1000);
  }

})();
