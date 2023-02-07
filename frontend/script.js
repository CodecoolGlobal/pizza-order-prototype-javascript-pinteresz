const pizzaElement = function (pizza) {
    console.log("asd");
    return `<div class="pizza">Name: ${pizza["name"]} <br> Ingredients: ${pizza["ingredients"]} <br> Price: ${pizza["price"]} <br> Allergens: ${pizza["allergens"]}</div>`
}

const printPizzas = function (pizzas) {
    const html =  pizzas.map(pizza => pizzaElement(pizza)).join("")
    console.log(html);
    document.getElementById("root").insertAdjacentHTML("beforeend",`<div class="pizzas">${html}</div>`)
}

const loadPizzas = function () {
    return fetch("/api/pizza")
    .then(res => res.json())
}

const loadEvent = _ => {
    loadPizzas()
        .then(pizzas => printPizzas(pizzas))
};




window.addEventListener("load", loadEvent);