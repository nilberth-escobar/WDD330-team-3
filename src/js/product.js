import { setLocalStorage, getLocalStorage } from "/js/utils.mjs";
import ProductData from "/js/ProductData.mjs";

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
