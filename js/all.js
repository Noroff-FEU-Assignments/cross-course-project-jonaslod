import numberOfItemsInCart from "./components/numberOfItemsInCart.js";

const searchBtn = document.querySelector(".search-bar__btn");
const searchInput = document.querySelector(".search-bar__input");

searchBtn.onclick = () => {
    const search = searchInput.value;
    if(search.trim()){
        window.location.href = `games.html?search=${search}`;
    }
}

numberOfItemsInCart();
