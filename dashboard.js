
// ================= STORAGE =================
const STORAGE_KEY = "customers";
let customers = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// ================= ELEMENTS =================
const customerForm = document.getElementById("customerForm");
const tableBody = document.getElementById("customerTableBody");
const searchInput = document.getElementById("searchInput");

const totalCustomers = document.getElementById("totalCustomers");
const receivedCount = document.getElementById("receivedCount");
const pendingCount = document.getElementById("pendingCount");
const offlineCount = document.getElementById("offlineCount");

// ================= SAVE =================
function saveCustomers() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}

// ================= RENDER TABLE =================
function renderCustomers(data) {

    tableBody.innerHTML = "";

    if (!data || data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8">No Customers Found</td></tr>`;
        return;
    }

    data.forEach((c, index) => {

        tableBody.innerHTML += `
        <tr>
            <td>${c.id}</td>
            <td>${c.name}</td>
            <td>${c.ration}</td>
            <td>${c.phone}</td>
            <td>${c.product.join(", ")}</td>
            <td>${c.quantity}</td>
            <td>${c.status}</td>
            <td>
                <button onclick="deleteCustomer(${index})" class="delete-btn">Delete</button>
            </td>
        </tr>
        `;
    });
}

// ================= UPDATE CARDS =================
function updateCards() {
    totalCustomers.innerText = customers.length;
    receivedCount.innerText = customers.filter(c => c.status === "Received").length;
    pendingCount.innerText = customers.filter(c => c.status === "Pending").length;
    offlineCount.innerText = customers.filter(c => c.offline).length;
}

// ================= ADD CUSTOMER (MAIN FIX) =================
customerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const ration = document.getElementById("rationNumber").value.trim();
    const phone = document.getElementById("phoneNumber").value.trim();
    const quantity = document.getElementById("quantityInput").value;
    const status = document.getElementById("statusSelect").value;

    const products = [...document.querySelectorAll(".productCheckbox:checked")]
        .map(cb => cb.value);

    if (!name || !ration || !phone || products.length === 0 || !quantity) {
        alert("Please fill all fields!");
        return;
    }

    // ✅ CREATE CUSTOMER
    const newCustomer = {
        id: Date.now(),
        name,
        ration,
        phone,
        product: products,
        quantity,
        status,
        offline: !navigator.onLine
    };

    // ✅ ADD TO ARRAY
    customers.push(newCustomer);

    // ✅ SAVE + UPDATE UI
    saveCustomers();
    renderCustomers(customers);
    updateCards();

    // ✅ RESET FORM
    customerForm.reset();
});

// ================= DELETE =================
window.deleteCustomer = function (index) {
    customers.splice(index, 1);
    saveCustomers();
    renderCustomers(customers);
    updateCards();
};

// ================= SEARCH =================
searchInput.addEventListener("input", () => {

    const val = searchInput.value.toLowerCase();

    const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(val) ||
        c.ration.toLowerCase().includes(val)
    );

    renderCustomers(filtered);
});

// ================= INIT LOAD =================
function init() {
    renderCustomers(customers);
    updateCards();
}

init();