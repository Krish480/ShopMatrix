// // merchant.js
//   // Get current page URL path
//   const currentPath = window.location.pathname;

//   // Select all nav links
//   const navLinks = document.querySelectorAll('nav a, #merchant-mobile-menu a');

//   navLinks.forEach(link => {
//     // If link's href matches current path, mark it as active
//     if (link.getAttribute('href') === currentPath) {
//       link.classList.add('bg-indigo-500', 'text-white');
//       link.classList.remove('text-gray-800', 'dark:text-gray-200');
//     } else {
//       // Reset others
//       link.classList.remove('bg-indigo-500', 'text-white');
//       link.classList.add('text-gray-800', 'dark:text-gray-200');
//     }
//   });

