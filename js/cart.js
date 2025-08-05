let products = [];
function setItemsFromLocalStorage() {
  const storageItems = localStorage.getItem(`cart`);
  if (storageItems) {
    products = JSON.parse(storageItems);
  }
}
setItemsFromLocalStorage();

const cartList = document.getElementById("cartContainer");
const cartSummary = document.getElementById("summary");
const cartCount = document.getElementById("cartCount");

function renderItems() {
  cartList.innerHTML = "";
  let totalPrice = 0;
  let totalQty = 0;
  for (let product of products) {
    totalPrice += product.price;
    totalQty += product.qty;
    const div = document.createElement("div");
    div.className = "cartItem";
    div.innerHTML = `
     <div class="itemInfo">
                <img class="itemImage" src="${product.image}" alt="">
                <div class="itemDetails">
                    <div class="itemName">${product.name}</div>
                    <div class="itemDetail">Qty: ${product.qty}</div>
                </div>
            </div>
            <div class="itemPrice">${product.price}CFA</div>
            <div calss="buttons">
            <button class="removeButton" onclick = "removeCartItem(${product.id})" ><img src ="./img/trash.png"</button>
            </div>
    `;
    cartList.appendChild(div);
  }
  // cartSummary.textContent = totalPrice > 0 ? `Total: ${totalPrice} CFA` : "Empty cart!!"
  if (totalPrice > 0) {
    cartSummary.style.color = "#4caf50";
    cartSummary.style.fontWeight = "bold";
    cartSummary.textContent = `Total items: ${totalQty}`;
    cartSummary.textContent += ` | Total: ${totalPrice} CFA`;
    document.getElementById("orderButton").style.display = "block";
    cartCount.textContent = `${totalQty}`;
    cartCount.style.display = "block";
  } else {
    const emptyCartImage = document.getElementById("emptyCartImage");
    if (emptyCartImage) {
      emptyCartImage.style.display = "block";
      cartList.appendChild(emptyCartImage);
    }
    cartSummary.textContent = "Empty cart !!";
    cartCount.style.display = "none";
    document.getElementById("orderButton").style.display = "none";
  }
}
renderItems();

function removeCartItem(productId) {
  const storageItems = localStorage.getItem(`cart`);
  let items = JSON.parse(storageItems);
  items = items.filter((item) => item.id !== productId);
  localStorage.setItem(`cart`, JSON.stringify(items));
  setItemsFromLocalStorage();
  renderItems();
  // alert(`Removed`);
}

function addToOrder() {
  const cartItems = localStorage.getItem(`cart`);
  let items = JSON.parse(cartItems);
  for (const item of items) {
    let status = { status: "pending" };
    Object.assign(item, status);
  }
  const orderStorage = localStorage.getItem("orders");
  let orderItems;
  if (orderStorage) {
    orderItems = JSON.parse(orderStorage);
  } else {
    orderItems = [];
  }
  const updatedItems = [...orderItems, ...items];
  localStorage.setItem("orders", JSON.stringify(updatedItems));
  localStorage.setItem("cart", "[]");
  setItemsFromLocalStorage();
  renderItems();
  openPopUp2();
}

let popUp = document.getElementById("popup");
let popUpContent = document.getElementById("popupContent");
let popUpSummary = document.getElementById("orderSummary");
let popUpTotal = document.getElementById("totalAmount");

function openPopUp() {
  popUp.style.display = "block";
  popUpContent.classList.add("openPopup");
  let totalPrice = 0;
  let totalQty = 0;
  for (let product of products) {
    totalPrice += product.price;
    totalQty += product.qty;
  }
  popUpSummary.textContent = `Total items: ${totalQty}`;
  popUpTotal.textContent = `Total: ${totalPrice} CFA`;
}

let popUp2 = document.getElementById("popup2");
let popUpContent2 = document.getElementById("popup2Content");

function openPopUp2() {
  popUp2.style.display = "block";
  popUpContent2.classList.add("openPopup2");
  closePopUp();
}

function closePopUp() {
  popUpContent.classList.remove("openPopup");
  popUp.style.display = "none";
}

function closePopUp2() {
  popUpContent2.classList.remove("openPopup2");
  popUp2.style.display = "none";
}
