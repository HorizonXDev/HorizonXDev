/* ============================================================
   Horizon — Portfolio interactions
   ============================================================ */

(() => {
  "use strict";


  /* ---------- Theme (dark / light, default = system) ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");

  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") {
    root.setAttribute("data-theme", saved);
  } else {
    // No saved choice → follow the OS (no data-theme attr set)
    root.removeAttribute("data-theme");
  }

  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });


  /* ---------- Navbar: shadow on scroll ---------- */
  const nav = document.getElementById("navbar");
  const onScrollNav = () => nav.classList.toggle("scrolled", window.scrollY > 10);
  onScrollNav();
  window.addEventListener("scroll", onScrollNav, { passive: true });


  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    });
  });


})();
