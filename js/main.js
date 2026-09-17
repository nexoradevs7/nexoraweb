/* ==========================================================================
   NEXORA — main.js
   Vanilla JS, IIFE pattern, no ES modules.
   ========================================================================== */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  var currentLang = "es";

  /* ==========================================================================
     TRANSLATIONS
     ========================================================================== */
  var translations = {
    nav_inicio: { es: "Inicio", en: "Home" },
    nav_servicios: { es: "Servicios", en: "Services" },
    nav_portafolio: { es: "Portafolio", en: "Portfolio" },
    nav_precios: { es: "Precios", en: "Pricing" },
    nav_contacto: { es: "Contacto", en: "Contact" },
    nav_cta: { es: "WhatsApp", en: "WhatsApp" },
    nav_cta_mobile: { es: "Escribir por WhatsApp", en: "Message us on WhatsApp" },
    aria_open_menu: { es: "Abrir menú", en: "Open menu" },
    aria_wa_float: { es: "Escribir por WhatsApp", en: "Message us on WhatsApp" },

    hero_badge: { es: "Garantía de 14 días o te devolvemos tu dinero", en: "14-day guarantee or your money back" },
    hero_title: {
      es: 'Convertimos <em>visitantes locales</em><br />en clientes recurrentes.',
      en: 'We turn <em>local visitors</em><br />into recurring customers.'
    },
    hero_subtitle: {
      es: "Diseñamos y programamos sitios web de alto rendimiento para negocios locales y firmas industriales. Nada de plantillas genéricas: cada sección está pensada para que el cliente reserve, pida o te contacte en menos de 30 segundos.",
      en: "We design and build high-performance websites for local businesses and industrial firms. No generic templates: every section is built so your customer books, orders, or contacts you in under 30 seconds."
    },
    hero_btn_whatsapp: { es: "WhatsApp directo", en: "Message us on WhatsApp" },
    hero_btn_email: { es: "Enviar correo", en: "Send an email" },
    stat_label_1: { es: "Negocios locales", en: "Local businesses" },
    stat_label_2: { es: "Más reservas promedio", en: "Average booking increase" },
    stat_label_3: { es: "Entrega promedio", en: "Average delivery time" },
    stat_suffix_days: { es: " días", en: " days" },

    eyebrow_servicios: { es: "El problema real", en: "The real problem" },
    servicios_title: {
      es: "Tu negocio no pierde clientes por falta de calidad.<br />Los pierde en tu propia página web.",
      en: "Your business isn't losing customers over quality.<br />It's losing them on your own website."
    },
    tag_bad: { es: "Plantilla genérica", en: "Generic template" },
    tag_good: { es: "Diseño CRO Nexora", en: "Nexora CRO design" },
    bad_1: { es: "Carga en 6+ segundos, el cliente se va antes de verla", en: "Loads in 6+ seconds — the customer leaves before seeing it" },
    bad_2: { es: "Sin botón de WhatsApp visible, pierdes el pedido rápido", en: "No visible WhatsApp button, you lose the quick order" },
    bad_3: { es: "Se ve igual que la de tu competencia", en: "Looks just like your competitor's site" },
    bad_4: { es: "No aparece en Google cuando buscan \"cerca de mí\"", en: "Doesn't show up on Google for \"near me\" searches" },
    bad_5: { es: "Ilegible en el celular, donde entra el 80% del tráfico", en: "Unreadable on mobile, where 80% of traffic comes from" },
    good_1: { es: "Carga en menos de 1.5 segundos, optimizada al 100%", en: "Loads in under 1.5 seconds, fully optimized" },
    good_2: { es: "WhatsApp flotante siempre visible, el pedido llega directo a tu chat", en: "Floating WhatsApp always visible — the order lands straight in your chat" },
    good_3: { es: "Diseño único, hecho a la medida de tu marca", en: "Unique design, custom-built for your brand" },
    good_4: { es: "SEO local configurado para \"cerca de mí\" y tu ciudad", en: "Local SEO configured for \"near me\" and your city" },
    good_5: { es: "Mobile-first: pensada primero para el celular, luego el resto", en: "Mobile-first: built for phones first, everything else after" },

    eyebrow_portafolio: { es: "Portafolio", en: "Portfolio" },
    portafolio_title: { es: "Diseños hechos para vender, no solo para verse bien", en: "Designs built to sell, not just to look good" },

    featured_badge: { es: "Proyecto estrella", en: "Featured project" },
    edgas_title: { es: "EDGAS — Ingeniería & Consultoría Industrial", en: "EDGAS — Industrial Engineering & Consulting" },
    edgas_desc: {
      es: "Plataforma corporativa e industrial desarrollada para firma de ingeniería en gas natural. Incluye arquitectura bilingüe (ES/EN), diseño responsive de alto rendimiento y optimización para móviles.",
      en: "Corporate and industrial platform developed for a natural gas engineering firm. Features bilingual architecture (ES/EN), high-performance responsive design, and mobile-first optimization."
    },
    edgas_cta: { es: "Ver proyecto en vivo", en: "View live project" },
    tag_bilingual: { es: "Bilingüe", en: "Bilingual" },
    tag_responsive: { es: "Responsive", en: "Responsive" },

    port_restaurant_title: { es: "Restaurantes", en: "Restaurants" },
    port_restaurant_desc: { es: "Menú digital interactivo + reservas directas por WhatsApp, sin apps ni comisiones.", en: "Interactive digital menu + direct WhatsApp bookings, no apps or commissions." },
    port_restaurant_btn: { es: "Reservar mesa", en: "Book a table" },
    port_cafe_title: { es: "Cafés", en: "Cafés" },
    port_cafe_desc: { es: "Sistema de reserva de mesas con horarios en vivo, pensado para el tráfico de fin de semana.", en: "Live table-booking system built for weekend rush hours." },
    port_cafe_badge: { es: "☕ Abierto ahora", en: "☕ Open now" },
    port_cafe_btn: { es: "Confirmar reserva", en: "Confirm booking" },
    port_shop_title: { es: "Tiendas", en: "Shops" },
    port_shop_desc: { es: "Catálogo visual con checkout directo por WhatsApp: el cliente arma su pedido sin salir del chat.", en: "Visual catalog with direct WhatsApp checkout — customers build their order without leaving the chat." },
    port_shop_btn: { es: "Pedir por WhatsApp", en: "Order on WhatsApp" },
    port_salon_title: { es: "Salones y barberías", en: "Salons & barbershops" },
    port_salon_desc: { es: "Agenda online con recordatorios automáticos para reducir las citas perdidas.", en: "Online booking with automatic reminders to reduce no-shows." },
    port_salon_btn: { es: "Agendar cita", en: "Book appointment" },

    eyebrow_precios: { es: "Planes", en: "Plans" },
    precios_title: { es: "Elige el plan según el tamaño de tu proyecto", en: "Choose the plan that fits your project" },
    precios_subtitle: { es: "Sin letra pequeña. Sin mensualidades escondidas. Pagas una vez, el sitio es tuyo.", en: "No fine print. No hidden monthly fees. Pay once, the site is yours." },
    plan_period: { es: "/único pago", en: "/one-time" },
    plan_cta: { es: "Elegir plan", en: "Choose plan" },
    plan_badge: { es: "Más popular", en: "Most popular" },

    plan_basico_name: { es: "Básico / Landing Page", en: "Basic / Landing Page" },
    plan_basico_desc: { es: "Ideal para presencia rápida y directa en internet.", en: "Ideal for a fast, direct online presence." },
    plan_basico_f1: { es: "1 página / sección principal", en: "1 page / main section" },
    plan_basico_f2: { es: "Catálogo simple de productos o servicios", en: "Simple product or service catalog" },
    plan_basico_f3: { es: "Enlace directo a redes sociales y WhatsApp", en: "Direct link to social media and WhatsApp" },
    plan_basico_f4: { es: "100% optimizado para móviles", en: "100% mobile-optimized" },

    plan_pro_name: { es: "Pro / Sitio Corporativo", en: "Pro / Corporate Website" },
    plan_pro_desc: { es: "La opción recomendada para marcas y proyectos serios.", en: "The recommended option for serious brands and projects." },
    plan_pro_f1: { es: "Sitio multipágina (hasta 4–5 páginas)", en: "Multi-page site (up to 4–5 pages)" },
    plan_pro_f2: { es: "Diseño personalizado para tu marca", en: "Custom design tailored to your brand" },
    plan_pro_f3: { es: "Integración de portafolio y servicios", en: "Portfolio and services integration" },
    plan_pro_f4: { es: "SEO básico configurado", en: "Basic SEO configured" },
    plan_pro_f5: { es: "Optimización de velocidad de carga", en: "Load speed optimization" },

    plan_premium_name: { es: "Premium / Plataforma Bilingüe o Tienda", en: "Premium / Bilingual Platform or Store" },
    plan_premium_desc: { es: "Para negocios que necesitan alcance internacional o venta en línea.", en: "For businesses that need international reach or online sales." },
    plan_premium_f1: { es: "Sitio completo multi-idioma (ES/EN) o tienda online", en: "Full multi-language site (ES/EN) or online store" },
    plan_premium_f2: { es: "Catálogo amplio de productos", en: "Extensive product catalog" },
    plan_premium_f3: { es: "Integraciones avanzadas (pagos, reservas, CRM)", en: "Advanced integrations (payments, bookings, CRM)" },
    plan_premium_f4: { es: "Soporte prioritario", en: "Priority support" },
    plan_premium_f5: { es: "Máxima optimización móvil y SEO", en: "Maximum mobile and SEO optimization" },

    contact_eyebrow: { es: "Contacto", en: "Contact" },
    contact_title: { es: "¿Listo para dejar de perder clientes frente a tu propia pantalla?", en: "Ready to stop losing customers on your own screen?" },
    contact_subtitle: {
      es: "Escríbenos por WhatsApp o correo, o completa el formulario. Te decimos exactamente qué necesita tu proyecto y en cuánto tiempo lo tenemos listo.",
      en: "Message us on WhatsApp or email, or fill out the form. We'll tell you exactly what your project needs and how soon it'll be ready."
    },
    form_name: { es: "Nombre", en: "Name" },
    form_name_ph: { es: "Tu nombre", en: "Your name" },
    form_email: { es: "Correo electrónico", en: "Email address" },
    form_email_ph: { es: "tucorreo@ejemplo.com", en: "youremail@example.com" },
    form_business: { es: "Negocio / Proyecto", en: "Business / Project" },
    form_business_ph: { es: "Nombre de tu negocio", en: "Your business name" },
    form_message: { es: "Mensaje", en: "Message" },
    form_message_ph: { es: "Cuéntanos qué necesitas...", en: "Tell us what you need..." },
    form_submit: { es: "Enviar mensaje", en: "Send message" },
    form_note: { es: "Se abrirá tu app de correo con el mensaje listo para enviar.", en: "Your email app will open with the message ready to send." },

    footer_tagline: { es: "Sitios web de alto rendimiento para negocios locales e industriales.", en: "High-performance websites for local and industrial businesses." },
    footer_nav: { es: "Navegación", en: "Navigation" },
    footer_contact: { es: "Contacto", en: "Contact" },
    footer_follow: { es: "Síguenos", en: "Follow us" },
    footer_copy: { es: "© 2026 Nexora Studio. Todos los derechos reservados.", en: "© 2026 Nexora Studio. All rights reserved." }
  };

  document.addEventListener("DOMContentLoaded", function () {
    safeInit(initNavScroll);
    safeInit(initMobileMenu);
    safeInit(initMouseGradient);
    safeInit(initCursorGlow);
    safeInit(initMagnetic);
    safeInit(initReveal);
    safeInit(initTilt);
    safeInit(initFaqAccordion);
    safeInit(initCountUp);
    safeInit(initSmoothAnchors);
    safeInit(initLangToggle);
    safeInit(initContactForm);
  });

  function safeInit(fn) {
    try {
      fn();
    } catch (err) {
      console.error("Nexora init error in " + fn.name + ":", err);
    }
  }

  /* ---------- i18n ---------- */
  function setLanguage(lang) {
    if (lang !== "es" && lang !== "en") lang = "es";
    currentLang = lang;
    document.documentElement.lang = lang;

    $$("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var entry = translations[key];
      if (!entry) return;
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = entry[lang];
      else el.textContent = entry[lang];
    });

    $$("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      var entry = translations[key];
      if (entry) el.setAttribute("placeholder", entry[lang]);
    });

    $$("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      var entry = translations[key];
      if (entry) el.setAttribute("aria-label", entry[lang]);
    });

    $$("[data-lang-option]").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang-option") === lang);
    });
  }

  function initLangToggle() {
    var toggle = $("[data-lang-toggle]");
    if (!toggle) return;
    $$("[data-lang-option]", toggle).forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLanguage(btn.getAttribute("data-lang-option"));
      });
    });
  }

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

  /* ---------- Hero mouse-reactive gradient ---------- */
  function initMouseGradient() {
    var target = $("[data-mouse-gradient]");
    if (!target) return;
    var hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!hasFinePointer) {
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

  /* ---------- Ambient cursor glow ---------- */
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

  /* ---------- Reveal on scroll ---------- */
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
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = Math.round(end * eased);
        el.textContent = value;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = end;
      }
      requestAnimationFrame(step);
    }
  }

  /* ---------- Smooth-scroll for in-page anchors ---------- */
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

  /* ---------- Contact form: opens a pre-filled mailto (no backend) ---------- */
  function initContactForm() {
    var form = $("[data-contact-form]");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = $("#cf-name", form).value.trim();
      var email = $("#cf-email", form).value.trim();
      var business = $("#cf-business", form).value.trim();
      var message = $("#cf-message", form).value.trim();

      if (!name || !email || !message) return;

      var subjectLine = currentLang === "en"
        ? "New inquiry from " + name
        : "Nuevo contacto de " + name;

      var bodyLines = currentLang === "en"
        ? ["Name: " + name, "Email: " + email, "Business/Project: " + (business || "-"), "", "Message:", message]
        : ["Nombre: " + name, "Correo: " + email, "Negocio/Proyecto: " + (business || "-"), "", "Mensaje:", message];

      var mailto = "mailto:Nexoracontacto@proton.me"
        + "?subject=" + encodeURIComponent(subjectLine)
        + "&body=" + encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailto;
    });
  }

})();
