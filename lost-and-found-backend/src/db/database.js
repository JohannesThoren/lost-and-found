const uuid = require('uuid');
const base64 = require('base-64')
const {Client} = require('pg')
const client = new Client()
client.connect();

// checks if a user with the entered username and email exists
// returns false if exists and true if a user with the name and email does not exist
async function check_if_user_with_name_and_email_exists(username, email) {
    let text = "SELECT * FROM users WHERE EXISTS (SELECT username FROM users WHERE username = $1) OR EXISTS (SELECT email FROM users WHERE email = $2)"
    let values = [username, email]
    const res = await client.query(text, values)
    return (res.rows.length === 0)
}

async function check_if_user_with_uuid_exists(uuid) {
    let text = "SELECT * FROM users WHERE uuid = $1"
    let value = [uuid]
    const res = await client.query(text, value)
    return (res.rows)
}

async function check_if_user_with_token_exists(token) {
    let text = "SELECT * FROM users WHERE token = $1"
    let value = [token]
    const res = await client.query(text, value)
    return (res.rows)
}

exports.create_new_item = async function create_new_item(item_name, item_description, user_uuid) {
    let item_uuid = uuid.v4()
    let add_item_text = "INSERT INTO items(uuid, description, name) VALUE($1, $2, $3)"
    let add_item_value = [item_uuid, item_description, item_name]

    let connect_user_item_text = "INSERT INTO item-user-connections(item-uuid, user-uuid) VALUE($1, $2)"
    let connect_user_item_values = [item_uuid, user_uuid]

    await client.query(add_item_text, add_item_value)
    await client.query(connect_user_item_text, connect_user_item_values)

}

// returns true of it successfully created a new user, and false if it failed
exports.create_new_user = async function create_new_user(username, password, email) {
    if (await check_if_user_with_name_and_email_exists(username, email)) {
        let text = "INSERT INTO users(username, password, token, email, uuid) VALUES ($1, $2, $3, $4, $5)"
        let values = [username, base64.encode(password), uuid.v4(), email, uuid.v4()]
        await client.query(text, values)
        return true
    } else {
        return false
    }
}

async function update_user_token(token) {
    let user = await check_if_user_with_token_exists(token);
    if (user) {
        let text = "UPDATE users SET token = $1 WHERE token = $2"
        let new_token = uuid.v4()
        let values = [new_token, uuid]
        await client.query(text, value)
        return new_token
    }
    return null
}

exports.get_user_data_by_token = async function get_user_data_by_token(token) {
    console.log(token)
    let text = "SELECT * FROM users WHERE token = $1"
    let values = [token]
    const res = await client.query(text, values)
    return res
}

exports.get_user_contact_info_by_item_uuid = async function get_user_contact_info_by_item_uuid(item_uuid) {
    let get_user_id_text = "SELECT * FROM item-user-connections WHERE item-uuid = $1"
    let connections_response = await client.query(get_user_id_text , [item_uuid])

    if (connections_response.rows) {
        console.log(connections_response.rows)
    }

    return connections_response.rows
}
