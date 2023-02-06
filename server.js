const express = require("express")
const apiRouter = require("./routes/api")
const app = express()

app.use("/api", apiRouter)

// app.get("/", (req, res) => {
//     res.send("HELLO XD")
// })

app.listen(3000)