module.exports =  function (sequelize, DataTypes) {
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
  })
  
  return Categories
}
