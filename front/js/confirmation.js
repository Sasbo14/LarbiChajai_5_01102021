let command = localStorage.getItem("orderId");
console.log("commmand");
console.log(command);

//affichage de l'id sur la page html
let displayOrderId = document.getElementById("orderId");
displayOrderId.innerHTML = `${command}`;
localStorage.clear();
