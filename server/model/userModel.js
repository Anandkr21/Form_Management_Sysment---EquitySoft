const { DataTypes } = require('sequelize');
const { connection } = require('../config/db');

const User = connection.define('users', {
    
    name: {
        type: DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER
    },
    gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user'
    }
});

module.exports = { User }