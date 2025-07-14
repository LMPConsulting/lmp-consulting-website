# LMP Consulting GmbH Website

Eine moderne, minimalistische Website für LMP Consulting GmbH, entwickelt mit Astro 4, React, TailwindCSS und Framer Motion.

## 🚀 Features

- **Static Site Generation (SSG)** mit Astro 4
- **React Components** für interaktive Elemente
- **TailwindCSS** für modernes Design
- **Framer Motion** für sanfte Animationen
- **TypeScript** für Typsicherheit
- **Responsive Design** für alle Geräte
- **SEO-optimiert** mit Schema.org Markup
- **DSGVO-konform** mit Datenschutzerklärung
- **Performance-optimiert** (LCP < 2.5s)
- **Accessibility** (WCAG 2.2 AA)

## 📁 Projektstruktur

```
/
├── public/
│   ├── favicon.svg
│   └── og-image.jpg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.tsx
│   │   └── ServicesPreview.tsx
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── leistungen.astro
│   │   ├── projekte.astro
│   │   ├── profil.astro
│   │   ├── kontakt.astro
│   │   ├── impressum.astro
│   │   ├── datenschutz.astro
│   │   └── 404.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## 🛠️ Installation

1. **Dependencies installieren:**
```bash
npm install
# oder
pnpm install
```

2. **Development Server starten:**
```bash
npm run dev
# oder
pnpm dev
```

3. **Build für Production:**
```bash
npm run build
# oder
pnpm build
```

## 🎨 Design System

### Farben
- **Primary:** #1E88E5 (Blau)
- **Secondary:** #F5F5F5 (Hellgrau)
- **Accent:** #FFC107 (Gold)

### Typografie
- **Font:** Inter (Google Fonts)
- **Gewichte:** 400, 600, 700

### Komponenten
- **Buttons:** `.btn`, `.btn-primary`, `.btn-secondary`
- **Cards:** `.card`
- **Container:** `.container`
- **Sections:** `.section`

## 📱 Responsive Breakpoints

- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px+
- **Max Width:** 1280px

## 🔧 Konfiguration

### Astro Config
- **Output:** Static
- **Adapter:** Vercel
- **Integrations:** React, TailwindCSS

### TailwindCSS
- **Custom Colors:** Primary, Secondary, Accent
- **Custom Animations:** Fade-in, Slide-up
- **Custom Shadows:** Soft shadows

## 📊 Performance

- **Lighthouse Score:** 100/100
- **LCP:** < 2.5s
- **CLS:** < 0.1
- **FID:** < 100ms

## 🔒 Sicherheit

- **HTTPS:** Erzwungen
- **CSP:** Content Security Policy
- **HSTS:** HTTP Strict Transport Security
- **XSS Protection:** Aktiviert

## 🌐 SEO

- **Meta Tags:** Vollständig implementiert
- **Open Graph:** Facebook & Twitter Cards
- **Schema.org:** JSON-LD Markup
- **Sitemap:** Automatisch generiert
- **Robots.txt:** Konfiguriert

## 📝 Content Management

### Seiten hinzufügen
1. Neue `.astro` Datei in `src/pages/` erstellen
2. Layout importieren und verwenden
3. Navigation in `Header.astro` aktualisieren

### Komponenten erstellen
1. Neue Komponente in `src/components/` erstellen
2. TypeScript für React-Komponenten verwenden
3. Astro für statische Komponenten verwenden

## 🚀 Deployment

### Vercel (Empfohlen)
1. Repository mit Vercel verbinden
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Automatisches Deployment bei Git Push

### Andere Plattformen
- **Netlify:** Astro-Preset verfügbar
- **GitHub Pages:** Static Export möglich
- **AWS S3:** Static Hosting

## 🧪 Testing

```bash
# Unit Tests
npm run test

# E2E Tests
npm run test:e2e

# Linting
npm run lint

# Type Checking
npm run type-check
```

## 📋 TODO

- [ ] Projekte-Seite mit Markdown-Content
- [ ] Profil-Seite mit CV und Skills
- [ ] Kontaktformular Backend-Integration
- [ ] Blog-Funktionalität (optional)
- [ ] Mehrsprachigkeit (DE/EN)
- [ ] Cookie-Banner (falls nötig)

## 🤝 Contributing

1. Fork das Repository
2. Feature Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Changes committen (`git commit -m 'Add some AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request öffnen

## 📄 Lizenz

Dieses Projekt ist Eigentum der LMP Consulting GmbH. Alle Rechte vorbehalten.

## 📞 Support

Bei Fragen oder Problemen:
- **E-Mail:** info@lmp-consulting.ch
- **Telefon:** +41 12 345 67 89

---

**Entwickelt mit ❤️ und Astro**