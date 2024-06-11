const { DataTypes } = require('sequelize');
const sequelize = require('../utlisFunction/dbFunction');

const Category = sequelize.define('Category',{
    categoryId : {
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    categoryName : {
        type:DataTypes.STRING,
        allowNull:false,
    }

});
module.exports = Category;