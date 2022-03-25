exports.step= 

   stages={
        0:{
            descricao:"Boas vindas",
            obj:require('../src/stages/0')
        },
        1:{
            descricao:"Vendas",
            obj:require('../src/stages/1')
        },
        2:{
            descricao:"Resumo",
            obj:require('../src/stages/2')
        },
        3:{
            descricao:"Endereco",
            obj:require('../src/stages/3')
        },
        4:{
            descricao:"Endereco",
            obj:require('../src/stages/4')
        },
        5:{
            descricao:"Encerramento",
            obj: require('../src/stages/5')
        },
        6:{
            descricao:"Pix",
            obj: require('../src/stages/6')
        },
        7:{
            descricao:"FInalizacao",
            obj: require('../src/stages/7')
        },
        10:{
            descricao:"Orcamento",
            obj: require('../src/stages/10')
        },
        20:{
            descricao:"OrcamentoPesquisa",
            obj: require('../src/stages/20')
        }
        ,
        30:{
            descricao:"OrcamentoConfirmacao",
            obj: require('../src/stages/30')
        }
        ,
        40:{
            descricao:"OrcamentoInserção",
            obj: require('../src/stages/40')
        }
    }



