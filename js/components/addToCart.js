import findInCart from "./findInCart.js";
import getProducts from "./getProducts.js";
import getCart from "./getCart.js";
import updateCart from "./updateCart.js";

export default async function addToCart(btn){
    const productToAddId = btn.dataset.id;
    const productUrl = `https://marieogjonas.com/jonas/skole/cross-course-project/wp-json/wc/store/products/${productToAddId}`;
    const productToAdd = await getProducts(productUrl);
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