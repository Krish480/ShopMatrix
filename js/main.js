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
