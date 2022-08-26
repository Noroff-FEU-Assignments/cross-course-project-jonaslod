import getProducts from "./components/getProducts.js";
import checkUndefined from "./components/checkUndefined.js";
import writeGenres from "./components/writeGenres.js";
import writeButton from "./components/writeButton.js";
import addToCart from "./components/addToCart.js";
import showError from "./components/showError.js";
const resultContainer = document.querySelector(".result");
const searchBtn = document.querySelector(".game-search__btn");
searchBtn.onclick = () => handleSearch();
const searchInput = document.querySelector("#game-search__input");
const genres = document.querySelector(".category");
genres.addEventListener("change", event => sortByGenre(event.target));
const sort = document.querySelector(".sort-select");
sort.addEventListener("change", event => sortBySelect(event.target));

const baseUrl = "https://marieogjonas.com/jonas/skole/cross-course-project/wp-json/wc/store/products";
const products = await getProducts(baseUrl);

const queryString = document.location.search;
const parameters = new URLSearchParams(queryString);
const searchString = parameters.get("search");

try {
    if(searchString){
        showProducts(searchForProducts(searchString), searchString);
        searchInput.value = searchString;
    }
    else{
        showProducts(products);
    }
}
catch (error) {
    showError(error, resultContainer);
}

function showProducts(catalogue, userInput, sortingType){
    resultContainer.innerHTML = "";
    try {
        if(catalogue.length>0){
            catalogue.forEach(product => {
                let cover = "images/undefined-cover.png";
                let altText = "undefined alt text";
                if(product.images.length>0){
                    cover = checkUndefined(product.images[0].src, "images/undefined-cover.png");
                    altText = checkUndefined(product.images[0].alt, " alt text");
                }
                const title = checkUndefined(product.name, " game");
                let rating = "undefined-rating";
                if(product.tags.length>0){
                    rating = checkUndefined(product.tags[0].name, "-rating");
                }
                const description = checkUndefined(product.description, " description");
                const id = checkUndefined(product.id);
                const genres = checkUndefined(product.categories);
                const price = checkUndefined((product.prices.price/100), " price ");
    
                resultContainer.innerHTML+=`
                    <div class="game-result">
                        <div class="game-result__img">
                            <a href="gamepage.html?id=${id}"><img src="${cover}" alt="${altText}" /></a>
                        </div>
                        <div class="game-result__content">
                            <h2><a href="gamepage.html?id=${id}">${title}</a></h2>
                            <img src="images/rating/${rating}.png" alt="${title} rating" />
                            <p class="game-description">
                                ${writeDescription(description)}
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
            if(sortingType==="genre"){
                resultContainer.innerHTML = `<p>There are currently no games in the "${userInput}" genre.</p>`;
            }
            else{
                resultContainer.innerHTML = `<p>Could not find game containing "${userInput}" in our available products.</p>`;
            }
        }
    } 
    catch (error) {
        showError(error, resultContainer);
    }
}

function writeDescription(description){
    let descWithoutPTags = description.replace("<p>", "");
    descWithoutPTags = descWithoutPTags.replace("</p>", "");
    var shortDescription = "";
    for(var i=0; i<=60; i++){
        if(!descWithoutPTags[i]){
            break;
        }
        shortDescription+=descWithoutPTags[i];
    }
    shortDescription += " ...";
    return shortDescription;
}

function searchForProducts(search){
    const unsortedList = products;
    const sortedList = unsortedList.filter(prod => prod.name.toLowerCase().includes(search.toLowerCase()));
    return sortedList;
}

function handleSearch(){
    sort.value = "";
    uncheckGenre();
    const search = searchInput.value.trim();
    if(search){
        showProducts(searchForProducts(search), search);
    }
    else{
        showProducts(products);
    }
}

async function sortByGenre(radioInput){
    searchInput.value = "";
    sort.value = "";

    if(radioInput.name === "genre"){
        const genre = radioInput.dataset.genre;
        resultContainer.innerHTML = `
            <div>
                <p>Searching for games in the "${genre}" genre ...</p>
                <div class="loading"></div>
            </div>
        `;
        const sortedList = await getProducts(`${baseUrl}?category=${radioInput.value}`);
        showProducts(sortedList, genre, "genre");
    }
}

async function sortBySelect(selectOption){
    searchInput.value = "";
    uncheckGenre();
    document.querySelector("#sort-select__default").disabled=true;
    let listToSort = products;
    try {
        switch(selectOption.value){
            case "featured":
                resultContainer.innerHTML = `
                <div>
                    <p>Searching for featured games ...</p>
                    <div class="loading"></div>
                </div>`;
                listToSort = await getProducts(`${baseUrl}?featured=true`);
                break;
            case "alphabetical":
                listToSort.sort((a,b) => (a.name > b.name) ? 1 : -1);
                break;
            case "price_low-high":
                listToSort.sort((a,b) => (parseInt(a.prices.price) > parseInt(b.prices.price)) ? 1 : -1);
                break;
            case "price_high-low":
                listToSort.sort((a,b) => (parseInt(a.prices.price) < parseInt(b.prices.price)) ? 1 : -1);
                break;
            case "user_review":
                listToSort.sort((a,b) => (parseInt(a.tags[0].name.replace("rating-", "")) < parseInt(b.tags[0].name.replace("rating-", ""))) ? 1 : -1);
                break;
        }
        showProducts(listToSort);
    }
    catch (error) {
        const err = `Could not sort games.`;
        showError(err, resultContainer);
    }
}

function uncheckGenre(){
    const genreList = document.getElementsByName("genre");
    genreList.forEach((genre) => {
        genre.checked = false;
    });
}