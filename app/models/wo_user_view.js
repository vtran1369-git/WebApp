const Sequelize = require('sequelize');
const view_Name = 'my_view';
const query = 'SELECT IDworkOrder, compassUsrName, stationName FROM mfc_cal_registry@testdb'
module.exports = {
    up: function (database, Sequelize) {
        return database.query(`CREATE ${my_view} AS ${query}`);
    },
    down: function (database, Sequelize) {
        return database.query(`DROP VIEW ${view_Name}`);
    }
}