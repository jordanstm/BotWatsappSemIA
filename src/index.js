const venom = require('venom-bot');
const stages = require('../src/stages');
const banco = require('./banco');
let contador= 0;
function ContadorMsg(){

  
  contador+=1 
  return contador;
}

function getStage(user){
        return banco.db[user].stage;

}

//console.log(stages.step[getStage('user2')].obj.execute());

venom
  .create({
    session: 'session1', //name of session
    multidevice: true, // for version not multidevice use false.(default: true)
    headless:true,
    useChrome:true,
    mkdirFolderToken:'../token'
  })
  .then((client) => start(client))
  .catch((erro) => { 
    console.log(erro);
  });

   function start(client) {
   
   client.onMessage(async(message) => {  
    
    var Nome = message.from;       
    let loc =banco.db.hasOwnProperty(Nome)
        if( loc == false){
          banco.db[Nome]={stage:0,itens:[],Venda:{Codigo:0}}
        }
      
        console.log(message.sender.displayName);
       let NomeCliente = message.sender.displayName;
    let TextoUsusario = message.body;
   
   console.log('Estagio:'+getStage(Nome));


    if (message.body.toUpperCase().length>0 && message.isGroupMsg === false) {
      let resp =await stages.step[getStage(Nome)].obj.execute(
        Nome,
        TextoUsusario,
        NomeCliente
      );
      console.log("R_Send "+resp);
      for(I =0;I<resp.length;I++ ){ 
        let resposta = resp[I];
    await   client.sendText(message.from,resposta)

    .then((result) => {
    
       // console.log('Result: ', result)
       }) .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
       //return object success
      }  

     
      
    }
  });
}


