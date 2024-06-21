import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Image}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
</li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const productList = await this.dataSource.getData(this.category);
    this.renderList(productList)
    this.counter(productList)
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData();
    // render the list
    this.renderList(list);
  }
  
  renderList(productList){
    //filter out bad products before sending to render
    this.filter(productList);
    renderListWithTemplate(productCardTemplate, this.listElement, productList, "afterbegin", false);
}

  showFourTents(list) { // Stretch Activity Step 2
      return list.filter(function(product){ return product.Id != "989CG" && product.Id != "880RT"});
  } 

}