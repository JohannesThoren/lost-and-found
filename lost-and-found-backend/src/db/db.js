const uuid = require('uuid');
const base64 = require('base-64')
const {Client} = require('pg')
const ShortUniqueId = require("short-unique-id");
const client = new Client()
const uid = new ShortUniqueId()

client.connect();

let user = require('./user')
let item = require('./item')
let contact_info = require('./contact_info')

exports.client = client
exports.user = user
exports.item = item
exports.contact_info = contact_info