const formElement = function (){
    return `
    <form id="orderForm" class="hidden">
           
       <div>
        <fieldset>
        <legend>Contact information</legend>
            <label for="fname">Name:</label><br>
            <input type="text" id="name" placeholder="Name"><br>
            <label for="email">Email:</label><br>
            <input type="email" id="email" placeholder="Email"><br>
            <label for="adressCity">Adress City:</label><br>
            <input type="text" id="adressCity" placeholder="City"><br>
            <label for="street">Street:</label><br>
            <input type="text" id="street" placeholder="Street"><br> 
                
            <button type="submit">Submit Order</button><br><br>
        </fieldset>
       </div>
   </form>`
}

const cartElement = function (){
    return `
    <div id="shoppingCart" class="hidden">
        <div>Pizza name:  Amount:</div>
        <button id="orderDeleteButton">Delete order</button>
    </div>`
}

/* <fieldset>
<legend>Personalia:</legend>
<label for="fname">First name:</label><br>
<input type="text" id="fname" name="fname" value="John"><br>
<label for="lname">Last name:</label><br>
<input type="text" id="lname" name="lname" value="Doe"><br><br>
<input type="submit" value="Submit">
</fieldset> */

let shoppingCart = []


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
            result.push(` ${allergensList[i].name}`)
        }
    }
    return result
}





const pizzaElement = function (pizza) {
    return `<div class="pizza">Name: ${pizza["name"]} <br> Ingredients: ${pizza["ingredients"]} <br> Price: ${pizza["price"]} <br> Allergens: ${switchAllergens(pizza["allergens"])}
    <br><input id="input${pizza.id}" type="number" min="1" placeholder="Amount" class="amountButton">
    <button id="button${pizza.id}" class="cartButton">Add to cart</button></div>`
}


const printPizzas = function (pizzas) {
    const html =  pizzas.map(pizza => pizzaElement(pizza)).join("")
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
    document.getElementById("root").insertAdjacentHTML("afterbegin", cartElement())
    document.getElementById("root").insertAdjacentHTML("afterbegin", formElement())
    document.getElementById("root").insertAdjacentHTML("afterbegin", `<div class="buttonsDiv" id="buttonsDiv"></div>`)
    document.getElementById("buttonsDiv").insertAdjacentHTML("beforeend", `<button class="fakeAllergenButton">Filter your pizza by allergens</button>`)
    loadAllergens2()
        .then(allergens => allergens.map(allergen =>  document.getElementById("buttonsDiv"). insertAdjacentHTML("beforeend", buttonElement(allergen["name"]))))
    // for (let i = 0; i < allergensList.length; i++){
    //     document.getElementById("root"). insertAdjacentHTML("afterbegin", buttonElement(allergensList[i].name))
    // }



    loadPizzas()
        .then(pizzas => printPizzas(pizzas))

}
let filterBy= []

const clickEvent = function(event){
    
    const allergens = []
    allergensList.forEach(element => {
        allergens.push(element.name)
    });
    
    //allergens buttons
    
    if(allergens.includes(event.target.textContent)){
        filterBy.push(event.target.textContent)
        loadEvent()
    }

    //order buttons
    if(event.target.classList[0] === "cartButton"){
        let id = event.target.id.slice(6)
         shoppingCart.push(
            {
            id: id,
            amount: document.getElementById(`input${id}`).value
         }
         )
         document.querySelector('#orderForm').classList.remove('hidden');
         document.querySelector('#shoppingCart').classList.remove('hidden');
         console.log(shoppingCart);
    }

}



window.addEventListener("click", clickEvent);
window.addEventListener("load", loadEvent);


// const shoppingCart = [];

/*button.addEventListener(..., (e) => {
    const amount = querySelector...... .value;
    const pizzaId = ...
  
    shoppingCart.push({ amount, pizzaId })
  });
  
  
  document.querySelector('#order-form').classList.remove('hidden');
  
  .hidden {
  display: none;
}

preventdefault a submit buttonje
form add.eventlist sumbit*/