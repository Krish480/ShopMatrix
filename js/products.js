//products.js
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
const toastContainer = document.getElementById('toast-container');

addToCartBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const product = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: parseFloat(btn.dataset.price),
            img: btn.dataset.img,
            qty: 1
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingIndex = cart.findIndex(item => item.id === product.id);
        if (existingIndex !== -1) {
            cart[existingIndex].qty += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        showToast(`${product.name} added to cart successfully!`);
    });
});

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-check-circle"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    // Animate show
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Auto remove after 3s
    setTimeout(() => {
        toast.classList.remove('show');
        // Remove from DOM after animation
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}



