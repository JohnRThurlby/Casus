// *****************************************************************************
// app.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================

const express = require("express")
      bodyParser = require("body-parser")

// Sets up the Express App
// =============================================================
var app = express()
var PORT = process.env.PORT || 8080
app.use(express.static('public'))

// Requiring our models for syncing
var db = require("./models")

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

// Static directory
app.use(express.static("./public"));


// Set Handlebars.
const exphbs = require("express-handlebars")


app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

// var feed = document.getElementById("feed").innerHTML
// var theTemplate =  Handlebars.compile(feed)
// var compiledData = theTemplate(events[0]);


// exphbs.registerPartial(__dirname + '/views/partials');
// Routes
// =============================================================

require("./routes/html-routes.js")(app)
require("./routes/api-routes.js")(app)

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT: http://localhost:" + PORT)
  })
})      
