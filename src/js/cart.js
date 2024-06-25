import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");

  if (!Array.isArray(cartItems)) {
    cartItems = [cartItems];
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  updateTotalDisplay();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-item-btn" data-product-id="${item.Id}">❌</button>
  </li>`;

  return newItem;
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

renderCartContents();
