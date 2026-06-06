const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<h2>Your Cart is Empty</h2>";

        cartTotal.textContent = "₹0";

        return;
    }

    let total = 0;

    cart.forEach(item => {

        total +=
            item.price *
            item.quantity *
            85;

        const div =
            document.createElement("div");

        div.classList.add("cart-item");

        div.innerHTML = `
            <div>
                <h3>${item.title}</h3>

                <p>
                    Qty:
                    ${item.quantity}
                </p>
            </div>

            <div>

                ₹
                ${(item.price *
                item.quantity *
                85).toFixed(0)}

                <button
                    onclick="removeItem(${item.id})">

                    Remove

                </button>

            </div>
        `;

        cartItems.appendChild(div);
    });

    cartTotal.textContent =
        `₹${total.toFixed(0)}`;
}

function removeItem(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();
}

renderCart();