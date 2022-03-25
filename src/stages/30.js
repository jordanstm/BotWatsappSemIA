//Insercao dos itens na venda

const banco = require('../banco')
const Insercao = require('../db/sincronizador');



exports.execute = (user, texto) => {


    if (texto == '1' || texto == '2') {

        if (texto == '1') {
            banco.db[user].stage = 2;
            return ['Ok', 'Me informe então uma descricao para que eu verifique em nossa base de dados.'];
        }
        else {
            banco.db[user].stage = 5;
            let res = Insercao.ListaPlanosPix(user, texto);
       
            return res;
        }


    }
    else {

        let Consulta = ItemValido(user, texto);
        if (Consulta == true) {
            let msg = 'Oops,parece que você esqueceu de informar a quantidade do item, lembre se.\n'
            msg += 'Supondo que você escolheu  um item de codigo 30 e quer 2 unidades dele você deveria escrever 30,2.'
            msg += ' Agora olhe para lista acima escolha um codigo depois ponha a vírgula e a quantidade que vc desejar...'
            let Itens = texto.split(',');
            
            if (Itens.length == 1) {
                
                return ['Infelismente para quantidade eu preciso de um valor numeral!.', msg]
            }

            else {
                let qtd = Itens[1].trim().length;
                if (qtd == 0) {

                    return ['Infelismente para quantidade eu preciso de um valor numeral!.', msg]

                } else {
                    if(isNaN(Itens[1])){
                        return ['Infelismente para quantidade eu preciso de um valor numeral!.', msg]        
                    }
                    else{
                        return Insercao.Insere(user, texto);
                    }
                    
                }

            }

        } else {
            return [`O item informado nao faz parte da lista informada Anteriormente.\nValor digitado foi :${texto} \n 1 - Inserir\n2 - Finalizar`]
        }

    }


}
function ItemValido(user, message) {
    let ItLanc = message.split(',');
    let CodItem = ItLanc[0];
    let Existe = false;
    let Itens = banco.db[user].itens.split(',');
    Itens.forEach(element => {
        if (element == CodItem) {
            Existe = true;
        }
    });
    return Existe;
}