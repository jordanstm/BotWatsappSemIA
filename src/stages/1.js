//const conexao = require('../db/sincronizador');
const banco = require('../banco')
let CNT = 0;
let Menu = '';
let Nm ='';

function execute(user, message) {
  if (isNaN(message)) {
    if (CNT <= 2) {     
      CNT += 1;
      return ['Opção invalida por favor informe uma opçao disposta anteriormente por min.', Nm]
    } else {
      banco.db[user].stage = 0;
      CNT=0;
      return ['Percebi que existe uma dificuldade de comunicação, vamos tentar desde o início eis as opções.', Nm]
    }

  }
  else {
    if (isNaN(message) == false) {

      if (message == 2) {
        //Aqui Inicia consulta
        banco.db[user].stage = 2;
        banco.db[user].Consulta=true;
        return ['**Consulta Produtos**\nDigite uma descricao para que eu possa realizar a pesquisa pelo produto ']
      }
      else {
        if (message == 1) {
          banco.db[user].Consulta=false;
          banco.db[user].stage = 2;
          return ['Digite uma descricao para que eu possa realizar a pesquisa pelo produto ']
        }
        else{
          if (CNT <= 2) {     
            CNT += 1;
            return ['Opção invalida por favor informe uma opçao disposta anteriormente por min.', Nm]
          } else {
            banco.db[user].stage = 0;
            CNT=0;
            return ['Percebi que existe uma dificuldade de comunicação, vamos tentar desde o início eis as opções.', Nm]
          }
        }


      }
    }

  }

}

function MenuPrincipal(menu) {
  Menu = menu;
  Nm= `Caso não se recorde eram as seguinte opções/n${Menu}`;
}
module.exports = { execute, MenuPrincipal }