/* =========================================================
   Vikash Saran — portfolio script
   Vanilla JS, no dependencies. Every feature is guarded: if
   something is missing the page still works and logs nothing.
   ========================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  var onReducedMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };

  function safe(fn) {
    try { fn(); } catch (err) { /* never break the page */ }
  }

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  /* ---------------------------------------------------------
     1. Mobile navigation
     --------------------------------------------------------- */
  function initNav() {
    var toggle = $('.nav-toggle');
    var nav = $('#primary-nav');
    var backdrop = $('#nav-backdrop');
    if (!toggle || !nav) return;

    var links = $$('a, button', nav);
    var scrollY = 0;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('is-locked', open);

      if (backdrop) {
        if (open) {
          backdrop.hidden = false;
          window.requestAnimationFrame(function () { backdrop.classList.add('is-visible'); });
        } else {
          backdrop.classList.remove('is-visible');
          window.setTimeout(function () { backdrop.hidden = true; }, 400);
        }
      }

      if (open) {
        scrollY = window.pageYOffset;
        var first = links[0];
        if (first) window.setTimeout(function () { first.focus({ preventScroll: true }); }, 260);
      } else if (document.activeElement && nav.contains(document.activeElement)) {
        toggle.focus({ preventScroll: true });
      }
    }

    function isOpen() { return toggle.getAttribute('aria-expanded') === 'true'; }

    toggle.addEventListener('click', function () { setOpen(!isOpen()); });

    if (backdrop) {
      backdrop.addEventListener('click', function () {
        setOpen(false);
        window.scrollTo(0, scrollY);
      });
    }

    $$('.nav-link', nav).forEach(function (link) {
      link.addEventListener('click', function () { if (isOpen()) setOpen(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (!isOpen()) return;

      if (e.key === 'Escape' || e.key === 'Esc') {
        setOpen(false);
        return;
      }

      if (e.key === 'Tab') {
        var focusables = links.filter(function (el) { return !el.hasAttribute('disabled'); });
        if (!focusables.length) return;

        var first = focusables[0];
        var last = focusables[focusables.length - 1];

        if (e.shiftKey && (document.activeElement === first || !nav.contains(document.activeElement))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1080 && isOpen()) setOpen(false);
    });
  }

  /* ---------------------------------------------------------
     2. Header state + reading progress
     --------------------------------------------------------- */
  function initHeader() {
    var header = $('.site-header');
    var bar = $('#scroll-progress-bar');
    var ticking = false;

    function update() {
      var y = window.pageYOffset || root.scrollTop || 0;
      var height = document.documentElement.scrollHeight - window.innerHeight;
      var progress = height > 0 ? Math.min(y / height, 1) : 0;

      if (header) header.classList.toggle('is-scrolled', y > 24);
      if (bar) bar.style.transform = 'scaleX(' + progress.toFixed(4) + ')';
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  /* ---------------------------------------------------------
     3. Active section indicator
     --------------------------------------------------------- */
  function initScrollSpy() {
    var links = $$('.nav-link');
    if (!links.length) return;

    var map = links.map(function (link) {
      var id = (link.getAttribute('href') || '').replace('#', '');
      var section = id ? document.getElementById(id) : null;
      return { link: link, section: section };
    }).filter(function (item) { return item.section; });

    if (!map.length) return;

    var ticking = false;

    function update() {
      var cssH = parseFloat(getComputedStyle(root).getPropertyValue('--header-h')) || 74;
      var offset = cssH + window.innerHeight * 0.3;
      var current = null;

      map.forEach(function (item) {
        if (item.section.getBoundingClientRect().top <= offset) current = item;
      });

      if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 4) {
        current = map[map.length - 1];
      }

      map.forEach(function (item) {
        var active = item === current;
        item.link.classList.toggle('is-active', active);
        if (active) item.link.setAttribute('aria-current', 'true');
        else item.link.removeAttribute('aria-current');
      });

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  /* ---------------------------------------------------------
     4. Reveal on scroll
     --------------------------------------------------------- */
  function initReveal() {
    var items = $$('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window) || onReducedMotion.matches) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------
     5. Copy email address
     --------------------------------------------------------- */
  function initCopy() {
    var buttons = $$('[data-copy]');
    if (!buttons.length) return;

    var status = $('#copy-status');

    function fallbackCopy(text) {
      var field = document.createElement('textarea');
      field.value = text;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      document.body.removeChild(field);
      return ok;
    }

    buttons.forEach(function (btn) {
      var original = btn.textContent;

      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-copy') || '';
        if (!text) return;

        var done = function (ok) {
          btn.classList.toggle('is-done', ok);
          btn.textContent = ok ? 'Copied' : original;
          if (status) status.textContent = ok ? 'Email address copied to clipboard.' : '';
          window.setTimeout(function () {
            btn.classList.remove('is-done');
            btn.textContent = original;
          }, 2200);
        };

        if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallbackCopy(text)); });
        } else {
          done(fallbackCopy(text));
        }
      });
    });
  }

  /* ---------------------------------------------------------
     6. Footer year
     --------------------------------------------------------- */
  function initYear() {
    var el = $('#current-year');
    if (!el) return;
    el.textContent = String(new Date().getFullYear());
  }

  /* ---------------------------------------------------------
     Boot
     --------------------------------------------------------- */
  function init() {
    safe(initNav);
    safe(initHeader);
    safe(initScrollSpy);
    safe(initReveal);
    safe(initCopy);
    safe(initYear);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();