

const base64 = require("base-64");
const uuid = require("uuid");
const Item = require("./item");
const {query} = require("express");

const get_user_with_token = async (client, user_token) => {
    let text = "SELECT * FROM users WHERE token = $1"
    let response = await client.query(text, [user_token])
    if (response.rows.length > 0) {
        return await response.rows[0]
    } else return false
}
exports.get_user_with_token = get_user_with_token;



const get_user_item_connections_with_user_token = async (client, user_token) => {
    let user_data = await get_user_with_token(client, user_token);
    let uuid = user_data.uuid;
    let text = "SELECT * FROM item_user_connections WHERE user_uuid = $1";
    let response = await client.query(text, [uuid]);
    if (response.rows.length > 0) {
        return response.rows;
    } else return false
}

exports.get_user_item_connections_with_user_token = get_user_item_connections_with_user_token

exports.get_items_with_token = async (client, user_token) => {
    let item_connections = await get_user_item_connections_with_user_token(client, user_token);
    if (item_connections.length > 0) {
        let items = [];
        for (let index in item_connections) {
            let connection = item_connections[index];
            let item = await Item.get_item_data_with_item_uuid(client, connection.item_uuid);
            let item_code = await client.query("SELECT * FROM item_code_connections WHERE item_uuid = $1", [item.uuid]);
            if (item) {
                items.push({name: item.name, description: item.description, uuid: item.uuid, code: item_code.rows[0].code});
            }
        }
        return items;
    } else return false;
}

exports.get_user_uuid_with_item_uuid = async (client, item_uuid) => {
    let text = "SELECT * FROM item_user_connections WHERE item_uuid = $1"
    let response = await client.query(text, [item_uuid])
    if (response.rows.length > 0) {
        return await response.rows[0].user_uuid
    } else return false
}



exports.auth = async function auth(client, username_encoded, password_encoded) {
    let username = ""
    let password = ""
    try {
        username = base64.decode(username_encoded)
        password = base64.decode(password_encoded)
    } catch (e) {
        return e
    }


    let get_user_text = "SELECT * FROM users WHERE username = $1"
    let get_user_response = await client.query(get_user_text, [username])

    if (get_user_response.rows.length != 0) {
        let check_pw = base64.decode(get_user_response.rows[0].password)

        if (password == check_pw) {
            return get_user_response.rows[0].token
        }
        return false
    }
    return false
}

async function check_if_user_with_name_and_email_exists(client, username, email) {
    let text = "SELECT * FROM users WHERE EXISTS (SELECT username FROM users WHERE username = $1) OR EXISTS (SELECT email FROM users WHERE email = $2)"
    let values = [username, email]
    const res = await client.query(text, values)
    return (res.rows.length === 0)
}

exports.new_user = async (client, username, email, password) => {
    if (await check_if_user_with_name_and_email_exists(client, username, email)) {
        let text = "INSERT INTO users(username, password, token, email, uuid) VALUES ($1, $2, $3, $4, $5)"
        let values = [username, password, uuid.v4(), email, uuid.v4()]
        await client.query(text, values)
        return true
    } else {
        return false
    }
}