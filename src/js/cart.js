import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");

  if (!Array.isArray(cartItems)) {
    cartItems = [cartItems] || [];
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  const productList = document.querySelector(".product-list");
  if (productList && productList.classList.contains("cart-list")) {
    productList.innerHTML = htmlItems.join("");

    const totalPriceElement = document.querySelector(".total-price");
    if (totalPriceElement) {
      const totalPrice = calculateTotalPrice(cartItems);
      totalPriceElement.innerText = `Total Price: $${totalPrice.toFixed(2)}`;
    }
  }

  updateCartCount();
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <p class="cart-card__price">$${(item.FinalPrice * item.quantity).toFixed(2)}</p>
  </li>`;
}

function calculateTotalPrice(items) {
  return items.reduce(
    (total, item) => total + item.FinalPrice * item.quantity,
    0,
  );
}

function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  const cartItems = getLocalStorage("so-cart") || [];
  if (cartCount) {
    cartCount.innerText = cartItems.reduce(
      (count, item) => count + item.quantity,
      0,
    );
  }
}

updateCartCount();

if (
  document.querySelector(".product-list") &&
  document.querySelector(".product-list").classList.contains("cart-list")
) {
  renderCartContents();
}
