//  Data + JS 

//  SAMPLE DATA 
const shops = [
    {
        id: 1, name: "Tech Zone", category: "Electronics", floor: "Ground", desc: "Latest gadgets, phones & accessories",
        offer: { text: "10% off on laptops", until: "2025-12-31", percent: 10 }, rating: 4.6
    },
    {
        id: 2, name: "Fresh Mart", category: "Groceries", floor: "Ground", desc: "Daily groceries and fresh produce",
        offer: { text: "5% off storewide", until: "2025-12-15", percent: 5 }, rating: 4.3
    },
    {
        id: 3, name: "Style Street", category: "Clothing", floor: "First", desc: "Trendy fashion & accessories",
        offer: null, rating: 4.2
    },
    {
        id: 4, name: "Home Comforts", category: "Home", floor: "Second", desc: "Furniture, décor & appliances",
        offer: { text: "15% off on sofas", until: "2025-11-30", percent: 15 }, rating: 4.7
    },
    {
        id: 5, name: "Beauty Bliss", category: "Beauty", floor: "Third", desc: "Cosmetics and wellness",
        offer: null, rating: 4.1
    },
    {
        id: 6, name: "Gadget Garage", category: "Electronics", floor: "First", desc: "Accessories & repairs",
        offer: { text: "Free screen protector", until: "2025-10-31", percent: 0 }, rating: 4.0
    },
    {
        id: 7, name: "Cafe Corner", category: "Food", floor: "Third", desc: "Coffee and quick bites",
        offer: { text: "Buy 1 Get 1 (limited)", until: "2025-10-20", percent: 50 }, rating: 4.5
    }
];

// Derived lists
const uniqueCategories = ["All", ...Array.from(new Set(shops.map(s => s.category)))];
const uniqueFloors = ["All", ...Array.from(new Set(shops.map(s => s.floor)))];

// State
let state = {
    category: "All",
    floor: "All",
    offersOnly: false,
    search: "",
    sort: "recommended"
};

// --- DOM refs
const categoryPills = document.getElementById("categoryPills");
const shopsGrid = document.getElementById("shopsGrid");
const shopsCount = document.getElementById("shopsCount");
const offersList = document.getElementById("offersList");
const offersCount = document.getElementById("offersCount");
const floorGuide = document.getElementById("floorGuide");
const floorFilter = document.getElementById("floorFilter");
const floorSelect = document.getElementById("floorSelect");
const categorySelect = document.getElementById("categorySelect");
const categoryPillsNode = document.getElementById("categoryPills");
const offersOnlyCheckbox = document.getElementById("offersOnly");
const globalSearch = document.getElementById("globalSearch");
const mobileSearch = document.getElementById("mobileSearch");
const mobileSearchInput = document.getElementById("mobileSearchInput");
const mobileSearchBtn = document.getElementById("mobileSearchBtn");

//  Rendering functions 
function renderCategoryPills() {
    categoryPills.innerHTML = "";
    uniqueCategories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = "category-pill px-4 py-2 rounded-full text-sm bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition";
        btn.textContent = cat;
        if (state.category === cat) btn.classList.add("pill-active");
        btn.addEventListener("click", () => {
            state.category = cat;
            // reset floor and search
            state.search = "";
            applyFilters();
            renderAll();
        });
        categoryPills.appendChild(btn);
    });
}

function renderFloorSelectors() {
    // floorFilter in shops header
    floorFilter.innerHTML = "";
    floorSelect.innerHTML = "";
    uniqueFloors.forEach(f => {
        const opt1 = document.createElement("option");
        opt1.value = f;
        opt1.textContent = f;
        floorFilter.appendChild(opt1);

        const opt2 = document.createElement("option");
        opt2.value = f;
        opt2.textContent = f;
        floorSelect.appendChild(opt2);
    });

    // set current selects
    floorFilter.value = state.floor;
    floorSelect.value = state.floor;
    categorySelect.innerHTML = "";
    uniqueCategories.forEach(c => {
        const o = document.createElement("option");
        o.value = c;
        o.textContent = c;
        categorySelect.appendChild(o);
    });
    categorySelect.value = state.category;
}

function shopCardHTML(shop) {
    const hasOffer = !!shop.offer;
    return `
        <article class="p-4 rounded-lg ${hasOffer ? 'ring-1 ring-amber-100' : ''} bg-white dark:bg-gray-900 shadow-sm">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-semibold text-gray-800 dark:text-gray-100">${shop.name}</h3>
              <div class="flex items-center gap-2 mt-1 text-sm">
                <span class="px-2 py-1 rounded-full bg-blue-900 text-blue-200 text-xs">${shop.category}</span>
                <span class="px-2 py-1 rounded-full bg-purple-900 text-purple-200 text-xs">Floor: ${shop.floor}</span>
                <span class="text-xs text-gray-400 ml-2">⭐ ${shop.rating}</span>
              </div>
            </div>
            ${hasOffer ? `<span class="px-2 py-1 rounded-full bg-red-900 text-red-200 text-xs">${shop.offer.percent ? shop.offer.percent + '% OFF' : 'Offer'}</span>` : ''}
          </div>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-300">${shop.desc}</p>
          ${hasOffer ? `<div class="mt-3 p-3 rounded border border-dashed border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/40"><p class="text-sm font-medium text-gray-800 dark:text-yellow-400">✨ ${shop.offer.text}</p><p class="text-xs text-gray-400 mt-1">Valid until: ${shop.offer.until}</p></div>` : ''}
          <div class="mt-3 flex gap-2">
            <button class="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-indigo-700 text-white hover:brightness-95 text-sm"><i class="fa-solid fa-ticket"></i> View Offer</button>
            <button class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm"><i class="fa-solid fa-location-dot"></i> Map</button>
          </div>
        </article>
      `;
}

function renderShops(filtered) {
    shopsGrid.innerHTML = "";
    if (!filtered.length) {
        shopsGrid.innerHTML = `<div class="col-span-2 p-6 text-center text-gray-500">No shops match your filters.</div>`;
        shopsCount.textContent = '0 shops';
        return;
    }
    shopsCount.textContent = `${filtered.length} shop${filtered.length > 1 ? 's' : ''}`;
    filtered.forEach(s => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = shopCardHTML(s);
        shopsGrid.appendChild(wrapper.firstElementChild);
    });
}

function renderOffers(filtered) {
    offersList.innerHTML = "";
    const offers = filtered.filter(s => s.offer);
    offersCount.textContent = `(${offers.length})`;
    if (!offers.length) {
        offersList.innerHTML = `<li class="text-sm text-gray-500">No offers for current filters.</li>`;
        return;
    }
    offers.forEach(o => {
        const li = document.createElement("li");
        li.className = "p-3 rounded-lg bg-gradient-to-r from-yellow-900/10 to-amber-900/10 border border-yellow-800";
        li.innerHTML = `<div class="flex justify-between items-start"><div><p class="font-medium">${o.offer.text}</p><p class="text-sm text-gray-500">at ${o.name}</p></div><span class="px-2 py-1 rounded-full bg-red-900 text-red-200 text-xs">${o.offer.percent ? o.offer.percent + '% OFF' : 'Offer'}</span></div><div class="mt-2 flex justify-between items-center text-xs text-gray-500"><span>Valid until: ${o.offer.until}</span><button class="text-blue-400 hover:bg-gray-700 rounded-full px-3 font-semibold">Details</button></div>`;
        offersList.appendChild(li);
    });
}

function renderFloorGuide(filtered) {
    floorGuide.innerHTML = "";
    // group by floor
    const floors = uniqueFloors.filter(f => f !== "All");
    floors.forEach(f => {
        const shopsOnFloor = filtered.filter(s => s.floor === f);
        const container = document.createElement("div");
        container.className = "p-3 rounded-lg bg-white dark:bg-gray-900 shadow-sm";
        const header = document.createElement("div");
        header.className = "flex items-center justify-between";
        header.innerHTML = `<h4 class="font-bold">${f} <span class="text-sm text-gray-400 ml-2">(${shopsOnFloor.length})</span></h4><button class="text-sm text-blue-500 hover:bg-gray-700 rounded-full px-2 font-semibold view-floor" data-floor="${f}">View</button>`;
        container.appendChild(header);
        const list = document.createElement("div");
        list.className = "mt-2 text-sm text-gray-500";
        if (shopsOnFloor.length === 0) {
            list.innerHTML = `<p class="text-xs text-gray-400">No shops visible for current filters</p>`;
        } else {
            const ul = document.createElement("ul");
            ul.className = "space-y-1";
            shopsOnFloor.forEach(s => {
                const li = document.createElement("li");
                li.innerHTML = `<span class="font-medium text-gray-800 dark:text-gray-100">${s.name}</span> <span class="text-xs text-gray-400"> — ${s.category}</span>`;
                ul.appendChild(li);
            });
            list.appendChild(ul);
        }
        container.appendChild(list);
        floorGuide.appendChild(container);
    });

    // hook up "View" buttons to set floor filter
    document.querySelectorAll('.view-floor').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const f = e.currentTarget.dataset.floor;
            state.floor = f;
            floorFilter.value = f;
            floorSelect.value = f;
            applyFilters();
            renderAll();
            window.scrollTo({ top: 400, behavior: 'smooth' });
        });
    });
}

//  Filtering logic 
function applyFilters() {
    // normalize
    const cat = state.category;
    const floor = state.floor;
    const offersOnly = state.offersOnly;
    const q = (state.search || "").trim().toLowerCase();

    let result = shops.slice();

    if (cat && cat !== "All") result = result.filter(s => s.category === cat);
    if (floor && floor !== "All") result = result.filter(s => s.floor === floor);
    if (offersOnly) result = result.filter(s => s.offer);
    if (q) {
        result = result.filter(s =>
            s.name.toLowerCase().includes(q) ||
            s.desc.toLowerCase().includes(q) ||
            (s.offer && s.offer.text.toLowerCase().includes(q))
        );
    }

    // sorting
    if (state.sort === "offers") {
        result.sort((a, b) => (b.offer ? (b.offer.percent || 0) : 0) - (a.offer ? (a.offer.percent || 0) : 0));
    } else if (state.sort === "name") {
        result.sort((a, b) => a.name.localeCompare(b.name));
    } // recommended: keep original order

    return result;
}

function renderAll() {
    // compute filtered list
    const filtered = applyFilters();
    renderShops(filtered);
    renderOffers(filtered);
    renderFloorGuide(filtered);
    // update pills active state
    document.querySelectorAll('.category-pill').forEach(b => {
        if (b.textContent === state.category) {
            b.classList.add('pill-active');
            b.classList.remove('bg-gray-200');
        } else {
            b.classList.remove('pill-active');
            b.classList.add('bg-gray-200');
        }
    });
}

// UI wiring 
// initial
function init() {
    renderCategoryPills();
    renderFloorSelectors();
    renderAll();

    // events
    offersOnlyCheckbox.addEventListener('change', (e) => {
        state.offersOnly = e.target.checked;
        renderAll();
    });

    floorFilter.addEventListener('change', (e) => {
        state.floor = e.target.value;
        floorSelect.value = e.target.value;
        renderAll();
    });

    floorSelect.addEventListener('change', (e) => {
        state.floor = e.target.value;
        floorFilter.value = e.target.value;
        renderAll();
    });

    categorySelect.addEventListener('change', (e) => {
        state.category = e.target.value;
        renderAll();
    });

    document.getElementById('applyFilters').addEventListener('click', () => {
        // sync selects to state
        state.floor = floorSelect.value;
        state.category = categorySelect.value;
        renderAll();
    });

    document.getElementById('resetFilters').addEventListener('click', () => {
        state = { category: "All", floor: "All", offersOnly: false, search: "", sort: "recommended" };
        offersOnlyCheckbox.checked = false;
        globalSearch.value = "";
        mobileSearchInput.value = "";
        floorFilter.value = "All";
        floorSelect.value = "All";
        categorySelect.value = "All";
        renderAll();
    });

    document.getElementById('sortSelect').addEventListener('change', (e) => {
        state.sort = e.target.value;
        renderAll();
    });

    globalSearch.addEventListener('input', (e) => {
        state.search = e.target.value;
        renderAll();
    });

    // mobile search toggles
    document.getElementById('mobile-search-btn').addEventListener('click', () => {
        mobileSearch.classList.toggle('hidden');
    });
    document.getElementById('mobileSearchClose').addEventListener('click', () => {
        state.search = mobileSearchInput.value;
        globalSearch.value = state.search;
        renderAll();
        mobileSearch.classList.add('hidden');
    });

    // dark mode toggler (persist)
    const darkToggle = document.getElementById('dark-toggle');
    const darkIcon = document.getElementById('dark-icon');
    const userTheme = localStorage.getItem('sm_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    function applyTheme(t) {
        if (t === 'dark') {
            document.documentElement.classList.add('dark');
            darkIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            document.documentElement.classList.remove('dark');
            darkIcon.classList.replace('fa-sun', 'fa-moon');
        }
    }
    applyTheme(userTheme || (prefersDark ? 'dark' : 'light'));
    darkToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('sm_theme', isDark ? 'dark' : 'light');
        applyTheme(isDark ? 'dark' : 'light');
    });

    // Add Compare demo
    document.getElementById('addCompare').addEventListener('click', () => {
        alert('Compare picker would open here (demo).');
    });
}

// initialize on load
window.addEventListener('DOMContentLoaded', init);
