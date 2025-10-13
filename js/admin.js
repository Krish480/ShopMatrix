// Auto highlight active page link in navbar
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop(); 
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("bg-indigo-100", "text-indigo-600", "dark:bg-gray-700", "dark:text-indigo-300");
    } else {
      link.classList.remove("bg-indigo-100", "text-indigo-600", "dark:bg-gray-700", "dark:text-indigo-300");
    }
  });
});
