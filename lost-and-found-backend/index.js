
const dotenv = require('dotenv')

dotenv.config()

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const port = 3000

const database = require("./src/db/database")

// all routes go here
const item_routes = require("./src/routes/routes-item")(app)
const user_routes = require("./src/routes/routes-user")(app)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})