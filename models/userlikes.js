module.exports =  function (sequelize, DataTypes) {
  
  var Userlikes = sequelize.define("Userlikes", {
    liketitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likedesc: {
      type: DataTypes.TEXT('medium') ,
      allowNull: false
    },
    likelocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likestartdate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likeenddate: {
      type: DataTypes.STRING      
    },
    likesource: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likeUserid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    UserId: {
      type: DataTypes.STRING
    }
  })
  
  //Userlikes.associate = function (models) {
    // We're saying that a Userevent should belong to a User
    // A Userevent can't be created without a User due to the foreign key constraint
  //  Userlikes.belongsTo(models.Users, {
  //    foreignKey: {
   //     allowNull: false
  //    }
  //  })
  //}
  
  return Userlikes
}
