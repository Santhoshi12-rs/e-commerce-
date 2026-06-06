// =====================================
// API URL
// =====================================

const API_URL = "https://fakestoreapi.com/products";

// =====================================
// DOM ELEMENTS
// =====================================

const productsContainer =
    document.getElementById("productsContainer");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

// =====================================
// STATE
// =====================================

let products = [];
let filteredProducts = [];

// =====================================
// FETCH PRODUCTS
// =====================================

async function fetchProducts() {

    try {

        productsContainer.innerHTML =
            "<h2>Loading Products...</h2>";

        const response =
            await fetch(API_URL);

        if (!response.ok) {
            throw new Error(
                "Failed to fetch products"
            );
        }

        products =
            await response.json();

        filteredProducts = [...products];

        renderProducts(filteredProducts);

    }

    catch (error) {

        productsContainer.innerHTML = `
            <h2>Error Loading Products</h2>
            <p>${error.message}</p>
        `;

        console.error(error);
    }
}

// =====================================
// DISPLAY PRODUCTS
// =====================================

function renderProducts(productArray) {

    productsContainer.innerHTML = "";

    if (productArray.length === 0) {

        productsContainer.innerHTML =
            "<h2>No Products Found</h2>";

        return;
    }

    productArray.forEach(product => {

        const card =
            document.createElement("div");

        card.classList.add("product-card");

        card.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.title}"
            >

            <div class="product-info">

                <h3>
                    ${product.title}
                </h3>

                <p>
                    ${product.category}
                </p>

                <div class="price">
                    ₹ ${(product.price * 85).toFixed(0)}
                </div>

                <br>

                <button
                    onclick="addToCart(${product.id})">
                    Add To Cart
                </button>

            </div>
        `;

        productsContainer.appendChild(card);
    });
}

// =====================================
// SEARCH
// =====================================

function searchProducts() {

    const keyword =
        searchInput.value.toLowerCase();

    filteredProducts =
        products.filter(product =>

            product.title
                .toLowerCase()
                .includes(keyword)

        );

    applyCategoryFilter();
}

// =====================================
// CATEGORY FILTER
// =====================================

function applyCategoryFilter() {

    let category =
        categoryFilter.value;

    let result = [...filteredProducts];

    if (category !== "all") {

        result = result.filter(
            product =>
                product.category
                    .toLowerCase()
                    .includes(category)
        );
    }

    renderProducts(result);
}

// =====================================
// ADD TO CART
// =====================================

function addToCart(productId) {

    const product =
        products.find(
            p => p.id === productId
        );

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    const existingItem =
        cart.find(
            item => item.id === productId
        );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(
        `${product.title} added to cart`
    );
}

// =====================================
// EVENT LISTENERS
// =====================================

searchInput.addEventListener(
    "input",
    searchProducts
);

categoryFilter.addEventListener(
    "change",
    applyCategoryFilter
);

// =====================================
// INITIAL LOAD
// =====================================

fetchProducts();