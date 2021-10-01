const episodeTable = require('./module/episodes');
const seriesTable = require('./module/series');

// Set one to many relationship
seriesTable.hasMany(episodeTable, {
    foreignKey: 'seriesTitle'
});