const db = require('../db/db')

module.exports = (app) => {
    app.get("/contact/me/:token", async (req, res) => {
        res.send(await db.contact_info.get_contact_with_token(db.client, req.params.token))
    })

    app.post("/contact/add/:token", async (req, res) => {
        if (await db.contact_info.add_contact_info(db.client, req.params.token, req.body.type, req.body.value)) {
            res.send("added contact info")
        } else {
            res.send("could not add info")
        }
    })

    app.put("/contact/update/:token", async (req, res) => {
        if (await db.contact_info.update_contact_info(db.client, req.params.token, req.body.type, req.body.value)) {
            res.send("updated contact info")
        } else {
            res.send("could not update info")
        }
    })
}