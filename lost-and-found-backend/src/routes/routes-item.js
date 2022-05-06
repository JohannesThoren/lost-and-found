const db = require('../db/database')
module.exports = (app) => {

    // add a new item to the database
    // the token is the user specific token which is assigned to a specific user
    app.post("/item/new/:token", async (req,res) => {
        let user = await db.get_user_data_by_token(req.params.token)
        await db.create_new_item(req.body.item_name, req.body.item_description, user.rows[0])
        res.send("item added")
    });

    app.get('/item/code/:code', async (req, res) => {
        let item_uuid = await db.get_item_uuid_by_code(req.params.code)
        let username = await db.g
        res.send(await db.get_user_contact_info_by_item_uuid(item_uuid))
    })



}