import getCart from "./getCart.js";

export default function numberOfItemsInCart(){
    const cartContainer = document.querySelector(".nav__icon-cart");
    const numberOfItemsInCart = getCart().length;
    let html = "Cart";
    if(numberOfItemsInCart>0){
        html += ` (${numberOfItemsInCart})`;
    }
    cartContainer.innerHTML = html;
}