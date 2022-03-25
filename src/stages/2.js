//Estagio de pesquisa no banco de dados 
const { text } = require('express');
const banco = require('../banco')
const pesquisador = require('../db/sincronizador');
exports.execute=(user,texto)=>{
    let consulta = banco.db[user].Consulta;
    if(isNaN(texto)==false){
        if(texto==1){
            return' blz, Me informe a descrição do que deseja buscar em nossa base de dados.'
        }
        if(texto==2){
            banco.db[user].stage=0;
            return['**Obrigado por fazer parte deste iniciativa nos vemos novamente em breve...**']
        }
        
    }
    else
    { 
        if(consulta){
            return  pesquisador.Pesquisa(user,texto)     
         }
         else{
            banco.db[user].stage=3;
            return  pesquisador.Pesquisa(user,texto)
          }
    

    }
        

    
}
