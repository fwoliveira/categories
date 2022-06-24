const Sequelize = require('sequelize');
const db = require('../database/db');


const Categories  = db.define('william_categories',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,


    },
    name:{
        type: Sequelize.STRING(50),
        allowNull: false,

    },
    description:{
        type: Sequelize.STRING,
        allowNull: true,

    },
   
});

//criar tabela com sequelize_scope_error_default
//  Products.sync();
//excluir a tabela e criar novamente
//Products.sync({force:true});
//verificar se algum diferença na tabela , realiza alteracao
// Products.sync({alter: true});
//cadastrar registro no banco de dados

module.exports = Categories;