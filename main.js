var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
  cart.classList.add("active");
};

closeCart.onclick = () => {
  cart.classList.remove("active");
};

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

let bellIcon = document.querySelector("#bell-icon");
let bell = document.querySelector(".bell")
let closeCartBell = document.querySelector("#close-cart-bell");

bellIcon.onclick = () => {
    bell.classList.add("active");
  };
  
closeCartBell.onclick = () => {
    bell.classList.remove("active");
};

var allTitle = []
var totalPayment = 0
var idOrder = 0

function ready() {
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }

  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
  cart.classList.remove("active");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  if(allTitle !== undefined && allTitle.length != 0 && totalPayment!==0){
    addProductToPayment();
    updateTotal();
    allTitle = [];
    alert("Thanks for the order, please check notification bell");
    
  } else {
    alert("Please select your item");
  }
  
}

function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  bell.classList.remove("active");
  addProductToCart(title, price, productImg);
  updateTotal();
  cart.classList.add("active");
  
}

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You have already add this item to cart");
      return;
    }
  }
  var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                            <div class="cart-product-title">${title}</div>
                        </div>
                        <i class="bx bxs-trash-alt cart-remove"></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
  allTitle.push(title)
  console.log(allTitle)
}

function addProductToPayment(title, total) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-payment")[1];
  idOrder+=1

  var cartBoxContent = `
                        
                    
                             
  <div class="detail-box">
      <div class="order-info">
      <p>ID ORDER ${idOrder}</p>
      <p class="order-status">Waiting for your payment</p>
      </div>
      <div class="order-item">${allTitle}</div>
      <div class="cart-price">Total : $${totalPayment}</div>
      <div class="underline"></div>
      
  </div>
  <i class="bx bxs-trash-alt cart-remove"></i>
                    
                            
                   
                       `;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
    
    // var listTitle = document.createElement("div");
    // listTitle.classList.add("list-box");
    // var listItems = document.getElementsByClassName("order-item")[0];
    // ;

    // for (var i = 0; i < allTitle.length; i++) {
    //     listItems.append(allTitle[i] + " ");
    // }
}

function addProductToTicket(title, total) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-payment")[1];
    idOrder+=1
  
    var cartBoxContent = `
                          
                      
                               
    <div class="detail-box">
        <div class="order-info">
        <p>ID ORDER ${idOrder}</p>
        <p class="order-status">Waiting for your payment</p>
        </div>
        <div class="order-item"></div>
        <div class="cart-price">Total : $${totalPayment}</div>
        <button>Paid</button>
        <div class="underline"></div>
        
    </div>
    <i class="bx bxs-trash-alt cart-remove"></i>
                      
                              
                     
                         `;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox)
    
    var listTitle = document.createElement("div");
    listTitle.classList.add("list-box");
    var listItems = document.getElementsByClassName("order-item")[0];
    ;

    for (var i = 0; i < 100; i++) {
        listItems.append('<div>' + i + '</div>');
    }
  }

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }

  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innerText = "$" + total;

  totalPayment = total
}
