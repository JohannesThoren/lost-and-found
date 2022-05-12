const db = require('../db/db')
const {client} = require("../db/db");
module.exports = (app) => {

    // add a new item to the database
    // the token is the user specific token which is assigned to a specific user
    app.post("/item/new/:token", async (req, res) => {
        let user = await db.user.get_user_with_token(db.client, req.params.token)
        let item_name = req.body.item_name
        let item_description = req.body.item_description
        await db.item.add_item_to_database(client, item_description, item_name, user)

        res.send("item added")
    })

    app.delete("/item/delete/:item_id/:token", async (req, res) => {
        let user = await db.user.get_user_with_token(db.client, req.params.token)
        await db.item.delete_item_from_database(client, req.params.item_id, user, req.params.token)
        await db.item.delete_item_from_item_user_connections(client, req.params.item_id, user)
        await db.item.delete_item_code_from_item_code_connections(client, req.params.item_id)
        res.send("item deleted")
    })

    app.put("/item/update/:token", async (req, res) => {
        let user = await db.user.get_user_with_token(db.client, req.params.token)
        res.send(await db.item.update_item(db.client, req.body.name, req.body.description, req.body.item_uuid, user.uuid))
    })

    app.get('/item/code/:code', async (req, res) => {
        let code = req.params.code
        res.send(await db.contact_info.get_contact_and_item_information_by_item_code(db.client, code))
    })
}