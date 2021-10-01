const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class SeriesTable extends Model { }

//generate series table
SeriesTable.init({
    uid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    abbreviation: DataTypes.TEXT,
    productionStartYear: DataTypes.TEXT,
    productionEndYear: DataTypes.TEXT,
    seasonsCount: DataTypes.INTEGER
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    sequelize,
    modelName: 'series'
});
module.exports = SeriesTable;