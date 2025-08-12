let products = [];
let editingId = null;
// function setItemsFromLocalStorage() {
//   const storageItems = localStorage.getItem("products");
//   products = JSON.parse(storageItems) || [];
// }

// setItemsFromLocalStorage();

function fetchDataFromDb() {
  fetch("http://127.0.0.1:3000/products")
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        alert("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      products = data;
      renderItems();
    })
    .catch((error) => {
      alert("There has been a problem with your fetch operation:", error);
    });
}
fetchDataFromDb();

let productList = document.getElementById("productList");

function renderItems() {
  productList.innerHTML = "";
  for (let product of products) {
    const div = document.createElement("div");
    div.className = "productItem";
    div.innerHTML = `
     <div class="productInfo">
                     <img class="itemImage" src="${product.image}" alt="">
                     <div class="detailSection">
                <div class="productName">${product.name}</div>
                <div class="productDetails">${product.description}</div>
                <div class="productDetails state">Stock:${product.stock} | Price: ${product.price}CFA</div>
                </div>
            </div>
            <div class="actionButtons">
                <button class="btn btn-edit" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn btn-delete" onclick="removeItem(${product.id})">Delete</button>
            </div>
          `;
    productList.appendChild(div);
  }
}
renderItems();

function saveProduct() {
  const name = document.getElementById("nameInput").value.trim();
  const description = document.getElementById("descInput").value.trim();
  const stock = document.getElementById("stockInput").value.trim();
  const price = document.getElementById("priceInput").value.trim();
  const image = document.getElementById("urlInput").value.trim();

  const newProduct = {
    name: name,
    description: description,
    price: parseFloat(price),
    image: image,
    stock: parseInt(stock),
  };

  if (!name || !description || !stock || !price || !image) {
    openPopUp2();
    return;
  }
  if (editingId) {
    fetch(`http://127.0.0.1:3000/products/${editingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        if (!response.ok) {
          alert(
            "An error occured when updating the product!" + response.statusText
          );
          return;
        }
        return response.json();
      })
      .then((updatedProduct) => {
        // console.log(updatedProduct);
        const index = products.findIndex((p) => p.id === editingId.toString());
        products[index] = updatedProduct;
        renderItems();
        editingId = null;
        document.getElementById("formTitle").innerHTML = "Add New Product";
        emptyForm();
        openPopUp();
        closeFormPopup();
      })
      .catch((error) => {
        alert("There has been a problem with your fetch operation:", error);
      });
  } else {
    fetch(`http://127.0.0.1:3000/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        if (!response.ok) {
          alert(
            "An error occured when adding the product!" + response.statusText
          );
          return;
        }
        products.push(newProduct);
        renderItems();
        emptyForm();
        closeFormPopup();
        openPopUp();
      })
      .catch((error) => {
        alert("There has been a problem with your fetch operation:", error);
      });
  }
}

function emptyForm() {
  document.getElementById("nameInput").value = "";
  document.getElementById("descInput").value = "";
  document.getElementById("stockInput").value = "";
  document.getElementById("priceInput").value = "";
  document.getElementById("urlInput").value = "";
}

function removeItem(id) {
  fetch(`http://127.0.0.1:3000/products/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        alert(
          "An error occured when deleting the product!" + response.statusText
        );
        return;
      }
      products = products.filter((p) => p.id !== id);
      renderItems();
    })
    .catch((error) => {
      alert("There has been a problem with your fetch operation:", error);
    });
}

function editProduct(id) {
  const product = products.find((p) => p.id == id);
  document.getElementById("nameInput").value = product.name;
  document.getElementById("descInput").value = product.description;
  document.getElementById("stockInput").value = product.stock;
  document.getElementById("priceInput").value = product.price;
  document.getElementById("urlInput").value = product.image;
  editingId = id;
  document.getElementById(
    "formTitle"
  ).innerHTML = `Edit Product: ${product.name}`;
  openFormPopup();
}

let popUp = document.getElementById("popup");
let popUpContent = document.getElementById("popupContent");
let formPopup = document.getElementById("formPopup");
let formContent = document.getElementById("formContent");

function openFormPopup() {
  formPopup.style.display = "block";
  formContent.classList.add("openFormPopup");
}

function closeFormPopup() {
  formContent.classList.remove("openFormPopup");
  formPopup.style.display = "none";
  editingId = null;
  document.getElementById("formTitle").innerHTML = "Add New Product";
  emptyForm();
  return;
}

function openPopUp() {
  popUp.style.display = "block";
  popUpContent.classList.add("openPopup");
}

function closePopUp() {
  popUpContent.classList.remove("openPopup");
  popUp.style.display = "none";
}

let popUp2 = document.getElementById("popup2");
let popUp2Content = document.getElementById("popup2Content");

function openPopUp2() {
  popUp2.style.display = "block";
  popUp2Content.classList.add("openPopup");
}

function closePopUp2() {
  popUp2Content.classList.remove("openPopup");
  popUp2.style.display = "none";
  closeFormPopup();
  openFormPopup();
}
