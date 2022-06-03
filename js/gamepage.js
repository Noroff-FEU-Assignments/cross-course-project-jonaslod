import findInProducts from "./components/findInProducts.js";
import checkUndefined from "./components/checkUndefined.js";
import writeGenres from "./components/writeGenres.js";
import writeButton from "./components/writeButton.js";
import addToCart from "./components/addToCart.js";

const queryString = document.location.search;
const parameters = new URLSearchParams(queryString);
const id = parameters.get("id");

const product = findInProducts(id);

if(product){
    const title = checkUndefined(product.title, " game");
    const cover = checkUndefined(product.cover,"-cover.png");
    const genres = checkUndefined(product.genres);
    const release = checkUndefined(product.release, " release");
    const rating = checkUndefined(product.rating);
    const description = checkUndefined(product.description, " description");
    const price = checkUndefined(product.price, " price");
    const condition = checkUndefined(product.condition, " condition");

    document.querySelector(".gamepage__title").innerHTML = title;

    document.title = title + " | GameHub";
    
    document.querySelector(".game-overview").innerHTML = `
        <div class="game-overview__img">
            <img src="images/Products/${cover}"alt="${title} cover art" />
        </div>
        <div class="game-overview__attributes">
            <p class="game-system"><span class="bold">Platform: </span>PLAYBOX</p>
            <p class="game-genre">${writeGenres(genres)}</p>
            <p class="game-release"><span class="bold">Release: </span>${release}</p>
            <img src="images/rating/rating-${rating}.png" alt="${title} rating" />
            <a href="#" class="read_more">See reviews >></a>
        </div>
        <div class="game-overview__decription">
            <h2>Description</h2>
            <p>${description}</p>
        </div>
    `;
    
    document.querySelector(".condition").innerHTML = `
        <div class="condition-new">
            <p class="condition-price">${price}kr</p>
            <p>Condition: ${condition}</p>
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
        <div class="featured-products">
            <img src="images/Products/${cover}"alt="${title} cover art" />
            <h3>${title}</h3>
            <p>99kr</p>
            <p>Condition: Good</p>
        </div>
        <div class="featured-products">
            <img src="images/Products/${cover}"alt="${title} cover art" />
            <h3>${title}</h3>
            <p>110kr</p>
            <p>Condition: Good</p>
        </div>
        <div class="featured-products">
            <img src="images/Products/${cover}"alt="${title} cover art" />
            <h3>${title}</h3>
            <p>150kr</p>
            <p>Condition: As new</p>
        </div>
        <div class="featured-products last-product">
            <img src="images/Products/${cover}"alt="${title} cover art" />
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

else{
    document.title = "Could not find game | GameHub";
    document.querySelector("main").innerHTML = `
        <h1>Oops! Could not find game!</h1>
        <img src="images/Products/undefined-cover.png" alt="Could not find game" class="undefined-cover"/>
    `;
}