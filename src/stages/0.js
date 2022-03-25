const cardapio = require('../menuopcoes');
const banco = require('../banco')
const MenuPrin =require('../stages/1');  


 function execute  (user,message,NomeCliente){

    //Aqui está listando as possibilidades de açoes
    let menu =' Menu Opções  \n\n'

    Object.keys(cardapio.menu).forEach((value)=>{
    let el = cardapio.menu[value];
    menu+=`${value} - ${el.nome}\n`
    
    })
    menu+='Responda me apenas com os numeros informados.'
            MenuPrin.MenuPrincipal(menu);
            banco.db[user].stage=1; 
            return [`Olá ${NomeCliente}, eu sou  Venom 🕷 assistente virtual!, abaixo irei listar as opções disoniveis.`,menu]
       
    
 }

  
    

exports.execute = execute;
