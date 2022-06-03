import findInCart from "./findInCart.js";
import findInProducts from "./findInProducts.js";
import getCart from "./getCart.js";
import updateCart from "./updateCart.js";

export default function addToCart(btn){    
    const productToAddId = btn.dataset.id;
    const productToAdd = findInProducts(productToAddId);
    const productAlreadyAdded = findInCart(productToAddId);
    btn.disabled = true;
    btn.classList.remove("cta");
    btn.classList.remove("not-in-cart");
    btn.classList.add("exists-in-cart");

    if(productToAdd && !productAlreadyAdded){
        const cart = getCart();
        btn.innerHTML = "Added to cart";
        cart.push(productToAdd);
        updateCart(cart);
    }
    else{
        btn.innerHTML = "Could not add game";
    }    
}