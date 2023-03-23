const {Client} = require("pg");

const conString = process.env.DB_URL;
const client = new Client(conString);

module.exports = client;