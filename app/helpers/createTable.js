const {Client} = require('pg')
const config = require("../config/config")

const createTable = function() {

    // Connection to DB
    const client = new Client({
      user: config.db.username,
      host: config.db.host,
      database: config.db.database,
      password: config.db.password,
      port: config.db.port
    });
  
    // Connect to client.
    client.connect();
  
    const createTableQuery = "CREATE TABLE IF NOT EXISTS messages (" +
      "id text primary key," +
      "message text " +
      ");";
  
    client.query(createTableQuery, (err, result) => {
      if (err) {
        console.error("Could not create database table messages")
        process.exit(1);
      }
      client.end()
    });
  }

  module.exports = createTable;