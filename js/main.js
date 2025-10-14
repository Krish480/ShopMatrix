document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop(); // e.g. 'MerchantPanel.html'

  // Detect if page is part of Merchant Hub or normal site
  const isMerchantPage = currentPage.toLowerCase().includes("merchant");

  // Select links accordingly
  const navLinks = isMerchantPage
    ? document.querySelectorAll("nav a, #merchant-mobile-menu a")  // Merchant Hub nav
    : document.querySelectorAll("header nav a");                   // Normal header nav

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href").split("/").pop();

    if (linkPage === currentPage) {
      // Highlight active link
      link.classList.add(
        "text-indigo-500",
        "font-semibold",
        "border-b-2",
        "border-indigo-500",
        "pb-1",
        "bg-indigo-100/50",
        "dark:bg-gray-700",
        "shadow-md"
      );
      link.classList.remove("text-gray-800", "dark:text-gray-200");
    } else {
      // Reset inactive link
      link.classList.remove(
        "text-indigo-500",
        "font-semibold",
        "border-b-2",
        "border-indigo-500",
        "pb-1",
        "bg-indigo-100/50",
        "dark:bg-gray-700",
        "shadow-md"
      );
      link.classList.add("text-gray-800", "dark:text-gray-200");
    }
  });
});

    const html = document.documentElement;
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mobileSearchBtn = document.getElementById('mobile-search-btn');
    const mobileSearch = document.getElementById('mobile-search');

    // Load saved theme
    if (localStorage.theme === 'dark') {
      html.classList.add('dark');
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      if (html.classList.contains('dark')) {
        localStorage.theme = 'dark';
        themeIcon.classList.replace('fa-moon', 'fa-sun');
      } else {
        localStorage.theme = 'light';
        themeIcon.classList.replace('fa-sun', 'fa-moon');
      }
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      if (!mobileMenu.classList.contains('hidden')) {
        menuIcon.classList.replace('fa-bars', 'fa-xmark');
        mobileSearch.classList.add('hidden');
      } else {
        menuIcon.classList.replace('fa-xmark', 'fa-bars');
      }
    });

    // Mobile search toggle
    mobileSearchBtn.addEventListener('click', () => {
      mobileSearch.classList.toggle('hidden');
      if (!mobileSearch.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.replace('fa-xmark', 'fa-bars');
      }
    });
 
  
     