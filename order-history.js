const orderHistoryContainer = document.getElementById("order-history");

function renderOrderHistory() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    console.log('Fetched orders from localStorage:', orders); // Debugging line

    if (orders.length === 0) {
        orderHistoryContainer.innerHTML = "<p>No orders placed yet.</p>";
        return;
    }

    let historyHTML = `
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Address</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Payment Method</th> <!-- Add new column for Payment Method -->
                </tr>
            </thead>
            <tbody>
    `;

    orders.forEach((order, index) => {
        if (!order.items || !order.name || !order.mobile || !order.address || !order.paymentMethod) {
            console.error(`Invalid order data at index ${index}:`, order);
            return; // Skip this order if it's invalid
        }

        const items = order.items
            .map(item => `<div>${item.name} (₹${item.price})</div>`)
            .join("");
        const total = order.items.reduce((sum, item) => sum + item.price, 0);

        historyHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${order.name}</td>
                <td>${order.mobile}</td>
                <td>${order.address}</td>
                <td>${items}</td>
                <td>₹${total}</td>
                <td>${order.date}</td>
                <td>${order.paymentMethod}</td> <!-- Display the payment method -->
            </tr>
        `;
    });

    historyHTML += `
            </tbody>
        </table>
    `;

    orderHistoryContainer.innerHTML = historyHTML;
}


document.addEventListener("DOMContentLoaded", function() {
    renderOrderHistory();
});
