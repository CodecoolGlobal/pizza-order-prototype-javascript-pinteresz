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



let jsonData;
try {
    const data = fs.readFileSync('pizza.json', 'utf8');

    jsonData = JSON.parse(data);
    //console.log(jsonData);
}
catch (err) {
    console.error(err);
    }



apiRouter.get("/", (req, res) => {
    res.send("HELLO XD")
})

apiRouter.get("/pizza", async (req, res) =>{

//   const fileData = await fileReaderAsync(filePath);
//   const pizzas = JSON.parse(fileData)
  res.json(jsonData["pizzas"])
})


apiRouter.get("/allergens", async (req, res) =>{

    //   const fileData = await fileReaderAsync(filePath);
    //   const pizzas = JSON.parse(fileData)
      res.json(jsonData["allergens"])
})




module.exports = apiRouter




