const uuid = require('uuid');
const base64 = require('base-64')
const {Client} = require('pg')
const ShortUniqueId = require("short-unique-id");
const client = new Client()
const uid = new ShortUniqueId()

client.connect();

exports.auth = async function auth(username_encoded, password_encoded) {
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

async function check_if_user_with_token_exists(token) {
    let text = "SELECT * FROM users WHERE token = $1"
    let value = [token]
    const res = await client.query(text, value)
    return (res.rows)
}

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
    let text = "SELECT * FROM users WHERE token = $1"
    let values = [token]
    const res = await client.query(text, values)
    return res
}

async function get_user_uuid_buy_item_uuid(uuid) {
    let get_user_id_text = "SELECT * FROM item_user_connections WHERE item_uuid = $1"
    let connections_response = await client.query(get_user_id_text, [uuid])
    if (connections_response.rows.length > 0) {
        return await connections_response.rows[0].user_uuid
    } else return false
}

async function get_user_contact_info_by_user_uuid(uuid) {
    let text = "SELECT * FROM contact_information WHERE uuid = $1"
    let response = await client.query(text, [uuid])
    if (response.rows.length > 0) {
        return response.rows
    } else return false
}

async function get_user_data_by_user_uuid(uuid) {
    let text = "SELECT * FROM users WHERE uuid = $1"
    let response = await client.query(text, [uuid])
    if (response.rows.length > 0) {
        return response.rows[0]
    } else return false
}

exports.get_user_contact_info_by_item_uuid = async function get_user_contact_info_by_item_uuid(uuid) {
    let user_uuid = await get_user_uuid_buy_item_uuid(uuid)
    let user_contact_info = await get_user_contact_info_by_user_uuid(user_uuid)
    let user = await get_user_data_by_user_uuid(user_uuid)
    return {user: user.username, contact_info: user_contact_info}
}

async function add_item_to_database(item_name, item_description, item_uuid) {
    let add_item_text = "INSERT INTO items(uuid, description, name) VALUES ($1, $2, $3)"
    let add_item_value = [item_uuid, item_description, item_name]
    await client.query(add_item_text, add_item_value)
}

async function connect_user_and_item(item_uuid, user) {
    let connect_user_item_text = "INSERT INTO item_user_connections(item_uuid, user_uuid) VALUES ($1, $2)"
    let connect_user_item_values = [item_uuid, user.uuid]
    await client.query(connect_user_item_text, connect_user_item_values)
}

async function connect_code_and_item(item_uuid) {
    let text = "INSERT INTO item_code_connections(code, item_uuid) VALUES ($1, $2)"
    let values = [uid.stamp(10), item_uuid]
    await client.query(text, values)
}

exports.get_item_uuid_by_code = async function get_item_uuid_by_code(code) {
    let text = "SELECT * FROM item_code_connections WHERE code = $1"
    let response = await client.query(text, [code])

    if (response.rows.length > 0) {
        return response.rows[0].item_uuid
    } else return false
}

exports.create_new_item = async function create_new_item(item_name, item_description, user) {
    let item_uuid = uuid.v4()
    await add_item_to_database(item_name, item_description, item_uuid)
    await connect_user_and_item(item_uuid, user)
    await connect_code_and_item(item_uuid)
}

async function get_existing_contact_information(uuid) {
    let text = "SELECT * FROM contact_information WHERE uuid = $1";
    let response = await client.query(text, [uuid]);
    return await response.rows
}

exports.add_contact_information = async function add_contact_information(type, value, uuid) {
    let existing_contact_information = await get_existing_contact_information(uuid)
    if (existing_contact_information.length >= 3) {
        return false
    } else {
        let text = "INSERT INTO contact_information(type, value, uuid, id) VALUES($1, $2, $3, $4)"
        let values = [type, value, uuid, existing_contact_information.length + 1]
        await client.query(text, values)
        return true
    }
}