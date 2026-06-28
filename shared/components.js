/* ── D8.Digital shared components ───────────────────────────
   Injects nav + footer, wires cursor, scroll, and reveals.
   Drop <script src="/shared/components.js"></script> in
   every page, no other setup needed.
─────────────────────────────────────────────────────────── */

(function () {

  /* ── Templates ────────────────────────────────────────── */
  const NAV = `
<nav class="nav" id="nav">
  <a href="/" class="nav-logo">D8<span class="dot">.</span>Digital</a>
  <ul class="nav-links">
    <li><a href="/work/index.html">Work</a></li>
    <li><a href="/services.html">Services</a></li>
    <li><a href="/about.html">About</a></li>
    <li><a href="/blog/index.html">Blog</a></li>
    <li><a href="/contact.html">Contact</a></li>
  </ul>
  <a href="/book.html" class="nav-cta">Book a Call</a>
</nav>`;

  const FOOTER = `
<footer>
  <div class="foot">
    <div>
      <div class="foot-logo">D8<span class="dot">.</span>Digital</div>
      <div class="foot-sub">Formerly Demonstr8d Solutions &middot; Houston, TX &middot; Manila, PH</div>
      <div class="foot-email"><a href="mailto:hello@d8.digital">hello@d8.digital</a></div>
    </div>
    <nav class="foot-right" aria-label="Footer navigation">
      <ul class="foot-links">
        <li><a href="/work/index.html">Work</a></li>
        <li><a href="/services.html">Services</a></li>
        <li><a href="/seo-website-build.html">SEO + Web Build</a></li>
        <li><a href="/about.html">About</a></li>
        <li><a href="/blog/index.html">Blog</a></li>
        <li><a href="/book.html">Book a Call</a></li>
        <li><a href="/contact.html">Contact</a></li>
      </ul>
      <div class="foot-copy">&copy; ${new Date().getFullYear()} D8.Digital. All rights reserved.</div>
    </nav>
  </div>
</footer>`;

  /* ── Mount nav + footer ───────────────────────────────── */
  function mountComponents() {
    const navMount    = document.getElementById('nav-mount');
    const footerMount = document.getElementById('footer-mount');
    if (navMount)    navMount.outerHTML    = NAV;
    if (footerMount) footerMount.outerHTML = FOOTER;
    markActivePage();
  }

  /* ── Active nav link (matches pathname) ──────────────── */
  function markActivePage() {
    const path = window.location.pathname.replace(/\/?$/, '');
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href').replace(/\/?$/, '');
      if (href && path.endsWith(href)) {
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ── Custom cursor ────────────────────────────────────── */
  function setupCursor() {
    const cur  = document.getElementById('cur');
    const curR = document.getElementById('curR');
    if (!cur || !curR) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cur.style.left = mx + 'px'; cur.style.top = my + 'px';
    });
    (function raf() {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      curR.style.left = rx + 'px';
      curR.style.top  = ry + 'px';
      requestAnimationFrame(raf);
    })();

    // Re-query after nav/footer inject so their links are included
    function bindLinks() {
      document.querySelectorAll('a, button').forEach(el => {
        if (el.dataset.cursorBound) return;
        el.dataset.cursorBound = '1';
        el.addEventListener('mouseenter', () => { cur.classList.add('on-link'); curR.classList.add('on-link'); });
        el.addEventListener('mouseleave', () => { cur.classList.remove('on-link'); curR.classList.remove('on-link'); });
      });
    }
    bindLinks();
    // Catch dynamically injected links (nav/footer arrive after DOMContentLoaded)
    setTimeout(bindLinks, 50);
  }

  /* ── Nav scroll behaviour ─────────────────────────────── */
  function setupNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('stuck', scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once in case page reloaded mid-scroll
  }

  /* ── Scroll reveals ───────────────────────────────────── */
  function setupReveals() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });
    document.querySelectorAll('.rv').forEach(el => io.observe(el));
  }

  /* ── Boot ─────────────────────────────────────────────── */
  function boot() {
    mountComponents();
    setupCursor();
    // Nav + reveals need the injected DOM to exist first
    setTimeout(() => { setupNav(); setupReveals(); }, 0);
    // Website OS loader
    var s = document.createElement('script');
    s.src = 'https://os.d8.digital/os-loader.js';
    s.setAttribute('data-site', 'fc4c9922805529047d1a5ac05d112b29');
    document.body.appendChild(s);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
