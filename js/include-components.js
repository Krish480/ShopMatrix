// js/include-components.js

// Load HTML file into selector
async function loadComponent(url, selector) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load ' + url);
    const html = await res.text();
    const container = document.querySelector(selector);
    if (container) container.innerHTML = html;
    return container;
  } catch (err) {
    console.error(err);
  }
}

// Compute prefix based on current location depth
function computePrefix() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  let depth = 0;
  if (parts.length > 0) {
    const last = parts[parts.length - 1];
    depth = last.includes('.') ? parts.length - 1 : parts.length;
  }
  return depth === 0 ? '' : '../'.repeat(depth);
}

// Normalize path for comparison
function normalizePath(path) {
  if (!path) return '/';
  try { path = decodeURI(path.split('?')[0].split('#')[0]); } catch {}
  path = path.replace(/index\.html$/i, '').replace(/\/$/, '');
  if (path === '' || path === '.') return '/';
  return path.toLowerCase();
}

// Check if link is active
function isLinkActive(linkPath, currentPath) {
  if (linkPath === '/') return currentPath === '/';
  return (
    currentPath === linkPath ||
    currentPath.startsWith(linkPath + '/') ||
    (currentPath.includes('/admin') && linkPath.includes('/admin')) ||
    (currentPath.includes('/merchant') && linkPath.includes('/merchant'))
  );
}


// Highlight top nav links (desktop + mobile)
function highlightNav() {
  const current = normalizePath(window.location.pathname);

  // Desktop nav
  document.querySelectorAll('.main-nav .nav-link').forEach(link => {
    const href = normalizePath(link.getAttribute('href'));
    if (isLinkActive(href, current)) link.classList.add('active-nav');
    else link.classList.remove('active-nav');
  });

  // Mobile nav
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    const href = normalizePath(link.getAttribute('href'));
    if (isLinkActive(href, current)) link.classList.add('active-nav-mobile');
    else link.classList.remove('active-nav-mobile');
  });
}

// Highlight sub-nav (admin or merchant pages)
function highlightSubNav() {
  const links = document.querySelectorAll('.sub-nav a');
  if (!links.length) return;
  const current = normalizePath(window.location.pathname);
  links.forEach(link => {
    const href = normalizePath(link.getAttribute('href'));
    if (isLinkActive(href, current)) link.classList.add('active-subnav');
    else link.classList.remove('active-subnav');
  });
}

// Mobile menu + search toggle
function setupMobileToggle() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const menuIcon = mobileMenuBtn?.querySelector('i');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileSearchBtn = document.getElementById('mobile-search-btn');
  const mobileSearch = document.getElementById('mobile-search');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      if (!mobileMenu.classList.contains('hidden')) {
        menuIcon?.classList.replace('fa-bars', 'fa-xmark');
        mobileSearch?.classList.add('hidden');
      } else {
        menuIcon?.classList.replace('fa-xmark', 'fa-bars');
      }
    });
  }

  if (mobileSearchBtn && mobileSearch) {
    mobileSearchBtn.addEventListener('click', () => {
      mobileSearch.classList.toggle('hidden');
      if (!mobileSearch.classList.contains('hidden') && mobileMenu) {
        mobileMenu.classList.add('hidden');
        menuIcon?.classList.replace('fa-xmark', 'fa-bars');
      }
    });
  }
}

// Dark-mode toggle
function setupDarkModeToggle() {
  const html = document.documentElement;
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const themeIcon = document.getElementById('theme-icon');
  if (!darkModeToggle) return;

  try {
    if (localStorage.theme === 'dark') {
      html.classList.add('dark');
      themeIcon?.classList.replace('fa-moon', 'fa-sun');
    }
  } catch {}

  darkModeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    try {
      if (html.classList.contains('dark')) {
        localStorage.theme = 'dark';
        themeIcon?.classList.replace('fa-moon', 'fa-sun');
      } else {
        localStorage.theme = 'light';
        themeIcon?.classList.replace('fa-sun', 'fa-moon');
      }
    } catch {}
  });
}

// Admin & Merchant auth redirect (Firebase)
function setupAuthRedirect() {
  if (typeof auth === 'undefined' || typeof db === 'undefined') {
    console.warn("Firebase auth or db not loaded yet!");
    return;
  }

  const adminLinks = document.querySelectorAll('a[href*="admin"]') || [];
  const merchantLinks = document.querySelectorAll('a[href*="merchant"]') || [];

  function handleClick(e, type) {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');

    auth.onAuthStateChanged(user => {
      if (user) {
        const collection = type === 'admin' ? 'admins' : 'merchants';
        db.collection(collection).doc(user.uid).get().then(doc => {
          if (doc.exists) {
            window.location.href = href; 
          } else {
            alert(`You are not authorized as ${type}.`);
            auth.signOut();
          }
        }).catch(err => console.error(err));
      } else {
        const loginPage = type === 'admin' ? '/admin/login.html' : '/merchant/login.html';
        window.location.href = loginPage;
      }
    });
  }

  adminLinks.forEach(link => link.addEventListener('click', (e) => handleClick(e, 'admin')));
  merchantLinks.forEach(link => link.addEventListener('click', (e) => handleClick(e, 'merchant')));
}

// Main initializer
(async function init() {
  const prefix = computePrefix();
  await loadComponent(prefix + 'components/header.html', '#header-placeholder');

  // Header load ho gaya → ab DOM safe hai
  highlightNav();       // ✅ desktop + mobile nav highlight
  highlightSubNav();
  setupMobileToggle();
  setupDarkModeToggle();
  setupAuthRedirect();
})();
