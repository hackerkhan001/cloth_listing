const { DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../utlisFunction/dbFunction');

const Admin = sequelize.define('Admin',{
    id: {
        type:DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull : false,
        primaryKey :true,
    },
    email: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true ,
        validate:{
            isEmail:true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,   
    }
});
module.exports = Admin;