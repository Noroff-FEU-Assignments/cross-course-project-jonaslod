import getProducts from "./components/getProducts.js";
import checkUndefined from "./components/checkUndefined.js";
import showError from "./components/showError.js";
var recommendedGames = document.querySelector(".recommended-wrapper");
const products = await getProducts("https://marieogjonas.com/jonas/skole/cross-course-project/wp-json/wc/store/products?featured=true");

try {
    if(products.length>0){
        recommendedGames.innerHTML = "";
        products.forEach(function(product){
            let cover = "images/undefined-cover.png";
            let altText = "undefined alt text";
            if(product.images.length>0){
                cover = checkUndefined(product.images[0].src, " image");
                altText = checkUndefined(product.images[0].alt, " alt text");
            }
            const title = checkUndefined(product.name, " game");
            const price = checkUndefined((product.prices.price/100), " price ");
            let rating = "undefined-rating";
            if(product.tags.length>0){
                rating = checkUndefined(product.tags[0].name, "-rating");
            }
            const description = checkUndefined(product.description, " description");
            const id = checkUndefined(product.id);
        
            recommendedGames.innerHTML += `
                <a href="gamepage.html?id=${id}" class="recommended">
                    <div class="recommended__image">
                        <img src="${cover}" alt="${altText}" />
                    </div>
                    <div class="recommended__content">
                        <h2>${title}</h2>
                        <p class="price">${price}kr</p>
                        <img src="images/rating/${rating}.png" alt="${title} rating" />
                        ${description}
                    </div>
                </a>
            `;
        });
    }
    else{
        showError("Could not find recommended games", recommendedGames);
    }
}
catch (error) {
    showError(error, recommendedGames);
}