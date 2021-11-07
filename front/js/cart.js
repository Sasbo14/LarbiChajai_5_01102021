let productInLocalStorage = JSON.parse(localStorage.getItem("addProduct"));
console.table(productInLocalStorage);
//Affichage des éléments dans le DOM
const cartItems = document.querySelector("#cart__items");

for (let items of productInLocalStorage) {
  cartItems.innerHTML += `
<article class="cart__item" data-id="${items.productId}">
        <div class="cart__item__img">
             <img src="${items.imageUrl}" alt="${items.altImageUrl}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
                <h2>${items.productName}${items.selectColors}</h2>
                <p>${items.productPrice}€</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${items.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
</article>`;
}

//fonction calcul le nombre total d'articles et le prix total

function calculateTotalCart() {
  const cart = {
    quantity: 0,
    totalPrice: 0,
  };

  for (let items of productInLocalStorage) {
    cart.quantity += parseInt(items.quantity);
    cart.totalPrice += items.productPrice * items.quantity;
  }
  return cart;
}

let totalCart = calculateTotalCart();
console.log(totalCart);

//fonction affiche le nombre d'articles total et le prix total
function displayTotalCart() {
  const totalQuantity = document.getElementById("totalQuantity");
  const totalPrice = document.getElementById("totalPrice");
  totalQuantity.textContent = totalCart.quantity;
  totalPrice.textContent = totalCart.totalPrice;
}
displayTotalCart();

//fonction modif quantité d'articles

let modifItemQuantity = document.querySelectorAll(".itemQuantity");
console.log(typeof modifItemQuantity);

for (let q = 0; q < modifItemQuantity.length; q++) {
  modifItemQuantity[q].addEventListener("change", (event) => {
    event.preventDefault();

    //Les produits a modifier
    let modifQuantityId = productInLocalStorage[q].productId;
    let quantityValue = modifItemQuantity[q].value;
    let modifQuantityColor = productInLocalStorage[q].selectColors;

    let resultFind = productInLocalStorage.find(
      (el) =>
        el.productId == modifQuantityId && el.selectColors == modifQuantityColor
    );

    resultFind.quantity = quantityValue;
    productInLocalStorage[q].quantity = resultFind.quantity;

    localStorage.setItem("addProduct", JSON.stringify(productInLocalStorage));

    window.location.reload();
  });
}

//fonction suppression d'un article

let deleteButton = document.querySelectorAll(".deleteItem");
console.log(deleteButton);
//----function deleteItem() {
for (let d = 0; d < productInLocalStorage.length; d++) {
  deleteButton[d].addEventListener("click", (event) => {
    event.preventDefault();

    //selection de l'id du produit a supprimer
    let supprItemId = productInLocalStorage[d].productId;
    let supprItemColor = productInLocalStorage[d].selectColors;

    //Méthode filter pour supprimer le produit
    productInLocalStorage = productInLocalStorage.filter(
      (el) => el.productId !== supprItemId || el.selectColors !== supprItemColor
    );

    localStorage.setItem("addProduct", JSON.stringify(productInLocalStorage));

    window.location.reload();
  });
}

//recupération des valeurs du formulaire
/*const formValues = {
    prenom: document.querySelector("#firstName").value,
    nom: document.querySelector("#lastName").value,
    adresse: document.querySelector("#address").value,
    ville: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };*/

//Ou en créant une classe
class Form {
  constructor() {
    (this.firstName = document.querySelector("#firstName").value),
      (this.lastName = document.querySelector("#lastName").value),
      (this.address = document.querySelector("#address").value),
      (this.city = document.querySelector("#city").value),
      (this.email = document.querySelector("#email").value);
  }
}
//Le formulaire
//Bouton commander
const cartOrderButton = document.getElementById("order");
console.log("cartOrderButton");
console.log(cartOrderButton);

//ECOUTE au click
cartOrderButton.addEventListener("click", (event) => {
  event.preventDefault();

  //Appel de la classe form dans une variable contact
  const contact = new Form();

  console.log("contact");
  console.log(contact);

  //--------------------Validation du formulaire------------------------------//
  //validation du prénom
  const regexNameValue = /^[A-Za-z -]{2,20}$/;
  const firstName = contact.firstName;
  const firstNameError = document.getElementById("firstNameErrorMsg");
  function testFirstName(firstName) {
    if (regexNameValue.test(firstName)) {
      firstNameError.innerHTML = null;
      console.log("OK");
      return true;
    } else {
      firstNameError.innerHTML =
        "veuillez saisir un prénom valide, min 2 caractères max 20, pas de chiffres ou de symboles spéciaux";
      console.log("KO");
      return false;
    }
  }

  //validation du nom
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  const lastName = contact.lastName;
  function testLastName(lastName) {
    if (regexNameValue.test(lastName)) {
      lastNameErrorMsg.innerHTML = null;
      console.log("OK");
      return true;
    } else {
      lastNameErrorMsg.innerHTML =
        "veuillez saisir un nom valide, min 2 caractères max 20, pas de chiffres ou de symboles spéciaux";
      console.log("KO");
      return false;
    }
  }

  //Validation de l'adresse
  const regexAddressValue = /^[A-Za-z0-9 àáèéêëėîïôöùúûüç'-]+$/u;
  const addressErrorMsg = document.getElementById("addressErrorMsg");
  const address = contact.adress;
  function testAddress(address) {
    if (regexAddressValue.test(address)) {
      addressErrorMsg.innerHTML = null;
      console.log("OK");
      return true;
    } else {
      addressErrorMsg.innerHTML =
        "veuillez saisir une adresse valide, pas de symboles spéciaux";
      console.log("KO");
      return false;
    }
  }

  //Validation de la ville
  const regexCityValue = /^[A-Za-z àáèéêëėîïôöùúûüç'-]+$/u;
  const cityErrorMsg = document.getElementById("cityErrorMsg");
  const city = contact.city;
  function testCity(city) {
    if (regexCityValue.test(city)) {
      cityErrorMsg.innerHTML = null;
      console.log("OK");
      return true;
    } else {
      cityErrorMsg.innerHTML =
        "veuillez saisir une ville valide, pas de chiffres ni de symboles spéciaux";
      console.log("KO");
      return false;
    }
  }

  //Validation de l'email
  const regexEmailValue =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailErrorMsg = document.getElementById("emailErrorMsg");
  const email = contact.email;

  function testEmail(email) {
    if (regexEmailValue.test(email)) {
      emailErrorMsg.innerHTML = null;
      console.log("OK");
      return true;
    } else {
      emailErrorMsg.innerHTML = "veuillez saisir un email valide!";
      console.log("KO");
      return false;
    }
  }

  testFirstName(firstName);
  testLastName(lastName);
  testAddress(address);
  testCity(city);
  testEmail(email);

  //-----Si le formulaire est bien rempli envoyer à l'API sinon msg d'erreur----
  if (
    testFirstName(firstName) &&
    testLastName(lastName) &&
    testAddress(address) &&
    testCity(city) &&
    testEmail(email)
  ) {
    //objet formValues envoyer dans le local storage
    localStorage.setItem("contact", JSON.stringify(contact));

    const getContact = new Form();
    console.log("getContact");
    console.log(typeof getContact);

    // création du tableau de l'id des produits commander
    let productsOrderId = [];
    for (let productOrder of productInLocalStorage) {
      let productsId = productOrder.productId;
      productsOrderId.push(productsId);
    }
    console.log("productsOrderId");
    console.log(typeof productsOrderId);

    //Dans un objet tableau des id produits et formulaire
    const productAndForm = {
      products: productsOrderId,
      contact: getContact,
    };
    console.log("productAndForm");
    console.log(productAndForm);

    //Fonction envoi de productAndForm vers l'API
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(productAndForm),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        //localStorage.clear();
        localStorage.setItem("orderId", data.orderId);
        window.location.assign("confirmation.html?orderId=" + data.orderId);
      })

      .catch(function (err) {
        console.log(err);
      });
  } else {
    alert("Veuillez remplir correctement le formulaire");
  }
});
