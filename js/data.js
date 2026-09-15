/**
 * Centralized Site Catalog
 * 
 * To add a new site, simply copy an existing entry and add it to the sites array below.
 * Each site supports bilingual titles, descriptions, and tags.
 */
const SITES_DATA = [
  {
    id: "blog",
    category: ["automotive", "lifestyle"],
    featured: true,
    url: "https://www.yocto.co.kr",
    icon: "book-open",
    accentColor: "from-violet-500 to-fuchsia-500",
    platforms: [
      { id: "tistory", name: { en: "Tistory", ko: "티스토리" } }
    ],
    title: {
      en: "Yocto Blog",
      ko: "Yocto 블로그"
    },
    tagline: {
      en: "Automotive SW & Life in Germany",
      ko: "차량용 SW 엔지니어링 & 독일 생활기"
    },
    description: {
      en: "Personal engineering and tech journal focusing on automotive software architecture, embedded systems, and real-life working and living experiences in Germany.",
      ko: "차량용 소프트웨어 기술과 아키텍처, 임베디드 엔지니어링, 그리고 현지 독일 생활 및 생생한 현업 이야기를 기록하는 기술 블로그입니다."
    },
    tags: {
      en: ["Automotive SW", "Germany", "Engineering", "Blog"],
      ko: ["자동차SW", "독일생활", "엔지니어링", "블로그"]
    },
    status: {
      en: "Live",
      ko: "운영 중"
    }
  },
  {
    id: "autohub",
    category: "automotive",
    featured: true,
    url: "https://autohub.yocto.co.kr",
    icon: "car",
    accentColor: "from-blue-500 to-cyan-500",
    platforms: [
      { id: "selfhost", name: { en: "Self-Hosted", ko: "자체 호스팅" } }
    ],
    title: {
      en: "AutoHub",
      ko: "오토허브 (AutoHub)"
    },
    tagline: {
      en: "Automotive Software Ecosystem",
      ko: "차량용 소프트웨어 기술 포털"
    },
    description: {
      en: "Connecting automotive software technologies, architectures, industry leaders, dev tools, and open-source projects into one comprehensive ecosystem.",
      ko: "차량용 소프트웨어 기술, 아키텍처, 기업, 개발 도구 및 오픈소스 프로젝트를 하나로 연결하는 모빌리티 테크 허브입니다."
    },
    tags: {
      en: ["SDV", "Automotive", "Architecture", "Open Source"],
      ko: ["SDV", "차량용SW", "아키텍처", "오픈소스"]
    },
    status: {
      en: "Live",
      ko: "서비스 중"
    }
  },
  {
    id: "news",
    category: "automotive",
    featured: true,
    url: "https://news.yocto.co.kr",
    icon: "newspaper",
    accentColor: "from-indigo-500 to-purple-500",
    platforms: [
      { id: "selfhost", name: { en: "Self-Hosted", ko: "자체 호스팅" } }
    ],
    title: {
      en: "Automotive Newsletter",
      ko: "오토모티브 뉴스레터"
    },
    tagline: {
      en: "Mobility & Tech Insights",
      ko: "모빌리티 및 테크 인사이트"
    },
    description: {
      en: "A curated newsletter delivering timely technological breakdowns, industry analysis, and SDV transformation trends across the global automotive sector.",
      ko: "미래 모빌리티, 소프트웨어 정의 차량(SDV), 최신 자동차 기술 트렌드 및 글로벌 산업 인사이트를 깊이 있게 다루는 정기 뉴스레터입니다."
    },
    tags: {
      en: ["Newsletter", "Insights", "Industry Trends", "Analysis"],
      ko: ["뉴스레터", "트렌드", "산업분석", "테크인사이트"]
    },
    status: {
      en: "Live",
      ko: "서비스 중"
    }
  },
  {
    id: "devtools",
    category: "tools",
    featured: false,
    url: "https://devtools.yocto.co.kr/",
    icon: "terminal",
    accentColor: "from-rose-500 to-pink-500",
    platforms: [
      { id: "github", name: { en: "GitHub Pages", ko: "GitHub Pages" } }
    ],
    title: {
      en: "DevTools",
      ko: "개발자 도구 모음"
    },
    tagline: {
      en: "Essential Developer Utilities",
      ko: "엔지니어링 필수 웹 도구"
    },
    description: {
      en: "A robust suite of quick web-based developer tools including code formatters, encoders/decoders, string utilities, and time converters built for speed.",
      ko: "포맷터, 인코더/디코더, 텍스트 변환기, 타임스탬프 변환 등 엔지니어의 일상 개발 효율을 극대화하는 맞춤형 웹 도구 모음입니다."
    },
    tags: {
      en: ["Engineering", "Formatters", "Converters", "DevTools"],
      ko: ["개발도구", "변환기", "포맷터", "엔지니어링"]
    },
    status: {
      en: "Live",
      ko: "서비스 중"
    }
  },
  {
    id: "life",
    category: "tools",
    featured: false,
    url: "https://life.yocto.co.kr/",
    icon: "sparkles",
    accentColor: "from-emerald-500 to-teal-500",
    platforms: [
      { id: "github", name: { en: "GitHub Pages", ko: "GitHub Pages" } }
    ],
    title: {
      en: "Life Toolkit",
      ko: "라이프 툴킷"
    },
    tagline: {
      en: "Everyday Utility & Life Helpers",
      ko: "생활에 유용한 실용 도구 모음"
    },
    description: {
      en: "A handy collection of everyday web utilities, calculators, and productivity boosters designed to simplify daily routines and lifestyle management.",
      ko: "일상생활의 편의성과 생산성을 높여주는 직관적인 웹 유틸리티, 계산기 및 라이프스타일 지원 도구 모음입니다."
    },
    tags: {
      en: ["Daily Life", "Utilities", "Calculators", "Productivity"],
      ko: ["생활도구", "유틸리티", "계산기", "생산성"]
    },
    status: {
      en: "Live",
      ko: "서비스 중"
    }
  },
  {
    id: "gmarket",
    category: "lifestyle",
    featured: false,
    url: "https://gmarket.yocto.co.kr",
    icon: "shopping-bag",
    accentColor: "from-amber-500 to-orange-500",
    platforms: [
      { id: "selfhost", name: { en: "Self-Hosted", ko: "자체 호스팅" } }
    ],
    title: {
      en: "German Market Deals",
      ko: "독일 마트 할인정보"
    },
    tagline: {
      en: "Supermarket Flyer & Sale Aggregator",
      ko: "독일 슈퍼마켓 주간 세일 모아보기"
    },
    description: {
      en: "Smart price tracking and weekly promotional flyer comparisons across major German supermarket chains to help you shop smarter and save money.",
      ko: "독일 주요 슈퍼마켓의 주간 할인 전단지와 특가 상품 정보를 한눈에 비교하고 실속 있게 장을 볼 수 있도록 도와주는 스마트 쇼핑 가이드입니다."
    },
    tags: {
      en: ["Germany", "Discounts", "Supermarket", "Shopping"],
      ko: ["독일생활", "마트할인", "전단지", "세일정보"]
    },
    status: {
      en: "Live",
      ko: "서비스 중"
    }
  }
];

const CATEGORIES = [
  { id: "all", name: { en: "All Services", ko: "전체 서비스" } },
  { id: "automotive", name: { en: "Automotive & Mobility", ko: "자동차 & 모빌리티" } },
  { id: "tools", name: { en: "Developer & Utilities", ko: "도구 & 유틸리티" } },
  { id: "lifestyle", name: { en: "Life & Living", ko: "생활 & 라이프" } }
];

const TRANSLATIONS = {
  en: {
    siteTitle: "Yocto Portal",
    badge: "Service Directory",
    heroTitle: "Connected Web Ecosystem",
    heroSubtitle: "A curated directory of specialized web platforms, automotive software insights, developer utilities, and daily productivity tools.",
    searchPlaceholder: "Search services by name, keyword, or tag...",
    servicesCount: "Showing {count} service{plural}",
    noResults: "No services found matching your criteria.",
    resetFilters: "Clear Filters",
    visitSite: "Launch Service",
    linkedinTooltip: "Connect on LinkedIn",
    themeDay: "Light Mode",
    themeNight: "Dark Mode",
    allCategories: "All Services",
    footerText: "Exploring ideas, software engineering, and digital tools.",
    viewSource: "GitHub",
    statusLive: "Active"
  },
  ko: {
    siteTitle: "Yocto 포털",
    badge: "서비스 디렉토리",
    heroTitle: "연결된 웹 생태계",
    heroSubtitle: "차량용 소프트웨어 기술 허브부터 개발자 유틸리티, 일상 생활 도구까지 직접 운영하는 웹 서비스 모음입니다.",
    searchPlaceholder: "서비스 이름, 키워드, 태그로 검색...",
    servicesCount: "{count}개의 서비스",
    noResults: "검색 결과와 일치하는 서비스가 없습니다.",
    resetFilters: "필터 초기화",
    visitSite: "바로가기",
    linkedinTooltip: "LinkedIn에서 연결하기",
    themeDay: "라이트 모드",
    themeNight: "다크 모드",
    allCategories: "전체 서비스",
    footerText: "기술, 소프트웨어 엔지니어링, 실용적인 웹 도구를 탐구합니다.",
    viewSource: "GitHub",
    statusLive: "운영중"
  }
};

