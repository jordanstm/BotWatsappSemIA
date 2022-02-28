// const {Sequelize} = require('sequelize');
// ///Funcao usada para iniciar uma instancia de conexao ao banco de dados
// const sequelize = 
    
//       new Sequelize('Copam','sa','987589',
// {
//     host:'localhost',
//     dialect:'mssql',
    
// })
const knex = require('knex')({
  client: "mssql",
  connection: {
    host : "JordanDev",
    user : "sa",
    password : "987589",
    database : "Copam",
    port: 1433,
    debug:true,
    "options": {
      "encrypt": false,
      "enableArithAbort": true
      }
      
  }
});

 

  module.exports={knex};