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
    <button class="remove-item-btn" data-product-id="${item.Id}">❌</button>
  </li>`;
}

//total

function calculateTotalPrice(items) {
  return items.reduce(
    (total, item) => total + item.FinalPrice * item.quantity,
    0,
  );
}

function removeItemFromCart(productId) {
  let cartItems = getLocalStorage("so-cart");

  if (!Array.isArray(cartItems)) {
    cartItems = [cartItems];
  }

  const index = cartItems.findIndex((item) => item.Id === productId);

  if (index !== -1) {
    cartItems.splice(index, 1);
    setLocalStorage("so-cart", cartItems);
    updateTotalDisplay();
    renderCartContents();
  }
}

function updateTotalDisplay() {
  const total = calculateTotal();
  const totalElement = document.querySelector(".total");
  totalElement.textContent = `Total: $${total}`;
}

function calculateTotal() {
  let cartItems = getLocalStorage("so-cart");

  if (!Array.isArray(cartItems)) {
    cartItems = [cartItems];
  }
  const total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);
  return total.toFixed(2);
}

document.querySelector(".product-list").addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-item-btn")) {
    const productId = event.target.dataset.productId;
    removeItemFromCart(productId);
    renderCartContents();
  }
});

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
