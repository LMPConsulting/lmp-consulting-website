/* Erfahrung: Zahlen zählen einmal hoch, sobald sie sichtbar werden, und die Wortwolken
   verschieben sich beim Scrollen leicht gegeneinander. Ohne JavaScript oder mit
   „Bewegung reduzieren“ stehen die Endwerte und die Wolken ruhig da. */
(function () {
  'use strict';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // ---------- Zahlen ----------
  const format = new Intl.NumberFormat('de-DE');
  const zahlen = Array.from(document.querySelectorAll('[data-zahl]'));
  zahlen.forEach((el) => { el.textContent = format.format(0); });

  function hochzaehlen(el) {
    const ziel = Number(el.dataset.zahl);
    const start = performance.now(), dauer = 1400;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    (function tick(now) {
      const t = Math.min(1, (now - start) / dauer);
      el.textContent = format.format(Math.round(ziel * ease(t)));
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }

  if (zahlen.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((eintraege) => {
      eintraege.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        hochzaehlen(e.target);
      });
    }, { threshold: 0.6 });
    zahlen.forEach((el) => io.observe(el));
  } else {
    zahlen.forEach((el) => { el.textContent = format.format(Number(el.dataset.zahl)); });
  }

  // ---------- Wolken ----------
  const wolken = document.querySelector('.wolken');
  if (!wolken) return;
  const tiefen = [0.9, -0.5, 0.3, -0.85, 0.6, -0.25, 0.75, -0.65, 0.15];
  const woerter = Array.from(wolken.querySelectorAll('.wolke li')).map((li, i) => ({ li, tiefe: tiefen[i % tiefen.length] }));
  let geplant = false;

  function verschieben() {
    geplant = false;
    const r = wolken.getBoundingClientRect();
    if (r.bottom < -200 || r.top > innerHeight + 200) return;
    // -1 (Wolke unten im Bild) bis 1 (Wolke oben im Bild)
    const lage = Math.max(-1, Math.min(1, (innerHeight / 2 - (r.top + r.height / 2)) / (innerHeight / 2)));
    woerter.forEach((w) => w.li.style.setProperty('--p', (lage * w.tiefe * 10).toFixed(1) + 'px'));
  }

  addEventListener('scroll', () => {
    if (geplant) return;
    geplant = true;
    requestAnimationFrame(verschieben);
  }, { passive: true });
  verschieben();
})();
