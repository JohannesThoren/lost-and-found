
const dotenv = require('dotenv')

dotenv.config()

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const port = 3000

const database = require("./src/database")

// all routes go here
const item_routes = require("./src/routes-item")(app)
const user_routes = require("./src/routes-user")(app)




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})