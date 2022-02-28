let cart =document.querySelector('cart');
if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded",ready);
}
else{
    ready();
}

function ready(){
    // Remove cart items
    var removeicon=document.getElementsByClassName('cart-remove')
    // console.log(removeicon)
    for(var i= 0; i <removeicon.length; i++){
        var button =removeicon[i]
        button.addEventListener('click',removeItems);
    }
    //quantitiy level change
    var quantitiyInputs =document.getElementsByClassName('quantity');
    for(var i= 0; i < quantitiyInputs.length; i++){
        var input =quantitiyInputs[i];
        input.addEventListener('change', quantitiychanged);
    }

    // Add to card buttons
     var addcart =document.getElementsByClassName('add-btn');
     for(var i= 0; i < addcart.length; i++){
         var button =addcart[i];
         button.addEventListener('click',addcartclicked);

     }
}
// card remove events

function removeItems(event){
    var iconclicked = event.target;
    iconclicked.parentElement.remove();
    totalPrice();
}
// quantity changes
function quantitiychanged(event){
   var input = event.target;
   if(isNaN(input.value) || input.value <= 0){
       input.value = 1;
   }
   totalPrice();
}

// Add to cart
function addcartclicked(event){
    var button =event.target;
    var shopProducts=button.parentElement;
    var title =shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price =shopProducts.getElementsByClassName('price')[0].innerText;
    var productimg =shopProducts.getElementsByClassName('add-image')[0].src;
    addproductstocart(title,price,productimg);
    totalPrice();
}

function addproductstocart(title,price,productimg){
    var cartshopbox=document.createElement('div');
    cartshopbox.classList.add('cart-box');
    var cartItems =document.getElementsByClassName('cart-contents')[0];
    var cartItemsNames =cartItems.getElementsByClassName('cold-title');
    for(var i= 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
        alert('you have already add this item to cart');
        return;
    }
}
var cartBoxcontent =`
              <img src="${productimg}" alt="" class="image">

            <div class="details">
               <div class="cold-title">${title}</div>
               <div class="cart-price">${price}</div>
               <input type="number" value="1" class="quantity">  
            </div>
            <i class="fa-solid fa-trash cart-remove"></i>`

cartshopbox.innerHTML =cartBoxcontent;
cartItems.append(cartshopbox);
cartshopbox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeItems);
cartshopbox.getElementsByClassName('quantity')[0].addEventListener('change',quantitiychanged);



}


// --------total price---------

function totalPrice(){
    var cartcontent =document.getElementsByClassName('cart-contents')[0];
    var cartboxes =cartcontent.getElementsByClassName('cart-box');
    var total =0;
    for(var i= 0; i < cartboxes.length; i++){
        var cartbox =cartboxes[i];
        var priceElement =cartbox.getElementsByClassName('cart-price')[0];
        var quantitiyElement =cartbox.getElementsByClassName('quantity')[0];
        var price =parseFloat(priceElement.innerText.replace("$",""));
        var quantitylevel =quantitiyElement.value;
        total =total + (price * quantitylevel);


        document.getElementsByClassName('total-price')[0].innerText='$'+total;
        }
}


// drag and drop
function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
  