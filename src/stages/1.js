//const conexao = require('../db/sincronizador');
const banco = require('../banco')

exports.execute = (user,message)=>{
    if(isNaN(message)){
        return ['opção invalida por favor informe uma opçao disposta anteriormente por min.']
    }
    else{
        if(isNaN(message)==false){
          if(message==2){
              return['Opção indisponivel temporariamente']
          }     
          else{
            banco.db[user].stage=2;
            return ['Digite uma descricao para que eu possa realizar a pesquisa pelo produto ']

          }
        }
        
    }
   
}