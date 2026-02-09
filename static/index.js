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
const fund_btn = document.getElementById("fund_btn");
const popup_fund = document.getElementById("popup_fund");
const fund_box = document.getElementById("fund_box");
const personal_registry = document.getElementById("personal_registry");
const information_btn = document.getElementById("information_btn");
const profile_primery = document.getElementById("profile_primery");
const my_order = document.getElementById("my_order");

let cart = [];
let total = 0;

const btn = document.getElementById("information_btn");

document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("information_btn");
    const btn2 = document.getElementById("my_orders_btn");
    const btn3 = document.getElementById("wishlist_btn");

    btn.addEventListener("click", function () {
        btn.classList.toggle("active");
        showinformation();
        btn2.classList.remove("active");
        btn3.classList.remove("active");
    });
    btn2.addEventListener("click", function () {
        btn2.classList.toggle("active");
        btn.classList.remove("active");
        btn3.classList.remove("active");
    });

    btn3.addEventListener("click", function () {
        btn3.classList.toggle("active");
        btn.classList.remove("active");
        btn2.classList.remove("active");

    });
});

fetch("https://essykings.github.io/JavaScript/map.png")
    .then((response) => {
        return response.blob();
    })

    .then((blob) => {
        const objURL = URL.createObjectURL(blob);
        feImage.setAttribute("href", objURL)
    })

function showLogin() {
    loginForm.style.left = "0";
    signupForm.style.left = "100%";
}

function showSignup() {
    loginForm.style.left = "-100%";
    signupForm.style.left = "0";
}

function showWrapper() {
    wrapper.classList.add("active");
    blurBg.style.opacity = "1";   // 🔥 blur ON
}

function closeWrapper() {
    wrapper.classList.remove("active");
    blurBg.style.opacity = "0";   // blur OFF
}

function showpopup_fund() {
    fund_box.classList.add("active");
    blurBg.style.opacity = "1";   // 🔥 blur ON
}

function closePopup_fund() {
    fund_box.classList.remove("active");
    blurBg.style.opacity = "0";   // blur OFF
}

function showinformation() {
    personal_registry.classList.add("active");
    my_order.classList.remove("active");

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
    console.log("CART AT PAYNOW:", cart);  // 👈 ADD THIS AS FIRST LINE

    const selected = document.querySelector('input[name="payment"]:checked');

    if (!selected) {
        alert("Please select a payment method");
        return;
    }
    saveOrder([...cart]);  // BEFORE clearing cart
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
    // saveOrder([...cart]);

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

function saveOrder(cartData) {

    const nameEl = document.getElementById("name");
    const mobileEl = document.getElementById("number");
    const addressEl = document.getElementById("address");

    const name = nameEl ? nameEl.value : "";
    const mobile = mobileEl ? mobileEl.value : "";
    const address = addressEl ? addressEl.value : "";

    const newOrder = {
        name,
        mobile,
        address,
        date: new Date().toLocaleString(),
        items: cartData,
        total: cartData.reduce((sum, i) => sum + i.price * i.qty, 0),
        status: "Paid"
    };

    fetch("http://192.168.1.3:5500/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder)
    });
}


// async function renderOrders() {
//     const orderList = document.getElementById("orderList");
//     if (!orderList) return;

//     const res = await fetch("http://192.168.1.3:5500/api/orders");
//     const orders = await res.json();

//     if (!orders.length) {
//         orderList.innerHTML = "<p>No orders found</p>";
//         return;
//     }

//     let html = `
//         <div class="order-head">
//             <div class="col-id">Id</div>
//             <div class="col-product">Product</div>
//             <div class="col-quantity">Quantity</div>
//             <div class="col-date">Date</div>
//             <div class="col-price">Price</div>
//             <div class="col-status">Status</div>
//             <div class="col-action">Action</div>
//         </div>
//     `;

//     orders.reverse().forEach(order => {

//     const firstItem = order.items[0];
//     const moreCount = order.items.length - 1;

//     html += `
//     <a class="order_detail_link" href="/orderdetail.html">
//     <div class="order-row">

//         <div class="col-id">#${order._id.slice(-5)}</div>

//         <div class="col-product">
//             <img src="${firstItem.image}">
//             <div class="col-product_detail">
//                 <div>${firstItem.name}</div>
//                 ${
//                     moreCount > 0
//                     ? `<small class="more-items">+ ${moreCount} more item(s)</small>`
//                     : ``
//                 }
//             </div>
//         </div>

//         <div class="col-quantity">
//             ${order.items.reduce((t, i) => t + i.qty, 0)}
//         </div>

//         <div class="col-date">${order.date}</div>

//         <div class="col-price">
//             ₹${order.items.reduce((t, i) => t + i.price * i.qty, 0)}
//         </div>

//         <div class="col-status">
//             <span class="status-pill ${order.status === 'Cancelled' ? 'cancelled' : 'paid'}">
//                 ${order.status}
//             </span>
//         </div>

//         <div class="col-action action-wrap">
//                 <button class="view-btn2" onclick="openPopup('${order._id}')">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 32 32">
//                         <circle cx="16" cy="16" r="4" fill="#fff" />
//                         <path fill="#fff" d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68M16 22.5a6.5 6.5 0 1 1 6.5-6.5a6.51 6.51 0 0 1-6.5 6.5" />
//                      </svg>
//                 </button>

//                 ${order.status !== "Cancelled"
//                 ? `<button class="cancel-btn" onclick="cancelOrder('${order._id}')">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 512 500">
//                             <path fill="#fff" fill-rule="evenodd"
//                             d="M420.48 121.813L390.187 91.52L256 225.92L121.813 91.52L91.52 121.813L225.92 256L91.52 390.187l30.293 30.293L256 286.08l134.187 134.4l30.293-30.293L286.08 256z" stroke-width="13" stroke="#fff" />
//                         </svg>
//                     </button>`
//                 :`<span class="cancelled-text">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 512 500">
//                             <path fill="#fff" fill-rule="evenodd"
//                             d="M420.48 121.813L390.187 91.52L256 225.92L121.813 91.52L91.52 121.813L225.92 256L91.52 390.187l30.293 30.293L256 286.08l134.187 134.4l30.293-30.293L286.08 256z" stroke-width="13" stroke="#fff" />
//                         </svg>
//                         <div class="cancel_deopdown">You are already cancel order.</div>
//                 </span>`
//                 }
//         </div>
//     </div>
//     </a>
//     `;
// });
//     orderList.innerHTML = html;
//     personal_registry.classList.remove("active");
// }


async function renderOrders() {
    const orderList = document.getElementById("orderList");
    if (!orderList) return;

    const res = await fetch("http://192.168.1.3:5500/api/orders");
    const orders = await res.json();

    if (!orders.length) {
        orderList.innerHTML = "<p>No orders found</p>";
        return;
    }

    let html = `
        <div class="order-filter">
            <div class="filter">
                <button>Panding</button>
                <button>Cancel</button>
                <button>complete</button>
            </div>
        </div>
        <div class="order-head">
            <div class="col-id">Id</div>
            <div class="col-product">Product</div>
            <div class="col-quantity">Quantity</div>
            <div class="col-date">Date</div>
            <div class="col-price">Price</div>
            <div class="col-status">Status</div>
            <div class="col-action">Action</div>
        </div>
    `;

    orders.reverse().forEach(order => {

        const firstItem = order.items[0];
        const moreCount = order.items.length - 1;

        html += `
        <div class="order-row" onclick="goToDetails('${order._id}')">

            <div class="col-id">#${order._id.slice(-6)}</div>

            <div class="col-product">
                <img src="${firstItem.image}">
                <div class="col-product_detail">
                    <div>${firstItem.name}</div>
                    ${moreCount > 0
                ? `<small class="more-items">+ ${moreCount} more item(s)</small>`
                : ``
            }
                </div>
            </div>

            <div class="col-quantity">
                ${order.items.reduce((t, i) => t + i.qty, 0)}
            </div>

            <div class="col-date">${order.date}</div>

            <div class="col-price">
                ₹${order.items.reduce((t, i) => t + i.price * i.qty, 0)}
            </div>

            <div class="col-status">
                <span class="status-pill ${order.status === 'Cancelled' ? 'cancelled' : 'paid'}">
                    ${order.status}
                </span>
            </div>
            <div class="col-action action-wrap">
                    <button class="view-btn2" onclick="event.stopPropagation(); openPopup('${order._id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 32 32">
                            <circle cx="16" cy="16" r="4" fill="#fff" />
                            <path fill="#fff"
                                d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68M16 22.5a6.5 6.5 0                 1 1 6.5-6.5a6.51 6.51 0 0 1-6.5 6.5" />
                        </svg>
                    </button>
                    ${order.status !== "Cancelled"
                        ? `<button class="cancel-btn" onclick="event.stopPropagation(); cancelOrder('${order._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 512 500">
                                    <path fill="#fff" fill-rule="evenodd"
                                    d="M420.48 121.813L390.187 91.52L256 225.92L121.813 91.52L91.52 121.813L225.92 256L91.52 390.187l30.293 30.293L256 286.08l134.187 134.4l30.293-30.293L286.08        256z" stroke-width="13" stroke="#fff" />
                                </svg>
                            </button>`
                        : `<span class="cancelled-text">
                                <svg xmlns="http://www.w 3.org/2000/svg" width="29" height="29" viewBox="0 0 512 500">
                                    <path fill="#fff" fill-rule="evenodd"
                                    d="M420.48 121.813L390.187 91.52L256 225.92L121.813 91.52L91.52 121.813L225.92 256L91.52 390.187l30.293 30.293L256 286.08l134.187 134.4l30.293-30.293L286.08        256z" stroke-width="13" stroke="#fff" />
                                </svg>
                                <div class="cancel_deopdown">You are already cancel order.</div>
                            </span>`
                    }
            </div>
        </div>
        `;
    });
    orderList.innerHTML = html;
    personal_registry.classList.remove("active");
}


function goToDetails(id) {
    localStorage.setItem("viewOrderId", id);
    window.location.href = "/orderdetail.html";
    window.onload = renderDetails();
}

async function renderDetails() {
    const box = document.getElementById("orderList");
    if (!box) return;

    const id = localStorage.getItem("viewOrderId");
    if (!id) return;

    const res = await fetch(`http://192.168.1.3:5500/api/orders/${id}`);
    const order = await res.json();

    const subtotal = order.items.reduce((t, i) => t + i.price * i.qty, 0);
    const gst = subtotal * 0.05;
    const delivery = order.deliveryCharge || 5;

    const grandTotal = subtotal + gst + delivery;

    let html = `
<div class="order_wrapper">

    <!-- HEADER -->
    <div class="order_header">
        <div>
            <h2>Order #${order._id.slice(-8)}</h2>
            <p>${order.date}</p>
        </div>
        <span class="status_badge">${order.status}</span>
    </div>

    <!-- TRACKING -->
    <div class="tracking_card">

    <div class="progress_bar"></div>
    <div class="progress_fill"></div>

    <div class="step active">
        <div class="circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package" aria-hidden="true"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
        </div>
        <h4>Order Placed</h4>
        <span>2026-02-09T06:05</span>
    </div>

    <div class="step active">
        <div class="circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package" aria-hidden="true"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
        </div>
        <h4>Packed</h4>
    </div>

    <div class="step current">
        <div class="circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck" aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg>
        </div>
        <h4>Shipped</h4>
    </div>

    <div class="step">
        <div class="circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck" aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg>
        </div>
        <h4>Out for Delivery</h4>
    </div>

    <div class="step">
        <div class="circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
        </div>
        <h4>Delivered</h4>
    </div>

</div>


    <div class="order_layout">

        <!-- LEFT -->
        <div class="left_section">
            <div class="card_details">
                <h2>Customer Details</h2>
                <div class="customer">
                        <div class="customer_detail_name">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                style="padding: 0.75rem; background-color: #ffffff0d; border-radius: 1rem; margin-top: 20px;margin-bottom: 20px;"
                                viewBox="0 0 24 24" fill="none" stroke="#a1d591" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="lucide1 lucide-user"
                                aria-hidden="true">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <div class="customer_name">
                                <span>${order.name}</span>
                            </div>
                        </div>
                        <div class="customer_detail_phone">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" style="padding: 0.75rem; background-color: #ffffff0d; border-radius: 1rem;" viewBox="0 0 24 24"><path fill="none" stroke="#a1d591" stroke-linejoin="round" stroke-width="1.7" d="M7.829 16.171a20.9 20.9 0 0 1-4.846-7.614c-.573-1.564-.048-3.282 1.13-4.46l.729-.728a2.11 2.11 0 0 1 2.987 0l1.707 1.707a2.11 2.11 0 0 1 0 2.987l-.42.42a1.81 1.81 0 0 0 0 2.56l3.84 3.841a1.81 1.81 0 0 0 2.56 0l.421-.42a2.11 2.11 0 0 1 2.987 0l1.707 1.707a2.11 2.11 0 0 1 0 2.987l-.728.728c-1.178 1.179-2.896 1.704-4.46 1.131a20.9 20.9 0 0 1-7.614-4.846Z"/></svg>
                            <p>${maskMobile(order.mobile)}</p>
                        </div>
                        <div class="customer_detail_address">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" style="padding: 0.75rem; background-color: #ffffff0d; border-radius: 1rem;" viewBox="0 0 24 24"><g fill="none" stroke="#a1d591" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8"/></g></svg>
                            <p>${order.address}</p>
                        </div>
            </div>
        </div>  
            <div class="card">
                <h2>Package Contents</h2>

                ${order.items.map(item => `
                    <div class="package_row">
                        <img src="${item.image}">
                        <div class="product_name_price_qty">
                        <div class="product_name_price">
                            <div>${item.name}</div>
                            <div>₹${item.price * item.qty}</div>
                            </div>
                            <div class="product_qty_price">
                            <small id="qty">Qty: ${item.qty}</small>
                            <div>Subtotal: ₹${item.price * item.qty}</div>
                        </div>
                        </div>
                    </div>
                `).join("")}
            </div>

            <div class="card1">
                <h3>Rate Your Experience</h3>
                <div class="stars">
                    <span onclick="gfg(1)" class="star">★</span>
                    <span onclick="gfg(2)" class="star">★</span>
                    <span onclick="gfg(3)" class="star">★</span>
                    <span onclick="gfg(4)" class="star">★</span>
                    <span onclick="gfg(5)" class="star">★</span>
                </div>
                <textarea id="textarea" placeholder="Tell us what you liked..."></textarea>
                <button class="review_btn">Submit Review</button>
            </div>

        </div>

        <!-- RIGHT -->

<div class="right_section">

    <div class="payment_card">
        <h2 class="title">PAYMENT SUMMARY</h2>

        <div class="row">
            <span>Total Items</span>
            <span>${order.items.length}</span>
        </div>

        <div class="row">
            <span>Subtotal</span>
            <span>₹${subtotal}</span>
        </div>

        <div class="row">
            <span>GST (5%)</span>
            <span>₹${gst.toFixed(2)}</span>
        </div>

        <div class="row">
            <span>Delivery Charges</span>
            <span class="free">₹${delivery || 0}</span>
        </div>

        <hr>

        <div class="total_row">
            <span>Order Total</span>
            <span class="total_price">₹${grandTotal.toFixed(2)}</span>
        </div>

        <div class="payment_method">
            <span>PAYMENT METHOD</span>
            <span class="method_name">APNAWALLET</span>
        </div>

        <button class="track_btn">TRACK ORDER</button>

        <div class="bottom_btns">
            <button class="invoice_btn">INVOICE</button>
            <button class="buy_btn">BUY AGAIN</button>
        </div>
    </div>

</div>

    </div>
</div>
`;
    box.innerHTML = html;
}

function maskMobile(mobile) {
    if (!mobile || mobile.length < 4) return mobile;
    return mobile.slice(0, 3) + "XXXXXX" + mobile.slice(-1);
}

// Function to update rating
function gfg(n) {

    const stars = document.getElementsByClassName("star"); // get fresh stars
    const output = document.getElementById("output");

    remove();  // clear previous

    let cls = "";
    if (n == 1) cls = "one";
    else if (n == 2) cls = "two";
    else if (n == 3) cls = "three";
    else if (n == 4) cls = "four";
    else if (n == 5) cls = "five";

    for (let i = 0; i < n; i++) {
        stars[i].className = "star " + cls;
    }
}

// Remove styling
function remove() {
    const stars = document.getElementsByClassName("star");
    for (let i = 0; i < stars.length; i++) {
        stars[i].className = "star";
    }
}

async function cancelOrder(id) {
    await fetch(`http://192.168.1.3:5500/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled" })
    });

    renderOrders();
}

async function openPopup(id) {
    const popup = document.getElementById("orderPopup");
    const popupContent = document.getElementById("popupContent");

    const res = await fetch(`http://192.168.1.3:5500/api/orders/${id}`);
    const order = await res.json();

    popupContent.innerHTML = `
        ${order.items.map(item => `
            <div class="order-item">
                <img src="${item.image}">
                <div>
                    <div>${item.name}</div>
                    <small>₹${item.price} x ${item.qty}</small>
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
    document.getElementById("orderPopup").classList.remove("active");
}

async function removeOrder(id) {
    await fetch(`http://192.168.1.3:5500/api/orders/${id}`, {
        method: "DELETE"
    });

    renderOrders();
}