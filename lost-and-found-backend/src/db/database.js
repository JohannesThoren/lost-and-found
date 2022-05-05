const uuid = require('uuid');
const base64 = require('base-64')
const {Client} = require('pg')
const client = new Client()
client.connect();



// checks if a user with the entered username and email exists
// returns false if exists and true if a user with the name and email does not exist

exports.user = require('./db-users')(client)
exports.item = require('./db-item')(client)





