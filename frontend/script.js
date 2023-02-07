const loadAllergens2 = function(){
    return fetch("/api/allergens")
    .then(res => res.json())
}


let allergensList;
const loadAllergens = function(){
    return fetch("/api/allergens")
    .then(res => res.json())
    .then(data => {
        allergensList = data;
    })
    .then(() => {
        console.log(allergensList);
    });
}
    
loadAllergens()


const switchAllergens = function(allergens){
    const result = []
    for(let i = 0; i < allergensList.length; i++){
        if(allergens.includes(allergensList[i].id)){
            result.push(" " + allergensList[i].name)
        }
    }
    return result
}





const pizzaElement = function (pizza) {
   // console.log("asd");
    return `<div class="pizza">Name: ${pizza["name"]} <br> Ingredients: ${pizza["ingredients"]} <br> Price: ${pizza["price"]} <br> Allergens: ${switchAllergens(pizza["allergens"])}</div>`
}

const printPizzas = function (pizzas) {
    const html =  pizzas.map(pizza => pizzaElement(pizza)).join("")
   // console.log(html);
    document.getElementById("root").insertAdjacentHTML("beforeend",`<div class="pizzas">${html}</div>`)
}



const loadPizzas = function () {
    return fetch("/api/pizza")
        .then(res => res.json())
}


const buttonElement = function(allergen) {
    return `<button type="button" class="allergenButton">${allergen}</button>`
}

//console.log(allergensList)
const loadEvent = _ => {

    document.getElementById("root").insertAdjacentHTML("beforebegin", `<div class="buttonsDiv" id="buttonsDiv"></div>`)
    document.getElementById("buttonsDiv").insertAdjacentHTML("beforeend", `<button class="falseAllergenButton">Filter your pizza by allergens</button>`)
    loadAllergens2()
        .then(allergens => allergens.map(allergen =>  document.getElementById("buttonsDiv"). insertAdjacentHTML("beforeend", buttonElement(allergen["name"]))))
    // for (let i = 0; i < allergensList.length; i++){
    //     document.getElementById("root"). insertAdjacentHTML("afterbegin", buttonElement(allergensList[i].name))
    // }



    loadPizzas()
     //   .then(pizzas => switchAllergens(pizzas))
        .then(pizzas => printPizzas(pizzas))
};




window.addEventListener("load", loadEvent);