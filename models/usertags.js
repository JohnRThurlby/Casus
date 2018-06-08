module.exports =  function (sequelize, DataTypes) {
  var Usertags = sequelize.define("Usertags", {
    userid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usertag: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
  
  //Usertags.associate = function (models) {
    // We're saying that a Usertag should belong to a User
    // A Usertag can't be created without a User due to the foreign key constraint
    //Usertags.belongsTo(models.Users, {
    //  foreignKey: {
    //    allowNull: false
    //  }
    //})
  //}
   
  return Usertags
}
