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
const wishlistContainer = document.getElementById("wishlistContainer");
const main_payment_section = document.getElementById("main_payment_section");
const users = document.querySelector("#users h2");
const orders = document.querySelector("#total_order h2");
const states = document.querySelector("#states h2");
const rating = document.querySelector("#rating h2");
const slides = document.getElementById("slides");
const cards = document.querySelectorAll(".review-card");
const slider = document.getElementById("slider");
const faqItems = document.querySelectorAll(".faq-item");

let cart = [];
let total = 0;

const btn = document.getElementById("information_btn");

document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("information_btn");
    const btn2 = document.getElementById("my_orders_btn");
    const btn3 = document.getElementById("wishlist_btn");
    const btn4 = document.getElementById("payment_methods_btn");

    btn.addEventListener("click", function () {
        btn.classList.add("active");
        showinformation();
        btn2.classList.remove("active");
        btn3.classList.remove("active");
        btn4.classList.remove("active");
    });
    btn2.addEventListener("click", function () {
        btn2.classList.add("active");
        btn.classList.remove("active");
        btn3.classList.remove("active");
        btn4.classList.remove("active");
    });

    btn3.addEventListener("click", function () {
        btn3.classList.add("active");
        btn.classList.remove("active");
        btn2.classList.remove("active");
        btn4.classList.remove("active");


    });

    btn4.addEventListener("click", function () {
        btn4.classList.add("active");
        btn3.classList.remove("active");
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
    blurBg.style.opacity = "1";
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
    wishlistContainer.classList.remove("active");
    main_payment_section.classList.remove("active");

}

function showrenderOrders() {
    my_order.classList.add("active");
    wishlistContainer.classList.remove("active");
    main_payment_section.classList.remove("active");
    renderOrders();
}

function showwishlist() {
    wishlistContainer.classList.add("active");
    personal_registry.classList.remove("active");
    my_order.classList.remove("active");
    main_payment_section.classList.remove("active");
    loadWishlist();
}

function showpayment() {
    main_payment_section.classList.add("active");
    personal_registry.classList.remove("active");
    wishlistContainer.classList.remove("active");
    my_order.classList.remove("active");
    loadWishlist();
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
    animateCart(btn);
}



// function addToCart(name, price, image, btnElement) {

//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     let existing = cart.find(item => item.name === name);

//     if (existing) {
//         existing.qty += 1;
//     } else {
//         cart.push({
//             name,
//             price,
//             image,
//             qty: 1
//         });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));

//     renderQuantity(name, btnElement.parentElement);
// }


// function renderQuantity(name, container) {

//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     let product = cart.find(item => item.name === name);

//     if (!product) return;

//     container.innerHTML = `
//         <div class="cart_qty">
//             <button onclick="changeQty('${name}', -1, this)">-</button>
//             <span>${product.qty}</span>
//             <button onclick="changeQty('${name}', 1, this)">+</button>
//         </div>
//     `;
// }

// function changeQty(name, change, element) {

//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     let product = cart.find(item => item.name === name);

//     if (!product) return;

//     product.qty += change;

//     if (product.qty <= 0) {
//         cart = cart.filter(item => item.name !== name);

//         element.closest(".cart_action").innerHTML = `
//             <button class="btn1 btn-primary"
//                 onclick="addToCart('${name}', ${product.price}, '${product.image}', this)">
//                 Add to Cart
//             </button>
//         `;
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));

//     updateAllQtyUI();
// }

// function updateAllQtyUI() {

//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     cart.forEach(item => {
//         let cards = document.querySelectorAll(".cart_action");

//         cards.forEach(container => {
//             if (container.innerHTML.includes(item.name)) {
//                 renderQuantity(item.name, container);
//             }
//         });
//     });
// }

// document.addEventListener("DOMContentLoaded", updateAllQtyUI);


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
    animateCart(btn);
}

// Decrease
function decrease(index) {
    cart[index].qty--;
    if (cart[index].qty === 0) cart.splice(index, 1);
    renderCart();
    updateCartCount();
    animateCart(btn);
}

// Remove
function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
    updateCartCount();
    animateCart(btn)
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

    fetch("http://192.168.1.9:8800/api/orders", {
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

    const res = await fetch("http://192.168.1.9:8800/api/orders");
    const orders = await res.json();

    if (!orders.length) {
        orderList.innerHTML = "<p>No orders found</p>";
        return;
    }

    let html = `
        <div class="order-filter">
            <h2>Order <span style="color: #ade19d;">Status</span></h2>
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

    const res = await fetch(`http://192.168.1.9:8800/api/orders/${id}`);
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
                    <h2>Order #${order._id}</h2>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"       stroke-linecap="round"stroke-linejoin="round" class="lucide lucide-package" aria-hidden="true"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0  21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
                        </div>
                        <h4>Order Placed</h4>
                        <span>2026-02-09T06:05</span>
                    </div>

                    <div class="step active">
                        <div class="circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"       stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package" aria-hidden="true"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
                        </div>
                        <h4>Packed</h4>
                        <span>2026-02-11T06:05</span>
                    </div>

                    <div class="step current">
                        <div class="circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"       stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck" aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg>
                        </div>
                        <h4>Shipped</h4>
                        <span>2026-02-14T06:05</span>
                    </div>

                    <div class="step">
                        <div class="circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"       stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck" aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg>
                        </div>
                        <h4>Out for Delivery</h4>
                    </div>

                    <div class="step">
                        <div class="circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"       stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1.709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
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
                            viewBox="0 0 24 24" fill="none" stroke="#a1d591" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide1 lucide-user" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
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
            <p>${order.items.length}</p>
        </div>

        <div class="row">
            <span>Subtotal</span>
            <p>₹${subtotal}</p>
        </div>

        <div class="row">
            <span>GST (5%)</span>
            <p>₹${gst.toFixed(2)}</p>
        </div>

        <div class="row">
            <span>Delivery Charges</span>
            <p class="free">₹${delivery || 0}</p>
        </div>
            
        <div class="col-status">
            <span>Order Status</span>
            <p class="status-pill ${order.status === 'Cancelled' ? 'cancelled' : 'paid'}">
                ${order.status}
            </p>
        </div>

        <hr>

        <div class="total_row">
            <span>Total</span>
            <p class="total_price">₹${grandTotal.toFixed(2)}</p>
        </div>

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
    await fetch(`http://192.168.1.9:8800/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled" })
    });

    renderOrders();
}

async function openPopup(id) {
    const popup = document.getElementById("orderPopup");
    const popupContent = document.getElementById("popupContent");

    const res = await fetch(`http://192.168.1.9:8800/api/orders/${id}`);
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
    await fetch(`http://192.168.1.9:8800/api/orders/${id}`, {
        method: "DELETE"
    });

    renderOrders();
}

function addToWishlist(name, price, image) {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // check already exists using name
    let exists = wishlist.find(item => item.name === name);

    if (exists) {
        alert("Already in wishlist");
        return;
    }

    wishlist.push({
        name: name,
        price: price,
        image: image
    });

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Product added to wishlist!");
}

function loadWishlist() {

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const container = document.getElementById("wishlistContainer");

    container.innerHTML = "";

    wishlist.forEach(product => {
        container.innerHTML += `
            <div class="wishlist_prodect">
                <img src="${product.image}">
                <p>${product.price}</p>
                <h3>₹${product.name}</h3>
                <button onclick="removeFromWishlist('${product.name}')">
                    Remove
                </button>
            </div>
        `;
    });
}
loadWishlist();

function removeFromWishlist(name, price) {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist = wishlist.filter(
        item => !(item.name === name && item.price === price)
    );

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    loadWishlist();
}

// Wishlist Logic
function loadWishlist() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlistContainer) return;

    wishlistContainer.innerHTML = "";

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = `
            <div class="wishlist-head">
                <h2>My Wishlist</h2>
            </div>
            <p style="text-align:center; color:gray; padding:40px; font-size:1.2rem;">Your wishlist is empty.</p>
        `;
        return;
    }

    let html = `
        <div class="wishlist-head">
            <h2>My Wishlist (${wishlist.length})</h2>
        </div>
        <div class="wishlist-content">
    `;

    wishlist.forEach((item, index) => {
        html += `
            <div class="wishlist-row">
                <div class="wishlist-product">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="wishlist-info">
                        <h4>${item.name}</h4>
                        <p>₹${item.price}</p>
                    </div>
                </div>
                <div class="wishlist-actions">
                    <button class="btn-add-cart" onclick="moveToCart('${item.name}', ${item.price}, '${item.image}', ${index})">
                        Add to Cart
                    </button>
                    <button class="btn-remove" onclick="removeFromWishlist(${index})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    wishlistContainer.innerHTML = html;
}

function removeFromWishlist(index) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    loadWishlist();
}

function moveToCart(name, price, image, index) {
    addToCart(name, price, image);
    removeFromWishlist(index);
}

// async function productDetails() {
//     const box = document.getElementById("orderList");
//     if (!box) return;

//     const id = localStorage.getItem("viewOrderId");
//     if (!id) return;

//     const res = await fetch(`http://192.168.1.3:8800/api/orders/${id}`);
//     const order = await res.json();

//     const subtotal = order.items.reduce((t, i) => t + i.price * i.qty, 0);
//     const gst = subtotal * 0.05;
//     const delivery = order.deliveryCharge || 5;

//     const grandTotal = subtotal + gst + delivery;

//     let html = `
//         <div class="order_wrapper">
//             <div class="card">
//                 <h2>Package Contents</h2>

//                 ${order.items.map(item => `
//                 <div class="package_row">
//                     <img src="${item.image}">
//                     <div class="product_name_price_qty">
//                         <div class="product_name_price">
//                             <div class="product_name">${item.name}</div>
//                             <div>₹${item.price * item.qty}</div>
//                         </div>
//                     </div>
//                 </div>
//                 `).join("")}
//             </div>
//         </div>
//     `;
//     box.innerHTML = html;
// }


function openProductDetails(name, price, image) {

    const product = {
        name: name,
        price: price,
        image: image
    };

    localStorage.setItem("selectedProduct", JSON.stringify(product));

    // redirect to details page
    window.location.href = "productdetails.html";
}


function productDetails() {

    const box = document.getElementById("orderList");
    if (!box) return;

    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    if (!product) return;

    // If no images array, convert single image into array
    const images = product.images && product.images.length
        ? product.images
        : [product.image,
        product.image,
        product.image];

    let html = `
    <div class="order_wrapper">

        <div class="product_page">

            <!-- LEFT SIDE -->
            <div class="image_section">

                <div class="main_image"
                     onmousemove="zoomImage(event, this)"
                     onmouseleave="resetZoom(this)">

                    <img id="mainImage"
                        src="${images[0]}"
                        alt="${product.name}">
                </div>

                <div class="thumb_images">
                    ${images.map((img, i) => `
                        <img src="${img}"
                            class="${i === 0 ? 'active_thumb' : ''}"
                            onclick="changeImage(this,'mainImage')">
                    `).join("")}
                </div>

                <div class="image_buttons">
                    <button class="add_cart"
                        onclick="animateCart(this);
                        addToCart('${product.name}', ${product.price}, '${images[0]}')">
                        ADD TO CART
                    </button>

                    <button class="buy_now">BUY NOW</button>
                </div>

            </div>

            <!-- RIGHT SIDE -->
            <div class="details_section">

                <h1 class="product_title">${product.name}</h1>

                <div class="rating_row">
                    <span class="rating_badge">4.9 ★</span>
                    <span class="rating_text">2,845 Ratings & 364 Reviews</span>
                    <span class="best_seller">BESTSELLER</span>
                </div>

                <div class="price_box">
                    <span class="new_price">₹${product.price}</span>
                    <span class="old_price">₹${product.price + 200}</span>
                    <span class="discount">20% off</span>
                </div>

                <div class="offer_box">
                    <h3>Available Offers</h3>
                    <ul>
                        <li>Bank Offer 5% Unlimited Cashback</li>
                        <li>Special Price Extra Discount</li>
                        <li>Partner Offer Gift Card ₹100</li>
                    </ul>
                </div>

                <div class="color_box">
                <p>Color</p>
                <div class="colors">
                        <button class="color" onclick="selectcolor(this)" style="background:#e91e63"></button>
                        <button class="color" onclick="selectcolor(this)" style="background:#ffd600"></button>
                        <button class="color" onclick="selectcolor(this)" style="background:#00c853"></button>
                </div>
            </div>

                <div class="size_box">
                    <p>Size</p>
                    <button class="size" onclick="selectSize(this)">S</button>
                    <button class="size" onclick="selectSize(this)">M</button>
                    <button class="size" onclick="selectSize(this)">L</button>
                    <button class="size" onclick="selectSize(this)">XL</button>
                    <button class="size" onclick="selectSize(this)">XXL</button>
                </div>

                <div class="delivery_box">
                <p>Delivery</p>
                <input type="text" placeholder="Enter Pincode">
                <button>Check</button>
                <span class="delivery_text">Delivery in 2-4 days</span>
            </div>

            <div class="highlight_box">
                <h3>Highlights</h3>
                <ul>
                    <li>Fabric: Pure Viscose Rayon</li>
                    <li>Type: Premium</li>
                    <li>Pattern: Self Design</li>
                    <li>Occasion: Party & Festive</li>
                </ul>
            </div>

                <div class="description_box">
                    <h3>Description</h3>
                    <p>${product.description || "Premium quality product designed for modern comfort and style."}</p>
                </div>

                <!-- REVIEWS -->
                <div class="review_section">
                    <h2>Ratings & Reviews</h2>

                    <div class="rating_summary">

                        <div class="big_rating">
                            <h1>4.9 ★</h1>
                            <p>2,845 Ratings</p>
                        </div>

                        <div class="rating_bars">

                            ${[97, 80, 50, 24, 9].map((width, i) => `
                                <div class="bar_row">
                                    <span>${5 - i} ★</span>
                                    <div class="bar">
                                        <div style="width:${width}%"></div>
                                    </div>
                                </div>
                            `).join("")}

                        </div>

                    </div>
                </div>

            </div>

        </div>

    </div>
    `;

    box.innerHTML = html;

    if (images.length > 1) {
        startSlider(images, "mainImage");
    }
}


document.addEventListener("DOMContentLoaded", productDetails);
    
function changeImage(el, id) {
    document.getElementById(id).src = el.src;

    document.querySelectorAll(".thumb_images img")
        .forEach(img => img.classList.remove("active_thumb"));

    el.classList.add("active_thumb");
}

function zoomImage(e, container) {
    const img = container.querySelector("img");
    const rect = container.getBoundingClientRect();

    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;

    img.style.transformOrigin = x + "% " + y + "%";
    img.style.transform = "scale(2)";
}

function resetZoom(container) {
    container.querySelector("img").style.transform = "scale(1)";
}

function startSlider(images, id) {
    let i = 0;
    setInterval(() => {
        i++;
        if (i >= images.length) i = 0;
        document.getElementById(id).src = images[i];
    }, 3000);
}

// function animateCart(btn, index, item){
//     btn.innerHTML = "✔ Added";
//     btn.style.background = "#a1d491";
//     btn.style.color = "#fff";

//     setTimeout(()=>{
//         btn.innerHTML =`
//         <div class="cart-controls">
//             <button class="symbol1" onclick="decrease(${index})">-</button>
//             <span class="count">${item.qty}</span>
//             <button class="symbol1" onclick="increase(${index})">+</button>
//         </div>`;
//         btn.style.background = "";
//     },2000);
// }


function animateCart(btn) {
    btn.innerHTML = `
        <div class="cart-controls">
            <button class="symbol1">-</button>
            <span class="count">1</span>
            <button class="symbol1">+</button>
        </div>`;
    btn.style.background = "#a0d490";
    btn.style.color = "#fff";

    // setTimeout(()=>{
    //     btn.innerHTML =`
    //     <div class="cart-controls">
    //         <button class="symbol1">-</button>
    //         <span class="count">1</span>
    //         <button class="symbol1">+</button>
    //     </div>`;
    //     btn.style.background = "";
    // },2000);
}

function selectSize(btn) {
    document.querySelectorAll(".size")
        .forEach(s => s.classList.remove("active"));
    btn.classList.add("active");
}

function selectcolor(btn) {
    document.querySelectorAll(".color")
        .forEach(s => s.classList.remove("active"));
    btn.classList.add("active");
}

function changeImage(el, id) {
    document.getElementById(id).src = el.src;
}

function changeQty(val, id) {
    let qtyEl = document.getElementById(id);
    let qty = parseInt(qtyEl.innerText);

    qty += val;
    if (qty < 1) qty = 1;

    qtyEl.innerText = qty;
}

function selectSize(el) {

    // find all size buttons inside same size box
    let sizes = el.parentElement.querySelectorAll(".size");

    // remove active from all
    sizes.forEach(btn => btn.classList.remove("active"));

    // add active to clicked button
    el.classList.add("active");
}

function animateCount(el, target, duration, suffix = "") {
    let start = 0;
    let startTime = null;

    function update(currentTime) {
        if (!startTime) startTime = currentTime;
        let progress = currentTime - startTime;

        let value = Math.floor((progress / duration) * target);
        if (value > target) value = target;

        el.innerText = value.toLocaleString() + suffix;

        if (progress < duration) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Run animation
animateCount(users, 25000, 1000, "+");
animateCount(orders, 50000, 1000, "+");
animateCount(states, 10, 1000);

// Special case for rating (decimal)
function animateRating(el, target, duration) {
    if (!el) return;

    let startTime = null;
    
    function update(currentTime) {
        if (!startTime) startTime = currentTime;
        let progress = currentTime - startTime;
        
        let value = (progress / duration) * target;
        if (value > target) value = target;
        
        el.innerText = value.toFixed(1) + "/5";
        
        if (progress < duration) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

document.addEventListener("DOMContentLoaded", () => {
    animateRating(rating, 4.9, 1000);
});

let index = 0;

function getVisibleCards() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
}

function showSlide() {
    const cardWidth = cards[0].offsetWidth + 20; // include margin
    slides.style.transform = `translateX(-${index * cardWidth}px)`;
}

function nextSlide() {
    const visible = getVisibleCards();
    if (index < cards.length - visible) {
        index++;
        showSlide();
    }
}

function prevSlide() {
    if (index > 0) {
        index--;
        showSlide();
    }
}

/* Swipe Gesture */
let startX = 0;

slider.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", e => {
    let diff = startX - e.changedTouches[0].clientX;

    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
});

/* Fix on resize */
window.addEventListener("resize", showSlide);

faqItems.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});

// Product Filter
document.addEventListener("DOMContentLoaded", function () {

  const buttons = document.querySelectorAll('.filter_btn');
  const products = document.querySelectorAll('.product-item'); // FIXED

  buttons.forEach(button => {
    button.addEventListener('click', function () {

      const category = this.innerText.toLowerCase();

      // Active button
      buttons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filter logic
      products.forEach(product => {
        const productCategory = product.getAttribute('data-category');

        if (category === 'all' || productCategory === category) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });

    });
  });

});