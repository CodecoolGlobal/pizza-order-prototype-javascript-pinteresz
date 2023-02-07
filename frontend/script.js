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


const switchAllergens = function(pizzas){
     let updatedPizzas = JSON.parse(JSON.stringify(pizzas))
   
    let indexPizza = 0;
    let indexAllergen = 0;
    for(let pizza of pizzas){
            indexAllergen = 0;
        indexPizza++
        for(let allergen of pizza.allergens){
            indexAllergen++
            console.log('ALLERGENS: ', allergen)
            for(let allergenObject of allergensList){
                    console.log(allergenObject)
                    if(allergen === allergenObject["id"]){
                    // console.log(updatedPizzas[indexPizza].allergens[indexAllergen])
                    console.log(indexPizza);
                    console.log(updatedPizzas[indexPizza])
                      updatedPizzas[indexPizza].allergens[indexAllergen] = allergenObject["name"]           
                    
                }
            }
        }
    }

   
    
    console.log(updatedPizzas);
    return updatedPizzas
}





const pizzaElement = function (pizza) {
   // console.log("asd");
    return `<div class="pizza">Name: ${pizza["name"]} <br> Ingredients: ${pizza["ingredients"]} <br> Price: ${pizza["price"]} <br> Allergens: ${pizza["allergens"]}</div>`
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
    return `<button>${allergen}</button>`
}

console.log(allergensList)
const loadEvent = _ => {

    loadAllergens2()
        .then(allergens => allergens.map(allergen =>  document.getElementById("root"). insertAdjacentHTML("afterbegin", buttonElement(allergen))))
    // for (let i = 0; i < allergensList.length; i++){
    //     document.getElementById("root"). insertAdjacentHTML("afterbegin", buttonElement(allergensList[i].name))
    // }



    loadPizzas()
        .then(pizzas => switchAllergens(pizzas))
        .then(pizzas => printPizzas(pizzas))
};




window.addEventListener("load", loadEvent);