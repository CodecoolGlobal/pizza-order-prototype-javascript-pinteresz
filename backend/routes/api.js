const express = require("express")
const apiRouter = express.Router()
const fs = require('fs');
// const path = require("path");
// const filePath = path.join(`${__dirname}/pizza.json`);
// const { readFile } = require("fs/promises");

// const fileReaderAsync = async (filePath) => {
// 	try {
// 		return await readFile(filePath);
// 	} catch (error) {
// 		console.error(`File reading error: ${error.message}`);
// 	}
// };


apiRouter.get("/", (req, res) => {
    res.send("HELLO XD")
})

apiRouter.get("/pizza", (req, res) => {
    let jsonData;
    try {
        const data = fs.readFileSync('backend/pizza.json', 'utf8');
        jsonData = JSON.parse(data);
        //console.log(jsonData);
    }
    catch (err) {
        console.error(err);
    }

    res.json(jsonData.pizzas)
})


apiRouter.get("/allergens", (req, res) => {
    let jsonData;
    try {
        const data = fs.readFileSync('backend/pizza.json', 'utf8');
        jsonData = JSON.parse(data);
        //console.log(jsonData);
    }
    catch (err) {
        console.error(err);
    }

    res.json(jsonData.allergens)
})


// /api/order Pizza order endpoint task
let orderList = [];
apiRouter.get("/order", (req, res) =>{
    res.json(orderList)
   

})


apiRouter.post("/order", (req, res) =>{
   
    orderList.push(req.body)
    res.send("done")
   

})



module.exports = apiRouter




