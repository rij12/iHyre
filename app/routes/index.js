const express = require('express');
const {
  Client
} = require('pg')
const toSingleQuotes = require('to-single-quotes');
const router = express.Router();
const uuid = require('uuid');
const config = require("../config/config")

// Connection to DB
const client = new Client({
  user: config.db.username,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port
});

// Connect to client.
client.connect()

// Given an id return the associated message
router.get('/', function(req, response, next) {
  const id = toSingleQuotes(JSON.stringify(req.query.id));
  const query = `SELECT * FROM messages WHERE id = ${id};`;


  client.query(query, (err, result) => {
    if (err) {
      response.sendStatus(500)
    } else {
      response.status(200).send(result.rows[0].message)
    }
    client.end()
  })
});

// Given a message save it to database and return it's ID
router.post('/', function(req, response, next) {

  const id = toSingleQuotes(JSON.stringify(uuid()));
  const message = toSingleQuotes(JSON.stringify(req.query.message));
  const query = `insert into messages values(${id}, ${message});`;

  client.query(query, (err, result) => {
    if (err) {
      response.sendStatus(500)
    } else {
      response.status(201).send(id)
    }
    client.end()
  });
});

module.exports = router;
