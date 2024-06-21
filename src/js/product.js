import { extractParam, getLocalStorage } from "./utils.mjs";
import ProductInfo from "./ProductData.mjs";
import ProductDetailView from "./ProductDetails.mjs";

const dataProvider = new ProductInfo("tents");
const productIdentifier = extractParam("product");

const productDetails = new ProductDetailView(productIdentifier, dataProvider);
productDetails.initialize();

//function addProductToCart(newProduct) {
//  let cart = getLocalStorage("so-cart");
//if (!Array.isArray(cart)) {
//cart = [];
//}
//cart.push(newProduct);
//getLocalStorage("so-cart", cart);
//}

// add to cart button event handler
//async function addToCartHandler(e) {
//const product = await dataProvider.findProductById(e.target.dataset.id);
//addProductToCart(product);
//}

// add listener to Add to Cart button
//document
//.getElementById("addToCart")
//.addEventListener("click", addToCartHandler);
