let products = [
  // {
  //   id: 1125,
  //   name: "Grilled chicken",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi adipisci, magnam facilis fugiat quos deserunt distinctio nobis a est ducimus",
  //   price: 2000,
  //   image: "./img/chicken.jpg",
  //   stock: 10,
  // },
  // {
  //   id: 1265,
  //   name: "Fried rice",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi adipisci, magnam facilis fugiat quos deserunt distinctio nobis a est ducimus",
  //   price: 1000,
  //   image: "./img/rice.jpg",
  //   stock: 15,
  // },
  // {
  //   id: 1225,
  //   name: "Pasta",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi adipisci, magnam facilis fugiat quos deserunt distinctio nobis a est ducimus",
  //   price: 750,
  //   image: "./img/pasta.jpg",
  //   stock: 21,
  // },
  // {
  //   id: 1677,
  //   name: "Fruit salad",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi adipisci, magnam facilis fugiat quos deserunt distinctio nobis a est ducimus",
  //   price: 2000,
  //   image: "./img/fruitSalad.jpg",
  //   stock: 9,
  // },
  // {
  //   id: 1526,
  //   name: "Spaghetti",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi adipisci, magnam facilis fugiat quos deserunt distinctio nobis a est ducimus",
  //   price: 800,
  //   image: "./img/spaghetti.jpg",
  //   stock: 8,
  // },
  // {
  //   id: 1555,
  //   name: "Beaf steak",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi adipisci, magnam facilis fugiat quos deserunt distinctio nobis a est ducimus",
  //   price: 2000,
  //   image: "./img/beaf.jpg",
  //   stock: 15,
  // },
  // {
  //   id: 1745,
  //   name: "Cup cake",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi adipisci, magnam facilis fugiat quos deserunt distinctio nobis a est ducimus",
  //   price: 350,
  //   image: "./img/cupCake.jpg",
  //   stock: 15,
  // },
  // {
  //   id: 1685,
  //   name: "Roasted fish",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi adipisci, magnam facilis fugiat quos deserunt distinctio nobis a est ducimus",
  //   price: 1500,
  //   image: "./img/fish.jpg",
  //   stock: 18,
  // },
  // {
  //   id: 1785,
  //   name: "Burger",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi adipisci, magnam facilis fugiat quos deserunt distinctio nobis a est ducimus",
  //   price: 1200,
  //   image: "./img/burger.jpg",
  //   stock: 27,
  // },
  // {
  //   id: 1805,
  //   name: "Donut",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi adipisci, magnam facilis fugiat quos deserunt distinctio nobis a est ducimus",
  //   price: 300,
  //   image: "./img/donut.jpg",
  //   stock: 32,
  // },
  // {
  //   id: 1885,
  //   name: "Vegetable salad",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi adipisci, magnam facilis fugiat quos deserunt distinctio nobis a est ducimus",
  //   price: 1100,
  //   image: "./img/salade.jpg",
  //   stock: 16,
  // },
  // {
  //   id: 1289,
  //   name: "Creamed cake",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi adipisci, magnam facilis fugiat quos deserunt distinctio nobis a est ducimus",
  //   price: 4000,
  //   image: "./img/creamedCake.jpg",
  //   stock: 5,
  // },
  // {
  //   id: 1004,
  //   name: "Pan cake",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi adipisci, magnam facilis fugiat quos deserunt distinctio nobis a est ducimus",
  //   price: 350,
  //   image: "./img/panCake.jpg",
  //   stock: 35,
  // },
  // {
  //   id: 1315,
  //   name: "Pizza",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi adipisci, magnam facilis fugiat quos deserunt distinctio nobis a est ducimus",
  //   price: 1800,
  //   image: "./img/pizza.jpg",
  //   stock: 12,
  // },
  // {
  //   id: 1684,
  //   name: "Tarte",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi adipisci, magnam facilis fugiat quos deserunt distinctio nobis a est ducimus",
  //   price: 3500,
  //   image: "./img/tarte.jpg",
  //   stock: 4,
  // },
  // {
  //   id: 1334,
  //   name: "Strewberry cake",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi adipisci, magnam facilis fugiat quos deserunt distinctio nobis a est ducimus",
  //   price: 2250,
  //   image: "./img/strewberryCake.jpg",
  //   stock: 11,
  // },
];

// localStorage.setItem("products", JSON.stringify(products))

function fetchDataFromDb() {
  fetch("http://127.0.0.1:3000/products").then((response) => {
    console.log(response);
    if (!response.ok) {
      alert("Network response was not ok");
    }
    return response.json();
  }).then((data) => {
    products = data;
    renderFoods();
  }).catch((error) => {
    alert("There has been a problem with your fetch operation:", error);
  });
}
fetchDataFromDb();

// function setLocalStorageItems() {
//   const items = localStorage.getItem("products");
//   products = JSON.parse(items) || [];
// }
// setLocalStorageItems();

const foodList = document.getElementById("foodList");
const searchInput = document.getElementById("search");
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
})();

function renderFoods(searchKey = "") {
  foodList.innerHTML = "";
  const filteredItems = products.filter((product) => {
    return product.name.toLowerCase().includes(searchKey.toLowerCase());
  });

  for (let product of filteredItems) {
    const div = document.createElement("div");
    div.className = "foodItem";
    div.innerHTML = `
     <img src="${product.image}" alt="" class="foodImage">
            <div class="foodTitle">${product.name}</div>
            <div class="foodDescription">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi adipisci, magnam facilis fugiat quos deserunt distinctio nobis a est ducimus</div>
            <div class="stock">Stock:${product.stock}</div>
            <div class="price">${product.price}CFA</div>
            <button class="addButton" onclick="addToCart('${product.id}')">Add to cart</button>
    `;
    foodList.appendChild(div);
  }
}

// Update cartCount display logic in addToCart
function updateCartCountDisplay() {
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
}

// Replace cartCount logic in addToCart with updateCartCountDisplay
const originalAddToCart = addToCart;
addToCart = function (productId) {
  originalAddToCart(productId);
  updateCartCountDisplay();
};
searchInput.addEventListener("input", (e) => {
  setTimeout(() => {
    renderFoods(e.target.value);
  }, 1000);
});
renderFoods();

function addToCart(productId) {
  const product = products.find((product) => product.id === productId);
  const storageItems = localStorage.getItem(`cart`);
  const cartCount = document.getElementById("cartCount");
  let items;
  if (storageItems) {
    items = JSON.parse(storageItems);
  } else {
    items = [];
  }
  let cartItem = {
    ...product,
    qty: 1,
  };
  const existingProduct = items.findIndex(
    (product) => product.id === productId
  );
  if (existingProduct !== -1) {
    items[existingProduct].qty += 1;
    items[existingProduct].price += product.price;
  } else {
    items.push(cartItem);
  }
  localStorage.setItem(`cart`, JSON.stringify(items));
  alert(`${product.name} added to cart!`);
}
