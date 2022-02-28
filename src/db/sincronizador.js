const banco = require('../banco')
const db = require('./conecction');
let CodigoVenda= {Codigo:0}



async function Pesquisa(user,msg){
   let codigos = [];
   let erro = false;
   let param =`%${msg}%`;
   let sql = 'select P.Codigo,P.Descricao,P.PrecoVenda,(QtdEntrada-(QtdSaida+QtdVenda)) as Estoque from produtos P ';
   sql+=' inner join ControleEstoque ce on ce.CodProd = p.codigo'
   sql+=`  where P.descricao like'${param}'`
   let question ='Você gostria de inserir algum dos itens listados na Venda?'
   let q1='1- SIM \n2 - Não (Retornar a pesquisa)' 
   let Resultado ='';

   await db.knex.raw(`${sql}`)
   .then((resp)=>{

    if(resp.length>0){
            
      Object.keys(resp).forEach(V=>{
         let Cod = resp[V].Codigo;
         let Desc = resp[V].Descricao.trim();
         let Val = resp[V].PrecoVenda;
         
         let Estoque = resp[V].Estoque;
         Val = Val.toLocaleString('pt-br',
         {style:'currency',currency:'BRL'}
         )
          Resultado+= `${Cod} - ${Desc} Est.At => ${Estoque} Valor=>${Val}\n`
          if(isNaN(Cod)==false){
              codigos+=Cod+","
             
          }
          
        })

    }
    else{
      banco.db[user].stage=2;
      Resultado= 'Não pude localizar o item com esta descrição, por favor tente outra';
      erro = true;

    }
    
   })  .catch((err)=>{
      console.log(err)
       
       
   })
   banco.db[user].itens+=codigos;
   console.log(banco.db[user].itens)
    if(erro){
       return [Resultado]

    }
    else{
      return [Resultado,question,q1];
    }
    
}


 async function Insere(user,texto){

   

   await LancarItem(user,CodigoVenda.Codigo,texto);

 return ['Inserido.\nGostaria de Continuar inserindo, ou gostaria de Finalizar a venda?\n1 - Inserir\n2 - Finalizar']

}
async function LancarItem(user,CodVenda,texto){

 if( banco.db[user].Venda.Codigo==0){
  await PegaMaximoCodigo();
  banco.db[user].Venda.Codigo=  CodigoVenda.Codigo;
  CodVenda = CodigoVenda.Codigo;
 }
 

 vendaExiste =await TestaSeVendaJaExiste(CodVenda);
 let Data = new Date();
 let DataCompleta = Data.toLocaleString('en-US').split(',');
 let DataFormatada =DataCompleta[0];
 let prCompleto= texto.split(',');
 let PrecoProd = await PegaValorProd(prCompleto[0]) 
 let Qtd = parseFloat(prCompleto[1]).toFixed(2);
 let TotalItem  = PrecoProd * Qtd
 if(vendaExiste == false){
   await InsereVenda(CodVenda,DataFormatada,TotalItem);
   await InsereItemVenda(CodVenda,Qtd,PrecoProd,TotalItem,prCompleto[0],DataFormatada);
 }
 else{

  await InsereItemVenda(CodVenda,Qtd,PrecoProd,TotalItem,prCompleto[0],DataFormatada);

 }

}
async function InsereVenda( codigo,data,Total){
  let SQL = `Insert Into Vendas(Codigo,Data,Cliente,Desconto,Total,Situacao,Vendedor,Plano,TotalLiq,OrigemVenda)`  
   SQL +=` Values(${codigo},'${data}',1,0,'${Total}','P',1,1,'${Total}','WAT')`
   let ret =await ExecutaSQL(SQL);
}
async function  AtualisaVenda(codigo,plano){
  let Data = new Date();
  let DataCompleta = Data.toLocaleString('en-US').split(',');
  let DataFormatada =DataCompleta[0];
  let descontoVenda = 0;
  Total = await calculaTotalVenda(codigo);
  let SQL = `update  Vendas set Data='${DataFormatada}',Cliente=1,Desconto='${descontoVenda}',Total='${Total}',Situacao='C',Vendedor='1',Plano='${plano}',TotalLiq='${Total}',OrigemVenda='WAT'`  ;
  SQL+= `  Where Codigo =${codigo}`;
  let ret =await ExecutaSQL(SQL);
}

async function calculaTotalVenda(Codigo){

 let SQL = `Select QTD,PrecoLiquido from ItensVenda where Codigo = ${Codigo}`
 let ret = await ExecutaSQL(SQL);
 let Total =0;
 ret.forEach(value=>{
   Total+=Math.round(value.QTD * value.PrecoLiquido,2)
 })
 
  return Total;
}

async function InsereItemVenda(CodVenda,QTD,PrecoProd,TotalItem,CodProd,Data){
  let DescUni = await PegaDescricaoUnidadeItem(CodProd);
  let Descricao =DescUni.Descricao.trim();  
  let Un = DescUni.Unidade.trim();
let SQL = `Insert Into ItensVenda(Codigo,qtd,valorVenda,desconto,CodProd,PrecoLiquido,CodImei,CodLote,CodigoOrigem,LoteDireto,SiglaCliente,vOutro,DescontoP,DataExame,CodTuss,ValorBruto,Descricao,Unidade,TotalLiquido,TotalBruto)`;
SQL +=`  Values(${CodVenda},'${QTD}','${PrecoProd}',0,${CodProd},'${PrecoProd}','0','0','0','0','0','0','0','${Data}','0','${TotalItem}','${Descricao}','${Un}','${TotalItem}','${TotalItem}')`
let ret = await ExecutaSQL(SQL);
}

async function PegaDescricaoUnidadeItem(CodProd){
  let SQL= `Select Descricao,Unidade from Produtos where Codigo =${CodProd}`
  let ret = await ExecutaSQL(SQL);
  return ret[0];
}

async function PegaValorProd(produto){
  let SQL ='Select PrecoVenda From Produtos where Codigo ='+ produto;
  let Result =await ExecutaSQL(SQL);
  console.log(Result)
  return parseFloat(Result[0].PrecoVenda);
}

async function TestaSeVendaJaExiste( Codigo){
let SQL=`Select Codigo from Vendas where Codigo =${Codigo}`
let CodVenda ;
let resultado = false;
const Resut =await ExecutaSQL(SQL);
if(Resut[0]!=undefined){
  resultado= true;
}
return resultado;
}

 async function ExecutaSQL(SQL){
  let Resp=[];
  await db.knex.raw(`${SQL}`)
  .then(resp=>{
   console.log(resp);
   Resp=resp;
   return resp;
    
  })
  .catch(err=>{
     console.log(err);
  })
  return Resp;
 }

async function PegaMaximoCodigo(){
  let SQL = `Select Max(Codigo)+1 as Codigo from Vendas`
  let ret =await ExecutaSQL(SQL);
  CodigoVenda.Codigo = ret[0].Codigo;
 return [CodigoVenda.Codigo];

}
async function ListaPlanos(){
 let SQL = `Select Codigo,Descricao from PlanosPgto`
 let ret = await ExecutaSQL(SQL);
 let resultado = `Por favor agora Informe um dos códigos da listagem a seguir,são os planos de pagamento:\n`

 ret.forEach((v,index)=>{

   let desc = v.Descricao;
   let Cod = v.Codigo;
 resultado+= `${Cod} - ${desc}\n`

 })
 return [resultado];
}
async function ResumoVenda(user,texto){
  let Codigo = banco.db[user].Venda.Codigo;
  AtualisaVenda(Codigo,texto);
  let TotalVenda =0;
  let Resultado = `O plano ${texto}, foi selecionado\n**************RESUMO***********\n\nVenda de Nro.: ${Codigo}\n\n`
  let SQL=`Select CodProd,Descricao,PrecoLiquido,QTD from ItensVenda where Codigo =${Codigo}`;
  let ret = await ExecutaSQL(SQL);
   if(ret.length>0){
     ret.forEach((v,index)=>{
    let CodProd = v.CodProd;
    let Descricao= v.Descricao;
    let PrecoLiuido = parseFloat(v.PrecoLiquido);
    let QTD = parseFloat(v.QTD);
    let TotalItem = QTD * PrecoLiuido;
    TotalVenda+=TotalItem;  
    Resultado+= `${CodProd} - ${Descricao.substring(0,10)}... QTD=${QTD} Valor =>R$ ${TotalItem}\n\n`
     })
   }
   Resultado +=`Total Venda => R$ ${parseFloat(TotalVenda).toFixed(2)}`;
   return [Resultado];
}
module.exports ={ Pesquisa,Insere,ListaPlanos,ResumoVenda}; 