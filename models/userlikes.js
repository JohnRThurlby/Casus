module.exports =  function (sequelize, DataTypes) {
  
  var Userlikes = sequelize.define("Userlikes", {
    liketitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likedesc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likelocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likestartdate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    likeenddate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    likesource: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
  
  Userlikes.associate = function (models) {
    // We're saying that a Userevent should belong to a User
    // A Userevent can't be created without a User due to the foreign key constraint
    Userlikes.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    })
  }
  
  return Userlikes
}