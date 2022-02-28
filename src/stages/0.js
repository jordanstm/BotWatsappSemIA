const cardapio = require('../menuopcoes');
const banco = require('../banco')


 function execute  (user,message,NomeCliente){

    //Aqui está listando as possibilidades de açoes
    let menu =' Menu Opções  \n\n'

    Object.keys(cardapio.menu).forEach((value)=>{
    let el = cardapio.menu[value];
    menu+=`${value} - ${el.nome}\n`
    })
   
            banco.db[user].stage=1; 
            return [`Olá ${NomeCliente}, eu sou  Venom 🕷 assistente virtual!, abaixo irei listar as opções disoniveis.`,menu]
       
    
 }

  
    

exports.execute = execute;
