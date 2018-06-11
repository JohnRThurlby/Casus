// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db

// Dependencies
// =============================================================

// Requiring our models
require("dotenv").config()
const db = require("../models"),
      postcode = require('postcode-validator'),
      validator = require("email-validator"),
      ValidatePassword = require('validate-password'),
      validPass = new ValidatePassword(),
      Twitter = require('twitter'),
      store = require('store'),
      unirest = require("unirest"),
      xml2js = require('xml2js')

//if (process.env.NODE_ENV != "PRODUCTION") {
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  })
//}
//else {
//  var client = new Twitter(keys.twitter)
//  
//}

var inUserid =  " "
var storeUserid =  " "

var objectEv = {
  event:
  [
    ]
};

// These code snippets use an open-source library. http://unirest.io/nodejs
unirest.get("https://community-eventful.p.mashape.com/events/search?app_key=kZVX6GMpxCX83vh9&location=orlando")
.header("X-Mashape-Key", "35ZWjjUvuxmshz4RIV2HACPs4csep18CfcAjsnas8mTje72Nko")
.header("Accept", "text/plain")
.end(function (result) {
  // console.log(result.status, result.headers, result.body);
  var parseString = require('xml2js').parseString;
  parseString(result.body, function (err, results) {
    let eventful = results.search.events[0].event;
    objectEv.events = objectEv.event.concat(eventful);
    // console.log(objectEv.events.length);
    for (var i = 0; i < objectEv.events.length; i++) {
      var mediumImg = objectEv.events[i].image[0].medium;
      if (mediumImg!=undefined) {
        console.log (mediumImg[0]);
      }
      else {
        console.log(mediumImg)
      }
    
    }
  });
});

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for landing page 
  app.get("/", function(req, res) {
        res.render("index")
  })

  app.get("/api/logout", function(req, res) {
      
    res.render("index")

  })
  
  // GET route for getting a specific users
  app.get("/api/users/", function(req, res) {
    // findOne returns the entry from a table for a specific user
    db.Users.findOne({
      where: {
        email: req.query.Email2,
        password: req.query.Password2
      }
    }).then(function(dbUsers) {
      console.log(dbUsers)
      if (dbUsers != null) {
        
      // We have access to the users as an argument inside of the callback function
           storeUserid = dbUsers.userid
           store.set(storeUserid)
           res.render("index", objectEv)

      }
      else {
        
        error = 'Invalid userid/password combination'
        var hbsObject = {error}
        console.log(hbsObject)
        res.render('index', hbsObject)
      }
      
    })
    
  })

  // GET route for getting a specific users events
  app.get("/api/userevents/:id", function(req, res) {
    // findAll returns all entries from the userevents table for a specific user
    db.Userevents.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbUserevents) {
      // We have access to the users events as an argument inside of the callback function
      res.json(dbUserevents)
    })
  })

  // GET route for getting a specific users likes
  app.get("/api/userlikes/:id", function(req, res) {
    // findAll returns all entries from the userlikes table for a specific user
    db.Userlikes.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbUserlikes) {
      // We have access to the users likes as an argument inside of the callback function
      res.json(dbUserlikes)
    })
  })

  // GET route for getting a specific users tags
  app.get("/api/usertags/:id", function(req, res) {
    // findAll returns all entries from the usertags table for a specific user
    db.Usertags.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbUsertags) {
      // We have access to the userstags as an argument inside of the callback function
      res.json(dbUsertags)
    })
  })
  
  // GET route for getting a specific category
  app.get("/api/categories/:id", function(req, res) {
    // findOne returns the entry from the category table based on id 
    db.Categories.findOne({  
    where: {
        id: req.params.id
      }
    }).then(function(dbCategories) {
      // We have access to the users as an argument inside of the callback function
      res.json(dbCategories)
    })
  })

  // GET route for getting all category
  app.get("/api/categories", function(req, res) {
    // findAll returns all the entries from the category table 
    db.Categories.findAll({}).then(function(dbCategories) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbCategories)
    })  
  })

  // POST route for saving a new user
  app.post("/api/users", function(req, res) {
    // create takes an argument of an object describing the user we want to
    // insert into our table. 
   
    var error = " "
    var userValid = true

    var passwordData = validPass.checkPassword(req.body.Password);
    if (!passwordData.isValid) {
      console.log(passwordData.isValid) // false
      console.log(passwordData.validationMessage)
      error = passwordData.validationMessage
      userValid = false
    }

    if (!validator.validate(req.body.Email)) {
      console.log('invalid email')
      error = 'Invalid email, please enter a correcty formatted email'
      userValid = false
       
    } 
    
    // added so user must enter a valid zip, call to zippopotam
    if (!postcode.validate(req.body.Zipcode, 'US')) {
          console.log('invalid zip')
          error = 'Zip Code is invalid'
          userValid = false 
    }
    
    var n = req.body.Email.indexOf("@")   // determine position of @ sign
    inUserid = req.body.Email.slice(0, n);  //split email to use for userid

    db.Users.findOne({
      where: {
        userid: inUserid
    }
    }).then(function(dbUsers) {
      console.log("The inuserid " + inUserid)
      console.log("The userid " + dbUsers)
      if (dbUsers != null) {}
      else {
        error = 'Userid already exists'
        userValid = false
      }
    })

    if (userValid) {
          
      db.Users.create({
        userid: inUserid,        
        password: req.body.Password,          
        email: req.body.Email,  
        zipcode: req.body.Zipcode,
        twitterid: req.body.Twitter
      }).then(function(dbUsers) {
        // We have access to the new user as an argument inside of the callback function
       
        if (req.body.Tag != ""){
          db.Usertags.create({
            userid: inUserid,
            usertag: req.body.Tag
          }).then(function(dbUsertags) {})}

        if (req.body.userCategory === ""){
          req.body.userCategory = 'Event'
        }
       
        db.Usercategories.create({
          userid: inUserid,
          userCategory: req.body.userCategory
        }).then(function(dbUsercategories) {})
        
        res.render("index", objectEv)
      })
    }
    else {
      
      var hbsObject = {error}
      console.log(hbsObject)
      res.render('index', hbsObject)
    }  
  })

  // POST route for saving a new user tag
  app.post("/api/usertags", function(req, res) {
    // create takes an argument of an object describing the user tag we want to
    // insert into our table.
    db.Usertags.create({
      usertag: req.body.usertag
    }).then(function(dbUsertags) {
      // We have access to the new user tag as an argument inside of the callback function
      res.json(dbUsertags)
    })
  })

  // POST route for saving a new user event
  app.post("/api/userevents", function(req, res) {
    // create takes an argument of an object describing the user event we want to
    // insert into our table. 
    console.log(req.body)

    var eventPub = false
    var eventPri = false

    store.get(storeUserid)

    if (req.body.eventPublic == 'on') {
      eventPub = true
    }
    else {
      eventPri = true
    }
    db.Userevents.create({
      eventtitle: req.body.eventTitle, 
      eventdesc: req.body.eventDescription,
      eventlocation: req.body.eventLocation, 
      eventstartdate: req.body.eventStartdate, 
      eventenddate: req.body.eventEnddate,
      eventcapacity: req.body.eventCapacity, 
      eventpublic: eventPub,
      eventprivate: eventPri,
      eventcategory: req.body.eventCategory,
      eventUserid: storeUserid      
    }).then(function(dbUserevents) {      
      // We have access to the new user event as an argument inside of the callback function
     if (req.body.eventTag != ""){
      db.Usertags.create({
        userid: storeUserid,
        usertag: req.body.eventTag
      }).then(function(dbUsertags) {})}
        // We have access to the new user tag as an argument inside of the callback function
        if (req.body.eventTwitter != "" && eventPub){
        var tweetMsg = req.body.eventTitle + " on " + req.body.eventStartdate + ". First "  + req.body.eventCapacity + " responses will be sent location and further details" 
        client.post('statuses/update', {status: tweetMsg},  function(error, tweet, response){
          if(error){
            console.log(error);
          }
          console.log(tweet);  // Tweet body.
          // console.log(response);  // Raw response object.
        })}      
      res.render("index", objectEv)
    })
  })

  // POST route for saving a new user like
  app.post("/api/userlikes", function(req, res) {
    // create takes an argument of an object describing the user like 
    db.Userlikes.create({
      liketitle: req.body.liketitle,
      likedesc: req.body.likedesc,
      likelocation: req.body.likelocation, 
      likestartdate: req.body.likestartdate,
      likeenddate: req.body.likeenddate,
      likesource:req.body.likesource      
    }).then(function(dbUserlikes) {
      // We have access to the new user event as an argument inside of the callback function
      res.json(dbUserlikes)
    })
  })
}
