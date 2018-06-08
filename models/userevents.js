module.exports =  function (sequelize, DataTypes) {
  
  var Userevents = sequelize.define("Userevents", {
    eventtitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventdesc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventlocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventstartdate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    eventenddate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    eventcapacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    eventpublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    eventprivate: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    eventcategory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventUserid: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
    
  //Userevents.associate = function (models) {
    // We're saying that a Userevent should belong to a User
    // A Userevent can't be created without a User due to the foreign key constraint
  //  Userevents.belongsTo(models.Users, {
  //    foreignKey: {
  //      foreignKey: 'userevents_ibfk_1',
  //      targetKey: 'userid'
  //    }
  //  })
  //}

  return Userevents
}
