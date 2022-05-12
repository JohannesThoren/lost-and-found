const uuid = require('uuid');
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId()

exports.delete_item_from_database = async (client, item_uuid, user) => {
    if (await is_user_and_item_connected(client, item_uuid, user.uuid)) {
        const query = {
            text: ` DELETE FROM items WHERE uuid = $1 RETURNING * `,
            values: [item_uuid]
        }
        const result = await client.query(query)
        return result.rows[0]
    }
    return false
}

// remove item from item_user_connections table
// Language: ecmascript 6
// Path: lost-and-found-backend/src/db/item.js
exports.delete_item_from_item_user_connections = async (client, item_uuid, user) => {
    if (await is_user_and_item_connected(client, item_uuid, user.uuid)) {
        const query = {
            text: ` DELETE FROM item_user_connections WHERE item_uuid = $1`,
            values: [item_uuid]
        }
        const result = await client.query(query)
        return result.rows[0]
    }
    return false
}

//remove item code connection from item_code_connections table
// Language: ecmascript 6
// Path: lost-and-found-backend/src/db/item.js
exports.delete_item_code_from_item_code_connections = async (client, item_uuid) => {
    const query = {
        text: ` DELETE FROM item_code_connections WHERE item_uuid = $1 RETURNING * `,
        values: [item_uuid]
    }
    const result = await client.query(query)
    return result.rows[0]
}


const is_user_and_item_connected = async (client, item_uuid, user_uuid) => {
    let text = "SELECT * FROM item_user_connections WHERE item_uuid = $1 AND user_uuid = $2"
    let response = await client.query(text, [item_uuid, user_uuid])
    return (response.rows.length > 0)
}

exports.update_item = async (client, name, description, item_uuid, user_uuid) => {
    if (await is_user_and_item_connected(client, item_uuid, user_uuid)) {
        let text = "UPDATE items SET name = $1, description = $2 WHERE uuid = $3"
        let response = await client.query(text, [name, description, item_uuid])
        return response
    } else return false
}

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
    let item_uuid = uuid.v4()
    let add_item_text = "INSERT INTO items(uuid, description, name) VALUES ($1, $2, $3)"

    await connect_user_and_item(client, item_uuid, user)
    await connect_code_and_item(client, item_uuid)

    await client.query(add_item_text, [item_uuid, item_description, item_name])
}