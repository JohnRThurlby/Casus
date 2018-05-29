// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // Use Handlebars to render the main index.html page with the movies in it.
app.get("/", function(req, res) {
    //connection.query("SELECT * FROM movies;", function(err, data) {
    //  if (err) {
    //    return res.status(500).end();
    //  }
  
      res.render("index")
    //})
  })

}
