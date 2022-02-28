//Estagio de pesquisa no banco de dados 
const banco = require('../banco')
const pesquisador = require('../db/sincronizador');
exports.execute=(user,texto)=>{
    banco.db[user].stage=3;
    return  pesquisador.Pesquisa(user,texto)

    
}
