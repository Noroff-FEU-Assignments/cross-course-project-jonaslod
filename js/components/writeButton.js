import findInCart from "./findInCart.js";

export default function writeButton(product){
    if(findInCart(product.id)){
        return `<button class="exists-in-cart" disabled>Already in cart</button>`;
    }

    else{
        return `<button class="cta not-in-cart" data-id="${product.id}">Add to cart</button>`;
    }
}