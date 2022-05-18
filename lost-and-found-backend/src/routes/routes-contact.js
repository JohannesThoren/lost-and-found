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

    app.delete("/contact/delete/:id/:token", async (req, res) => {
        await db.contact_info.delete_contact_info_with_contact_info_id(db.client, req.params.token, req.params.id)
        res.send('poof!')
    })

    app.put("/contact/update/:token", async (req, res) => {
        if (await db.contact_info.update_contact_info(db.client, req.params.token, req.body.type, req.body.value)) {
            res.send("updated contact info")
        } else {
            res.send("could not update info")
        }
    })
}