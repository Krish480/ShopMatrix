// Back button
const backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click", () => {
    if (document.referrer) {
        window.history.back();
    } else {
        window.location.href = "dashboard.html";
    }
});

// Example orders data
const orders = [
    {
        id: 10234,
        date: "25 Oct 2025",
        items: [
            { name: "Wireless Headphones", qty: 1, price: 999 },
            { name: "Bluetooth Speaker", qty: 1, price: 999 },
            { name: "USB Cable", qty: 1, price: 501 }
        ],
        total: 2499,
        status: "Delivered",
        deliveryAddress: "Bhopal, MP",
        paymentMethod: "Credit Card"
    },
    {
        id: 10235,
        date: "20 Oct 2025",
        items: [
            { name: "Smart Watch", qty: 1, price: 999 }
        ],
        total: 999,
        status: "Shipped",
        deliveryAddress: "Bhopal, MP",
        paymentMethod: "COD"
    },
    {
        id: 10236,
        date: "18 Oct 2025",
        items: [
            { name: "Laptop Sleeve", qty: 2, price: 1200 }
        ],
        total: 2400,
        status: "Pending",
        deliveryAddress: "Bhopal, MP",
        paymentMethod: "Debit Card"
    },
    {
        id: 10237,
        date: "15 Oct 2025",
        items: [
            { name: "Gaming Mouse", qty: 1, price: 1500 }
        ],
        total: 1500,
        status: "Cancelled",
        deliveryAddress: "Bhopal, MP",
        paymentMethod: "Credit Card"
    }
];

const ordersGrid = document.getElementById("ordersGrid");
const orderModal = document.getElementById("orderModal");
const closeModal = document.getElementById("closeModal");
const modalOrderID = document.getElementById("modalOrderID");
const modalContent = document.getElementById("modalContent");

// Status color mapping
const statusColors = {
    "Delivered": "text-green-500",
    "Shipped": "text-yellow-500",
    "Pending": "text-orange-500",
    "Cancelled": "text-red-500"
};

// Pagination
let currentPage = 1;
const itemsPerPage = 6;

// Render orders with filter & pagination
function renderOrders(page = 1, filter = "All") {
    ordersGrid.innerHTML = "";

    let filteredOrders = filter === "All" ? orders : orders.filter(o => o.status === filter);

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageOrders = filteredOrders.slice(start, end);

    pageOrders.forEach(order => {
        const card = document.createElement("div");
        card.className = "p-6 rounded-2xl shadow hover:shadow-xl transition-all flex flex-col gap-4";
        // Theme-aware background
        card.style.backgroundColor = "var(--bg2)";

        card.innerHTML = `
            <div class="flex justify-between items-start md:items-center">
                <div>
                    <span class="font-bold text-lg text-gray-800 dark:text-gray-100" style="color: var(--text-main)">Order #${order.id}</span>
                    <span class="ml-2 text-sm text-gray-500 dark:text-gray-300" style="color: var(--muted)">${order.date}</span>
                </div>
                <span class="text-sm px-3 py-1 rounded-full ${statusColors[order.status]} font-semibold">${order.status}</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 class="font-semibold text-gray-700 dark:text-gray-200 mb-1" style="color: var(--text-main)">Items:</h4>
                    <ul class="list-disc ml-5 text-gray-600 dark:text-gray-300" style="color: var(--muted)">
                        ${order.items.map(item => `<li>${item.name} x${item.qty} - ₹${item.price}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-700 dark:text-gray-200 mb-1" style="color: var(--text-main)">Delivery:</h4>
                    <p class="text-gray-600 dark:text-gray-300">${order.deliveryAddress}</p>
                    <p class="mt-1 text-gray-600 dark:text-gray-300" style="color: var(--muted)">Payment: ${order.paymentMethod}</p>
                </div>
            </div>

            <!-- Timeline -->
            <div class="mt-4 flex justify-between items-center text-sm">
                ${["Pending", "Shipped", "Delivered"].map(step => `
                    <div class="flex-1 text-center ${order.status === step || ["Delivered", "Shipped"].includes(order.status) ? "text-purple-500 font-semibold" : "text-gray-400 dark:text-gray-500"}">
                        ${step}
                    </div>
                `).join('')}
            </div>

            <!-- Action Buttons -->
            <div class="mt-4 flex gap-3">
                <button class="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium hover:shadow-lg transition-all viewBtn">View Details</button>
                <button class="flex-1 px-4 py-2 rounded-lg border border-purple-500 text-purple-500 font-medium hover:bg-purple-500 hover:text-white transition-all invoiceBtn">Invoice</button>
            </div>
        `;

        ordersGrid.appendChild(card);

        // View Details click
        card.querySelector(".viewBtn").addEventListener("click", () => {
            modalOrderID.textContent = `Order #${order.id}`;
            modalContent.innerHTML = `
                <div class="mb-2 font-semibold">Items:</div>
                ${order.items.map(item => `<div class="flex justify-between"><span>${item.name} x${item.qty}</span><span>₹${item.price}</span></div>`).join('')}
                <div class="mt-2 font-semibold">Delivery Address:</div>
                <div>${order.deliveryAddress}</div>
                <div class="mt-2 font-semibold">Payment Method:</div>
                <div>${order.paymentMethod}</div>
                <div class="mt-2 font-semibold text-gray-800 dark:text-gray-100">Total: ₹${order.total}</div>
            `;
            orderModal.classList.remove("hidden");
            orderModal.classList.add("flex");
        });

        // Invoice click
        card.querySelector(".invoiceBtn").addEventListener("click", () => {
            alert(`Invoice for Order #${order.id} will open here.`);
        });
    });

    renderPagination(totalPages, page);
}

// Pagination buttons
function renderPagination(totalPages, current) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = `px-3 py-1 rounded ${i === current ? "bg-purple-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"}`;
        btn.addEventListener("click", () => {
            currentPage = i;
            const filter = document.getElementById("statusFilter").value;
            renderOrders(currentPage, filter);
        });
        pagination.appendChild(btn);
    }
}

// Filter change
document.getElementById("statusFilter").addEventListener("change", (e) => {
    currentPage = 1;
    renderOrders(currentPage, e.target.value);
});

// Initial render
renderOrders();

// Close modal
closeModal.addEventListener("click", () => {
    orderModal.classList.add("hidden");
    orderModal.classList.remove("flex");
});
orderModal.addEventListener("click", (e) => {
    if (e.target === orderModal) {
        orderModal.classList.add("hidden");
        orderModal.classList.remove("flex");
    }
});
