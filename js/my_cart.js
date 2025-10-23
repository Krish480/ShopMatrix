// my_cart.js
// Back Button
document.getElementById("backBtn").addEventListener("click", () => {
  if (document.referrer) window.history.back();
  else window.location.href = "../Products.html";
});

const cartContainer = document.getElementById("cartItems");
const cartSummary = document.getElementById("cartSummary");
const emptyCart = document.getElementById("emptyCart");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");

// tiny toast helper
function showToast(msg, color = "bg-indigo-600") {
  let t = document.createElement("div");
  t.textContent = msg;
  t.className = `${color} text-white px-4 py-2 rounded shadow fixed bottom-6 right-6 z-50 opacity-0 transition-opacity duration-300`;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.replace("opacity-0", "opacity-100"));
  setTimeout(() => {
    t.classList.replace("opacity-100", "opacity-0");
    setTimeout(() => t.remove(), 300);
  }, 2000);
}

// sanitize price 
function toNumberPrice(raw) {
  if (raw == null) return 0;
  // if already number
  if (typeof raw === "number") return raw;
  // normalize string: remove non-digits except dot
  const cleaned = String(raw).replace(/[^0-9.]/g, "");
  const n = Number(cleaned);
  return isNaN(n) ? 0 : n;
}

// load & normalize cart from localStorage
function loadCart() {
  const raw = JSON.parse(localStorage.getItem("cart") || "[]");
  // normalize shape: {id, name, price:number, qty:number, img}
  const normalized = raw.map(item => {
    return {
      id: item.id ?? (item.productId ?? null),
      name: item.name ?? item.title ?? "Product",
      price: toNumberPrice(item.price ?? item.p ?? 0),
      qty: Math.max(1, parseInt(item.qty ?? item.quantity ?? 1, 10) || 1),
      img: item.img ?? item.image ?? ""
    };
  }).filter(Boolean);
  // save back cleaned version
  localStorage.setItem("cart", JSON.stringify(normalized));
  return normalized;
}

// write to storage helper
function saveCart(arr) {
  localStorage.setItem("cart", JSON.stringify(arr));
}

// render function
let cartItems = loadCart();

function renderCart() {
  cartContainer.innerHTML = "";

  // if empty
  if (!cartItems || cartItems.length === 0) {
    cartSummary.classList.add("hidden");
    cartContainer.classList.add("hidden");
    emptyCart.classList.remove("hidden");
    subtotalEl.textContent = `₹0.00`;
    totalEl.textContent = `₹0.00`;
    return;
  }

  // show lists
  cartSummary.classList.remove("hidden");
  cartContainer.classList.remove("hidden");
  emptyCart.classList.add("hidden");

  let subtotal = 0;

  cartItems.forEach((item, index) => {
    subtotal += item.price * item.qty;

    const card = document.createElement("div");
    card.className =
      "p-4 md:p-6 flex flex-col md:flex-row items-center justify-between group transition-colors duration-200 rounded-xl";

    // Build markup - safe values
    const priceStr = `₹${(item.price || 0).toFixed(2)}`;
    card.innerHTML = `
      <div class="flex items-center w-full md:w-2/3" >
        <img src="${item.img || 'https://via.placeholder.com/120'}" alt="${escapeHtml(item.name)}" class="w-20 h-20 border-var(--border-color) rounded-lg object-cover border border-gray-200 dark:border-gray-700 mr-4">
        <div class="flex flex-col">
          <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-1">${escapeHtml(item.name)}</h3>
          <p class="text-indigo-600 dark:text-indigo-400 font-semibold">${priceStr}</p>
        </div>
      </div>
      <div class="flex items-center mt-4 md:mt-0">
        <button class="qty-btn p-2 bg-indigo-500 rounded-l-md hover:bg-indigo-600" data-action="decrease" data-index="${index}" aria-label="Decrease quantity">
          <i class="fas fa-minus"></i>
        </button>
        <span class="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white qty-text">${item.qty}</span>
        <button class="qty-btn p-2 bg-indigo-500 rounded-r-md hover:bg-indigo-600" data-action="increase" data-index="${index}" aria-label="Increase quantity">
          <i class="fas fa-plus"></i>
        </button>
        <button class="ml-4 p-2 text-red-500 hover:text-red-600 dark:hover:text-red-400 remove-btn transition-colors duration-200" data-index="${index}" aria-label="Remove item">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;

    cartContainer.appendChild(card);
  });

  subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
  totalEl.textContent = `₹${subtotal.toFixed(2)}`;

  attachEventListeners();
}

// attach listeners
function attachEventListeners() {
  // qty buttons
  const qtyBtns = document.querySelectorAll(".qty-btn");
  qtyBtns.forEach(btn => {
    btn.onclick = (e) => {
      const idx = Number(btn.dataset.index);
      const action = btn.dataset.action;
      if (!Number.isInteger(idx) || !cartItems[idx]) return;

      if (action === "increase") {
        cartItems[idx].qty = Number(cartItems[idx].qty) + 1;
        showToast("Quantity increased", "bg-indigo-600");
      } else if (action === "decrease") {
        if (cartItems[idx].qty > 1) {
          cartItems[idx].qty = Number(cartItems[idx].qty) - 1;
          showToast("Quantity decreased", "bg-indigo-600");
        } else {
          // optional: confirm remove when decreasing below 1
          cartItems.splice(idx, 1);
          showToast("Item removed", "bg-red-600");
        }
      }
      saveCart(cartItems);
      renderCart();
    };
  });

  // remove buttons
  const removeBtns = document.querySelectorAll(".remove-btn");
  removeBtns.forEach(btn => {
    btn.onclick = (e) => {
      const idx = Number(btn.dataset.index);
      if (!Number.isInteger(idx) || !cartItems[idx]) return;
      // removal
      const name = cartItems[idx].name || "this item";
      if ((`Remove "${name}" from cart?`)) {
        cartItems.splice(idx, 1);
        saveCart(cartItems);
        renderCart();
        showToast("Item removed from cart", "bg-red-600");
      }
    };
  });
}

// escape for safety in innerHTML usage
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// INITIAL
(function init() {
  cartItems = loadCart(); // cleans stored data
  renderCart();
})();

