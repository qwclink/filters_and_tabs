const products = [
    { imageURL: "orange.png", name: "orange", category: "orange", price: 20 },
    { imageURL: "blue.png", name: "blue", category: "blue", price: 30 },
    { imageURL: "pink.png", name: "pink", category: "pink", price: 50 },
    { imageURL: "white.png", name: "white", category: "white", price: 70 },
    { imageURL: "blue.png", name: "2 blue", category: "blue", price: 40 },
    { imageURL: "orange.png", name: "2 orange", category: "orange", price: 25 },
    { imageURL: "white.png", name: "2 white", category: "white", price: 45 },
    { imageURL: "pink.png", name: "2 pink", category: "pink", price: 80 },
    { imageURL: "pink.png", name: "3 pink", category: "pink", price: 80 },
    { imageURL: "orange.png", name: "3 orange", category: "orange", price: 80 },
    { imageURL: "blue.png", name: "3 blue", category: "blue", price: 80 },
    { imageURL: "white.png", name: "3 white", category: "white", price: 80 },
];

const productsContainer = document.querySelector('.products');
const searchInput = document.getElementById('searchProduct');
const sortOrderSelect = document.getElementById('sortOrder');
const filterButtons = document.querySelectorAll('.filters button');

function displayProducts(productsArray) {
    productsContainer.innerHTML = "";
    productsArray.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.imageURL}" alt="${product.name}">
            <div class="text">
                <div class="text-left">
                    <h3>${product.name}</h3>
                    <p class="bid">Current bid</p>
                    <p>Price: $${product.price}</p>
                </div>
                <button class="button">place bid</button>
            </div>
        `;
        productsContainer.appendChild(productElement);
    });
}

function filterProducts(category) {
    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }
    filteredProducts = searchProducts(filteredProducts);
    filteredProducts = sortProducts(filteredProducts);
    displayProducts(filteredProducts);
}

function searchProducts(productsArray) {
    const searchText = searchInput.value.toLowerCase();
    return productsArray.filter(product => product.name.toLowerCase().includes(searchText));
}

function sortProducts(productsArray) {
    const sortOrder = sortOrderSelect.value;
    if (sortOrder === 'lowest') {
        return productsArray.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highest') {
        return productsArray.sort((a, b) => b.price - a.price);
    }
    return productsArray;
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterProducts(button.dataset.category);
    });
});

searchInput.addEventListener('input', () => {
    filterProducts(document.querySelector('.filters button.active')?.dataset.category || 'all');
});

sortOrderSelect.addEventListener('change', () => {
    filterProducts(document.querySelector('.filters button.active')?.dataset.category || 'all');
});

displayProducts(products);