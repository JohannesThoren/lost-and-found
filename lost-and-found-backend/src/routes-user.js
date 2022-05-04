require('./database')
const db = require("./database");

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
}