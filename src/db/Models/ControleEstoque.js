const Sequelize = require('sequelize');
const db  = require('../conecction');
const Produto = require("./Produto");

const ControleEstoque =db.sequelize.define('ControleEstoque',{
  

    CodProd:{type:Sequelize.INTEGER},
      EstoqueIni:Sequelize.DECIMAL,
      QtdEntrada:Sequelize.DECIMAL,
      QtdSaida:Sequelize.DECIMAL,
      QtdVenda:Sequelize.DECIMAL,
      Cod:Sequelize.INTEGER,
      LoteDireto:Sequelize.DECIMAL,
      DataLanc:Sequelize.DATE,
      CodEntrada:Sequelize.INTEGER,
      Saidas:Sequelize.DECIMAL,
})
ControleEstoque.belongsTo(Produto,{foreignKey:'CodProd',allowNull:true});
module.exports = ControleEstoque