const banco = require('../banco')
const Executor = require('../db/sincronizador');
exports.execute=(user,texto)=>{
return Executor.ResumoVenda(user,texto)

}