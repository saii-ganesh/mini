const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalContainer = document.getElementById("cart-total");

function renderCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalContainer.innerHTML = "";
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = cart
        .map((item, index) => {
            total += item.price;
            return `
                <div>
                    ${item.name} - ₹${item.price}
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
        })
        .join("");
    cartTotalContainer.innerHTML = `<h3>Total: ₹${total}</h3>`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function showUserDetailsForm() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    document.getElementById("userDetailsForm").style.display = "block";
}

document.getElementById("userDetails").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("userName").value;
    const mobile = document.getElementById("userMobile").value;
    const address = document.getElementById("userAddress").value;
    const paymentMethod = document.getElementById("paymentMethod").value; // Get the payment method

    if (name && mobile && address && paymentMethod) {
        placeOrder(name, mobile, address, paymentMethod);
    } else {
        alert("Please fill out all fields.");
    }
});

function placeOrder(name, mobile, address, paymentMethod) {
    if (!name || !mobile || !address || !paymentMethod) {
        console.error("Order details are incomplete:", { name, mobile, address, paymentMethod });
        alert("Please provide all required details!");
        return;
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const order = {
        name,
        mobile,
        address,
        items: cart, // Ensure cart items are present
        paymentMethod, // Add payment method
        date: new Date().toLocaleString(),
    };

    console.log('Saving order:', order);  // Debugging line

    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");
    alert("Order placed successfully!");
    window.location.href = "order-history.html";
}


renderCart();
