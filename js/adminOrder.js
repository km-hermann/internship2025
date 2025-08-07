let products = [];
// function setOrdersFromLocalStorage() {
//   const storageItems = localStorage.getItem(`orders`);
//   const orderSummary = document.getElementById("summary");
//   if (storageItems) {
//     products = JSON.parse(storageItems);
//     orderSummary.textContent = `Total items: ${products.length} `;

//   } else {

//     orderSummary.textContent = "No order placed!!";
//   }
// }
// setOrdersFromLocalStorage();

function fetchDataFromDb() {
  fetch("http://127.0.0.1:3000/orders")
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        alert("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      products = data;
      console.log(products);
      renderItems();
    })
    .catch((error) => {
      alert("There has been a problem with your fetch operation:", error);
    });
}
fetchDataFromDb();

const ordertList = document.getElementById("orderContainer");
function renderItems() {
  ordertList.innerHTML = "";
  for (const order of products) {
    const tableHeader = document.createElement("h3");
    tableHeader.textContent = `Table Name: ${order.id}`;
    ordertList.appendChild(tableHeader);

    for (let product of order.items) {
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
            <button class="statusButton ${product.status}" onclick = "changeProductStatus('${product.orderId}')" >${product.status}</button>
    `;
      ordertList.appendChild(div);
    }
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
});

async function changeProductStatus(orderId) {
  orderId = orderId;
  console.log(orderId);
  try {
    console.log(products);
    // Find the order that contains the product with productId
    const order = products.find((order) =>
      order.items.some((item) => (item.orderId = orderId))
    );
    if (!order) {
      console.error("Order containing product not found");
      return;
    }

    // Find the product inside the order's items
    const updatedItems = order.items.map((item) => {
      if (item.orderId === orderId) {
        return {
          ...item,
          status: getStatus(item.status), // assuming getStatus toggles status
        };
      }
      return item;
    });

    const updatedOrder = {
      ...order,
      items: updatedItems,
    };

    // Send PUT request to update the whole order on the JSON server
    const response = await fetch(`http://localhost:3000/orders/${order.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedOrder),
    });

    if (!response.ok) throw new Error("Failed to update order on server");

    // Update local products array with updated order
    products = products.map((o) => (o.id === order.id ? updatedOrder : o));

    // Re-render UI
    renderItems();
  } catch (error) {
    console.error("Error updating product status:", error);
  }
}

function getStatus(status) {
  if (status === "pending") {
    return "cooking";
  } else if (status === "cooking") {
    return "delivered";
  } else {
    return status;
  }
}
