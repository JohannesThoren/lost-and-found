const db = require('../db/database')
module.exports = (app) => {

    // add a new item to the database
    // the token is the user specific token which is assigned to a specific user
    app.post("/item/new/:token", async (req,res) => {
        let user = await db.get_user_data_by_token(req.params.token)
        await db.create_new_item(req.body.item_name, req.body.item_description, user.rows.uuid)

        res.send("poof")
    });

    // all items contains an id, this id is used to get the information.
    // when a request is made this function will return contact information belonging to the owner of the lost item
    app.get('/item/get/:uuid', async (req, res) => {
        res.send (await db.get_user_contact_info_by_item_uuid(req.params.uuid))
    });


}