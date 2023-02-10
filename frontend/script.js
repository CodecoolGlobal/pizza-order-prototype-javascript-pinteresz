// Order form HTML element
const formElement = function (){
    return `
    <form id="orderForm" class="hidden">
       <div>
        <fieldset>
        <legend>Contact information</legend>
            <label for="fname">Name:</label><br>
            <input type="text" id="inputName" placeholder="Name"><br>
            <label for="email">Email:</label><br>
            <input type="email" id="inputEmail" placeholder="Email"><br>
            <label for="adressCity">Address City:</label><br>
            <input type="text" id="inputAddressCity" placeholder="City"><br>
            <label for="street">Street:</label><br>
            <input type="text" id="inputAddressStreet" placeholder="Street"><br><br> 
                
            <button type="submit" id="submitOrderButton">Submit Order</button><br><br>
        </fieldset>
       </div>
   </form>`
}

// Shopping cart HTML element part 1
const cartElement = function (){
    return `
    <div id="shoppingCart" class="hidden">    
    </div>`
}

// Shopping cart HTML elemnt part 2, so that we can update it 
let cartId = 0
let shoppingCartCounter = 0

const updateCart = function (id, amount, cartId){
    document.getElementById("shoppingCart").insertAdjacentHTML('beforeend',
        `<div id="cartOption${cartId}" class="pizzaAmount">Pizza name: ${pizzaList[id-1].name} ${amount} pieces
        <button id="orderDeleteButton${cartId}" class="orderDeleteButton">Delete order</button></div>`
    )
    shoppingCartCounter++
}

// ShoppingCart array
let shoppingCart = []

// We use this in loadEvent to create the allergen buttons
const loadAllergens2 = function (){
    return fetch("/api/allergens")
        .then(res => res.json())
}

// To get the allergensList
let allergensList;

const loadAllergens = function (){
    return fetch("/api/allergens")
        .then(res => res.json())
        .then(data => {
            allergensList = data;
        })
        .then(() => {
            console.log(allergensList);
        });
}

// Fetching the data from "/api/pizza" GET endpoint to create pizzaList
let pizzaList;

const createPizzaVar = function (){
    return fetch("/api/pizza")
        .then(res => res.json())
        .then(data => {
            pizzaList = data;
        })
        .then(() => {
            console.log(pizzaList);
        });
}

// Calling these functions
loadAllergens()
createPizzaVar()


// Switching the allergens' id number to their names
const switchAllergens = function (allergens){
    const result = []
    for(let i = 0; i < allergensList.length; i++){
        if(allergens.includes(allergensList[i].id)){
            result.push(` ${allergensList[i].name}`)
        }
    }
    return result
}

// Pizza HTML element to show the name, ingredients, price and allergens of the pizza / and an amount input + Add to cart button
// We call the switchAllergens() here
const pizzaElement = function (pizza){
    return `
    <div class="pizza" id="pizza${pizza.id}">
        Name: ${pizza["name"]} <br> 
        Ingredients: ${pizza["ingredients"]} <br> 
        Price: ${pizza["price"]} <br> 
        Allergens: ${switchAllergens(pizza["allergens"])} <br>
        <input id="input${pizza.id}" type="number" min="1" placeholder="Amount" class="amountButton">
        <button id="button${pizza.id}" class="cartButton">Add to cart</button>
    </div>`
}

// To show all the pizzas on the screen
const printPizzas = function (pizzas){
    const html =  pizzas.map(pizza => pizzaElement(pizza)).join("")
    document.getElementById("root").insertAdjacentHTML("beforeend",`<div class="pizzas">${html}</div>`)
}

const loadPizzas = function (){
    return fetch("/api/pizza")
        .then(res => res.json())     
}

// To change the color of the allergen buttons when we click on them and then back when we click again
const changeButtonClr = function (id){
    console.log(document.getElementById(id).style.backgroundColor);
    if( document.getElementById(id).style.backgroundColor == 'darkred'){
        document.getElementById(id).style.backgroundColor ='red'
    } else {
        document.getElementById(id).style.backgroundColor ='darkred'
    }
}

// Allergen buttons HTML element
const buttonElement = function(allergen, id) {
    return `<button type="button" class="allergenButton" id="allergen${id}">${allergen}</button>`
}


// Use loadEvent() to display the elements
const loadEvent = _ => {
    document.getElementById("root").insertAdjacentHTML("beforeend", formElement())
    document.getElementById("root").insertAdjacentHTML("beforeend", cartElement())
    
    document.getElementById("root").insertAdjacentHTML("beforeend", `<div class="buttonsDiv" id="buttonsDiv"></div>`)
    document.getElementById("buttonsDiv").insertAdjacentHTML("beforeend", `<button class="fakeAllergenButton">Filter your pizza by allergens</button>`)
    document.getElementById("buttonsDiv").insertAdjacentHTML("beforeend", `<button class="resetFilter">Reset filter</button>`)
    
    loadAllergens2()
        .then(allergens => allergens.map(allergen =>  document.getElementById("buttonsDiv"). insertAdjacentHTML("beforeend", buttonElement(allergen["name"], allergen.id))))
   

    loadPizzas()
        .then(pizzas => printPizzas(pizzas))
}


let filterBy = []

// We use clickEvent for all clicks --> we inspect the textContent or the classList of the currently clicked button
const clickEvent = function(event){
    
    //Allergens list with name
    const allergens = []
    allergensList.forEach(element => {
        allergens.push(element.name)
    });

    //Allergens filter
    if (event.target.classList[0] === 'allergenButton'){
        for (let pizza of pizzaList){
            document.getElementById(`pizza${pizza.id}`).classList.remove("hidden")
        }
        // console.log(filterBy);

        if (!filterBy.includes(parseInt(event.target.id.slice(8)))){
            filterBy.push(parseInt(event.target.id.slice(8)))
        } else {
            filterBy = filterBy.filter(allergen => allergen !== parseInt(event.target.id.slice(8)))
        }
        // console.log(filterBy);

        for (let pizza of pizzaList){
           for (let allergen of pizza.allergens){
                if (filterBy.includes(allergen)){
                    document.getElementById(`pizza${pizza.id}`).classList.add("hidden")
                }         
            }
        }

        //Allergens buttons color change
        changeButtonClr(event.target.id)
    }

    //Reset filter button
    if (event.target.classList[0] === "resetFilter"){
        for (let pizza of pizzaList){
            filterBy = []
            document.getElementById(`pizza${pizza.id}`).classList.remove("hidden")
        }

        for (let allergen of allergensList){
            console.log(allergen.id);
            document.getElementById(`allergen${allergen.id}`).style.backgroundColor ='red'
        }
    }  
    
    //Order buttons
    if (event.target.classList[0] === "cartButton"){
        let id = event.target.id.slice(6)
        // console.log(id)
        let amount = document.getElementById(`input${id}`).value

        shoppingCart.push({
            cartId: cartId,
            id: id,
            amount: amount
        })

        document.querySelector('#orderForm').classList.remove('hidden');
        document.querySelector('#shoppingCart').classList.remove('hidden');
        updateCart(id, amount, cartId)
        cartId++
    }

    //Delete order
    if (event.target.classList[0] === 'orderDeleteButton'){
        shoppingCartCounter--

        let id = event.target.id.slice(17)
        shoppingCart = shoppingCart.filter(option => option.cartId != id)

        document.getElementById(`cartOption${id}`).remove()
        console.log(shoppingCart);
        // console.log("childnodes",document.getElementById("shoppingCart").childNodes.length);

        if (shoppingCartCounter === 0){
            document.getElementById("shoppingCart").classList.add('hidden')
            document.getElementById("orderForm").classList.add('hidden')
            document.getElementById("inputName").value = ""
            document.getElementById("inputEmail").value = ""
            document.getElementById("inputAddressCity").value = ""
            document.getElementById("inputAddressStreet").value = ""
        }
    }

    //Submit button
    if (event.target.id === 'submitOrderButton'){
        event.preventDefault()
        const date = new Date()

        objectForm = {
            "id": orderId,
            "pizzas": shoppingCart,
            "date": {
                "year": date.getFullYear(),
                "month": date.getMonth()+1,
                "day": date.getDate(),
                "hour": date.getHours(),
                "minute": date.getMinutes()
            },
            "customer": {
                "name": `${document.getElementById("inputName").value}`,
                "email": `${document.getElementById("inputEmail").value}`,
                "address": {
                    "city": `${document.getElementById("inputAddressCity").value}`,
                    "street": `${document.getElementById("inputAddressStreet").value}`
                }
            }
        }
        console.log(objectForm);
        postOrder(objectForm)
        orderId++
    }
}
//------------- END clickEvent -------------

let objectForm
let orderId = 0

async function postOrder(formData){
    try {
        let resp = await fetch("http://localhost:3000/api/order",{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        let data = await resp.json()
        return data

    } catch(error) {
        return error
    }
}

window.addEventListener("click", clickEvent);
window.addEventListener("load", loadEvent);


// const shoppingCart = [];

// button.addEventListener(..., (e) => {
//     const amount = querySelector...... .value;
//     const pizzaId = ...
  
//     shoppingCart.push({ amount, pizzaId })
//   });
  
  
//   document.querySelector('#order-form').classList.remove('hidden');
  
//   .hidden {
//   display: none;
// }

// preventdefault a submit buttonje
// form add.eventlist sumbit