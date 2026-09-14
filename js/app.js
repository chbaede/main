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
  themeIcon: document.getElementById('theme-icon'),
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

// Initialize Theme
function applyTheme(theme) {
  state.theme = theme;
  if (theme === 'dark') {
    elements.html.classList.add('dark');
    elements.html.classList.remove('light');
    elements.themeIcon.setAttribute('data-lucide', 'sun');
    elements.themeLabel.textContent = TRANSLATIONS[state.lang].themeDay;
  } else {
    elements.html.classList.remove('dark');
    elements.html.classList.add('light');
    elements.themeIcon.setAttribute('data-lucide', 'moon');
    elements.themeLabel.textContent = TRANSLATIONS[state.lang].themeNight;
  }
  localStorage.setItem('yocto_theme', theme);
  refreshIcons();
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
        iconHtml = `<i data-lucide="github" class="w-2.5 h-2.5 flex-shrink-0"></i>`;
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

