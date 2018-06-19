const pg = require('pg');


var connect = function(){
    const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/postgres';
    const client = new pg.Client(connectionString);
    client.connect();
    return client
};

module.exports = connect

