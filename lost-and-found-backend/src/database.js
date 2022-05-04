const uuid = require('uuid');
const base64 = require('base-64')
const {Pool, Client} = require('pg')
const e = require("express");
const client = new Client()
client.connect();

async function check_if_user_exists(username, email) {
    let text = "SELECT * FROM users WHERE EXISTS (SELECT username FROM users WHERE username = $1) OR EXISTS (SELECT email FROM users WHERE email = $2)"
    let values = [username, email]
    const res = await client.query(text, values)
    return (res.rows.length == 0)
}

async function create_new_user(username, password, email) {

    if (await check_if_user_exists(username, email)) {
        let contact_information = {
            "option1": {"type": "", "value": ""},
            "option2": {"type": "", "value": ""},
            "option3": {"type": "", "value": ""},
        }

        let text = "INSERT INTO users(username, password, token, email, contact_information, uuid) VALUES ($1, $2, $3, $4, $5, $6)"
        let values = [username, base64.encode(password), uuid.v1(), email, contact_information, uuid.v4()]
        const res = await client.query(text, values)
        return "user added"
    } else {
        return "user could not be added"
    }

}

async function get_user_info_by_item_code(item_code) {
    client.query(``)

}
