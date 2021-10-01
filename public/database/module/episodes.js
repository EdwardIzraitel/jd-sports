const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class EpisodeTable extends Model{}


//generate episodes table
EpisodeTable.init({
    uid: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,

    },
    seriesTitle: {
        type: DataTypes.STRING,
        references: {
            model: 'series',
            key: 'title'
        }
    },
    seasonNumber: DataTypes.INTEGER,
    episodeNumber: DataTypes.INTEGER,
    usAirDate: DataTypes.DATE
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    sequelize,
    modelName: 'episodes'
});

module.exports = EpisodeTable;