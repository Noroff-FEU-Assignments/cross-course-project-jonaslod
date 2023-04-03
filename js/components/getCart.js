export default function getCart(){
    const cart = localStorage.getItem("cart");

    if(!cart){return [];}
    else{return JSON.parse(cart);}
}