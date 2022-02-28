//Insercao dos itens na venda

const banco = require('../banco')
const Insercao = require('../db/sincronizador');


exports.execute=(user,texto)=>{
     if(texto =='1'|| texto=='2'){
       
        if(texto=='1'){
            banco.db[user].stage=2;
         return['Ok','Me informe então uma descricao para que eu verifique em nossa base de dados.'];
        }
        
         else{
            banco.db[user].stage=5;
             return Insercao.ListaPlanos();
         }


     }
     else{
                     
        let Consulta = ItemValido(user,texto);
        if(Consulta==true){
            
            return Insercao.Insere(user,texto);
             
          
     }
        else{
             return  [`O item informado nao faz parte da lista informada Anteriormente.\nValor digitado foi :${texto}`]
        }

     }
    
    

    
}
function ItemValido(user,message){
    let ItLanc = message.split(',');
    let CodItem = ItLanc[0];
    let Existe = false;
    let Itens = banco.db[user].itens.split(',');
     Itens.forEach(element => {
         if(element==CodItem){
             Existe= true;
         }
    });  
     return Existe;
}