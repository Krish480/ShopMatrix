// merchant.js

// 🔹 Highlight active nav link
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a, #merchant-mobile-menu a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('bg-indigo-500', 'text-white');
            link.classList.remove('text-gray-800', 'dark:text-gray-200');
        } else {
            link.classList.remove('bg-indigo-500', 'text-white');
            link.classList.add('text-gray-800', 'dark:text-gray-200');
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


// 🔹 Chart.js Revenue Overview
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
