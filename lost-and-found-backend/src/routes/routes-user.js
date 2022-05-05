require('../db/database')
const db = require("../db/database");
const {add_contact_information, get_user_data_by_token} = require("../db/database");

module.exports = (app) => {
    app.post("/user/new", async (req, res) => {
        let body = {username: "", password: "", email: ""};
        body = req.body;
        if (await db.create_new_user(body.username, body.password, body.email))
            res.send({msg: "user created", code: 201})
        else
            // TODO change code here to an proprietor one
            res.send({msg: "a user with that name or email address already exists", code: 0})
    });

    app.post("/user/auth", async (req, res) => {
        console.log(req.body)
        let x = await db.auth(req.body.username, req.body.password)
        res.send(x)
    })

    // this gets all data from the database of the signed-in user
    // this will only be possible to access if a token is used.
    app.get("/user/me/:token", async (req, res) => {
        res.send(await db.get_user_data_by_token(req.params.token))
    })

    app.post("/user/contact/:token", async (req, res) => {
        let user_data = await db.get_user_data_by_token(req.params.token)
        if (await db.add_contact_information(req.body.type, req.body.value, user_data.rows[0].uuid)) {
            res.send("added contact info")
        }
        else {
            res.send("could not add info")
        }
    })
}