import productList from "../data/productList.js";

export default function findInProducts(productId){
    return productList.find(prod => prod.id === productId);
}