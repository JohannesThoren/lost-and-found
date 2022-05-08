const {get_user_uuid_with_item_uuid, get_user_contact_info_with_user_uuid, get_user_with_token} = require("./user");
const {get_item_uuid_with_item_code, get_item_data_with_item_uuid} = require("./item");

exports.get_contact_and_item_information_by_item_code = async (client, item_code) => {
    let item_uuid = await get_item_uuid_with_item_code(client, item_code)
    let item_data = await get_item_data_with_item_uuid(client, item_uuid)
    let user_uuid = await get_user_uuid_with_item_uuid(client, item_uuid)
    let user_contact_info = await get_user_contact_info_with_user_uuid(client, user_uuid)
    return {item: item_data, contact_info: user_contact_info}
}


exports.add_contact_info = async (client, token, type, value) => {
    let user = await get_user_with_token(client, token)
    let existing_contact_info = await get_user_contact_info_with_user_uuid(client, user.uuid)
    if (existing_contact_info.length >= 3)
        return false
    else {
        let text = "INSERT INTO contact_information(type, value, uuid, id, username) VALUES($1, $2, $3, $4, $5)"
        let values = [type, value, user.uuid, existing_contact_info.length + 1, user.username]
        await client.query(text, values)
        return true
    }
}