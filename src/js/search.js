document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const query = document.getElementById("search-input").value;
    searchProducts(query);
});

function searchProducts(query) {
    const apiUrl = "https://api/1.0/products?search=${encodeURIComponent(query)}";

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => displayProducts(data))
        .catch(error => {
            console.error('Error fetching products:', error);
            displayError('Failed to fetch products. Please try again.');
        });
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    if (products.length === 0) {
        productList.innerHTML = '<p>No products found</p>';
        return;
    }

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        productItem.innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
        `;

        productList.appendChild(productItem);
    });
}

function displayError(message) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = `<p>${message}</p>`;
}