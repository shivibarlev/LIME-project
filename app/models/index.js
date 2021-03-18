const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
/*const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    port: config.PORT,
    dialect: config.dialect,
    operatorsAliases: 0,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);*/

const sequelize = new Sequelize('postgresql://postgres:1qaz@WSX@localhost:5432/postgres');

async function connect() {
    console.log('Checking database connection...');
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connect();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;



db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.alert = require("../models/alert.model.js")(sequelize, Sequelize);
db.comment = require("../models/comments.model.js")(sequelize, Sequelize);
db.knowledge = require("../models/knowledge.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
