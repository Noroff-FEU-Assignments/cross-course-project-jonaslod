import getProducts from "./components/getProducts.js";
import checkUndefined from "./components/checkUndefined.js";
import writeGenres from "./components/writeGenres.js";
import writeButton from "./components/writeButton.js";
import addToCart from "./components/addToCart.js";
import showError from "./components/showError.js";

const queryString = document.location.search;
const parameters = new URLSearchParams(queryString);
const id = parameters.get("id");

const url = `https://marieogjonas.com/jonas/skole/cross-course-project/wp-json/wc/store/products/${id}`;

const product = await getProducts(url);

try {
    const title = checkUndefined(product.name, " game");
    let cover = "images/undefined-cover.png";
    let altText = "undefined alt text";
    if(product.images.length>0){
        cover = checkUndefined(product.images[0].src, "images/undefined-cover.png");
        altText = checkUndefined(product.images[0].alt, " alt text");
    }
    const genres = checkUndefined(product.categories);
    let rating = "undefined-rating";
    if(product.tags.length>0){
        rating = checkUndefined(product.tags[0].name, "-rating");
    }
    const description = checkUndefined(product.description, " description");
    const price = checkUndefined((product.prices.price/100), " price ");

    document.querySelector(".gamepage__title").innerHTML = title;

    document.title = title + " | GameHub";
    
    document.querySelector(".game-overview").innerHTML = `
        <div class="game-overview__img">
        <img src="${cover}" alt="${altText}" />
        </div>
        <div class="game-overview__attributes">
            <p class="game-system"><span class="bold">Platform:</span> PLAYBOX</p>
            <p class="game-genre">${writeGenres(genres)}</p>
            <p class="game-release"><span class="bold">Release:</span> 01/01/1970</p>
            <img src="images/rating/${rating}.png" alt="${title} rating" />
            <a href="#" class="read_more">See reviews >></a>
        </div>
        <div class="game-overview__decription">
            <h2>Description</h2>
            ${description}
        </div>
    `;
    
    document.querySelector(".condition").innerHTML = `
        <div class="condition-new">
            <p class="condition-price">${price}kr</p>
            <p>Condition: new</p>
            <p>Available</p>
            <div class="condition-new__cta-wrapper">
                ${writeButton(product)}
            </div>
        </div>
        <div class="condition-used">
            <p class="condition-price">from 99kr</p>
            <p>Condition: used</p>
            <p>Available</p>
            <a href="#sold-by-users" class="cta">View offers</a>
        </div>
    `;
    
    if(document.querySelector(".not-in-cart")){
        document.querySelector(".not-in-cart").onclick = function(event){addToCart(event.target)};
    }
    
    document.querySelector(".sold-by-users").innerHTML += `
        <h2>Game copies sold by users</h2>
        <div class="featured-products">
            <img src="${cover}" alt="${altText}" />
            <h3>${title}</h3>
            <p>99kr</p>
            <p>Condition: Good</p>
        </div>
        <div class="featured-products">
            <img src="${cover}" alt="${altText}" />
            <h3>${title}</h3>
            <p>110kr</p>
            <p>Condition: Good</p>
        </div>
        <div class="featured-products">
            <img src="${cover}" alt="${altText}" />
            <h3>${title}</h3>
            <p>150kr</p>
            <p>Condition: As new</p>
        </div>
        <div class="featured-products last-product">
            <img src="${cover}" alt="${altText}" />
            <h3>${title}</h3>
            <p>299kr</p>
            <p>Condition: New</p>
        </div>
        <div class="view-more">
            <a href="#">
                <img src="images/Icons/View-more.png" alt="View more arrow" class="icon-view_more" />
                View more
            </a>
        </div>
    `;
} 
catch (error) {
    document.title = "Could not find game | GameHub";
    const err = `
        Could not selected game in our catalogue.
        <br/>
        <img src="images/undefined-cover.png" alt="Could not find game" class="undefined-cover"/>
    `;
    showError(err, document.querySelector("main"));
}