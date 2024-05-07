var DataTypes = require("sequelize").DataTypes;
var _agitator_etraveler = require("./agitator_etraveler");

function initModels(sequelize) {
  var agitator_etraveler = _agitator_etraveler(sequelize, DataTypes);


  return {
    agitator_etraveler,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
