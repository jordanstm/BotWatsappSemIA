//Fase Inserção dos itens no banco 
const banco = require('../banco')
const pesquisador = require('../db/sincronizador');

 
exports.execute=(user,texto,NomeCliente)=>{
    let menu=`1-Sim\n2-Não(Retornar à Pesquisa)`;
    let Re=`${NomeCliente}, agora Informe o Codigo do Item que deseja incluir e a quantidade ,por favor como no exemplo:\n 8,3\nSeparados por vírgula(,), onde 8 = Codigo do produto  e 3 = quantidade desejada`;  
    if(isNaN(texto)==false){
        if(texto==2){
            
            banco.db[user].stage=10;
            return['Ok.Me informe então uma descrição para que eu verifique em nossa base de dados.'];
        }
        else
        {
            if(isNaN(texto)==true){
                return 'Opção solicitada Inválida;'
            }
            else{
                if(texto==1){
                    banco.db[user].stage=30;
                   return [Re];
               
                }else{
                    if(texto!=2){
                        
                        return [`Desculpe, mas sua resoposta não corresponde a pergunta.\nVocê gostaria de Incluir algum dos itens citados acima(anteriormente)?`,menu]
                    }
                }
            }
            

        }
       
    }else{
        return [`Desculpe, mas sua resoposta não corresponde a pergunta.\nVocê gostaria de Incluir algum dos itens citados acima(anteriormente)?`,menu]
    }
    

    
}