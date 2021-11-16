let command = localStorage.getItem('orderId');

//affichage de l'id sur la page html
let displayOrderId = document.getElementById('orderId');
if (command != null) {
  displayOrderId.innerHTML = `${command}`;
} else {
  displayOrderId.innerHTML = "Il n'y aucun produit dans le panier";
}
localStorage.clear();
