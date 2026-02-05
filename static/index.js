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

    fetch("http://localhost:5500/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder)
    });
}


// async function renderOrders() {
//     const orderList = document.getElementById("orderList");
//     if (!orderList) return;

//     const res = await fetch("http://localhost:5500/api/orders");
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

    const res = await fetch("http://localhost:5500/api/orders");
    const orders = await res.json();

    if (!orders.length) {
        orderList.innerHTML = "<p>No orders found</p>";
        return;
    }

    let html = `
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


// async function renderDetails() {
//     const orderList = document.getElementById("orderList");
//     if (!orderList) return;

//     const res = await fetch("http://localhost:5500/api/orders");
//     const orders = await res.json();

//     if (!orders.length) {
//         orderList.innerHTML = "<p>No orders found</p>";
//         return;
//     }
//     let html = "";


//     orders.reverse().forEach(order => {

//         const firstItem = order.items[0];
//         const moreCount = order.items.length - 1;

//         html += `
//         <div class="order_page">

//         <!-- LEFT SIDE -->
//         <div class="order_left">

//             <div class="product_card">
//                 <img src="${firstItem.image}">
//                 <div class="product_info">
//                     <div>${firstItem.name}</div>
//                     <p class="seller">Seller: RetailNet</p>
//                     <h3 class="price">₹${order.items.reduce((t, i) => t + i.price * i.qty, 0)}</h3>

//                     <div class="timeline">
//                         <p class="success">● Order Confirmed, Dec 16</p>
//                         <p class="success">● Delivered, Dec 23</p>
//                     </div>
//                 </div>
//             </div>

//             <div class="rate_box">
//                 <h3>Rate your experience</h3>
//                 <div class="stars">★★★★★</div>
//             </div>

//             <div class="issue_box">
//                 <h3>Recent Issues</h3>
//                 <p>Issue with delivery — <span class="resolved">Resolved</span></p>
//             </div>

//         </div>

//         <!-- RIGHT SIDE -->
//         <div class="order_right">

//             <div class="detail_card">
//                 <h3>Delivery Details</h3>
//                 <p>Jhon THe Dor From Jorden</p>
//                 <p>Jhon The Don — 9988XXXXXX</p>
//             </div>
            
//             <div class="detail_card">
//                 <h3>Price Details</h3>
//                 <p>Listing Price <span>₹1,299</span></p>
//                 <p>Discount <span class="green">−₹434</span></p>
//                 <hr>
//                 <h4>Total ₹865</h4>
//             </div>
            
//             <button class="invoice_btn">Download Invoice</button>
            
//         </div>
        
//     </div>
//         `;
//     });

//     orderList.innerHTML = html;
//     personal_registry.classList.remove("active");
// }

async function renderDetails() {
    const box = document.getElementById("orderList");
    if (!box) return;

    const id = localStorage.getItem("viewOrderId");
    if (!id) return;

    const res = await fetch(`http://localhost:5500/api/orders/${id}`);
    const order = await res.json();

    const firstItem = order.items[0];

    let html = `
    <div class="order_page">

        <!-- LEFT SIDE -->
        <div class="order_left">

            ${order.items.map(item => `
                <div class="product_card">
                    <img src="${item.image}">
                    <div class="product_info">
                        <div>${item.name}</div>
                        <p class="seller">Seller: RetailNet</p>
                        <h3 class="price">₹${item.price * item.qty}</h3>
                        <p>Qty: ${item.qty}</p>
                    </div>
                </div>
            `).join("")}

            <div class="rate_box">
                <h3>Rate your experience</h3>
                    <span onclick="gfg(1)" class="star">★</span>
                    <span onclick="gfg(2)" class="star">★</span>
                    <span onclick="gfg(3)" class="star">★</span>
                    <span onclick="gfg(4)" class="star">★</span>
                    <span onclick="gfg(5)" class="star">★</span>
            </div>

        </div>

        <!-- RIGHT SIDE -->
        <div class="order_right">

            <div class="detail_card">
                <h3>Delivery Details</h3>
                    <p><strong>Name:</strong> ${order.name}</p>
                    <p><strong>Mobile:</strong> ${maskMobile(order.mobile)}</p>
                    <p><strong>Address:</strong> ${order.address}</p>
            </div>

            ${(() => {
                const subtotal = order.items.reduce((t,i)=> t + i.price * i.qty, 0);
                const gst = subtotal * 0.05;
                const grandTotal = subtotal + gst;

                return `
                <div class="detail_card">
                    <h3>Price Details</h3>
                    <p>Total ID <span>${order._id}</span></p>
                    <p>Total Quantity <span>${order.items.reduce((t,i)=>t+i.qty,0)}</span></p>
                    <p>Subtotal <span>₹${subtotal.toFixed(2)}</span></p>
                    <p>GST (5%) <span>₹${gst.toFixed(2)}</span></p>
                    <hr>
                    <h4>Total ₹${grandTotal.toFixed(2)}</h4>
                </div>
                `;
            })()}
            
            <button class="invoice_btn">Download Invoice</button>
            
        </div>
        
    </div>
    `;

    box.innerHTML = html;
}

function maskMobile(mobile){
    if (!mobile || mobile.length < 4) return mobile;
        return mobile.slice(0,3) + "XXXXXX" + mobile.slice(-1);
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
    await fetch(`http://localhost:5500/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled" })
    });

    renderOrders();
}

async function openPopup(id) {
    const popup = document.getElementById("orderPopup");
    const popupContent = document.getElementById("popupContent");

    const res = await fetch(`http://localhost:5500/api/orders/${id}`);
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
    await fetch(`http://localhost:5500/api/orders/${id}`, {
        method: "DELETE"
    });

    renderOrders();
}