const { DataTypes } = require('sequelize');
const sequelize = require('../utlisFunction/dbFunction');

const Product = sequelize.define('Product',{
    productId : {
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    imageurl:{
        type:DataTypes.STRING,
        allowNull:false
    },
    productName:{
       type:DataTypes.STRING,
       allowNull:false, 
    },
    price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },

    categoryId :{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    activeStatus:{
        type:DataTypes.BOOLEAN,
        defaultValue:true, 
        allowNull:true,
    }
});
module.exports = Product ;