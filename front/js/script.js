//fonction asynchrone qui attend de recevoir les produits
(async function() {
    const products = await getProducts()

    for (let product of products) {
        displayProduct(product)
    }  
})()

//va chercher la liste de produits dans l'API
function getProducts() {
  return fetch("http://localhost:3000/api/products")
   .then(function(res) {
    return res.json()
   })
   .then(function(products) {
       return products
   })
   .catch(function(error){
       alert(error)
   })
}

//Affiche les produits en HTML avec template
function displayProduct(product) {
    const templateElt = document.getElementById("templateLink")
    const cloneElt = document.importNode(templateElt.content, true)
    
    
    cloneElt.getElementById("link").href =`../html/product.html?id=${product._id}`
    cloneElt.getElementById("img").src =`${product.imageUrl}`
    cloneElt.getElementById("img").alt =`${product.altTxt}`
    cloneElt.getElementById("productName").textContent = `${product.name}`
    cloneElt.getElementById("productDescription").textContent = `${product.description}`
    
    document.getElementById("items").appendChild(cloneElt)
    }