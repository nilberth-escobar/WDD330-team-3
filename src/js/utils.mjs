export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function extractParam (param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  console.log(product);
  console.log(urlParams);
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false){
  const htmlStrings = list.map(templateFn);
  
  if (clear){
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}