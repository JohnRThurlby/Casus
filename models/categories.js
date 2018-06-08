module.exports =  function (sequelize, DataTypes) {
  var Categories = sequelize.define("Categories", {
      category: {
      type: DataTypes.STRING,
      values: ['Music', 'Visual Arts', 'Performing Arts', 'Film',
        'Lectures & Books', 'Fashion', 'Food & Drink', 'Festivals & Fairs',
        'Charities', 'Sports & Active Life', 'Nightlife', 'Kids & Family', 'Other']
    }
  })
  
  return Categories
}
