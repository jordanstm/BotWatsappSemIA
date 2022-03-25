
const Executor = require('../db/sincronizador');

let indicemenu=[];

function execute(user,texto){
     indicemenu= Executor.ListaItensMenuPixSelecionado();
     let nro = Number(texto);
     let resultado = '';
     let ret = indicemenu.includes(nro);

     //Teste pra saber se o nro Digitado faz parte da colecao repassada pelo bot
      if (ret){
            return Executor.ResumoVenda(user, texto);
          // resultado = Executor.ResumoVenda(user,texto)   
      }else {
         resultado ['O numero digitado não faz parte da lista informada possibilidades', indicemenu.toString()]
    
      }     
  return resultado;
 
}

 function PopoulaMenu(menu){
    indicemenu= menu;
 
 }

 module.exports = {execute,PopoulaMenu}