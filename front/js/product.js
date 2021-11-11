//Récupère le produit de l'API et l'id de l'url correspondant au produit
(async function () {
  const productId = getProductId();
  const product = await getProduct(productId);
  displayProduct(product);
})();

//Récupère l'id du produit choisit avec search Params
function getProductId() {
  return new URL(location.href).searchParams.get('id');
}

//Retourne le produit avec les informations correspondant au produit
async function getProduct(productId) {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${productId}`);
    const products = await res.json();
    return products;
  } catch (error) {
    alert(error);
  }
}

const productId = getProductId();
const product = getProduct(productId);

//Affiche le produit en détail
function displayProduct(product) {
  const content = document.getElementsByClassName('item__img');
  console.log('content');
  itemImg = content[0];
  const title = document.getElementById('title');
  const price = document.getElementById('price');
  const description = document.getElementById('description');

  itemImg.innerHTML += `
<img id="img" src= "${product.imageUrl}"" alt="${product.altTxt}" />
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
    const select = document.getElementById('colors');
    const selectOption = document.createElement('option');
    select.appendChild(selectOption);
    selectOption.textContent = `${color}`;
    selectOption.setAttribute('value', color);
  }
}

//Ajout des articles au panier.
//evenement au click

const addToCart = document.getElementById('addToCart');

addToCart.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('ok');

  // variable tableaux
  let productInLocalStorage =
    JSON.parse(localStorage.getItem('addProduct')) ?? [];
  console.log(document.getElementById('colors').options);
  const color = document.getElementById('colors').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const imgUrl = document.getElementById('img').src;
  const altImgUrl = document.getElementById('img').alt;
  const name = document.getElementById('title');
  const price = document.getElementById('price');

  if (quantity > 0 && color != '') {
    //objet produit avec options
    let saveOptionProductCart = {
      productName: name.textContent,
      productId: productId,
      quantity: quantity,
      selectColors: color,
      productPrice: price.textContent,
      imageUrl: imgUrl,
      altImageUrl: altImgUrl,
    };

    // Si localStorage est vide elle crée un nouveau tableau productInLocalStorage et l'enregistre dans le localStorage
    //Avec La méthode find() qui renvoie la valeur du premier élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passée en argument.
    if (productInLocalStorage) {
      const resultFind = productInLocalStorage.find(
        (element) =>
          element.productId === productId && element.selectColors === color
      );
      //Si le local storage contient déja un produit même id même couleur modifie la quantité
      if (resultFind) {
        let newQuantity =
          parseInt(saveOptionProductCart.quantity) +
          parseInt(resultFind.quantity);
        resultFind.quantity = newQuantity;
        localStorage.setItem(
          'addProduct',
          JSON.stringify(productInLocalStorage)
        );

        console.log(productInLocalStorage);
      } else {
        productInLocalStorage.push(saveOptionProductCart);
        localStorage.setItem(
          'addProduct',
          JSON.stringify(productInLocalStorage)
        );

        console.table(productInLocalStorage);
      }
      //Si le local storage est vide
    } else {
      productInLocalStorage = [];
      productInLocalStorage.push(saveOptionProductCart);
      localStorage.setItem('addProduct', JSON.stringify(productInLocalStorage));

      //addProductComfirmation();
      console.log(productInLocalStorage);
    }
  } else {
    if (quantity <= 0 && color == '') {
      alert('selectionner une couleur et une quantité');
    } else if (quantity <= 0) {
      alert('pas selectionner de quantité');
    } else {
      alert('selectionner une couleur');
    }
  }
});
