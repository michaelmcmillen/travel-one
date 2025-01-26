require("dotenv").config();
const env = process.env;

// Setup DB connection in container
// const db = require('knex')({
//   client: 'pg',
//   connection: {
//       host : process.env.DB_HOST,
//       user : process.env.DB_USER,
//       password : process.env.DB_PASS,
//       database : process.env.DB_NAME
//   }
// });

// Setup DB connection locally
const db = require('knex')({
    client: 'pg',
    connection: {
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME
    }
  });

module.exports = db;