const uuid = require("uuid");
module.exports = (client) => {

    exports.create_new_item = async function create_new_item(item_name, item_description, user_uuid) {
        let item_uuid = uuid.v4()
        let add_item_text = "INSERT INTO items(uuid, description, name) VALUE($1, $2, $3)"
        let add_item_value = [item_uuid, item_description, item_name]

        let connect_user_item_text = "INSERT INTO item-user-connections(item-uuid, user-uuid) VALUE($1, $2)"
        let connect_user_item_values = [item_uuid, user_uuid]

        await client.query(add_item_text, add_item_value)
        await client.query(connect_user_item_text, connect_user_item_values)

    }
}