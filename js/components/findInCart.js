import getCart from "./getCart.js"

export default function findInCart(productId){
    const cart = getCart();
    return cart.find(prod => prod.id === productId);
}