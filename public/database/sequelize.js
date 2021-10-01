const { Sequelize } = require('sequelize');
//create area for storage and initializes sequelize
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: './starwarsdatabase.sqlite',
});
;

//exports
module.exports = sequelize;
