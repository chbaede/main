/**
 * Main Application Logic
 * Theme Switcher, Bilingual Toggle (Default: EN), Search & Filter
 */

// Application State
const state = {
  lang: localStorage.getItem('yocto_lang') || 'en',
  theme: localStorage.getItem('yocto_theme') || 
         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  category: 'all',
  searchQuery: ''
};

// DOM Element References
const elements = {
  html: document.documentElement,
  themeToggleBtn: document.getElementById('theme-toggle'),
  themeIconSlot: document.getElementById('theme-icon-slot'),
  themeLabel: document.getElementById('theme-label'),
  langToggleBtn: document.getElementById('lang-toggle'),
  langLabel: document.getElementById('lang-label'),
  searchInput: document.getElementById('search-input'),
  clearSearchBtn: document.getElementById('clear-search'),
  categoryPills: document.getElementById('category-pills'),
  servicesGrid: document.getElementById('services-grid'),
  servicesCount: document.getElementById('services-count'),
  noResults: document.getElementById('no-results'),
  resetFiltersBtn: document.getElementById('reset-filters-btn'),
  heroBadge: document.getElementById('hero-badge'),
  heroTitle: document.getElementById('hero-title'),
  heroSubtitle: document.getElementById('hero-subtitle'),
  footerText: document.getElementById('footer-text'),
  linkedinLink: document.getElementById('linkedin-link')
};

// Theme Icons (Inline SVGs prevent layout shift / jitter on toggle)
const THEME_ICONS = {
  sun: '<svg class="w-4 h-4 text-amber-500 dark:text-amber-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
  moon: '<svg class="w-4 h-4 text-slate-700 dark:text-slate-200 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>'
};

// Initialize Theme
function applyTheme(theme) {
  state.theme = theme;
  if (theme === 'dark') {
    elements.html.classList.add('dark');
    elements.html.classList.remove('light');
    if (elements.themeIconSlot) elements.themeIconSlot.innerHTML = THEME_ICONS.sun;
    elements.themeLabel.textContent = TRANSLATIONS[state.lang].themeDay;
  } else {
    elements.html.classList.remove('dark');
    elements.html.classList.add('light');
    if (elements.themeIconSlot) elements.themeIconSlot.innerHTML = THEME_ICONS.moon;
    elements.themeLabel.textContent = TRANSLATIONS[state.lang].themeNight;
  }
  localStorage.setItem('yocto_theme', theme);
}

// Toggle Theme
function toggleTheme() {
  const newTheme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

// Apply Language
function applyLanguage(lang) {
  state.lang = lang;
  localStorage.setItem('yocto_lang', lang);
  elements.langLabel.textContent = lang.toUpperCase();

  const t = TRANSLATIONS[lang];
  
  // Update Static Texts
  document.title = `${t.siteTitle} — main.yocto.co.kr`;
  elements.heroBadge.textContent = t.badge;
  elements.heroTitle.textContent = t.heroTitle;
  elements.heroSubtitle.textContent = t.heroSubtitle;
  elements.searchInput.placeholder = t.searchPlaceholder;
  elements.footerText.textContent = t.footerText;
  elements.resetFiltersBtn.textContent = t.resetFilters;
  elements.themeLabel.textContent = state.theme === 'dark' ? t.themeDay : t.themeNight;
  
  // LinkedIn Tooltip / Aria
  if (elements.linkedinLink) {
    elements.linkedinLink.setAttribute('title', t.linkedinTooltip);
    elements.linkedinLink.setAttribute('aria-label', t.linkedinTooltip);
  }

  // Re-render categories & services
  renderCategories();
  renderServices();
}

// Toggle Language (EN <-> KO)
function toggleLanguage() {
  const newLang = state.lang === 'en' ? 'ko' : 'en';
  applyLanguage(newLang);
}

// Render Category Filter Pills
function renderCategories() {
  elements.categoryPills.innerHTML = '';

  CATEGORIES.forEach(cat => {
    const isActive = state.category === cat.id;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
      isActive
        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 dark:bg-indigo-500'
        : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent dark:border-slate-700/50'
    }`;
    btn.textContent = cat.name[state.lang];
    btn.addEventListener('click', () => {
      state.category = cat.id;
      renderCategories();
      renderServices();
    });
    elements.categoryPills.appendChild(btn);
  });
}

// Filter and Render Services
function renderServices() {
  const lang = state.lang;
  const t = TRANSLATIONS[lang];
  const query = state.searchQuery.trim().toLowerCase();

  const filtered = SITES_DATA.filter(site => {
    // Category match
    const categoryMatch = state.category === 'all' || 
      (Array.isArray(site.category) ? site.category.includes(state.category) : site.category === state.category);

    // Search query match
    if (!categoryMatch) return false;
    if (!query) return true;

    const titleEn = site.title.en.toLowerCase();
    const titleKo = site.title.ko.toLowerCase();
    const descEn = site.description.en.toLowerCase();
    const descKo = site.description.ko.toLowerCase();
    const url = site.url.toLowerCase();
    const tagsEn = site.tags.en.map(tag => tag.toLowerCase());
    const tagsKo = site.tags.ko.map(tag => tag.toLowerCase());
    const platformsEn = (site.platforms || []).map(p => p.name.en.toLowerCase());
    const platformsKo = (site.platforms || []).map(p => p.name.ko.toLowerCase());

    return (
      titleEn.includes(query) ||
      titleKo.includes(query) ||
      descEn.includes(query) ||
      descKo.includes(query) ||
      url.includes(query) ||
      tagsEn.some(tag => tag.includes(query)) ||
      tagsKo.some(tag => tag.includes(query)) ||
      platformsEn.some(p => p.includes(query)) ||
      platformsKo.some(p => p.includes(query))
    );
  });

  // Update counter
  const plural = filtered.length === 1 ? '' : 's';
  elements.servicesCount.textContent = t.servicesCount
    .replace('{count}', filtered.length)
    .replace('{plural}', plural);

  // Clear previous cards
  elements.servicesGrid.innerHTML = '';

  if (filtered.length === 0) {
    elements.noResults.classList.remove('hidden');
    elements.servicesGrid.classList.add('hidden');
    return;
  }

  elements.noResults.classList.add('hidden');
  elements.servicesGrid.classList.remove('hidden');

  filtered.forEach(site => {
    const card = document.createElement('article');
    card.className = 'service-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group';

    const tagsHtml = site.tags[lang]
      .map(tag => `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/50">${tag}</span>`)
      .join('');

    const platformsHtml = (site.platforms || []).map(p => {
      let iconHtml = '';
      let badgeColor = '';
      if (p.id === 'tistory') {
        iconHtml = `<svg class="w-2.5 h-2.5 fill-[#EB5323] flex-shrink-0" viewBox="0 0 24 24"><circle cx="12" cy="5" r="4"/><circle cx="5" cy="18" r="3.5"/><circle cx="19" cy="18" r="3.5"/></svg>`;
        badgeColor = 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 border-orange-200/80 dark:border-orange-800/60';
      } else if (p.id === 'github') {
        iconHtml = `<svg class="w-2.5 h-2.5 fill-current flex-shrink-0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`;
        badgeColor = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/60';
      } else if (p.id === 'selfhost') {
        iconHtml = `<i data-lucide="server" class="w-2.5 h-2.5 flex-shrink-0 text-blue-500 dark:text-blue-400"></i>`;
        badgeColor = 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/60';
      }
      return `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border ${badgeColor}" title="${p.name[lang]}">${iconHtml}<span>${p.name[lang]}</span></span>`;
    }).join('');

    card.innerHTML = `
      <!-- Top glowing gradient line -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${site.accentColor} opacity-70 group-hover:opacity-100 transition-opacity"></div>
      
      <div>
        <div class="flex items-start justify-between gap-3 mb-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${site.accentColor} p-0.5 shadow-sm flex-shrink-0">
            <div class="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center text-slate-800 dark:text-slate-100">
              <i data-lucide="${site.icon}" class="w-6 h-6"></i>
            </div>
          </div>
          
          <div class="flex flex-col items-end gap-1.5 flex-shrink-0">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 status-dot"></span>
              ${site.status[lang]}
            </span>
            <div class="flex flex-wrap items-center justify-end gap-1">
              ${platformsHtml}
            </div>
          </div>
        </div>

        <div class="mb-2">
          <h2 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-2">
            ${site.title[lang]}
          </h2>
          <p class="text-xs font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">
            ${site.tagline[lang]}
          </p>
        </div>

        <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
          ${site.description[lang]}
        </p>
      </div>

      <div>
        <div class="flex flex-wrap gap-1.5 mb-6">
          ${tagsHtml}
        </div>

        <a 
          href="${site.url}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 hover:bg-indigo-600 dark:hover:bg-indigo-600 text-slate-700 dark:text-slate-200 hover:text-white dark:hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 border border-slate-200 dark:border-slate-700/60 hover:border-transparent group/link cursor-pointer"
        >
          <span class="truncate font-mono text-[11px] opacity-80 group-hover/link:opacity-100">${site.url.replace(/^https?:\/\//, '')}</span>
          <span class="flex items-center gap-1 pl-2">
            <span>${t.visitSite}</span>
            <i data-lucide="arrow-up-right" class="w-4 h-4 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"></i>
          </span>
        </a>
      </div>
    `;

    elements.servicesGrid.appendChild(card);
  });

  refreshIcons();
}

// Refresh Lucide Icons safely
function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Event Listeners
function setupEventListeners() {
  // Theme Toggle
  elements.themeToggleBtn.addEventListener('click', toggleTheme);

  // Language Toggle
  elements.langToggleBtn.addEventListener('click', toggleLanguage);

  // Search Input
  elements.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    if (state.searchQuery.length > 0) {
      elements.clearSearchBtn.classList.remove('hidden');
    } else {
      elements.clearSearchBtn.classList.add('hidden');
    }
    renderServices();
  });

  // Clear Search
  elements.clearSearchBtn.addEventListener('click', () => {
    state.searchQuery = '';
    elements.searchInput.value = '';
    elements.clearSearchBtn.classList.add('hidden');
    elements.searchInput.focus();
    renderServices();
  });

  // Reset Filters Button
  elements.resetFiltersBtn.addEventListener('click', () => {
    state.searchQuery = '';
    state.category = 'all';
    elements.searchInput.value = '';
    elements.clearSearchBtn.classList.add('hidden');
    renderCategories();
    renderServices();
  });

  // Listen to OS theme changes if user hasn't explicitly set preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('yocto_theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

// Initialize Application
function init() {
  applyTheme(state.theme);
  applyLanguage(state.lang);
  setupEventListeners();
  refreshIcons();
}

// Launch on DOM ready
document.addEventListener('DOMContentLoaded', init);

