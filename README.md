# yocto.co.kr Service Directory Portal

A modern, fast, zero-build directory portal for the **yocto.co.kr** network, published via GitHub Pages at [main.yocto.co.kr](https://main.yocto.co.kr).

## Features

- **Bilingual (EN / KO)**: English by default with instant toggle to Korean. All site descriptions, tags, categories, and UI elements support bilingual metadata.
- **Day / Night Mode**: Supports Light and Dark themes with system preference detection and manual toggle (persisted via `localStorage`).
- **Live Search & Category Filtering**: Instant search across titles, URLs, descriptions, and tags.
- **Privacy-First**: No personal identity or career history exposed. Links exclusively to LinkedIn and GitHub.
- **Extensible Architecture**: Add new sites effortlessly by editing a single JavaScript array in `js/data.js`.
- **Zero-Build & Fast**: Pure modern semantic HTML5 + Tailwind CDN + Lucide Icons. No compilation or node dependencies required.

---

## Registered Services

| Service | URL | Category | Platform |
| :--- | :--- | :--- | :--- |
| **Yocto Blog** | `https://www.yocto.co.kr` | Automotive SW & Life in Germany | Tistory |
| **AutoHub** | `https://autohub.yocto.co.kr` | Automotive Software Ecosystem | GitHub Pages |
| **Automotive Newsletter** | `https://news.yocto.co.kr` | Mobility & Tech Insights | Self-Hosted |
| **DevTools** | `https://devtools.yocto.co.kr/` | Essential Developer Utilities | GitHub Pages |
| **Life Toolkit** | `https://life.yocto.co.kr/` | Everyday Utility & Life Helpers | GitHub Pages |
| **German Life Toolkit** | `https://german.yocto.co.kr/` | Smart Tools for Life in Germany | GitHub Pages |
| **German Market Deals** | `https://gmarket.yocto.co.kr` | Supermarket Flyer & Sale Aggregator | Self-Hosted |

---

## How to Add a New Site

Open `js/data.js` and append an entry to the `SITES_DATA` array:

```javascript
{
  id: "my-service",
  category: "tools", // 'automotive' | 'tools' | 'lifestyle'
  featured: false,
  url: "https://myservice.yocto.co.kr",
  icon: "globe", // Any Lucide icon name
  accentColor: "from-blue-500 to-indigo-500",
  title: {
    en: "Service Name",
    ko: "서비스 이름"
  },
  tagline: {
    en: "Short English Tagline",
    ko: "짧은 한국어 슬로건"
  },
  description: {
    en: "Comprehensive English description of the service.",
    ko: "서비스에 대한 상세한 한국어 설명입니다."
  },
  tags: {
    en: ["Tag1", "Tag2"],
    ko: ["태그1", "태그2"]
  },
  status: {
    en: "Live",
    ko: "서비스 중"
  }
}
```

---

## Deployment to GitHub Pages

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy portal site"
   git push -u origin main
   ```

2. **GitHub Pages Settings**:
   - Go to repository **Settings** -> **Pages**.
   - **Source**: `Deploy from a branch`.
   - **Branch**: `main`, folder: `/ (root)`.
   - **Custom domain**: `main.yocto.co.kr` (automatically detected from `CNAME`).
   - Check **Enforce HTTPS**.

3. **DNS Configuration (for main.yocto.co.kr)**:
   - Add a `CNAME` record in your DNS provider:
     - **Host / Name**: `main`
     - **Target / Value**: `chbaede.github.io`

