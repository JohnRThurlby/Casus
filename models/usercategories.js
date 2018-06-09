module.exports =  function (sequelize, DataTypes) {
  var Usercategories = sequelize.define("Usercategories", {
    userid: {
      type: DataTypes.STRING,
      allowNull: false
    },
      userCategory: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
     
  return Usercategories
}
