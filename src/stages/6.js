const mercadopago = require('../Pagamento/mercadoPago')
const banco = require('../banco')
const Insercao = require('../db/sincronizador');
const fs = require('fs');

exports.execute=async(user,texto)=>{
 let TotalVenda = banco.db[user].Venda.TotalLiquido;
 let Descricao = 'Venda Pix'
 let email = texto.trim();
 let req={
     body:{
        description:Descricao,
        transactionamount:parseFloat(TotalVenda),
        payer:{
            email:email
        }
     }
 }
 let ret= await mercadopago.Pagamento(req)
 let arquivo =`${ret[2]}.png`; 
 let bufer= Buffer.from(ret[1],'base64');
 
 fs.writeFileSync(arquivo,bufer);
 banco.db[user].stage=7;
 return ['Pix Copia e Cola',ret[0],arquivo];
}