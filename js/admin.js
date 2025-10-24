// Auto highlight active page link in navbar
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop(); 
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("active-nav","nav-active","true");
    } else {
      link.classList.remove("active-nav","nav-active");
    }
  });
});

// Admin panel hamburger toggle
        const adminMenuBtn = document.getElementById('admin-menu-btn');
        const adminMenuIcon = document.getElementById('admin-menu-icon');
        const adminMobileMenu = document.getElementById('admin-mobile-menu');

        adminMenuBtn.addEventListener('click', () => {
            adminMobileMenu.classList.toggle('hidden');
            if (!adminMobileMenu.classList.contains('hidden')) {
                adminMenuIcon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                adminMenuIcon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        

        //  Logout section 
  document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    auth.onAuthStateChanged(async (user) => {
    if (user) {
      const doc = await firebase.firestore().collection("users").doc(user.uid).get();
      if (!doc.exists || doc.data().role !== "admin") {
        // Not an admin → redirect login
        window.location.href = "login.html";
      }
    } else {
      // Not logged in → redirect login
      window.location.href = "login.html";
    }
  });

    // Logout functionality
    const logoutBtns = document.querySelectorAll("button, a");
    logoutBtns.forEach(btn => {
      if (btn.textContent.includes("Logout")) {
        btn.addEventListener("click", async () => {
          try {
            await auth.signOut();
            alert("You have been logged out successfully!");
            window.location.href = "login.html";
          } catch (error) {
            console.error("Logout Error:", error);
          }
        });
      }
    });
  });
