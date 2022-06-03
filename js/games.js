import productList from "./data/productList.js";
import checkUndefined from "./components/checkUndefined.js";
import writeGenres from "./components/writeGenres.js";
import writeButton from "./components/writeButton.js";
import addToCart from "./components/addToCart.js";
const resultContainer = document.querySelector(".result");
const searchBtn = document.querySelector(".game-search__btn");
searchBtn.onclick = () => handleSearch();

const queryString = document.location.search;
const parameters = new URLSearchParams(queryString);
const searchString = parameters.get("search");

if(searchString){
    showProducts(searchForProducts(searchString), searchString);
    document.querySelector("#game-search__input").value = searchString;
}
else{
    showProducts(productList);
}

function showProducts(catalogue, search){
    resultContainer.innerHTML = "";

    if(catalogue.length>0){
        catalogue.forEach(product => {
            const cover = checkUndefined(product.cover,"-cover.png");
            const title = checkUndefined(product.title, " game");
            const rating = checkUndefined(product.rating);
            const description = checkUndefined(product.description, " description");
            const id = checkUndefined(product.id);
            const genres = checkUndefined(product.genres);
            const price = checkUndefined(product.price, " price ");

            resultContainer.innerHTML+=`
                <div class="game-result">
                    <div class="game-result__img">
                        <a href="gamepage.html?id=${id}"><img src="images/Products/${cover}"alt="${title} cover art" /></a>
                    </div>
                    <div class="game-result__content">
                        <h2><a href="gamepage.html?id=${id}">${title}</a></h2>
                        <img src="images/rating/rating-${rating}.png" alt="${title} rating" />
                        <p class="game-description">${writeDescription(description)}
                            <a href="gamepage.html?id=${id}" class="gamepage-link">Read more >></a>
                        </p>
                        <p>${writeGenres(genres)}</p>
                    </div>
                    <div class="game-result__cta">${writeButton(product)}<p class="price">${price}kr</p></div>
                </div>
            `;
        });
    
        const cartButtons = document.querySelectorAll(".not-in-cart");
        cartButtons.forEach(btn => {
            btn.onclick = function(event){addToCart(event.target)}
        });
    }

    else{
        resultContainer.innerHTML = `<p>Could not find game containing "${search}" in our available products.</p>`;
    }
}

function writeDescription(description){
    var shortDescription = "";
    for(var i=0; i<=60; i++){
        if(!description[i]){
            break;
        }
        shortDescription+=description[i];
    }
    shortDescription += " ...";
    return shortDescription;
}

function searchForProducts(search){
    const unsortedList = productList;
    const sortedList = unsortedList.filter(prod => prod.title.toLowerCase().includes(search.toLowerCase()));
    return sortedList;
}

function handleSearch(){
    const search = document.querySelector("#game-search__input").value.trim();
    if(search){
        showProducts(searchForProducts(search), search);
    }
    else{
        showProducts(productList);
    }
}