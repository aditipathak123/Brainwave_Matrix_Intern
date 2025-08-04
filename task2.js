const products = [
  { id: 1, name: "Notebook", price: 89, img: "https://images.pexels.com/photos/4554344/pexels-photo-4554344.jpeg?auto=compress&cs=tinysrgb&w=200&h=140&fit=crop" },
  { id: 2, name: "T-shirt", price: 499, img: "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=200&h=140&fit=crop" },
  { id: 3, name: "Shoes", price: 1299, img: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=200&h=140&fit=crop" },
  { id: 4, name: "Watch", price: 999, img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=200&h=140&fit=crop" },
  { id: 5, name: "Sunglasses", price: 299, img: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=200&h=140&fit=crop" },
  { id: 6, name: "Bluetooth Speaker", price: 1299, img: "https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?auto=compress&cs=tinysrgb&w=200&h=140&fit=crop" },
  { id: 7, name: "Smartphone", price: 14999, img: "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=200&h=140&fit=crop" }
];

let cart = [];

function renderProducts() {
  const productsDiv = document.getElementById("products");
  productsDiv.innerHTML = "";
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}" onclick="zoomImage('${product.img}')">
      <h3>${product.name}</h3>
      <div>₹${product.price}</div>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productsDiv.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  document.getElementById("cart-count").textContent = `Cart: ${cart.length}`;
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - ₹${item.price} <button onclick="removeFromCart(${index})" style="margin-left:10px; cursor:pointer;">❌ Remove</button>`;
    cartItems.appendChild(li);
    total += item.price;
  });
  document.getElementById("total").textContent = total;
}

function zoomImage(url) {
  const win = window.open("", "_blank", "width=600,height=400");
  win.document.write(`<img src="${url}" style="width:100%">`);
}

renderProducts();
