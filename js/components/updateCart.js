import numberOfItemsInCart from "./numberOfItemsInCart.js";

export default function updateCart(updatedCart){
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    numberOfItemsInCart();
}