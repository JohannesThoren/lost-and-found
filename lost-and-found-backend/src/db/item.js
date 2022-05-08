const uuid = require('uuid');
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId()


exports.get_item_uuid_with_item_code = async (client, code) => {
    let text = "SELECT * FROM item_code_connections WHERE code = $1"
    let response = await client.query(text, [code])
    if (response.rows.length > 0) {
        return response.rows[0].item_uuid
    } else return false
}

exports.get_item_data_with_item_uuid = async (client, item_uuid) => {
    let text = "SELECT * FROM items WHERE uuid = $1"
    let response = await client.query(text, [item_uuid])
    if (response.rows.length > 0) {
        return response.rows[0]
    } else return false
}

async function connect_user_and_item(client, item_uuid, user) {
    let connect_user_item_text = "INSERT INTO item_user_connections(item_uuid, user_uuid) VALUES ($1, $2)"
    let connect_user_item_values = [item_uuid, user.uuid]
    await client.query(connect_user_item_text, connect_user_item_values)
}

async function connect_code_and_item(client, item_uuid) {
    let text = "INSERT INTO item_code_connections(code, item_uuid) VALUES ($1, $2)"
    let values = [uid.stamp(10), item_uuid]
    await client.query(text, values)
}


exports.add_item_to_database = async (client, item_description, item_name, user) => {
    let item_uuid =  uuid.v4()
    let add_item_text = "INSERT INTO items(uuid, description, name) VALUES ($1, $2, $3)"

    await connect_user_and_item(client, item_uuid, user)
    await connect_code_and_item(client, item_uuid)

    await client.query(add_item_text, [item_uuid, item_description, item_name])
}