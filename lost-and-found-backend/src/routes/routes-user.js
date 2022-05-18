const db = require('../db/db')

module.exports = (app) => {
    app.post("/user/new", async (req, res) => {
        let body = {username: "", password: "", email: ""};
        body = req.body;
        if (await db.user.new_user(db.client, body.username, body.password, body.email))
            res.send({msg: "user created", code: 201})
        else
            // TODO change code here to an proprietor one
            res.send({msg: "a user with that name or email address already exists", code: 0})
    });

    app.post("/user/auth", async (req, res) => {
        let response = await db.user.auth(db.client, req.body.username, req.body.password)
        res.send(response)
    })

    // this gets all data from the database of the signed-in user
    // this will only be possible to access if a token is used.
    app.get("/user/me/:token", async (req, res) => {
        res.send(await db.user.get_user_with_token(db.client, req.params.token))
    })

    app.get("/user/me/items/:token", async (req, res) => {
        res.send(await db.user.get_items_with_token(db.client, req.params.token))
    })

    app.get("/user/me/contact/:token", async (req, res) => {
        res.send(await db.contact_info.get_contact_with_token(db.client, req.params.token))
    })

    app.post("/user/me/add/contact/:token", async (req, res) => {
        if (await db.contact_info.add_contact_info(db.client, req.params.token, req.body.type, req.body.value)) {
            res.send("added contact info")
        } else {
            res.send("could not add info")
        }
    })
}