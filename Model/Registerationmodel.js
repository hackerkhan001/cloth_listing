const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../utlisFunction/dbFunction');


const User = sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    username:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{isEmail: true},
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
    }
});
module.exports = User;