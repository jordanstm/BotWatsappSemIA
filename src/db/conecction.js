
const knex = require('knex')({
  client: "mssql",
  connection: {
    host : "JordanDev",
    user : "sa",
    password : "******",
    database : "rara",
    port: 1433,
    debug:true,
    "options": {
      "encrypt": false,
      "enableArithAbort": true
      }
      
  }
});

 

  module.exports={knex};