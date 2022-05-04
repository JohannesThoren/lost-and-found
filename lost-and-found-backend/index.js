const express = require('express')
const app = express()
const port = 3000

const item_routes = require("./src/routes-item")(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})