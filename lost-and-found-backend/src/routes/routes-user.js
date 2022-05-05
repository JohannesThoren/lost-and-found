require('../db/database')
const db = require("../db/database");

module.exports = (app) => {
    app.post("/user/new", async (req, res) => {
        let body = {username: "", password: "", email: ""};
        body = req.body;
        if (await db.user.create_new_user(body.username, body.password, body.email))
            res.send({msg: "user created", code: 201})
        else
            // TODO change code here to an proprietor one
            res.send({msg: "a user with that name or email address already exists", code: 0})
    });


    // this gets all data from the database of the signed-in user
    // this will only be possible to access if a token is used.
    app.get("/user/me/:token", async (req, res) => {
        res.send(await db.user.get_user_data_by_token(req.params.token))
    })

    app.get("/user/uuid/:uuid", async (req, res) => {

    })
}