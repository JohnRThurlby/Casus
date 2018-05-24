module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("users", {
    userid: DataTypes.STRING,
    password: DataTypes.STRING
  });
  return Users;
};
