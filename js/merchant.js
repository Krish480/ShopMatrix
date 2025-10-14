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

// Merchant Hamburger Menu JS 
        
            const merchantMenuBtn = document.getElementById("merchant-mobile-menu-btn");
            const merchantMenu = document.getElementById("merchant-mobile-menu");
            const merchantMenuIcon = document.getElementById("merchant-menu-icon");

            //Merchant Mobile
            merchantMenuBtn.addEventListener('click', () => {
                merchantMenu.classList.toggle('hidden');
                if (!merchantMenu.classList.contains('hidden')) {
                    merchantMenuIcon.classList.replace('fa-bars', 'fa-xmark');

                } else {
                    merchantMenuIcon.classList.replace('fa-xmark', 'fa-bars');
                }
            });


   
            // Chart.js for Revenue Overview
                const ctx = document.getElementById('revenueChart');
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
          
