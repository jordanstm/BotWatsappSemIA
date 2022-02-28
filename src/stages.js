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
    }



