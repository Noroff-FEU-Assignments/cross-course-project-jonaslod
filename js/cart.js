import getCart from "./components/getCart.js";
import checkUndefined from "./components/checkUndefined.js";
import findInCart from "./components/findInCart.js";
import updateCart from "./components/updateCart.js";
const cartOverview = document.querySelector(".cart-overview");
const cartAlert = document.querySelector(".cart-alert");
const totalPriceContainer = document.querySelector(".cart-price__sum");
const checkoutButtons = document.querySelectorAll(".cta-light");

function showCart(){
    const cart = getCart();
    
    if(cart.length>0){
        cartOverview.innerHTML = "";
        let totalPrice = 0;
    
        cart.forEach(product => {
            const id = checkUndefined(product.id);
            let cover = "images/undefined-cover.png";
            let altText = "undefined alt text";
            if(product.images.length>0){
                cover = checkUndefined(product.images[0].src, "images/undefined-cover.png");
                altText = checkUndefined(product.images[0].alt, " alt text");
            }
            const title = checkUndefined(product.name, " game");
            const price = checkUndefined((product.prices.price/100), " price ");

            cartOverview.innerHTML += `
                <div class="selected-game" id="${id}-wrapper">
                    <div class="selected-game__remove">
                        <button class="remove-game" data-id="${id}">
                            <img src="images/Icons/Remove.png" alt="Remove game icon"/>
                            <span class="remove-game-label">Remove</span>
                        </button>
                    </div>
                    <div class="selected-game__img">
                        <img src="${cover}" alt="${altText}" />
                    </div>
                    <div class="selected-game__content">
                        <h2>${title}</h2>
                        <a href="gamepage.html?id=${id}" class="cart-link">View game >></a>
                        <p class="game-condition">Condition: new</p>
                    </div>
                    <div class="selected-game__price">
                        <p>${price}kr</p>
                    </div>
                </div>`;
            totalPrice+=price;
        });

        if(!totalPrice || typeof totalPrice !== "number"){
            totalPrice = "Could not calculate"; //instead of NaN, which tells the user nothing
        }
        else{
            totalPrice += "kr";
        }

        totalPriceContainer.innerHTML = totalPrice

        const removeButtons = document.querySelectorAll(".remove-game");
        removeButtons.forEach(btn => {
            btn.onclick = function(){
                const productToRemoveId = this.dataset.id;
                const productToRemove = findInCart(productToRemoveId);
                const removedTitle = checkUndefined(productToRemove.name, " game");
                const updatedCart = getCart().filter(prod => prod.id !== parseInt(productToRemoveId));
                updateCart(updatedCart);

                if(getCart().length===0){
                    checkoutButtons.forEach(btn => btn.href = "");
                }
                    
                const message = `<span class="bold">${removedTitle}</span> was removed from your cart`;

                const productWrapper = document.getElementById(`${productToRemoveId}-wrapper`);
                productWrapper.innerHTML = `<div class="selected-game__content">${message}</div>`;
                productWrapper.classList.add("alert-inside");

                const alert = document.createElement("p");
                alert.innerHTML = message;
                alert.setAttribute("id", productToRemoveId+"-alert");
                alert.setAttribute("class", "alert-outside");
                cartAlert.appendChild(alert);

                setTimeout(() => {
                        document.getElementById(productToRemoveId+"-alert").style.display = "none";
                        showCart();
                }, 2500);
            };
        });
    }

    else{
        cartOverview.innerHTML = `<div class="cart-is-empty">Cart is empty</div>`;
        document.querySelector(".cart-specs").style.display = "none";
        document.querySelector(".cart-price").style.display = "none";
        document.querySelectorAll(".cta-light").forEach(btn => btn.style.display = "none");
    }
}

showCart();