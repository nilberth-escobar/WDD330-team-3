import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Ensure the retrieved data is an array
function getCart() {
  const cartItems = getLocalStorage("so-cart");
  return Array.isArray(cartItems) ? cartItems : [];
}

// Initialize cart from local storage
let cart = getCart();

function addProductToCart(updateCart) {
  setLocalStorage("so-cart", updateCart);
}

// Add to cart button event handler
async function addToCartHandler(e) {
  try {
    const productId = e.target.dataset.id;
    if (!productId) {
      null;
      return;
    }

    const product = await dataSource.findProductById(productId);
    if (!product) {
      null;
      return;
    }

    cart.push(product);
    addProductToCart(cart);
  } catch (error) {
    null;
  }
}

// Add listener to Add to Cart button
const addToCartButton = document.getElementById("addToCart");
if (addToCartButton) {
  addToCartButton.addEventListener("click", addToCartHandler);
} else {
  null;
}

import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let cart = getLocalStorage("so-cart") || [];
  if (!Array.isArray(cart)) {
    cart = [];
  }
  cart.push(product);
  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  let cart = getLocalStorage("so-cart") || [];
  const product = await dataSource.findProductById(e.target.dataset.id);
  cart.unshift(product);
  addProductToCart(cart);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
