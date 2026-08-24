/* ==========================================================================
   NEXORA — script.js
   Vanilla JS, IIFE pattern, no ES modules (compatible con file:// y FTP).
   ========================================================================== */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };

  document.addEventListener("DOMContentLoaded", function () {
    initNavScroll();
    initMobileMenu();
    initMouseGradient();
    initCursorGlow();
    initMagnetic();
    initReveal();
    initTilt();
    initFaqAccordion();
    initCountUp();
    initSmoothAnchors();
  });

  /* ---------- Nav: transparent -> solid on scroll ---------- */
  function initNavScroll() {
    var nav = $("[data-nav]");
    if (!nav) return;
    function onScroll() {
      if (window.scrollY > 24) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile fullscreen menu ---------- */
  function initMobileMenu() {
    var burger = $("[data-burger]");
    var mobileNav = $("[data-nav-mobile]");
    if (!burger || !mobileNav) return;

    burger.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    $$("a", mobileNav).forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Hero mouse-reactive gradient (Archetype 05) ---------- */
  function initMouseGradient() {
    var target = $("[data-mouse-gradient]");
    if (!target) return;
    var hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!hasFinePointer) {
      // Touch devices: gentle static position, no listener needed.
      document.documentElement.style.setProperty("--mx", "50%");
      document.documentElement.style.setProperty("--my", "35%");
      return;
    }

    var mx = 50, my = 35, raf = null;
    window.addEventListener("mousemove", function (e) {
      var xPct = (e.clientX / window.innerWidth) * 100;
      var yPct = (e.clientY / window.innerHeight) * 100;
      mx = xPct; my = yPct;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        document.documentElement.style.setProperty("--mx", mx + "%");
        document.documentElement.style.setProperty("--my", my + "%");
        raf = null;
      });
    }, { passive: true });
  }

  /* ---------- Ambient cursor glow — hidden until first mousemove (gotcha A.3) ---------- */
  function initCursorGlow() {
    var glow = $("[data-cursor-glow]");
    if (!glow) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    var firstMove = false;
    window.addEventListener("mousemove", function (e) {
      glow.style.transform = "translate3d(" + e.clientX + "px," + e.clientY + "px,0)";
      if (!firstMove) {
        firstMove = true;
        glow.classList.add("is-ready");
      }
    }, { passive: true });
  }

  /* ---------- Magnetic buttons ---------- */
  function initMagnetic() {
    var els = $$("[data-magnetic]");
    if (!els.length) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    els.forEach(function (el) {
      var strength = 0.25;
      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        var relX = e.clientX - (rect.left + rect.width / 2);
        var relY = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = "translate(" + (relX * strength) + "px," + (relY * strength) + "px)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "translate(0,0)";
      });
    });
  }

  /* ---------- Reveal on scroll — IntersectionObserver + 6s safety net (gotcha A.8) ---------- */
  function initReveal() {
    var targets = $$("[data-reveal]");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });

    targets.forEach(function (el) { io.observe(el); });

    // Safety net: force-reveal anything still hidden after 6s (stuck observers, etc.)
    setTimeout(function () {
      targets.forEach(function (el) {
        if (!el.classList.contains("is-visible") && el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  /* ---------- Tilt 3D subtle on portfolio cards ---------- */
  function initTilt() {
    var cards = $$("[data-tilt]");
    if (!cards.length) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    var maxTilt = 7;

    cards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width;
        var py = (e.clientY - rect.top) / rect.height;
        var rx = (0.5 - py) * maxTilt;
        var ry = (px - 0.5) * maxTilt;
        card.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-4px)";
      });
      // mouseover/mouseout with relatedTarget check — more universally testable (gotcha A.5)
      card.addEventListener("mouseout", function (e) {
        if (!card.contains(e.relatedTarget)) {
          card.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
        }
      });
    });
  }

  /* ---------- FAQ accordion ---------- */
  function initFaqAccordion() {
    var items = $$("[data-faq-item]");
    if (!items.length) return;

    items.forEach(function (item) {
      var trigger = $("[data-faq-trigger]", item);
      var panel = $("[data-faq-panel]", item);
      if (!trigger || !panel) return;

      trigger.addEventListener("click", function () {
        var isOpen = item.getAttribute("data-open") === "true";

        // Close all other items (single-open accordion)
        items.forEach(function (other) {
          if (other === item) return;
          other.setAttribute("data-open", "false");
          $("[data-faq-trigger]", other).setAttribute("aria-expanded", "false");
          $("[data-faq-panel]", other).style.height = "0px";
        });

        if (isOpen) {
          item.setAttribute("data-open", "false");
          trigger.setAttribute("aria-expanded", "false");
          panel.style.height = "0px";
        } else {
          item.setAttribute("data-open", "true");
          trigger.setAttribute("aria-expanded", "true");
          panel.style.height = panel.scrollHeight + "px";
        }
      });
    });

    // Recalculate open panel height on resize (font reflow, etc.)
    window.addEventListener("resize", function () {
      items.forEach(function (item) {
        if (item.getAttribute("data-open") === "true") {
          var panel = $("[data-faq-panel]", item);
          panel.style.height = "auto";
          var h = panel.scrollHeight;
          panel.style.height = h + "px";
        }
      });
    });
  }

  /* ---------- Animated counters ---------- */
  function initCountUp() {
    var nums = $$("[data-countup]");
    if (!nums.length) return;

    if (!("IntersectionObserver" in window)) {
      nums.forEach(function (el) { el.textContent = el.getAttribute("data-countup"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        animateCount(entry.target);
      });
    }, { threshold: 0.4 });

    nums.forEach(function (el) { io.observe(el); });

    function animateCount(el) {
      var end = parseFloat(el.getAttribute("data-countup"), 10);
      if (reduced) { el.textContent = end; return; }
      var duration = 1400;
      var start = null;

      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        var value = Math.round(end * eased);
        el.textContent = value;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = end;
      }
      requestAnimationFrame(step);
    }
  }

  /* ---------- Smooth-scroll for in-page anchors (native, no Lenis needed) ---------- */
  function initSmoothAnchors() {
    $$('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id = link.getAttribute("href");
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      });
    });
  }

})();
