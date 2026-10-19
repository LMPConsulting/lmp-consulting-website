/* Roter Faden: ein Knäuel im Hero, das sich beim Scrollen zu einer Linie durch die Seite entwirrt.
   Ohne JavaScript bleibt die Seite vollständig nutzbar, nur ohne Faden. */
(function () {
  'use strict';

  // Mobilmenü (<details>) nach Klick auf einen Link schließen
  document.querySelectorAll('.menu').forEach(function (menu) {
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) menu.open = false;
    });
  });

  const svg = document.getElementById('faden');
  if (!svg) return;
  const pfad = document.getElementById('faden-pfad');
  const knotenG = document.getElementById('faden-knoten');
  const ruhig = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SVG_NS = 'http://www.w3.org/2000/svg';
  let laenge = 0, knaeuelLaenge = 0, tabelle = [], knoten = [], introFertig = ruhig, introL = ruhig ? Infinity : 0;

  const abs = (el) => { const r = el.getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height }; };

  function knaeuelPunkte(cx, cy, r) {
    // Wollknäuel: überlagerte Schwingungen mit ungeraden Frequenzen, läuft unten links aus
    const pts = [];
    const n = 260, umlauf = Math.PI * 2 * 2.6;
    for (let i = 0; i <= n; i++) {
      const t = i / n, a = t * umlauf;
      let x = 0.62 * Math.sin(3.1 * a + 0.4) + 0.38 * Math.sin(5.3 * a + 1.1);
      let y = 0.62 * Math.cos(2.7 * a) + 0.38 * Math.cos(4.9 * a + 0.5);
      const raus = Math.max(0, (t - 0.86) / 0.14);          // letzte 14 %: nach unten links ziehen
      x = x * (1 - raus) + (-0.35) * raus;
      y = y * (1 - raus) + 1.15 * raus;
      pts.push([cx + x * r, cy + y * r]);
    }
    return pts;
  }

  function glatt(pts) {
    // zentripetaler Catmull-Rom -> kubische Bezier (keine Schlaufen an engen Stellen)
    const dist = (a, b) => Math.max(1e-3, Math.sqrt(Math.hypot(b[0] - a[0], b[1] - a[1])));
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const d1 = dist(p0, p1), d2 = dist(p1, p2), d3 = dist(p2, p3);
      const c1 = [0, 1].map((k) => (d1 * d1 * p2[k] - d2 * d2 * p0[k] + (2 * d1 * d1 + 3 * d1 * d2 + d2 * d2) * p1[k]) / (3 * d1 * (d1 + d2)));
      const c2 = [0, 1].map((k) => (d3 * d3 * p1[k] - d2 * d2 * p3[k] + (2 * d3 * d3 + 3 * d3 * d2 + d2 * d2) * p2[k]) / (3 * d3 * (d3 + d2)));
      d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d;
  }

  function bauen() {
    const docH = document.documentElement.scrollHeight;
    svg.setAttribute('width', document.documentElement.clientWidth);
    svg.setAttribute('height', docH);
    svg.style.height = docH + 'px';

    const wrap = document.querySelector('.wrap');
    const w = abs(wrap);
    const railX = w.x + parseFloat(getComputedStyle(wrap).paddingLeft) * 0.42;
    const schmal = innerWidth <= 900;

    const k = abs(document.querySelector('[data-knaeuel]'));
    const r = Math.min(k.w, k.h) * 0.42;
    const tangle = knaeuelPunkte(k.x + k.w / 2, k.y + k.h / 2, r);
    const punkte = tangle.slice();
    const knotenPunkte = [];

    // Übergang vom Knäuel zur Spur links
    const last = tangle[tangle.length - 1];
    const hero = abs(document.querySelector('.hero'));
    const unterHero = hero.y + hero.h - 24;
    if (schmal) {
      // Knäuel steht über dem Text, also sofort auf die Spur links und daneben herunter
      punkte.push([railX + 10, last[1] + 24]);
      punkte.push([railX, last[1] + 70]);
      punkte.push([railX, unterHero + 40]);
    } else {
      punkte.push([last[0] - 10, Math.max(last[1] + 30, unterHero - 50)]);
      punkte.push([last[0] - 80, unterHero]);
      punkte.push([railX + 90, unterHero + 10]);
      punkte.push([railX, unterHero + 70]);
    }

    document.querySelectorAll('[data-knoten]').forEach((h2) => {
      const a = abs(h2);
      const y = a.y + Math.min(a.h, 60) / 2;
      punkte.push([railX, y - 80]);
      punkte.push([railX, y]);
      knotenPunkte.push([railX, y]);

      const sec = h2.closest('section');
      const marks = sec ? sec.querySelectorAll('[data-schritt]') : [];
      if (marks.length && schmal) {
        // Schritte als Knoten auf der Spur, wie eine Zeitleiste
        marks.forEach((m) => { const b = abs(m.closest('li')); punkte.push([railX, b.y + 14]); knotenPunkte.push([railX, b.y + 14]); });
      } else if (marks.length) {
        const m0 = abs(marks[0]);
        const mN = abs(marks[marks.length - 1]);
        const liste = abs(sec.querySelector('.schritte'));
        const my = m0.y + 7;
        punkte.push([railX, my - 50]);
        punkte.push([railX + 30, my - 6]);
        marks.forEach((m) => { const b = abs(m); punkte.push([b.x + 7, my]); knotenPunkte.push([b.x + 7, my]); });
        // rechts heraus, unter den Texten zurück zur Spur
        const rechts = liste.x + liste.w + 8;
        const zurueckY = liste.y + liste.h + 56;
        punkte.push([Math.min(rechts, mN.x + 7 + 120), my]);
        punkte.push([rechts + 10, my + 60]);
        punkte.push([rechts - 20, zurueckY - 10]);
        punkte.push([railX + 120, zurueckY]);
        punkte.push([railX, zurueckY + 60]);
      }
    });

    // Ende: Unterstreichung der Mailadresse
    const e = abs(document.querySelector('[data-ende]'));
    const uy = e.y + e.h - 4;
    punkte.push([railX, uy - 40]);
    punkte.push([e.x - 6, uy]);
    punkte.push([e.x + e.w * 0.5, uy]);
    punkte.push([e.x + e.w, uy]);

    pfad.setAttribute('d', glatt(punkte));
    laenge = pfad.getTotalLength();

    // Nachschlagetabelle Länge -> Punkt, daraus das Ende des Knäuels
    tabelle = [];
    for (let l = 0; l <= laenge; l += 6) {
      const p = pfad.getPointAtLength(l);
      tabelle.push([l, p.x, p.y]);
    }
    let best = Infinity;
    knaeuelLaenge = 0;
    for (const [l, x, y] of tabelle) {
      const dd = Math.hypot(x - last[0], y - last[1]);
      if (dd < best) { best = dd; knaeuelLaenge = l; }
    }

    knotenG.textContent = '';
    knoten = knotenPunkte.map(([x, y]) => {
      const c = document.createElementNS(SVG_NS, 'circle');
      c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', 4);
      knotenG.appendChild(c);
      let nah = 0, d0 = Infinity;
      for (const [l, px, py] of tabelle) { const dd = Math.hypot(px - x, py - y); if (dd < d0) { d0 = dd; nah = l; } }
      return { c, l: nah };
    });

    pfad.style.strokeDasharray = laenge;
    zeichnen();
  }

  function sichtbareLaenge() {
    if (ruhig) return laenge;
    const ziel = scrollY + innerHeight * 0.72;
    let l = knaeuelLaenge;
    for (const [len, , y] of tabelle) { if (len < knaeuelLaenge) continue; if (y > ziel) break; l = len; }
    return l;
  }

  function zeichnen() {
    const l = introFertig ? sichtbareLaenge() : Math.min(introL, knaeuelLaenge);
    pfad.style.strokeDashoffset = Math.max(0, laenge - l);
    knoten.forEach((k) => k.c.classList.toggle('an', l >= k.l - 2));
  }

  function intro() {
    const start = performance.now(), dauer = 2200;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    (function tick(now) {
      if (introFertig) return;
      const t = Math.min(1, (now - start) / dauer);
      introL = ease(t) * knaeuelLaenge;
      zeichnen();
      if (t < 1) requestAnimationFrame(tick); else { introFertig = true; zeichnen(); }
    })(start);
  }

  let rafPending = false;
  addEventListener('scroll', () => {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => { rafPending = false; introFertig = true; zeichnen(); });
  }, { passive: true });

  // Neu berechnen, wenn sich das Layout ändert (Breite, Schrift, Bilder)
  let to, letzteBreite = 0, letzteHoehe = 0;
  const neu = () => { clearTimeout(to); to = setTimeout(bauen, 150); };
  new ResizeObserver(() => {
    const b = document.documentElement.clientWidth, h = document.documentElement.scrollHeight;
    if (b !== letzteBreite || Math.abs(h - letzteHoehe) > 2) { letzteBreite = b; letzteHoehe = h; neu(); }
  }).observe(document.body);

  const start = () => { bauen(); if (!ruhig) intro(); };
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(start);
})();
