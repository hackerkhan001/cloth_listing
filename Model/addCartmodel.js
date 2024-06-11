const { DataTypes} = require('sequelize');
const sequelize = require('../utlisFunction/dbFunction');

const AddCart = sequelize.define('Addcart',{
    CartId : {
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    productId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    checkOut:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
        defaultValue:true,
    }
})
module.exports = AddCart