module.exports =  function (sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    userid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false
    },
     twitterid: {
      type: DataTypes.STRING
    }
  })
    
  Users.associate = function(models) {
    // Associating Users with Usertags
    // When an User is deleted, also delete any associated usertags
    Users.hasMany(models.Usertags, {
      onDelete: "cascade"
    })
  }

  Users.associate = function(models) {
    // Associating Users with Userevents
    // When an User is deleted, also delete any associated userevents
    Users.hasMany(models.Userevents, {
      onDelete: "cascade"
    })
  }

  Users.associate = function(models) {
    // Associating Users with Userlikes
    // When an User is deleted, also delete any associated userlikes
    Users.hasMany(models.Userlikes, {
      onDelete: "cascade"
    })
  }

  return Users
}
