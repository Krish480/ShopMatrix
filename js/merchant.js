// merchant.js

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

// Merchant Hamburger Menu
const merchantMenuBtn = document.getElementById("merchant-mobile-menu-btn");
const merchantMenu = document.getElementById("merchant-mobile-menu");
const merchantMenuIcon = document.getElementById("menu-icon"); // <-- correct ID

if (merchantMenuBtn && merchantMenu && merchantMenuIcon) {
    merchantMenuBtn.addEventListener('click', () => {
        merchantMenu.classList.toggle('hidden');
        if (!merchantMenu.classList.contains('hidden')) {
            merchantMenuIcon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            merchantMenuIcon.classList.replace('fa-xmark', 'fa-bars');
        }
    });
}


// Chart.js Revenue Overview
const ctx = document.getElementById('revenueChart');
if (ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Revenue (₹)',
                data: [12000, 19000, 15000, 22000, 17000, 25000, 28000],
                backgroundColor: '#4f46e5',
                borderRadius: 8
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#94a3b8' },
                    grid: { color: '#e2e8f0' }
                },
                x: {
                    ticks: { color: '#94a3b8' },
                    grid: { display: false }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// 🔹 Logout & Current Time
document.addEventListener("DOMContentLoaded", () => {
    const merchantNameSpan = document.getElementById('merchantName');
    const dateTimeElement = document.getElementById("currentDateTime"); 
    const logoutBtn = document.getElementById('merchantLogoutBtn');

    // Update live date & time
    function updateDateTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        if (dateTimeElement) {
            dateTimeElement.textContent = now.toLocaleString('en-US', options);
        }
    }

    updateDateTime();
    setInterval(updateDateTime, 60000);

    // Firebase auth state
    auth.onAuthStateChanged(user => {
        if (user) {
            const businessName = localStorage.getItem('businessName') || user.displayName || user.email;
            if (merchantNameSpan) merchantNameSpan.textContent = businessName;
        } else {
            window.location.href = "/merchant/login.html"; // redirect to login if not logged in
        }
    });

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            auth.signOut().then(() => {
                localStorage.removeItem('businessName');
                window.location.href = "/merchant/login.html";
            }).catch(err => console.error(err));
        });
    }
});
