// require Sequelize
const { Model, DataTypes } = require('sequelize');
// require connectDB
const connectDB = require('../../../databases');

// extends USER class from Model of sequelize
class User extends Model {};

// init User class props attributes 
User.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},{
    timestamps: true,
    sequelize: connectDB,
    modelName: 'User'
});


// exports User
module.exports = User;