
const dotenv = require('dotenv')

dotenv.config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const port = 3001

// all routes go here
const item_routes = require("./src/routes/routes-item")(app)
const user_routes = require("./src/routes/routes-user")(app)
const contact_routes = require("./src/routes/routes-contact")(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})