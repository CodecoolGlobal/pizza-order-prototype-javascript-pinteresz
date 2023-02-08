const express = require("express")
const apiRouter = require("./routes/api")
const app = express()
const fs = require('fs');
app.use(express.json())

app.use("/api", apiRouter)

const path = require("path");
app.use('/pizza/list', express.static(path.join(__dirname, "../frontend")))



// INSTEAD OF THESE WE SHOULD USE MIDDLEWARE
/*app.get("/pizza/list", (req, res) => {
  console.log("GET working");
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

app.get("/frontend/script.js", (req, res) => {
  console.log("GET working");
  res.sendFile(path.join(`${__dirname}/../frontend/script.js`));
});*/













// export function getData(){
//         return jsonData
// }


app.listen(3000)