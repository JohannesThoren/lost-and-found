const base64 = require("base-64");
const uuid = require("uuid");
exports.get_user_uuid_with_item_uuid = async (client, item_uuid) => {
    let text = "SELECT * FROM item_user_connections WHERE item_uuid = $1"
    let response = await client.query(text, [item_uuid])
    if (response.rows.length > 0) {
        return await response.rows[0].user_uuid
    } else return false
}

exports.get_user_with_token = async (client, token) => {
    let text = "SELECT * FROM users WHERE token = $1"
    let response = await client.query(text, [token])
    if (response.rows.length > 0) {
        return await response.rows[0]
    } else return false

}
exports.get_user_contact_info_with_user_uuid = async (client, user_uuid) => {
    let text = "SELECT * FROM contact_information WHERE uuid = $1"
    let response = await client.query(text, [user_uuid])

    if (response.rows.length > 0) {
        return response.rows
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