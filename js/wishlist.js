// wishlist.js

        // Back Button
        const backBtn = document.getElementById("backBtn");
        backBtn.addEventListener("click", () => {
            if (document.referrer) window.history.back();
            else window.location.href = "dashboard.html";
        });

        // Example wishlist items
        let wishlist = [
            { id: 1, name: "Wireless Headphones", price: 999, original: 1499, rating: 4.5, img: "https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880" },
            { id: 2, name: "Smart Watch", price: 1999, original: 2499, rating: 4.0, img: "https://images.unsplash.com/photo-1673997303871-178507ca875a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880" },
            { id: 3, name: "Bluetooth Speaker", price: 1299, original: 1599, rating: 4.8, img: "https://images.unsplash.com/photo-1618532498309-08ba18e6da89?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=874" },
            { id: 4, name: "Laptop Sleeve", price: 699, original: 899, rating: 4.2, img: "https://m.media-amazon.com/images/I/81pIqEZlyzL._AC_SL1400_.jpg" }
        ];

        const wishlistGrid = document.getElementById("wishlistGrid");
        const emptyMsg = document.getElementById("emptyMsg");
        const wishlistCount = document.getElementById("wishlistCount");
        const sortFilter = document.getElementById("sortFilter");

        function renderWishlist() {
            wishlistGrid.innerHTML = "";
            wishlistCount.textContent = wishlist.length;
            if (wishlist.length === 0) {
                emptyMsg.classList.remove("hidden");
                return;
            } else emptyMsg.classList.add("hidden");

            wishlist.forEach(item => {
                const card = document.createElement("div");
                card.className = "bg-gray-100 dark:bg-gray-700 rounded-xl shadow hover:shadow-xl transition-all p-4 flex flex-col gap-3 relative overflow-hidden";
                card.style.backgroundColor = "var(--bg2)";
                card.innerHTML = `
                    <div class="absolute top-2 right-2">
                        <button class="text-red-500 hover:text-red-600 removeBtn transition-all"><i class="fa-solid fa-trash"></i></button>
                    </div>
                    <div class="overflow-hidden rounded-lg">
                        <img src="${item.img}" alt="${item.name}" class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300">
                    </div>
                    <h3 class="font-semibold text-gray-800 dark:text-gray-100 text-lg" style="color: var(--text-main)">${item.name}</h3>
                    <div class="flex items-center gap-2">
                        <span class="text-purple-500 font-bold text-lg">₹${item.price}</span>
                        <span class="text-gray-400 line-through">₹${item.original}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        ${[...Array(5)].map((_, i) => `<i class="fa-solid fa-star ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-400'} text-sm"></i>`).join('')}
                        <span class="text-gray-500 dark:text-gray-300 text-sm" style="color: var(--text-main)">(${item.rating})</span>
                    </div>
                    <button class="mt-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all addCartBtn">Add to Cart</button>
                `;
                wishlistGrid.appendChild(card);

                // Remove Item
                card.querySelector(".removeBtn").addEventListener("click", () => {
                    wishlist = wishlist.filter(w => w.id !== item.id);
                    renderWishlist();
                });

                // Add to Cart
                card.querySelector(".addCartBtn").addEventListener("click", () => {
                    alert(`${item.name} added to cart!`);
                });
            });
        }

        // Sorting
        sortFilter.addEventListener("change", () => {
            const val = sortFilter.value;
            if (val === "priceLow") wishlist.sort((a,b)=>a.price-b.price);
            else if (val === "priceHigh") wishlist.sort((a,b)=>b.price-a.price);
            else if (val === "newest") wishlist.sort((a,b)=>b.id-a.id);
            renderWishlist();
        });

        renderWishlist();
