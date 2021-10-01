const sequelize = require('../public/database/sequelize');

//verify connection to database is possible
export async function connection() {
    try {
        
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return false;
    }
    return true;
}