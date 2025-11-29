const apiUrl = "https://fakestoreapi.com/products";

window.addEventListener("load", () => {
    localStorage.clear();
});


let cartCount = 0;

async function loadProducts() {
    const grid = document.getElementById("product-grid");

    try {
        const res = await fetch(apiUrl);
        const products = await res.json();

        grid.innerHTML = ""; // remove skeletons

        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <img src="${product.image}" alt="">
                <div class="product-title">${product.title}</div>
                <div class="product-price">Rs ${product.price}</div>
                <button class="add-to-cart">ADD TO CART</button>
            `;

            grid.appendChild(card);
        });

        attachCartEvents(); 

    } catch (error) {
        console.error("Error loading products:", error);
        grid.innerHTML = "<p>Failed to load products.</p>";
    }
}

document.addEventListener("DOMContentLoaded", loadProducts);

function attachCartEvents() {
    const addButtons = document.getElementsByClassName("add-to-cart");

    for (let i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener("click", (e) => {
            const card = e.target.parentElement;
            const title = card.querySelector(".product-title").innerText;
            const price = parseFloat(card.querySelector(".product-price").innerText.replace("Rs", ""));
            const image = card.querySelector("img").src;

            addToCart({ title, price, image });
        });
    }
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // check if product exists
    let existing = cart.find(item => item.title === product.title);

    if (existing) {
        existing.qty += 1;
    } else {
        product.qty = 1;
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartNumber();
    loadCartDrawer();
}


function updateCartNumber() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

    document.getElementById("product-quantity").innerText = totalQty;
}


const cartIcon = document.getElementById("cart-icon");
const cartDrawer = document.getElementById("cart-drawer");
const overlay = document.getElementById("overlay");
const closeCart = document.getElementById("close-cart");

cartIcon.addEventListener("click", () => {
    cartDrawer.style.right = "0";     // slide in
    overlay.style.display = "block";
    loadCartDrawer();
});

closeCart.addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);

function closeDrawer() {
    cartDrawer.style.right = "-400px"; // slide out
    overlay.style.display = "none";
}


function loadCartDrawer() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-items");

    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        container.innerHTML += `
            <div class="cart-row">
                <div class="drawer-card">
                    <img src="${item.image}">
                </div>
                <div>
                    <p><b>${item.title}</b></p>
                    <div class="qty-controls">
                        <p>Rs.${item.price}</p>
                        <div class="quantity-ind">
                            <span class="qty-btn" onclick="decreaseQty(${index})">−</span>
                            <span>${item.qty}</span>
                            <span class="qty-btn" onclick="increaseQty(${index})">+</span>  
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById("cart-total").innerText = total.toFixed(2);
}
function increaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].qty++;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartDrawer();
    updateCartNumber();
}

function decreaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].qty > 1) {
        cart[index].qty--;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartDrawer();
    updateCartNumber();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartDrawer();
    updateCartNumber();
}
