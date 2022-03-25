const Insercao = require('../db/sincronizador');
exports.execute= (user,texto)=>{
    return Insercao.InformaLocalEntrega(user,texto);
}