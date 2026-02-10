const cart_sidebar = document.getElementById("cart_sidebar");
const openBtn = document.getElementById("openBtn");
const close_cart = document.getElementById("close_cart");
const cart_items = document.getElementById("cart_items");
const totalEl = document.getElementById("total");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkout_sidebar = document.getElementById("checkout_sidebar");
const checkout_items = document.getElementById("checkout_items");
const checkout_total = document.getElementById("checkout_total");
const checkoutBtn2 = document.getElementById("checkoutBtn2");
const details = document.getElementById("details")
const paymentPage = document.getElementById("paymentPage");
const upiBox = document.getElementById("upiBox");
const cardBox = document.getElementById("cardBox");
const successPage = document.getElementById("successPage");
const confettiContainer = document.getElementById("confetti");
const close_orders = document.getElementById("close_orders");
const popupContent = document.getElementById("popupContent");
const popup = document.getElementById("orderPopup");
const orderList = document.getElementById("orderList");
const cartCount = document.getElementById("cartCount");
const form = document.querySelector("#search .example");
const searchBtn = document.querySelector("#search button");
const searchInput = document.querySelector("#search input");
const navigation = document.getElementById("navigation");
const nav_ul = document.getElementById("nav_ul");
const icons = document.getElementById("icons");
const loginForm = document.querySelector(".login");
const signupForm = document.querySelector(".signup");
const openBtn2 = document.getElementById("openBtn2");
const wrapper = document.getElementById("wrapper");
const box = document.getElementById("box");
const close_wrapper = document.getElementById("close_wrapper");
const blurBg = document.querySelector(".blur-bg");
const feImage = document.querySelector("feImage");


fetch("https://essykings.github.io/JavaScript/map.png")
.then((response) => {
    return response.blob();
})
.then((blob) =>{
    const objURL =URL.createObjectURL(blob);
    feImage.setAttribute("href",objURL)
})

function showLogin() {
    loginForm.style.left = "0";
    signupForm.style.left = "100%";
}

function showSignup() {
    loginForm.style.left = "-100%";
    signupForm.style.left = "0";
}

function showWrapper(){
  wrapper.classList.add("active");
  blurBg.style.opacity = "1";   // 🔥 blur ON
}

function closeWrapper(){
    wrapper.classList.remove("active");
    blurBg.style.opacity = "0";   // blur OFF
}

window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        navigation.classList.add("scrolled");
    } else {
        navigation.classList.remove("scrolled");
    }
});

searchBtn.addEventListener("click", function (e) {
    // If search bar is not open → open it
    if (!form.classList.contains("active")) {
        e.preventDefault();
        form.classList.add("active");
        searchInput.focus();
        return;
    }

    // If search bar is open but input is empty → close it
    if (searchInput.value.trim() === "") {
        e.preventDefault();
        form.classList.remove("active");
        return;
    }
});

function myFunction() {
    const nav_ul = document.getElementById("nav_ul");
    nav_ul.classList.toggle("responsive");
    const icons = document.getElementById("icons");
    icons.classList.toggle("responsive");
}

let cart = [];
let total = 0;

// Open / Close
openBtn.onclick = () => cart_sidebar.classList.add("active");
checkoutBtn2.onclick = () => details.classList.add("active");
close_cart.onclick = () => cart_sidebar.classList.remove("active");
cart_sidebar.classList.remove("active");

// Add to Cart
function addToCart(name, price, image) {
    const item = cart.find(p => p.name === name); // p = product

    if (item) {
        item.qty++;
    } else {
        cart.push({ name, price, image, qty: 1 });
    }
    renderCart();
    updateCartCount();
}

function updateCartCount() {
    let count = 0;

    cart.forEach(item => {
        count += item.qty; // sum of all quantities
    });

    cartCount.innerText = count;
}

// Increase
function increase(index) {
    cart[index].qty++;
    renderCart();
    updateCartCount();
}

// Decrease
function decrease(index) {
    cart[index].qty--;
    if (cart[index].qty === 0) cart.splice(index, 1);
    renderCart();
    updateCartCount();
}

// Remove
function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
    updateCartCount();
}

// Render Cart
function renderCart() {
    cart_items.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        cart_items.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}">
            <div>
                <strong>${item.name}</strong>
                <div class="price">
                <span>₹${item.price}</span>
                </div>
                <div class="cart-controls">
                    <button class="symbol1" onclick="decrease(${index})">-</button>
                    <span class="count">${item.qty}</span>
                    <button class="symbol1" onclick="increase(${index})">+</button>
                    <button class="symbol" onclick="removeItem(${index})"><img id="trash" src="/static/trash.png" alt=""></button>
                </div>
            </div>
        </div>
      </div>
    `;
    });

    totalEl.innerText = total;
}

checkoutBtn.onclick = () => {
    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    checkout_sidebar.classList.add("active");
    renderCheckout();
};

function renderCheckout() {
    checkout_items.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        // <p>${item.name} × ${item.qty} = ₹${item.price * item.qty}</p>
        checkout_items.innerHTML += `
        <div class="checkout-item">
            <img src="${item.image}">
            <div>
                <strong>${item.name}</strong>
                <div class="price">
                    <span>₹${item.price}</span>
                </div>
            </div>
        </div>
    `;
    });

    checkout_total.innerText = total;
}

function placeOrder() {
    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const pincode = document.getElementById("pincode").value;
    const state = document.getElementById("state").value;

    if (!name || !address || !number || !city || !pincode || !state) {
        alert("Fill all details");
        return;
    }
    paymentPage.classList.add("active");
    cart_sidebar.classList.remove("active");
    checkout_sidebar.classList.remove("active");
}

document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.onchange = () => {
        if (radio.value === "upi") {
            upiBox.style.display = "block";
            cardBox.style.display = "none";
        }
        else if (radio.value === "cod") {
            upiBox.style.display = "none";
            cardBox.style.display = "none";
        }
        else {
            upiBox.style.display = "none";
            cardBox.style.display = "block";
        }
    };
});

function payNow() {
    const selected = document.querySelector('input[name="payment"]:checked');

    if (!selected) {
        alert("Please select a payment method");
        return;
    }
    // saveOrder();

    const upiInput = document.getElementById("upiId");
    const cardBox = document.getElementById("number_card");

    if (selected.value === "upi") {
        if (!upiInput || upiInput.value.trim() === "") {
            alert("⚠️ Please enter UPI ID");
        } else {
            paymentPage.classList.remove("active");
            successPage.classList.add("active");
            launchConfetti();
            setTimeout(() => {
                successPage.classList.remove("active");
            }, 3000);
            details.classList.remove("active");
        }
        // return;
    }

    if (selected.value === "card") {
        if (!cardBox || cardBox.value.trim() === "") {
            alert("⚠️ Please enter card details");
        } else {
            paymentPage.classList.remove("active");
            successPage.classList.add("active");
            launchConfetti();
            setTimeout(() => {
                successPage.classList.remove("active");
            }, 3000);
            details.classList.remove("active");
        }
        // return;
    }

    if (selected.value === "cod") {
        paymentPage.classList.remove("active");
        successPage.classList.add("active");
        launchConfetti();
        setTimeout(() => {
            successPage.classList.remove("active");
        }, 3000);
        details.classList.remove("active");
    }
    saveOrder();

    paymentPage.classList.remove("active");
    details.classList.remove("active");
    cart = [];
    renderCart();
}

function launchConfetti() {
    confettiContainer.innerHTML = "";

    for (let i = 0; i < 260; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti-piece");
        confetti.style.left = Math.random() * 200 + "vw";
        confetti.style.backgroundColor = randomColor();
        confetti.style.animationDuration = Math.random() * 3 + 2 + "s";

        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        confettiContainer.innerHTML = "";
    }, 3000);
}

function randomColor() {
    const colors = ["#ff0", "#0f0", "#0ff", "#f0f", "#f00", "#00f", "#ffb300ff"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function saveOrder() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        items: JSON.parse(JSON.stringify(cart)),
        total: cart.reduce((sum, i) => sum + i.price * i.qty, 0),
        status: "Paid"
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
}

// function renderOrders() {
//     const orders = JSON.parse(localStorage.getItem("orders")) || [];
//     const orderList = document.getElementById("orderList");

//     orderList.innerHTML = "";

//     if (!orders.length) {
//         orderList.innerHTML = "<p>No orders found</p>";
//         return;
//     }

//     orders
//         .map((order, i) => ({ order, i }))
//         .reverse()
//         .forEach(({ order, i }) => {

//             orderList.innerHTML += `
//             <div class="order-card">

//                 <div class="order-header">
//                     <div>Order #${order.id}</div>
//                     <div>${order.date}</div>
//                     <div><strong>Total: ₹${order.total}</strong></div>
//                 </div>

//                 ${order.items.map(item => `
//                     <div class="product-row">
//                         <div class="product-left">
//                             <img src="${item.image}">
//                             <div class="product-info">
//                                 <h4>${item.name}</h4>
//                                 <small>Qty: ${item.qty}</small>
//                             </div>
//                         </div>

//                         <div class="product-price">
//                             ₹${item.price * item.qty}
//                         </div>

//                         <div class="product-status">
//                             <div class="delivered">
//                                 ● Delivered on ${order.date}
//                             </div>
//                             <div>Your item has been delivered</div>
//                             <div class="review" onclick="openPopup(${i})">
//                                 ★ Rate & Review Product
//                             </div>
//                         </div>
//                     </div>
//                 `).join("")}

//             </div>
//             `;
//         });
// }




function renderOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orderList.innerHTML = "";

    if (orders.length === 0) {
        orderList.innerHTML = "<p>No orders found</p>";
        return;
    }

    orders.slice().reverse().forEach((order, index) => {
        const cancelled = order.status === "Cancelled";

        orderList.innerHTML += `
      <div class="order-card">
        <h4>Order #${order.id}</h4>
        <p>${order.date}</p>

        ${(order.items || []).map(item => `
          <div class="order-item">
            <img src="${item.image}">
            <span>${item.name} x ${item.qty}</span>
            <span>₹${item.price * item.qty}</span>
          </div>
        `).join("")}

        <strong>Total: ₹${order.total}</strong>
        <button class="view-btn" onclick="openPopup(${index})">
          View Details
        </button>

        <div class="status ${cancelled ? "cancelled" : "paid"}">
          Status: ${order.status}
        </div>

        <button 
          class="cancel-btn"
          onclick="cancelOrder(${index})"
          ${cancelled ? "disabled" : ""}>
          Cancel Order
        </button>

        <button 
          class="remove-btn"
          onclick="removeOrder(${index})">
          Remove Order
        </button>
      </div>
    `;
    });
}

function cancelOrder(index) {
    if (!confirm("Cancel this order?")) return;

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.reverse()[index].status = "Cancelled";

    localStorage.setItem("orders", JSON.stringify(orders.reverse()));
    renderOrders();
}

function openPopup(index) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const order = [...orders].reverse()[index];

    popupContent.innerHTML = `
    ${(order.items || []).map(item => `
      <div class="order-item">
        <div>
            <img src="${item.image}">
            <div>
                <div>${item.name}</div>
                <small>₹${item.price} x ${item.qty}</small>
            </div>
        </div>
        <strong>₹${item.price * item.qty}</strong>
      </div>
    `).join("")}

    <hr>
    <strong>Total: ₹${order.total}</strong>
  `;

    popup.classList.add("active");
}

function closePopup() {
    popup.classList.remove("active");
}

function removeOrder(index) {
    if (!confirm("Remove this order permanently?")) return;

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.reverse().splice(index, 1);

    localStorage.setItem("orders", JSON.stringify(orders.reverse()));
    renderOrders();
}
