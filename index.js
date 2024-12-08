const restaurants = [
    { id: 1, name: "ABCD Food Court", image: "images/abcd.jpg" },
    { id: 2, name: "hotel Satkar", image: "images/satkar.jpg" },
    { id: 3, name: "Hotel Vishnu Sri", image: "images/vis.webp" },
    { id: 4, name: "Ganapathi Food House", image: "images/gan.jpg" },
    { id: 5, name: "King BBQ", image: "images/bbq.png" },
    { id: 6, name: "Bondam Babai Hotel", image: "images/r5.jpeg" },
    { id: 7, name: "Green Tree Restaurant", image: "images/gt.jpeg" },
    { id: 8, name: "Happy Hours Restaurent", image: "images/hh.avif" },
    { id: 9, name: "SKFC", image: "images/kfc.jpg" },
    { id: 10, name: "New Punjabi Dhaba", image: "images/jd.jpg" },
];

const restaurantList = document.getElementById("restaurant-list");

restaurants.forEach(restaurant => {
    const div = document.createElement("div");
    div.classList.add("restaurant-card");
    div.innerHTML = `
        <img src="${restaurant.image}" alt="${restaurant.name}">
        <h3>${restaurant.name}</h3>
        <button onclick="viewMenu(${restaurant.id})">View Menu</button>
    `;
    restaurantList.appendChild(div);
});

function viewMenu(id) {
    localStorage.setItem("selectedRestaurant", id);
    window.location.href = "menu.html";
}
