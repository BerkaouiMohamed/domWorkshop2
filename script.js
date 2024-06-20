var cart = []
async function getData() {
    var data = await fetch('https://fakestoreapi.com/products')
    data = await data.json()
    return data

}
function drowBox(product) {
    var box = document.createElement('div')
    box.className = "box"
    var productImage = document.createElement('img')
    productImage.src = product.image
    var productTitle = document.createElement('h3')
    productTitle.textContent = product.title
    var productPrice = document.createElement("h4")
    productPrice.textContent = `${product.price} $`

    box.appendChild(productImage)
    box.appendChild(productTitle)
    box.appendChild(productPrice)
    return box
}
// [{ product: { id, title, price }, quantity: 1 }, { product: { id, title, price }, quantity: 1 }]
function addToCart(product) {
    if (cart.find((ele) => ele.product.id == product.id)) return;
    cart.push({ product, quantity: 1 })

}

function drowBoxProducts(product) {
    var div = drowBox(product)
    var addToCartButton = document.createElement('button')
    addToCartButton.textContent = 'add to cart'
    div.appendChild(addToCartButton)
    addToCartButton.addEventListener('click', () => addToCart(product))
    return div
}
function drowBoxOrder(product,quantity) {
    var div = drowBox(product)
    var plus = document.createElement('button')
    plus.textContent = '+'
    var moin = document.createElement('button')
    moin.innerText = '-'
    var quantityh5 = document.createElement('h5')
    quantityh5.textContent = `${quantity}`
    div.appendChild(plus)
    plus.addEventListener('click',function(){
        console.log(cart);
        // [,{product:{id titiel},quantity},{product:{id titiel},quantity}]
        cart=cart.map((ele)=>ele.product.id==product.id?{...ele,quantity:ele.quantity+1}:ele)//{product:{id titiel},quantity:2}
        console.log(cart);

        orderDisplay()
    })
    div.appendChild(quantityh5)
    div.appendChild(moin)
    return div
}
function domProducts(products, productsDiv) {
    for (let i = 0; i < products.length; i++) {
        var div = drowBoxProducts(products[i])
        productsDiv.appendChild(div)


    }
}
function orderDisplay(){
    var orderitmes=document.getElementById('orderitmes')
    orderitmes.innerHTML=""
    var totalPrice=0

    for(let i =0;i<cart.length;i++){
        var box=drowBoxOrder(cart[i].product,cart[i].quantity)
        orderitmes.appendChild(box)
        totalPrice=(cart[i].product.price*cart[i].quantity)+totalPrice
    }
    var totalPriceElement=document.createElement('h6')
    totalPriceElement.textContent=totalPrice
    orderitmes.appendChild(totalPriceElement)


}
function popUpShow() {
    var popup = document.getElementById('order')
    var orderbtn = document.getElementById('orderButton')
    var closeTab = document.getElementById('x')

    orderbtn.addEventListener('click', () => {
        popup.style.display = 'block'
        orderDisplay()

    })
    closeTab.addEventListener('click', () => {
        popup.style.display = 'none'
    })
}

function main() {
    var productsDiv = document.getElementById('products')

    getData()
        .then((products) => domProducts(products, productsDiv))

    popUpShow()
}



document.addEventListener('DOMContentLoaded', main)