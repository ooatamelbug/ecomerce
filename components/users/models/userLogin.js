// require Sequelize
const { Model, DataTypes } = require('sequelize');
// require connectDB
const connectDB = require('../../../databases');
const User =  require('./user');

// extends USER class from Model of sequelize
class UserLogin extends Model {};

// init User class props attributes 
UserLogin.init({
    token: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    loginTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    logoutTime: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},{
    timestamps: true,
    sequelize: connectDB,
    modelName: 'UserLogin'
});

UserLogin.belongsTo(User);

// exports UserLogin
module.exports = UserLogin;