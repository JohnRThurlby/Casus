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

var userZip =  " "
var userCat =  " "

var objectEv = {
  event:
  [
    ]
};

db.Userevents.hasMany(db.Usertags)

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

  // GET route for landing page 
  app.get("/api/feed", function(req, res) {
    var queryCall = "https://community-eventful.p.mashape.com/events/search?app_key=kZVX6GMpxCX83vh9&location=" + userZip 
    
    //unirest.get("https://community-eventful.p.mashape.com/events/search?app_key=kZVX6GMpxCX83vh9&location=32835")
    unirest.get(queryCall)
    .header("X-Mashape-Key", "35ZWjjUvuxmshz4RIV2HACPs4csep18CfcAjsnas8mTje72Nko")   
    .header("Accept", "text/plain")
    .end(function (result) {
      // console.log(result.status, result.headers, result.body);
      var parseString = require('xml2js').parseString;
      parseString(result.body, function (err, results) {
        let eventful = results.search.events[0].event;
        objectEv.events = objectEv.event.concat(eventful);
          
        for (var i = 0; i < objectEv.events.length; i++) {
          var mediumImg = objectEv.events[i].image[0].medium;
          if (mediumImg!=undefined) {
          } // end if
          else {
          }   // end else
        }   // end for
      }) // end parse String
      res.render("feed", objectEv)
    }) // end unirest 
   // getFeed (function() {res.render("feed", objectEv)})
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
      
      if (dbUsers != null) {
        
      // We have access to the users as an argument inside of the callback function
          storeUserid = dbUsers.userid
          userZip = dbUsers.zipcode 
          console.log(userZip)
          store.set(storeUserid)
          res.redirect('/api/feed')
      }
      else {
        error = 'Invalid userid/password combination'
        var hbsObject = {error}
        res.render('index', hbsObject)
      }
    })
  })

  // GET route for getting a specific users events
  app.get("/api/useraevents", function(req, res) {
    // findAll returns all entries from the userevents table for a specific user
    db.Userevents.findAll({
      where: {
        eventUserid: storeUserid
      }
    }).then(function(data) {
      // We have access to the users events as an argument inside of the callback function
      var hbsObject = { events: data}
          
      res.render('event', hbsObject)
    })
  })

  // GET route for getting a specific users likes
  app.get("/api/useralikes", function(req, res) {
    // findAll returns all entries from the userlikes table for a specific user
    db.Userlikes.findAll({
      where: {
        likeUserid: storeUserid
      }
    }).then(function(data) {
      // We have access to the users likes as an argument inside of the callback function
      var hbsObject = { events: data}
      res.render('likes', hbsObject)
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
    db.Usercategories.findOne({  
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
    db.Usercategories.findAll({}).then(function(dbCategories) {
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
      error = passwordData.validationMessage
      userValid = false
    }

    if (!validator.validate(req.body.Email)) {
      error = 'Invalid email, please enter a correcty formatted email'
      userValid = false
       
    } 
    
    // added so user must enter a valid zip, call to zippopotam
    if (!postcode.validate(req.body.Zipcode, 'US')) {
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
        
        userCat = req.body.userCategory
        userZip = req.body.Zipcode
        res.redirect('/api/feed')
      })
    }
    else {
      
      var hbsObject = {error}
      res.render('index', hbsObject)
    }  
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
     
    if (req.body.eventTag1 != ""){
        db.Usertags.create({
        userid: storeUserid,
        usertag: req.body.eventTag1,
        eventtag: req.body.eventTitle
    }).then(function(dbUsertags) {})}
    if (req.body.eventTag2 != ""){
      db.Usertags.create({
      userid: storeUserid,
      usertag: req.body.eventTag2,
      eventtag: req.body.eventTitle
    }).then(function(dbUsertags) {})}
    if (req.body.eventTag3 != ""){
      db.Usertags.create({
      userid: storeUserid,
      usertag: req.body.eventTag3,
      eventtag: req.body.eventTitle
    }).then(function(dbUsertags) {})}
    
        // We have access to the new user tag as an argument inside of the callback function
      if (req.body.eventTwitter != "" && eventPub){
      var tweetMsg = req.body.eventTitle + " on " + req.body.eventStartdate + ". First "  + req.body.eventCapacity + " responses will be sent location and further details" 
      client.post('statuses/update', {status: tweetMsg},  function(error, tweet, response){
        if(error){
          console.log(error);
        }
        console.log(tweet);  // Tweet body.
     })}      
      res.redirect("/api/useraevents")
    })
  })

  // POST route for saving a new user like
  app.post("/api/userlikes", function(req, res) {
    
    // create takes an argument of an object describing the user like 
    db.Userlikes.create({
      liketitle: req.body.likeTitle,
      likedesc: req.body.likeDescription,
      likelocation: req.body.likeLocation, 
      likestartdate: req.body.likeStartdate,
      likeenddate: req.body.likeEnddate,
      likesource: "EventFul",  
      likeUserid: storeUserid     
    }).then(function(dbUserlikes) {
      // We have access to the new user event as an argument inside of the callback function
      res.redirect("/api/useralikes")
    })
  })

  // Remove a liked event
  app.post("/api/userdislikes/:title", function(req, res) {
    // create takes an argument of an object describing the user like 
    db.Userlikes.destroy({
        where: { 
          likeUserid: storeUserid,
          liketitle: req.params.title }
            
    }).then(function(dbUserlikes) {
     // We have access to the new user like as an argument inside of the callback function
     res.redirect("/api/useralikes")
    })
  })

  // Remove a user created event
  app.post("/api/removeevent/:title", function(req, res) {
    // create takes an argument of an object describing the user event 
    db.Usertags.destroy({
      where: { 
        userid: storeUserid,
        eventtag:  req.params.title }
          
  }).then(function(dbUserevents) {})

    db.Userevents.destroy({
        where: { 
          eventuserid: storeUserid,
          eventtitle: req.params.title }
            
    }).then(function(dbUserevents) {
     // We have access to the new user event as an argument inside of the callback function
     res.redirect("/api/useraevents")
    })
  })
  
}
