//Récupère le produit de l'API et l'id de l'url correspondant au produit
(async function () {
  const productId = getProductId();
  const product = await getProduct(productId);
  displayProduct(product);
})();

//Cherche l'id du produit choisit
function getProductId() {
  return new URL(location.href).searchParams.get("id");
}

//Retourne le produit
function getProduct(productId) {
  return fetch(`http://localhost:3000/api/products/${productId}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (products) {
      return products;
    })
    .catch(function (error) {
      alert(error);
    });
}

let productId = getProductId();
let product = getProduct(productId);

//Affiche le produit en détail
function displayProduct(product) {
  const content = document.getElementsByClassName("item__img");
  itemImg = content[0];
  const title = document.getElementById("title");
  const price = document.getElementById("price");
  const description = document.getElementById("description");

  itemImg.innerHTML += `
<img src= "${product.imageUrl}"" alt="${product.altTxt}" />
`;
  title.innerHTML = `
${product.name}
`;
  price.innerHTML = `
${product.price}
`;
  description.innerHTML = `
${product.description}
`;
  // CHOIX COULEURS
  for (let color of product.colors) {
    const select = document.getElementById("colors");
    const selectOption = document.createElement("option");
    select.appendChild(selectOption);
    selectOption.textContent = `${color}`;
    selectOption.setAttribute("value", color);
  }
}

// Function ajout des articles au panier.
//evenement au click

const addToCart = document.getElementById("addToCart");

addToCart.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("ok");

  // variable tableaux
  let productInLocalStorage =
    JSON.parse(localStorage.getItem("addProduct")) ?? [];
  console.log(document.getElementById("colors").options);
  const color = document.getElementById("colors").value;
  const quantity = parseInt(document.getElementById("quantity").value);

  let saveOptionProductCart = {
    productId: productId,
    quantity: quantity,
    selectColors: color,
  };

  // Si localStorage est vide elle crée un nouveau tableau productInLocalStorage et l'enregistre dans le localStorage
  if (localStorage.getItem("addProduct") !== 0) {
    productInLocalStorage.push(saveOptionProductCart);
    console.log(productInLocalStorage);
    localStorage.setItem("addProduct", JSON.stringify(productInLocalStorage));
  }
  // Sinon elle ajoute le nouveau produit, et enregistre le nouveau tableau.
  else {
    const tmpProductInLocalStorage = productInLocalStorage.slice();
    for (addProduct of tmpProductInLocalStorage) {
      if (
        productId === addProduct.productId &&
        color === addProduct.selectColors
      ) {
        addProduct.quantity = quantity + addProduct.quantity;
      } else if (
        productId != addProduct.productId ||
        color != addProduct.selectColors
      ) {
        productInLocalStorage.push(saveOptionProductCart);
      }
    }
    console.log(productInLocalStorage);
  }
  localStorage.setItem("addProduct", JSON.stringify(productInLocalStorage));
});
