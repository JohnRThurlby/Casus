export default function (sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
    }
  });
  var Usertags = sequelize.define("Usertags", {
    tagid: {
      type: DataTypes.INTEGER
    },
    usertag: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  var Userevents = sequelize.define("Userevents", {
    eventid: {
      type: DataTypes.INTEGER
    },
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
      type: DataTypes.STRING,
      allowNull: false
    },
    eventenddate: {
      type: DataTypes.STRING,
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
    eventcategoryid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  var Eventtags = sequelize.define("Eventstags", {
    eventtag: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Usertags.associate = function (models) {
    // We're saying that a Usertag should belong to a User
    // A Usertag can't be created without a User due to the foreign key constraint
    Usertags.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  Userevents.associate = function (models) {
    // We're saying that a Userevent should belong to a User
    // A Userevent can't be created without a User due to the foreign key constraint
    Userevents.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  Users.associate = function (models) {
    // Associating Users with Usertags
    // When an User is deleted, also delete any associated Usertags
    Users.hasMany(models.Usertags, {
      onDelete: "cascade"
    });
  };
  Users.associate = function (models) {
    // Associating Users with Userevents
    // When an User is deleted, also delete any associated Userevents
    Users.hasMany(models.Userevents, {
      onDelete: "cascade"
    });
  };
  //return Users;
  var Categories = sequelize.define("Categories", {
    categoryid: {
      type: DataTypes.INTEGER,
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    },
    category: {
      type: DataTypes.STRING,
      values: ['Music (music)', 'Visual Arts (visual-arts)', 'Performing Arts (performing-arts)', 'Film (film)',
        'Lectures & Books (lectures-books)', 'Fashion (fashion)', 'Food & Drink (food-and-drink)', 'Festivals & Fairs (festivals-fairs)',
        'Charities (charities)', 'Sports & Active Life (sports-active-life)', 'Nightlife (nightlife)', 'Kids & Family (kids-family)', 'Other (other)']
    }
  });
  var Tags = sequelize.define("Tags", {
    tags: {
      type: DataTypes.STRING,
      values: ['Music (music)', 'Visual Arts (visual-arts)', 'Performing Arts (performing-arts)', 'Film (film)',
        'Lectures & Books (lectures-books)', 'Fashion (fashion)', 'Food & Drink (food-and-drink)', 'Festivals & Fairs (festivals-fairs)',
        'Charities (charities)', 'Sports & Active Life (sports-active-life)', 'Nightlife (nightlife)', 'Kids & Family (kids-family)', 'Other (other)']
    }
  });
  return Users, Categories, Tags;
}













