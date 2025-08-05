let products = [];
function setOrdersFromLocalStorage() {
  const storageItems = localStorage.getItem(`orders`);
  const orderSummary = document.getElementById("summary");
  if (storageItems) {
    products = JSON.parse(storageItems);
    orderSummary.textContent = `Total items: ${products.length} `;

  } else {

    orderSummary.textContent = "No order placed!!";
  }
}
setOrdersFromLocalStorage();

const ordertList = document.getElementById("orderContainer");
function renderItems() {
  ordertList.innerHTML = "";
  for (let product of products) {
    const div = document.createElement("div");
    div.className = "orderItem";
    div.innerHTML = `
     <div class="itemInfo">
                <img class="itemImage" src="${product.image}" alt="">
                <div class="itemDetails">
                    <div class="itemName">${product.name}</div>
                    <div class="itemDetail">Qty: ${product.qty}</div>
                    <div class="itemDetail">Table no: ${product.tableNumber}</div>
                </div>
            </div>
            <div class="itemPrice">${product.price}CFA</div>
            <button class="statusButton ${product.status}" onclick = "changeProductStatus(${product.id})" >${product.status}</button>
    `;
    ordertList.appendChild(div);
  }
}
renderItems();

// Show cart count if there are items in localStorage on page load
(function showCartCountOnLoad() {
  const cartCount = document.getElementById("cartCount");
  const storageItems = localStorage.getItem("cart");
  if (storageItems) {
    const items = JSON.parse(storageItems);
    const cartCountValue = items.reduce((acc, item) => acc + item.qty, 0);
    if (cartCountValue > 0) {
      cartCount.textContent = `${cartCountValue}`;
      cartCount.style.display = "block";
    } else {
      cartCount.style.display = "none";
    }
  } else {
    cartCount.style.display = "none";
  }
})

function changeProductStatus(productId) {
    const index = products.findIndex((p) => p.id === productId);
    products[index].status = getStatus(products[index].status);
    localStorage.setItem("orders", JSON.stringify(products));
    renderItems();
}

function getStatus(status) {
    if (status === "pending"){
        return "cooking"
    } 
    else if(status === "cooking") {
        return "delivered"
    } else {
        return status
    }
}
