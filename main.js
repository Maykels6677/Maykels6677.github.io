// Pastikan elemen-elemen ini ada di halaman HTML Anda
const cart = document.querySelector('.cart');
const cartIcon = document.getElementById('cart-icon');
const closeCart = document.getElementById('close-cart');
const cartContent = document.querySelector('.cart-content');
const cartItems = document.querySelector('.cart-items');
const totalElement = document.querySelector('.total-price');

function showCart() {
    cart.classList.add("active");
}

function hideCart() {
    cart.classList.remove("active");
}

cartIcon.addEventListener('click', showCart);
closeCart.addEventListener('click', hideCart);
updateTotal();

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    // Add event listener to each 'add-cart' button
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function addCartClicked(event) {
    var button = event.target;
    var productBox = button.closest(".product-box");
    var title = productBox.querySelector(".product-title").innerText;
    var price = productBox.querySelector(".price").innerText;
    var productImg = productBox.querySelector(".product-img").src;

    addItemToCart(title, price, productImg);
}

function addItemToCart(title, price, productImg) {
    var cartBoxContent = `
        <div class="cart-box">
            <img src="${productImg}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class='bx bxs-trash-alt cart-remove'></i>
        </div>
    `;

    cartContent.insertAdjacentHTML('beforeend', cartBoxContent);
    updateTotal();
}

function updateTotal() {
    var cartBoxes = cartContent.querySelectorAll(".cart-box");
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.querySelector(".cart-price");
        var quantityElement = cartBox.querySelector(".cart-quantity");
        var price = parseFloat(priceElement.innerText.replace("IDR ", "").replace("K", ""));
        var quantity = parseInt(quantityElement.value, 10);

        total += price * quantity;
    }

    total = Math.round(total * 100) / 100;
    totalElement.innerText = 'IDR ' + total + 'K';
}

window.addEventListener('load', updateTotal);
