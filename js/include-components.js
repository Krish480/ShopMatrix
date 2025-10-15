// js/include-components.js

// Load HTML file into selector
async function loadComponent(url, selector) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load ' + url);
    const html = await res.text();
    const container = document.querySelector(selector);
    if (container) container.innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

// compute prefix based on current location depth
function computePrefix() {
  // pathParts e.g. ["", "admin", "admin.html"] => depth=1 (one folder)
  const parts = window.location.pathname.split('/').filter(Boolean);
  // if file at root (parts length 1 and is file), depth 0
  // depth = number of folder levels (exclude last item if it has a dot => file)
  let depth = 0;
  if (parts.length > 0) {
    const last = parts[parts.length - 1];
    if (last.includes('.')) depth = parts.length - 1;
    else depth = parts.length;
  }
  return depth === 0 ? '' : '../'.repeat(depth);
}

// Normalize path: remove query/hash and index.html/trailing slash
function normalizePath(path) {
  if (!path) return '/';
  try { path = decodeURI(path.split('?')[0].split('#')[0]); } catch {}
  path = path.replace(/index\.html$/i, '');
  path = path.replace(/\/$/, '');
  if (path === '' || path === '.') return '/';
  return path.toLowerCase();
}

// Highlight top nav links robustly
function highlightTopNav() {
  const links = document.querySelectorAll('.main-nav .nav-link, header nav a');
  const current = normalizePath(window.location.pathname);

  links.forEach(link => {
    try {
      const href = link.getAttribute('href') || '';
      const linkPath = normalizePath(new URL(href, window.location.origin).pathname);
      // match exact or folder/endsWith
      const isActive = linkPath === current || current.endsWith(linkPath) || current.includes(linkPath);
      if (isActive) link.classList.add('active-nav');
      else link.classList.remove('active-nav');
    } catch (e) {}
  });
}

// Highlight sub-nav (use .sub-nav on admin pages)
function highlightSubNav() {
  const links = document.querySelectorAll('.sub-nav a');
  if (!links.length) return;
  const current = normalizePath(window.location.pathname);
  links.forEach(link => {
    try {
      const href = link.getAttribute('href') || '';
      const linkPath = normalizePath(new URL(href, window.location.origin).pathname);
      const isActive = linkPath === current || current.endsWith(linkPath) || current.includes(linkPath);
      if (isActive) link.classList.add('active-subnav');
      else link.classList.remove('active-subnav');
    } catch (e) {}
  });
}

// Mobile menu + search + icon toggle
function setupMobileToggle() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileSearchBtn = document.getElementById('mobile-search-btn');
  const mobileSearch = document.getElementById('mobile-search');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      if (!mobileMenu.classList.contains('hidden')) {
        if (menuIcon) menuIcon.classList.replace('fa-bars', 'fa-xmark');
        if (mobileSearch) mobileSearch.classList.add('hidden');
      } else {
        if (menuIcon) menuIcon.classList.replace('fa-xmark', 'fa-bars');
      }
    });
  }

  if (mobileSearchBtn && mobileSearch) {
    mobileSearchBtn.addEventListener('click', () => {
      mobileSearch.classList.toggle('hidden');
      if (!mobileSearch.classList.contains('hidden') && mobileMenu) {
        mobileMenu.classList.add('hidden');
        if (menuIcon) menuIcon.classList.replace('fa-xmark', 'fa-bars');
      }
    });
  }
}

// Dark-mode toggle (safe)
function setupDarkModeToggle() {
  const html = document.documentElement;
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const themeIcon = document.getElementById('theme-icon');
  if (!darkModeToggle) return;
  // load
  try { if (localStorage.theme === 'dark') { html.classList.add('dark'); if (themeIcon) themeIcon.classList.replace('fa-moon','fa-sun'); } } catch {}
  darkModeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    try {
      if (html.classList.contains('dark')) { localStorage.theme = 'dark'; if (themeIcon) themeIcon.classList.replace('fa-moon','fa-sun'); }
      else { localStorage.theme = 'light'; if (themeIcon) themeIcon.classList.replace('fa-sun','fa-moon'); }
    } catch {}
  });
}

// main loader
(async function init() {
  const prefix = computePrefix(); // auto prefix based on depth
  await loadComponent(prefix + 'components/header.html', '#header-placeholder');

  // small wait ensures injected DOM is parsed
  setTimeout(() => {
    highlightTopNav();
    highlightSubNav();
    setupMobileToggle();
    setupDarkModeToggle();
  }, 80);
})();
