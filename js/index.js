import productList from "./data/productList.js";
import checkUndefined from "./components/checkUndefined.js";
var recommendedGames = document.querySelector(".recommended-wrapper");

productList.forEach(function(product){
    const cover = checkUndefined(product.cover,"-cover.png");
    const title = checkUndefined(product.title, " game");
    const price = checkUndefined(product.price, " price ");
    const rating = checkUndefined(product.rating);
    const description = checkUndefined(product.description, " description");
    const id = checkUndefined(product.id);

    recommendedGames.innerHTML += `
        <a href="gamepage.html?id=${id}" class="recommended">
            <div class="recommended__image">
                <img src="images/Products/${cover}"alt="${title} cover art" />
            </div>
            <div class="recommended__content">
                <h2>${title}</h2>
                <p class="price">${price}kr</p>
                <img src="images/rating/rating-${rating}.png" alt="${title} rating" />
                <p>${description}</p>
            </div>
        </a>
    `;
});

