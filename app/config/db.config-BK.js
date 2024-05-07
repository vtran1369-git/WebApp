const Sequelize = require('sequelize');
const env = process.env
const sequelize = new Sequelize(env.DB, env.USER_NAME, env.PASSWORD, {
  host: env.HOST,
  dialect: env.DIALECT,
  pool: {
    max: parseInt(env.MAX),
    min: parseInt(env.MIN),
    acquire: parseInt(env.ACQUIRE),
    idle: parseInt(env.IDLE)
  }
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize.sync({force: false}).then(() => {
  console.log('stop drop from db.config  { force: false }');
}); 
 
db.Users = require('../models/user_registry.js')(sequelize, Sequelize);
db.WO = require('../models/wo_registry.js')(sequelize, Sequelize);
db.Customers = require('../models/customers.js')(sequelize, Sequelize);
db.mfc_cal_registry = require('../models/mfc_cal_registry')(sequelize, Sequelize);
db.mfc_registry = require('../models/mfc_registry')(sequelize, Sequelize);
db.addresses = require("../models/addresses")(sequelize, Sequelize)
db.Certification = require('../models/certification.js')(sequelize, Sequelize);
db.people = require('../models/people')(sequelize, Sequelize)
db.FSN = require('../models/finesse_serial_number.js')(sequelize, Sequelize);
db.user = require('../models/user.model.js')(sequelize, Sequelize);
// db.role = require('../models/role.model.js')(sequelize, Sequelize);
/* db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});
db.ROLES = ["user", "admin", "moderator"]; */
db.WO.hasOne(db.Users, {foreignKey: 'id_user_registry', sourceKey: 'id_wo_registry'});
db.mfc_registry.hasOne(db.addresses, {foreignKey: 'id_addresses', sourceKey: 'IDmfr'});
db.mfc_cal_registry.hasOne(db.people, {foreignKey: 'IDpeople', sourceKey: 'IDpeople'});

db.WO.hasMany(db.FSN, {foreignKey: "id_wo_registry"});
db.FSN.belongsTo(db.WO, {foreignKey: "id_wo_registry"})

module.exports = db;