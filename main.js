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

  /* ---------- Typewriter roles ---------- */
  const roles = [
    "Founder of Cloth Savvy",
    "Full-Stack Developer",
    "Flutter & Java Developer",
    "MIT App Inventor Extension Developer",
  ];
  const typeEl = document.getElementById("typewriter");
  if (typeEl) {
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;

    (function type() {
      const word = roles[roleIdx];
      charIdx += deleting ? -1 : 1;
      typeEl.textContent = word.slice(0, charIdx);

      let delay = deleting ? 38 : 78;
      if (!deleting && charIdx === word.length) {
        delay = 2100;
        deleting = true;
      } else if (deleting && charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        delay = 420;
      }
      setTimeout(type, delay);
    })();
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-link[href^='#']");

  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navAnchors.forEach((a) => {
            a.classList.toggle(
              "active",
              a.getAttribute("href") === `#${entry.target.id}`
            );
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    const decimals = target % 1 !== 0;
    const fmt = (v) => {
      if ("plain" in el.dataset) return String(Math.floor(v));
      if (decimals) return v.toFixed(1);
      return Math.floor(v).toLocaleString("en-IN");
    };
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window) {
    const counterIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            counterIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => counterIo.observe(c));
  } else {
    counters.forEach((c) => {
      const t = Number(c.dataset.count);
      c.textContent =
        c.dataset.plain ? String(Math.floor(t))
        : t % 1 !== 0 ? t.toFixed(1)
        : t.toLocaleString("en-IN");
    });
  }

  /* ---------- Contact form (mailto) ---------- */
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const subject = encodeURIComponent(`Portfolio message from ${name || "someone"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:horizon3833@gmail.com?subject=${subject}&body=${body}`;
  });
})();