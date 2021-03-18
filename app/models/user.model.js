module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    f_name: {
      type: Sequelize.STRING
    },
    l_name: {
      type: Sequelize.STRING
    }
  });

  return User;
};
