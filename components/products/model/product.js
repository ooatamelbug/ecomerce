// require Sequelize
const { Model, DataTypes } = require('sequelize');


class Product extends Model {};

Product.init({
    arName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    arName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    arsulg: {
        type: DataTypes.STRING,
        allowNull: false
    }
})