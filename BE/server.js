const cors = require('cors');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var validator = require('express-validator');
var passport = require('passport');
require('./controllers/passport');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cors({ origin: 'http://13.52.25.154:3000', credentials: true }));
var mysql = require('mysql');
let fs = require("fs");
const multer = require("multer")
var kafka = require('./kafka/client')

const bcrypt = require('bcrypt');
const saltRounds = 10;
var LocalStrategy = require("passport-local").Strategy;


const jwt = require("jsonwebtoken");

app.use(passport.initialize());
app.use(passport.session());
//method to serialize user for storage
passport.serializeUser(function(username, done) {
    done(null, username);
});

passport.deserializeUser(function(user, done) {
  User.findById(user.id, function(err, user) {
    if(err) {
      console.error('There was an error accessing the records of' +
      ' user with id: ' + id);
      return console.log(err.message);
    }
    return done(null, user);
  })
});

const TravelerLoginSignUp = require('./controllers/TravelerLoginSignUp');
const OwnerLoginSignUp = require('./controllers/OwnerLoginSignUp');
const PlacesSearch = require('./controllers/PlacesSearch');
const UserProfile = require('./controllers/UserProfile');
const Property = require('./controllers/Property');
const TravelerDashboard = require('./controllers/TravelerDashboard')
const OwnerDashboard = require('./controllers/OwnerDashboard')
const Messages = require('./controllers/Messages');

app.use(session({
    secret              : 'shim!^^#&&@is@**#*(awesome',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

app.use(bodyParser.json());

var placename= '';
var	startdate_user = '';
var enddate_user  = '';
var adultlist = 0;
var childlist = 0;
var Max_ID = -1;

var con = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "Audigger",
  database: "HomeAway"
});

/*
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Audigger",
    database : "HomeAway"
});*/

app.use(function(req, res, next) {
    //res.setHeader('Access-Control-Allow-Origin', 'http://13.52.25.154:3000');
    res.setHeader('Access-Control-Allow-Origin', 'http://13.52.25.154:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

//app.post('/login', (req, res)=> {TravelerLoginSignUp.handleLogin(req, res)})
/*
app.post('/login', function(req, res) {
  passport.authenticate('login', function(err, user) {
    console.log(user)
      if(!user) {
        console.log("CHECK: "+ user);
        res.status(201).json({output:0});
      }
      else{
      req.session.user = user.username;
      console.log("Session initialised: "+req.session.user);
      req.session.save();
      res.status(201).send({output:user.r});}

  })(req, res);
});
*/
/*

const express = require('express');
const router  = express.Router();

const jwt      = require('jsonwebtoken');
const passport = require('passport');

app.use('/user', passport.authenticate('jwt', {session: false}), user);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

passport.use('login', new LocalStrategy(function (username, password, done) {
  console.log('in password',password);
  console.log('in username',username);
  kafka.make_request('loginUser_topic', {"username": username, "password": password}, function (err, results) {
  console.log('in result', results);
  if (err) {
      done(err, {});
  }
  else 
  { 
      console.log("Results are", results.code)
      if (results.code == 200) {
      done(null, {username: username, password: password});
       }
      else {
      done(null, false);
        }
  }
})
}))
/*
app.post('/login', function (req, res) {
  console.log("BODY", req.body)
  passport.authenticate('login', function (err, user) {
      if (err) {
          res.status(500).send();
      }
      console.log("USER",user)
      if (!user) {
          res.statusMessage = "Username does not exist. Please double-check and try again.";
          res.status(400).send();
      }
      else {

          req.login(user.username, function (err) {
              if (err) {
                  console.log(err);
              }
              req.session.username = user.username;
              console.log(req);
              console.log("session initilized");
              res.status(200).send({user: user});
          });

      }

  })(req, res);

});
*/
/*
//app.post('/login', (req,res) => {TravelerLoginSignUp.handleLogin(req,res)})
app.post('/traveller/signup', (req,res) => {TravelerLoginSignUp.handleSignUp(req,res)})
app.post('/owner/login' , (req,res) => {OwnerLoginSignUp.handleLogin(req,res)})
app.post('/owner/signup',(req,res) => {OwnerLoginSignUp.handleSignUp(req,res)})
//app.get('/placefilters', (req,res) => {PlacesSearch.setPlacesFilters(req,res)})
app.get('/places',(req,res) => {PlacesSearch.getsearchPlaces(req,res)})
app.post('/places', (req,res) => {PlacesSearch.setsearchPlaces(req,res)})
app.get("/user/account/:id", (req,res) => {UserProfile.getUserDetails(req,res)})
app.put("/editprofile/save/:id", (req,res) => {UserProfile.updateUserDetails(req,res)})
app.get("/getmaxpropertyid" , (req,res) => {Property.getMaxProperty(req,res)})
app.post("/postproperty",  (req,res) => {Property.postProperty(req,res)})
app.post("/book/property",  (req,res) => {Property.bookProperty(req,res)})
app.get("/places/propertydescription/:id", (req,res) => {Property.placeDescription(req,res)})
app.get("/tripsboard/:id",  (req,res) => {TravelerDashboard.latestBookings(req,res)})
app.get("/allpropertylisting/:id", (req,res) => {OwnerDashboard.allProperties(req,res)})
app.get("/mypropertylistings/:id",  (req,res) => {OwnerDashboard.latestPostings(req,res)})
app.post("/messages",(req,res) => {Messages.getAllMessages(req,res)})
app.post("/sendmessage",(req,res) => {Messages.sendMessage(req,res)})
app.post("/ownermessages",(req,res) => {Messages.getAllMessagesOwner(req,res)})
app.post('/placeswithfilters', (req,res) => {PlacesSearch.setsearchPlaceswithFilters(req,res)})
app.post('/inbox',(req,res) => {Messages.inbox(req,res)})
app.post('/owner/inbox',(req,res) => {Messages.inboxOwner(req,res)})
*/
/*app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)}) */
  //app.use(app.router);
  //homeaway_requests.initialize(app);

/*
  app.post('/login',function(req,res){
  kafka.make_request('loginUser_topic', {"username": req.body.username, "password": req.body.password}, function (err, results) {
    console.log('in result');
    if (err) {
        res.writeHead(400,{
            'Content-Type' : 'text/plain'
        })
        res.end("Invalid Credentials");
    }
    else {
            console.log("Results is" , results.code)
            res.cookie('cookie',req.body.username,{maxAge: 9000000, httpOnly: false, path : '/'});
            req.session.user = results;
            console.log("Successfully retrieving User")
            console.log("Username is "+ JSON.stringify(req.body.username))
            res.status(200).send(JSON.stringify(req.body.username));
            res.end("Successful Login");
        }
})
});
*/

//app.use('/', homeaway_requests);

//const url = 'mongodb://localhost:27017';

// Database Name

//---MODIFIED THIS

const dbName = 'HomeAway';


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";


// Mongoose Setup - MongoDB - ORM
const mongoose      = require("mongoose");
const options       = {
   // autoIndex: false, // Don't build indexes
    poolSize: 10,
};
mongoose.Promise    = global.Promise;
//mongoose.connect('mongodb://localhost:27017/freelancerdb', options);
mongoose.connect('mongodb://localhost:27017/HomeAway', options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connection Successful!");
});


var HomeAway = require("./model/HomeAway")


MongoClient.connect(url, function(err, client) {
  if (err) throw err;
  else
  {
      const db = client.db(dbName);
      console.log("Database Connected");
      console.log(db.collection('HomeAway').find().count())
      db.collection('HomeAway').findOne({}, function (findErr, result) {
      if (findErr) throw findErr;
      console.log(result.username);
     });
  }
});

var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/HomeAway";

app.post('/login',function(req,res){
  console.log("HERE")
    MongoClient.connect(url, {  
      poolSize: 10
      // other options can go here
    }, function(err, client) {
        if (err) {
           res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
                    throw err;
        }
        else
        {
            var username = req.body.username;
           // var password = req.body.password;
            const db = client.db(dbName);
            console.log("Database Connected");
            db.collection('HomeAway').findOne({'Users.username': username,'Users.traveler': true}, function (findErr, result) {
            if (findErr) {
               res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
                    throw findErr;
            }
            else
              {
                  console.log("USERNME", result)
                  if(result === null)
                  {
                    res.writeHead(400,{
                      'Content-Type' : 'text/plain'
                  })
                  res.end("Invalid Credentials");
                  }
                  else
                  {
                   bcrypt.compare(req.body.password,result.Users.password, function(err, answer) { 
                     //  let answer = (result.password === password)
                       console.log("answer is " +  JSON.stringify(answer))
                        if(answer){
                        console.log("Herethree") 
                        const body = { _id: req.body.username, type: "traveler" };
                        const token = jwt.sign(
                          { user: body },
                          "HOMEAWAYUSER"
                        );  
                        res.cookie('cookie',req.body.username,{maxAge: 9000000, httpOnly: false, path : '/'});
                        req.session.user = result;
                        console.log("Successfully retrieving User")
                        console.log("Username is "+ JSON.stringify(username))
                      res.status(200).send(JSON.stringify(token));
                      console.log("TOKEN IS", token)
                    //  res.value = token
                      //res.status(200).send(JSON.stringify(res.value))
                   //     res.end("Successful Login");
                       }//if
                     else
                     {
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Invalid Credentials");
                     }
                  })//bcrypt
              }//else
            }
           });//db collection
        }//else
      });//mongoClient
});//app

app.post('/owner/login',function(req,res){
  console.log(req.body)
  console.log("HERE")
    MongoClient.connect(url, {  
      poolSize: 10
      // other options can go here
    }, function(err, client) {
        if (err) {
           res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
                    throw err;
        }
        else
        {
            var username = req.body.username;
            
           // var password = req.body.password;
            const db = client.db(dbName);
            console.log("Database Connected");
            db.collection('HomeAway').findOne({'Users.username': username,'Users.owner': true}, function (findErr, result) {
            if (findErr) {
               res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
                    throw findErr;
            }
            else
              {
                  console.log("USERNME", username)
                  if(result === null)
                  {
                    res.writeHead(400,{
                      'Content-Type' : 'text/plain'
                  })
                  res.end("Invalid Credentials");
                  }
                  else
                  {
                   bcrypt.compare(req.body.password,result.Users.password, function(err, answer) {
                       console.log("answer is " +  JSON.stringify(answer))
                        if(answer){
                        console.log("Herethree")   
                        const body = { _id: req.body.username, type: "owner" };
                        const token = jwt.sign(
                          { user: body },
                          "HOMEAWAYUSER"
                        );  
                        res.cookie('cookieowner',req.body.username,{maxAge: 9000000, httpOnly: false, path : '/'});
                        req.session.user = result;
                        console.log("Successfully retrieving User")
                        console.log("Username is "+ JSON.stringify(username))
                       // res.status(200).send(JSON.stringify(username));
                       res.status(200).send(token)
                        res.end("Successful Login");
                       }//if
                     else
                     {
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Invalid Credentials");
                     }
                  })//bcrypt
              }//else
            }
           });//db collection
        }//else
      });//mongoClient
});//app

app.post('/traveller/signup',function(req,res){
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    var password = hash;
    var SignUp = new HomeAway({
    Users :{
    username :req.body.username,
    password : password,
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    email : req.body.email,
    traveler : true
        }
    })
var promise = SignUp.save();
promise
.then(function() {
res.value = req.body;
res.code = 200;
const body = { _id: req.body.username, type: "traveler" };
const token = jwt.sign(
  { user: body },
  "HOMEAWAYUSER"
);
res.status(200).send(JSON.stringify(token));
})
.catch(function(err) {
console.log("error:", err.message);
if (err.message.includes("username_1 dup key:"))
  res.value = "This username already exists!";
else res.value = "Error in registering data please try again!";
res.code = "400";
res.status(400).send(JSON.stringify(res.value));
});
});
  /*
    console.log("Inside Login Post Request");
     MongoClient.connect(url, {  
      poolSize: 10
      // other options can go here
    }, function(err, client) {
        if (err) {
          throw err;
           res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
        }
        else
        {
          console.log("Connected!");
          var hashed_password = '';
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
          hashed_password = hash;
                var username = req.body.username;
                var firstname = req.body.firstname;
                var lastname = req.body.lastname;
                var email = req.body.email;
                console.log("Hashed password = " + hashed_password)
              const db = client.db(dbName);
            db.collection('HomeAway', function (err, collection) {
            collection.insert({username : username ,password : hashed_password,firstname : firstname,lastname : lastname,traveller : 1 ,email : email} , function (findErr, result) {
            if (findErr) {throw findErr;
               res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
            }
            else
              {
                      res.cookie('cookie',req.body.username,{maxAge: 9000000, httpOnly: false, path : '/'});
                      req.session.user = result;
                      console.log("YES iNSETRTED")
                      console.log(JSON.stringify(result))
                      console.log("Username is "+ JSON.stringify(username))
                      res.status(200).send(JSON.stringify(username));
                      res.end("Successful Login");
              }//else
              });//dbfunc
          });
              })// end of bcrypt
          }//else
    });*/
});

app.post('/owner/signup',function(req,res){
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    var password = hash;
    var SignUp = new HomeAway({
    Users :{
    username :req.body.username,
    password : password,
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    email : req.body.email,
    owner : true
        }
    })
var promise = SignUp.save();
promise
.then(function() {
res.value = req.body;
res.code = 200;
const body = { _id: req.body.username, type: "owner" };
const token = jwt.sign(
  { user: body },
  "HOMEAWAYUSER"
);  
res.status(200).send(JSON.stringify(token));
})
.catch(function(err) {
console.log("error:", err.message);
if (err.message.includes("username_1 dup key:"))
  res.value = "This username already exists!";
else res.value = "Error in registering data please try again!";
res.code = "400";
res.status(400).send(JSON.stringify(res.value));
});
});
  /*console.log("Inside Login Post Request");
   MongoClient.connect(url, {  
    poolSize: 10
    // other options can go here
  }, function(err, client) {
      if (err) {
        throw err;
         res.writeHead(400,{
                      'Content-Type' : 'text/plain'
                  })
                  res.end("Invalid Credentials");
      }
      else
      {
        console.log("Connected!");
        var hashed_password = '';
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        hashed_password = hash;
              var username = req.body.username;
              var firstname = req.body.firstname;
              var lastname = req.body.lastname;
              var email = req.body.email;
              console.log("Hashed password = " + hashed_password)
            const db = client.db(dbName);
          db.collection('HomeAway', function (err, collection) {
          collection.insert({username : username ,password : hashed_password,firstname : firstname,lastname : lastname,owner : 1 ,email : email} , function (findErr, result) {
          if (findErr) {throw findErr;
             res.writeHead(400,{
                      'Content-Type' : 'text/plain'
                  })
                  res.end("Invalid Credentials");
          }
          else
            {
                    res.cookie('cookieowner',req.body.username,{maxAge: 9000000, httpOnly: false, path : '/'});
                    req.session.user = result;
                    console.log("YES iNSETRTED")
                    console.log(JSON.stringify(result))
                    console.log("Username is "+ JSON.stringify(username))
                    res.status(200).send(JSON.stringify(username));
                    res.end("Successful Login");
            }//else
            });//dbfunc
        });
            })// end of bcrypt
        }//else
  });*/
});
/*
app.get('/placefilters', function(req,res){
  //console.log("VALUES ARE : " + placename + startdate_user + adultlist + childlist)
		res.send({'placename': placename, 'startdate' : startdate_user ,'enddate' : enddate_user , 'adultlist' : adultlist, 'childlist' : childlist})
	});
*/
  app.get("/user/account/:id", function(req, res) {
    MongoClient.connect(url, {  
      poolSize: 10
      // other options can go here
    }, function(err, client) {
      if (err) 
      {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error while retrieving User Account");
      } //if
      else 
      {
        const db = client.db(dbName);
        db.collection('HomeAway').findOne({'Users.username':req.params.id},{Users:1,_id:0},function(findErr, result){
        if (findErr) {
           res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Invalid Credentials");
                throw findErr;
        }//if
        else
          {
            res.writeHead(200, {
              "Content-Type": "application/json"
            });
            res.end(JSON.stringify(result));
            console.log(JSON.stringify(result));
            console.log("JSON.stringify(result)", JSON.stringify(result));
          }//else
        })
    }
  });
});
/*
app.get("/getmaxpropertyid" , function(req,res) {
  MongoClient.connect(url, {  
    poolSize: 10
    // other options can go here
  }, function(err, client) {
    if (err) 
    {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error while retrieving");
    } //if
    else 
    {
      const db = client.db(dbName);
      //db.thiscollection.find().sort({"thisfieldname":-1}).limit(1)
      db.collection('HomeAway').aggregate([
        { $unwind :'$property_posted'},
        { "$sort": { "property_posted.prop_id": -1 } },
        { "$group": {
            "_id": "max_id",
            "prop_id": { "$first": "$property_posted.prop_id" }
        }}
    ], function (findErr, result) {
      console.log("Result is ", result)
        if (findErr) {throw findErr;
           res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Invalid Credentials");
        }//if
        else
          {
           // console.log("YES" + JSON.stringify((result)))
             res.writeHead(200, {
              "Content-Type": "application/json"
              });
             // console.log("result is " + JSON.stringify(result, undefined, 2))
            Max_ID = result.prop_id + 1
            console.log("Max Prop ID" + Max_ID)
          }
        });
      }
    });
  });

  /*
req.body.aboutme + '"' +  "," +
     "company =" + '"' + req.body.company + '"' + "," +
     "school =" + '"' + req.body.school + '"' + "," +
     "hometown =" + '"' + req.body.hometown + '"' + "," +
     "language =" + '"' + req.body.language + '"' + "," +
     "gender =" + '"' + req.body.gender + '"' + "," +
     "state =" + '"' + req.body.state + '"' + "," +
     "country =" + '"' + req.body.country + '"' + "," +
     "contact =" + '"' + req.body.contact + '"' + "," +
     "address =" + '"' + req.body.address + '"' +

  */


//  mongo.myconnect(mongoURL, function () {
//   console.log('Connected to mongo at: ' + mongoURL);
//   var coll = mongo.collection('HomeAway');
//  console.log("Message is", username)
//  coll.findOneAndUpdate({'Users.username':msg.username},{ "$set": { "Users.school" : msg.school,
//  "Users.contact" : msg.contact,
//  "Users.aboutme" : msg.aboutme,
//  "Users.company" : msg.company,
//  "Users.hometown" : msg.hometown,
//  "Users.language" : msg.language,
//  "Users.gender" : msg.gender,
//  "Users.state" : msg.state,
//  "Users.country" : msg.country,
//  "Users.address" : msg.address}},{new: true},function(findErr, resultone){
//         console.log("Query Output", JSON.stringify(resultone))
//           if (findErr) { 
//               res.code = "400";
//               res.value = "Failed Login";
//               console.log(res.value);
//               throw findErr;
//           }//if
//           else
//             {
//                 coll.findOne({'Users.username':msg.username},{Users:1,_id:0},function(findErr, resulttwo){
//                     if(findErr)
//                     {
//                       res.code = "400";
//                       res.value = "Failed Login";
//                       console.log(res.value);
//                       throw findErr;
//                     }
//                     else{
//                           console.log("-----------------------------------")                  
//                           console.log("RESULT IS - ",JSON.stringify(resulttwo))
//                           res.code ="200";
//                           res.value = resulttwo;
//                     }
//                     console.log("inside try:" + res);
//                     callback(null, res) 
//                 })
             
//             }  
         
//   })
// })
  app.put("/editprofile/save/:id", function(req, res) {
    MongoClient.connect(url, {  
      poolSize: 10
      // other options can go here
    }, function(err, client) {
      if (err) 
      {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error while retrieving");
      } //if
      else 
      {
        const db = client.db(dbName);
        var username = req.params.id;
        db.collection('HomeAway').findOneAndUpdate({'Users.username': username},{ "$set": { "Users.school" : req.body.school,
        "Users.contact" : req.body.contact,
        "Users.aboutme" : req.body.aboutme,
        "Users.company" : req.body.company,
        "Users.hometown" : req.body.hometown,
        "Users.language" : req.body.language,
        "Users.gender" : req.body.gender,
        "Users.state" : req.body.state,
        "Users.country" : req.body.country,
        "Users.address" : req.body.address}},{new: true},function(err, resultone){
          if (err) {
            res.writeHead(400, {
              "Content-Type": "text/plain"
            });
            res.end("Error in Posting property.");
          } else {
            res.status(200).send(resultone);
          }
        });
      }//else
    });
  });


  app.post('/places', (req,res) => { 
    placename = req.body.placename
    startdate_user =  req.body.startdate
    enddate_user =  req.body.enddate 
    adultlist =  req.body.adultlist
    childlist =  req.body.childlist
    MongoClient.connect(url, {  
      poolSize: 10
    }, function(err, client) {
      if (err) 
      {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error while retrieving");
      } //if
      else 
      {
        console.log("MAX ADULTS", req.body.adultlist)
        const db = client.db(dbName);
        const regexcity = new RegExp(req.body.placename,'i');
        db.collection('HomeAway').aggregate([
              { 
                  $unwind: '$Property'
              },
              {
              $match: 
                  {
                      $and:[
                        {"Property.city":regexcity},
                        {"Property.maxadults" : { $gte : Number(req.body.adultlist)}},
                        {"Property.maxchild"  : { $gte : Number(req.body.childlist)}},
                        {"Property.startdate" : { $lte : String(req.body.startdate)}},
                        {"Property.enddate" : { $gte : String(req.body.enddate)}}
                         ]
                  }
              },
          {
              $project :
              {
                  Property : "$Property",
                  _id:0
              }
          }
         ]).toArray(function(findErr, result){
                      console.log("Query Output", JSON.stringify(result))
                      if (findErr) { 
                          res.code = "400";
                          res.value = "Failed Login";
                          console.log(res.value);
                          console.log("inside try:" + res);
                          throw findErr;  
                      }//if
                      else
                          {
                          console.log("-----------------------------------")                  
                          console.log("RESULT IS - ",result)
                          res.code ="200";
                          res.value = result;
                          console.log("inside try:" + res);
                          res.status(200).send(JSON.stringify(result));
                          }     
                  })//toarr
                }//else
              });
    });

    app.get('/places', (req,res) => {
      MongoClient.connect(url, {  
        poolSize: 10
      }, function(err, client) {
        if (err) 
        {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Error while retrieving");
        } //if
        else 
        {
          const db = client.db(dbName);
          const regexcity = new RegExp(req.body.placename,'i');
          db.collection('HomeAway').aggregate([
                { 
                    $unwind: '$Property'
                },
                {
                $match: 
                    {
                        $and:[
                          {"Property.city":regexcity},
                          {"Property.maxadults" : { $gte : Number(req.body.adultlist)}},
                          {"Property.maxchild"  : { $gte : Number(req.body.childlist)}},
                          {"Property.startdate" : { $lte : String(req.body.startdate)}},
                          {"Property.enddate" : { $gte : String(req.body.enddate)}}
                           ]
                    }
                },
            {
                $project :
                {
                    Property : "$Property",
                    _id:0
                }
            }
           ]).toArray(function(findErr, result){
                        console.log("Query Output", JSON.stringify(result))
                        if (findErr) { 
                            res.code = "400";
                            res.value = "Failed Login";
                            console.log(res.value);
                            console.log("inside try:" + res);
                            throw findErr;  
                        }//if
                        else
                            {
                            console.log("-----------------------------------")                  
                            console.log("RESULT IS - ",result)
                            res.code ="200";
                            res.value = result;
                            console.log("inside try:" + res);
                            res.status(200).send(JSON.stringify(result));
                            }     
                    })//toarr
                  }//else
                });
  })

  app.post("/messages",(req,res) => {
    MongoClient.connect(url, {  
      poolSize: 10
    }, function(err, client) {
      if (err) 
      {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error while retrieving");
      } //if
      else 
      {
        const db = client.db(dbName);
        db.collection('HomeAway').aggregate([
      { $unwind: '$Messages' },
      { $match: {
          'Messages.prop_id': req.body.prop_id,
          'Messages.traveler':req.body.username
      }},
      { $sort : {"Messages.id" : 1}},
      { $group: { "_id" : "$Messages.prop_id", "Messages": {$push: "$Messages"}}},
      { $project: {_id: 0, "Messages": 1}}
  ]).toArray(function(findErr, result){
                          if(findErr)
                          {
                              res.code = "400";
                              res.value = "Failed Login";
                              console.log(res.value);
                              throw findErr;
                          }
                          else
                          {
                                  console.log("-----------------------------------")                  
                                  console.log("RESULT IS - ",JSON.stringify(result))
                                  res.code ="200";
                                  res.value = result;
                                  console.log("inside try:" + res);
                                  res.status(200).send(JSON.stringify(result));
                          }//else
                      })//func
                    }
  })
  })

  app.post("/sendmessage",(req,res) => {
    MongoClient.connect(url, {  
      poolSize: 10
    }, function(err, client) {
      if (err) 
      {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error while retrieving");
      } //if
      else 
      {
        const db = client.db(dbName);
        db.collection('HomeAway').findOneAndUpdate({'Users.username':req.body.username},{ "$push": { "Messages": { "id": new Date(),"prop_id" : Number(req.body.property_id),"traveler" : req.body.username, "message" : req.body.message, "owner" : req.body.ownername}}},{new:true},function(findErr, results){
      if(findErr)
      {
          res.code = "400";
          res.value = "Failed Login";
          console.log(res.value);
          throw findErr;
      }
      else{
              console.log("-----------------------------------")                  
              console.log("RESULT IS - ",JSON.stringify(results.value))
              res.code ="200";
              res.value = results.value;
              console.log("inside try:" + res);
              res.status(200).send(JSON.stringify(results));
      }//else
  })//func
    }
  })


  })
  app.post("/ownermessages",(req,res) => {
 MongoClient.connect(url, {  
      poolSize: 10
    }, function(err, client) {
      if (err) 
      {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error while retrieving");
      } //if
      else 
      {
        const db = client.db(dbName);
        db.collection('HomeAway').aggregate([
          { $unwind: '$Messages' },
          { $match: {
              'Messages.owner':req.body.username
          }},
          { $sort : {"Messages.id" : 1}},
          { $group: { "_id" : { "id": "$Messages.prop_id", "traveler" : "$Messages.traveler"}, "Messages": {$push: "$Messages"}}},
          { $project: {_id: 0, "Messages": 1}}
      ]).toArray(function(findErr, result){
                          if(findErr)
                          {
                              res.code = "400";
                              res.value = "Failed Login";
                              console.log(res.value);
                              throw findErr;
                          }
                          else
                          {
                                  console.log("-----------------------------------")                  
                                  console.log("RESULT IS - ",JSON.stringify(result))
                                  res.code ="200";
                                  res.value = result;
                                  console.log("inside try:" + res);
                                  res.status(200).send(JSON.stringify(result));
                          }//else
                      })//func
                    }
  })
  })

  app.post('/placeswithfilters', (req,res) => {

  })
  app.post('/inbox',(req,res) => {
    MongoClient.connect(url, {  
      poolSize: 10
    }, function(err, client) {
      if (err) 
      {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error while retrieving");
      } //if
      else 
      {
        const db = client.db(dbName);
        db.collection('HomeAway').aggregate([
          { $unwind: '$Messages' },
          { $match: {
              'Messages.traveler': req.body.username
          }},
          { $sort : {"Messages.id" : 1}},
          { $group: { "_id" : "$Messages.prop_id", "Messages": {$push: "$Messages"}}},
          { $project: {_id: 0, "Messages": 1}}
      ]).toArray(function(findErr, result){
                              if(findErr)
                              {
                                  res.code = "400";
                                  res.value = "Failed Login";
                                  console.log(res.value);
                                  throw findErr;
                              }
                              else
                              {
                                      console.log("-----------------------------------")                  
                                      console.log("RESULT IS - ",JSON.stringify(result))
                                      res.code ="200";
                                      res.value = result;
                                      console.log("inside try:" + res);
                                      res.status(200).send(JSON.stringify(result));
                              }//else
                          })//func
    }
  })
  })

  app.post('/owner/inbox',(req,res) => {
    MongoClient.connect(url, {  
      poolSize: 10
    }, function(err, client) {
      if (err) 
      {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error while retrieving");
      } //if
      else 
      {
        const db = client.db(dbName);
        db.collection('HomeAway').aggregate([
          { $unwind: '$Messages' },
          { $match: {
              'Messages.owner':req.body.username
          }},
          { $sort : {"Messages.id" : 1}},
          { $group: { "_id" : { "id": "$Messages.prop_id", "traveler" : "$Messages.traveler"}, "Messages": {$push: "$Messages"}}},
          { $project: {_id: 0, "Messages": 1}}
      ]).toArray(function(findErr, result){
        if(findErr)
        {
            res.code = "400";
            res.value = "Failed Login";
            console.log(res.value);
            throw findErr;
        }
        else
        {
                console.log("-----------------------------------")                  
                console.log("RESULT IS - ",JSON.stringify(result))
                res.code ="200";
                res.value = result;
                console.log("inside try:" + res);
                res.status(200).send(JSON.stringify(result));
        }//else
    })//func
}
})
})

/*

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

*/

/*

app.post('/login',function(req,res){
    //console.log("Inside Login Post Request");
    con.getConnection(function(err) {
        if (err) 
            throw err;
           // console.log("Connected!");
            var username = req.body.username;
            var password = req.body.password;
            var sql = "SELECT password FROM UserDetails WHERE username = " + 
                      mysql.escape(username) + " and traveller = 1" ;
            //console.log(sql);
            con.query(sql,function(err,result){
            if(err){
                //  console.log("Failed here " + sql)
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
              }
              else{
                   if(result[0] != null){
                     bcrypt.compare(req.body.password,result[0].password, function(err, answer) { 
                       // console.log("answer is " +  JSON.stringify(answer))
                        if(answer){   
                        res.cookie('cookie',req.body.username,{maxAge: 9000000, httpOnly: false, path : '/'});
                        req.session.user = result;
                        console.log("Successfully retrieving User")
                        console.log("Username is "+ JSON.stringify(username))
                         res.status(200).send(JSON.stringify(username));
                         res.end("Successful Login");
                       }//if
                     else
                     {
                        console.log("Failed here " + sql)
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Invalid Credentials");
                     }

                   })//bcrypt
               }//bigif
          else
           {
              console.log("Failed here " + sql)
              res.writeHead(400,{
                  'Content-Type' : 'text/plain'
              })
              res.end("Invalid Credentials");
             }
          } //else
        });
    });//comm
});//app
*/
/*
app.post('/owner/login',function(req,res){
    console.log("Inside Login Post Request");
    con.getConnection(function(err) {
        if (err) 
            throw err;
          console.log("Connected!");
          var username = req.body.username;
          var password = req.body.password;
          var sql = "SELECT password FROM UserDetails WHERE username = " + 
                    mysql.escape(username)+ " and owner = 1" ;
          //console.log("Owner Login Query \n" + sql);
          con.query(sql,function(err,result){
              if(err){
                    console.log("Failed here " + sql)
                      res.writeHead(400,{
                          'Content-Type' : 'text/plain'
                      })
                      res.end("Invalid Credentials");
              }
              else{
                   if(result[0] != null){
                      bcrypt.compare(req.body.password,result[0].password, function(err, answer) { 
                      //console.log("answer is " +  JSON.stringify(answer))
                      if(answer){   
                      res.cookie('cookieowner',req.body.username,{maxAge: 9000000, httpOnly: false, path : '/'});
                      req.session.user = result;
                      console.log("Successfully retrieving Owner")
                      console.log("Owner Username is "+ JSON.stringify(username))
                       res.status(200).send(JSON.stringify(username));
                       res.end("Successful Login");
                   }//if
                   else
                   {
                      console.log("Failed here " + sql)
                      res.writeHead(400,{
                          'Content-Type' : 'text/plain'
                      })
                      res.end("Invalid Credentials");
                    } //else
                   })//bcrypt
               }//bigif
               else
               {
                    console.log("Failed here " + sql)
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
               }
          } //else
        });
    });//comm
});//app


app.post('/traveller/signup',function(req,res){
    console.log("Inside Login Post Request");
    con.getConnection(function(err) {
        if (err) 
            throw err;
    console.log("Connected!");
    var hashed_password = '';

bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  hashed_password = hash;
        var username = req.body.username;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.email;
        console.log("Hashed password = " + hashed_password)
       var sqlone =
    "insert into  HomeAway.UserDetails (username,password,firstname,lastname,traveller,email) values ( " +
    mysql.escape(username) +
    " , " +
    mysql.escape(hashed_password) +
    " , " +
    mysql.escape(firstname) +
    " , " +
    mysql.escape(lastname) + 
    " , " + 
    `1` +
    " , " +
    mysql.escape(email) + 
    " ) " ;

    console.log(sqlone);
        con.query(sqlone,function(err,result){
            if(err){
                   console.log(sqlone);
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Invalid Credentials");
            }
            else{
                 var sqltwo = "SELECT *  FROM UserDetails WHERE username = " + 
                mysql.escape(username) + " and password = " + mysql.escape(hashed_password);
             con.query(sqltwo,function(err,result){
            console.log(sqltwo)
            if(err){
                console.log(sqltwo);
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Invalid Credentials");
            }else{
                res.cookie('cookie',req.body.username,{maxAge: 9000000, httpOnly: false, path : '/'});
                req.session.user = result[0];
                console.log("YES iNSETRTED")
                console.log(JSON.stringify(result))
                 res.status(200).send(JSON.stringify(result[0].username));
                 res.end("Successful Login");
                 console.log(JSON.stringify(res.cookie));
            }
        });
            }
        });
          })// end of bcrypt
    });
});

app.post('/owner/signup',function(req,res){
   console.log("Inside Login Post Request");
    con.getConnection(function(err) {
        if (err) 
            throw err;
    console.log("Connected!");

var hashed_password = '';

bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        hashed_password = hash;
        var username = req.body.username;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.email;
        var sqlone =
    "insert into  HomeAway.UserDetails (username,password,firstname,lastname,owner,email) values ( " +
    mysql.escape(username) +
    " , " +
    mysql.escape(hashed_password) +
    " , " +
    mysql.escape(firstname) +
    " , " +
     mysql.escape(lastname) + 
    " , " + 
    `1` +
     " , " +
    mysql.escape(email) + 
    " ) " ;
    console.log("--------------------------------------------------");
    console.log("Signing Up Query is \n" + sqlone);
    console.log("--------------------------------------------------");
        con.query(sqlone,function(err,result){
            if(err){
                   console.log(sqlone);
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Invalid Credentials");
            }else{
                 var sqltwo = "SELECT *  FROM UserDetails WHERE username = " + 
                mysql.escape(username) + "and password = " + mysql.escape(hashed_password);
        con.query(sqltwo,function(err,result){
            console.log(sqltwo)
            if(err){
                console.log(sqltwo);
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Invalid Credentials");
            }else{
                res.cookie('cookieowner',req.body.username,{maxAge: 9000000, httpOnly: false, path : '/'});
                req.session.user = result[0];
                console.log("YES iNSETRTED")
                console.log(JSON.stringify(result))
                 res.status(200).send(JSON.stringify(result[0].username));
                 res.end("Successful Login");
                 console.log(JSON.stringify(res.cookie));
            }
        });
            }
        });
    });
})//end of bcrypt
});


app.get('/placefilters', function(req,res){
  //console.log("VALUES ARE : " + placename + startdate_user + adultlist + childlist)
		res.send({'placename': placename, 'startdate' : startdate_user ,'enddate' : enddate_user , 'adultlist' : adultlist, 'childlist' : childlist})
	});



app.get("/user/account/:id", function(req, res) {
  var sql =
    "select * FROM UserDetails where username = " +
    mysql.escape(req.params.id);
    console.log(sql)
  con.query(sql, function(err, result) {
    if (err) {

      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error while retrieving User Account");
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(result));
      console.log(JSON.stringify(result));
      console.log("JSON.stringify(result)", JSON.stringify(result));
    }
  });
});

app.get("/getmaxpropertyid" , function(req,res) {
var sql = "select max(id) as maximumID FROM Property";
con.query(sql, function(err, result) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error while retrieving User Account");
    } 
    else {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      Max_ID = result[0].maximumID + 1
    }

  });
});

app.post("/postproperty", function(req, res) {
  //console.log(req.body);
          var startDate = req.body.startdate
          var endDate = req.body.enddate
          let insertQuery =
            "INSERT INTO homeaway.property (`id`, `bed`, `bath`, `country`, `address`, `unit`, `city`, `state`,`zip`,`name`,`description`,`type`,`maxadults`, `maxchild`, `currencytype`,`rate`,`minstay`,`startdate`,`enddate`) VALUES ('" +
            Max_ID +
            "', '" +
            req.body.Bedrooms +
            "', '" +
            req.body.Bathroom +
            "', '" +
            req.body.Country +
            "', '" +
            req.body.StreetAddress +
            "', '" +
            req.body.Suite +
            "', '" +
            req.body.City +
            "', '" +
            req.body.State +
            "', '" +
            req.body.ZipCode+
            "', '" +
            req.body.Headline +
            "', '" +
            req.body.PropertyDescription +
            "', '" +
            req.body.PropertyType +
            "', '" +
            req.body.MaxAdult +
            "', '" +
            req.body.MaxChild +
            "', '" +
            req.body.Currency +
            "', '" +
            req.body.NightCharge +
            "', '" +
            req.body.MinimumStay + 
            "', '" +
            startDate +
            "', '" +
            endDate +
            "')";

            console.log("--------------------------------------------------");
            console.log("Posting a Property Query \n" +  insertQuery)
            console.log("--------------------------------------------------");

                  con.query(insertQuery, function(err, result) {
                          if (err) {
                            console.log("insert", insertQuery);
                            res.writeHead(400, {
                              "Content-Type": "text/plain"
                            });
                            res.end("Error in Posting property.");
                    } //if done

                   else {
                          console.log("property inserted in property table");
                          let insertPropListQuery =
                            "INSERT INTO homeaway.ownerListings(`username`,`prop_id`,`startdate`,`enddate`) VALUES ('" +
                            req.body.username +
                            "', '" +
                            Max_ID +
                            "', '" +
                            startDate +
                            "', '" +
                            endDate +
                            "')";
                          con.query(insertPropListQuery, function(err, result) {
                            if (err) {
                              console.log(insertPropListQuery);
                              res.writeHead(400, {
                                "Content-Type": "text/plain"
                              });
                              res.end("Error in Posting property.");
                            } //if done 
                            else {
                              res.status(200).send({ message: "property Listed successfully!" });
                            }
                            }); // 3 query
                  }// else done
                }); // 2 Query
}); // final END


app.put("/editprofile/save/:id", function(req, res) {
  //console.log("req.session.user", JSON.stringify(req.body));
  var username = req.params.id;
  let insertQuery =
    "UPDATE UserDetails SET aboutme =" + '"' + req.body.aboutme + '"' +  "," +
     "company =" + '"' + req.body.company + '"' + "," +
     "school =" + '"' + req.body.school + '"' + "," +
     "hometown =" + '"' + req.body.hometown + '"' + "," +
     "language =" + '"' + req.body.language + '"' + "," +
     "gender =" + '"' + req.body.gender + '"' + "," +
     "state =" + '"' + req.body.state + '"' + "," +
     "country =" + '"' + req.body.country + '"' + "," +
     "contact =" + '"' + req.body.contact + '"' + "," +
     "address =" + '"' + req.body.address + '"' +
    " WHERE username = " + '"' + username + '"' + ";"
    console.log("--------------------------------------------------");
    console.log("User Information Update Query : \n" + insertQuery)
    console.log("--------------------------------------------------");
  con.query(insertQuery, function(err, result) {
    if (err) {
      //console.log("insert query is =", insertQuery);
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error in Posting property.");
    } else {
      res.status(200).send({ message: "property Listed successfully!" });
    }
  });
});


app.post("/book/property", function(req, res) {
  console.log(req.body);
  var id = req.body.property_id
  var name = req.body.username
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  if (true) {
    let insertQuery =
      "INSERT INTO TravellerBookings (`prop_id`, `username`, `startdate`, `enddate`) VALUES ('" +
      id +
      "', '" +
      name +
      "', '" +
      startDate +
      "', '" +
      endDate +
      "')";
      console.log(insertQuery)
      if(req.body.startdate === '' || req.body.enddate === '')
      {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in Booking property.");
      }
      else
      {
    con.query(insertQuery, function(err, result) {
      if (err) {
        console.log("Came here");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in Booking property.");
      } else {
        console.log("Add Successful")
        res.status(200).send({ message: "property booked successfully!" });
      }
    });
    }
  } else {
    res.statusMessage  = "invalid session";
    res.status(401).end();
  }
});
*/

var storagePropFiles = multer.diskStorage({
  destination: function(req, file, callback) {
  // console.log("req.session.user is", JSON.stringify(req.params));
    callback(null, createDirectory(Max_ID));
  },
  filename: function(req, file, callback) {
   // console.log("req", req.body);
    callback(null, file.originalname);
  }
});

var rootDirectory = "images/";

var uploadPropFiles = multer({
  storage: storagePropFiles
});

function createDirectory(Max_ID) {
  if (!fs.existsSync(rootDirectory)) {
    fs.mkdirSync(rootDirectory);
  }
  let directory = rootDirectory + Max_ID;
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  return directory;
}

app.post("/upload-files/", uploadPropFiles.any(), function(req, res, next) {
});


app.post("/getPropertyImg", function(req, res, next) {
 // console.log("image body for selected img", req.body);
  var filter = ".png";

  var startPath =
    "/Users/local/Desktop/273/React/HomeAway/Backend/images/" +
    req.body.id;
  if (req.body.id) {
    var results = [];
    var files = fs.readdirSync(startPath);
if(files.length) {
      files.forEach(async function(file) {
       // console.log("files in download", file);
        fs.readFile(
          "/Users/local/Desktop/273/React/HomeAway/Backend/images/" +
            req.body.id +
            "/" +
            file,
          await function(err, content) {
           // console.log("###img:", content);
           // console.log("###filename:", file);
            if (err) {
              res.writeHead(400, { "Content-type": "text/html" });
              console.log(err);
              res.end("No such image");
            } else {
              //specify the content type in the response will be an image
              let base64Image = new Buffer(content, "binary").toString(
                "base64"
              );
              results.push(base64Image);
             // console.log("###image in node", results.length);
              //console.log("results in download", results.length);
              if (results.length === files.length) {
              //  console.log("final result", results.length);
                res.status(200).send({ results });
              }
            }//else
          }//await
        );
      });
    }}});

app.get('/places/propertydescription/:id', (req,res) => {
      HomeAway.findOne({"Property.prop_id" : req.params.id},
        {_id: 0,Property: {$elemMatch: {prop_id: req.params.id}}}
        ,function(findErr, result){
                    console.log("Query Output", result)
                    if (findErr) { 
                        res.code = "400";
                        res.value = "Failed Login";
                        console.log(res.value);
                        throw findErr;
                    }//if
                    else
                        {              
                        console.log("-----------------------------------")                  
                        console.log("RESULT IS - ",result.Property[0])
                        res.code ="200";
                        res.value = result;
                        res.status(200).send(JSON.stringify(result));
                        }     
                })
   })
   app.get("/getmaxpropertyid" , function(req,res) {
    MongoClient.connect(url, {  
      poolSize: 10
    }, function(err, client) {
      if (err) 
      {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error while retrieving");
      } //if
      else 
      {
        const db = client.db(dbName);
        db.collection('HomeAway').aggregate([
          { $unwind: "$Property" },
      {
        $sort: {
          "Property.prop_id": -1
        }
      },
      { $limit: 1 }
        ]).toArray(function(findErr, result){
          console.log("Query Output", JSON.stringify(result))
            if (findErr) { 
                res.code = "400";
                res.value = "Failed Login";
                console.log(res.value);
                throw findErr;
            }//if
            else
              {
                console.log("-----------------------------------")                  
                console.log("RESULT IS - ",JSON.stringify(result[0].Property.prop_id))
                res.code ="200";
                res.value = result[0].Property.prop_id;
                Max_ID = result[0].Property.prop_id;
                Max_ID += 1;
                res.status(200).send("Success")
              }    
     })
    }
  })
})




app.post("/book/property", function(req, res) {
  MongoClient.connect(url, {  
    poolSize: 10
  }, function(err, client) {
    if (err) 
    {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error while retrieving");
    } //if
    else 
    {
      console.log("REQUESTS BODY", req.body)
      const db = client.db(dbName);
      var booking_startdate = req.body.startdate;
      var booking_enddate = req.body.enddate;
      var booking_username = req.body.username;
      HomeAway.findOne(
        {"Property.prop_id" : req.body.property_id},
        {_id: 0,Property: {$elemMatch: {prop_id: req.body.property_id}}} ,function(findErr, result){
                    console.log("Query Output", result)
                    if (findErr) { 
                        res.code = "400";
                        res.value = "Failed Login";
                        console.log(res.value);
                        throw findErr;
                    }//if
                    else
                        {
                        // console.log("RESULT IS", result)
                            var PropertyDescription = result.Property[0];
                            db.collection('HomeAway').findOneAndUpdate({'Users.username':booking_username},{ "$push": { "Bookings":   {
                                Property : PropertyDescription,
                                "booking_startdate" : booking_startdate,
                                "booking_enddate" : booking_enddate,
                                "booking_username" : booking_username
                                }}},function(findErr, results){
                                            if(findErr)
                                            {
                                                res.code = "400";
                                                res.value = "Failed Login";
                                                console.log(res.value);
                                                throw findErr;
                                            }
                                            else{
                                                    console.log("-----------------------------------")                  
                                                    //console.log("RESULT IS - ",JSON.stringify(results))
                                                    res.code ="200";
                                                    res.value = results;
                                                    console.log("inside try:" + res);
                                                    res.status(200).send(JSON.stringify("Success"))
                                            }//else
                                        })//func
                        }
                    })
                  }
                })

})

   app.post("/postproperty", function(req, res) {
    console.log(req.body)
     var NewProperty = {
                "prop_id" : Max_ID,
                "name" : req.body.Headline,
                "type" : req.body.PropertyType,
                "bed" : req.body.Bedrooms,
                "bath" :  req.body.Bathroom,
                "startdate" : req.body.startdate,
                "enddate" : req.body.enddate,
                "currencytype" :  req.body.Currency,
                "rate" : req.body.NightCharge,
                "minstay" : req.body.MinimumStay,
                "maxadults" : req.body.MaxAdult,
                "maxchild" : req.body.MaxChild,
                "description" : req.body.PropertyDescription,
                "unit" : req.body.Suite,
                "city" : req.body.City,
                "state" : req.body.State,
                "zip" : req.body.ZipCode,
                "country" : req.body.Country,
                "address" : req.body.StreetAddress,
                "username" : req.body.username
               }
               console.log("NewProp is" , NewProperty)
               MongoClient.connect(url, {  
                poolSize: 10
              }, function(err, client) {
                if (err) 
                {
                  res.writeHead(400, {
                    "Content-Type": "text/plain"
                  });
                  res.end("Error while retrieving");
                } //if
                else 
                {
                  const db = client.db(dbName);
                  HomeAway.findOneAndUpdate({'Users.username':req.body.username},
                { "$push": { "Property":  NewProperty }},function(findErr, results){
                                if(findErr)
                                {
                                    res.code = "400";
                                    res.value = "Failed Login";
                                    console.log(res.value);
                                    throw findErr;
                                }
                                else{
                                        console.log("-----------------------------------")                  
                                        console.log("RESULT IS - ",JSON.stringify(results))
                                        res.code ="200";
                                        res.value = results;
                                        console.log("inside try:" + res);
                                        res.status(200).send("Success")
                                }//else
                            })//func
                          }
        })
  }); // final END


   app.get("/tripsboard/:id", function(req, res) {
    MongoClient.connect(url, {  
      poolSize: 10
    }, function(err, client) {
      if (err) 
      {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error while retrieving");
      } //if
      else 
      {
        const db = client.db(dbName);
        db.collection('HomeAway').aggregate([
    { "$match": {
                "Users.username": {
                    $eq: req.params.id
                }
            }},
    {$project :
        {
            Bookings :"$Bookings",
            _id:0
        }
    }, 
    { $unwind: '$Bookings'},
    
    {
    $sort: {
            "Bookings.booking_startdate":-1
           }
     } 
]).toArray(function(findErr, result){
                  if(findErr)
                  {
                    res.code = "400";
                    res.value = "Failed Login";
                    console.log(res.value);
                    throw findErr;
                  }
                  else{

                        console.log("-----------------------------------")                  
                        console.log("RESULT IS - ",JSON.stringify(result))
                        res.code ="200";
                        res.value = result;
                        res.status(200).send(JSON.stringify(result))
                  }
              }) 
            } 
            })
})


app.get("/allpropertylisting/:id", function(req, res) {
  MongoClient.connect(url, {  
    poolSize: 10
  }, function(err, client) {
    if (err) 
    {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error while retrieving");
    } //if
    else 
    {
      const db = client.db(dbName);
      db.collection('HomeAway').aggregate([
        { 
            "$match": 
            {
                    "Users.username": {
                        $eq: req.params.id
                    }
            }},
        {
            $project :
            {
                Property :"$Property",
                _id:0
            }
        }, 
        { 
            $unwind: '$Property'
        }
       ]).toArray(function(findErr, result){
            console.log("Query Output", result)
            if (findErr) { 
                res.code = "400";
                res.value = "Failed";
                console.log(res.value);
                throw findErr;
            }//if
            else
                {
                console.log("-----------------------------------")                  
                console.log("RESULT IS - ",result)
                res.code ="200";
                res.value = result;
                res.status(200).send(JSON.stringify(result))
                }     
        })
      }
    })
});

app.get("/mypropertylistings/:id", function(req, res) {
  MongoClient.connect(url, {  
    poolSize: 10
  }, function(err, client) {
    if (err) 
    {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error while retrieving");
    } //if
    else 
    {
      const db = client.db(dbName);
      db.collection('HomeAway').aggregate([
        { 
            "$match": 
            {
                    "Users.username": {
                        $eq: req.params.id
                    }
            }},
        {
            $project :
            {
                Property :"$Property",
                _id:0
            }
        }, 
        { 
            $unwind: '$Property'
        },
        {
        $sort: {
                "Property.prop_id":-1
            }
        } 
       ]).toArray(function(findErr, result){
            console.log("Query Output", result)
            if (findErr) { 
                res.code = "400";
                res.value = "Failed Login";
                console.log(res.value);
                throw findErr;
            }//if
            else
                {
                console.log("-----------------------------------")                  
                console.log("RESULT IS - ",result)
                res.code ="200";
                res.value = result;
                res.status(200).send(JSON.stringify(result))
                }     
        })
  }
})
})


     /*
app.get('/places', (req,res) => { 
let selectQuery = "SELECT * from homeaway.property where city ="  + '"' + placename + '"' + " and maxadults >= " + adultlist + " and maxchild >= " + childlist + " and " + '"' + startdate_user + '"' + " between startdate and enddate and " + '"' + startdate_user + '"'  +" <= " + '"' + enddate_user + '"' + " and "+ '"' + enddate_user + '"' + " between startdate and enddate and " + '"' + enddate_user + '"'  + " >= " + '"' + startdate_user + '"' + " and id not in ( select distinct(prop_id) from HomeAway.TravellerBookings where " + '"' + startdate_user + '"' + " between  startdate and enddate || " + '"' + enddate_user + '"' + " between startdate and enddate or startdate between " + '"' +  startdate_user + '"' +  " and " + '"' + enddate_user + '"' + " or enddate between " + '"' +  startdate_user + '"' +  " and " + '"' + enddate_user + '"' + ");"
  //  console.log("GET  IS " + selectQuery)
  con.query(selectQuery, function(err, result) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error in Posting property.");
    } else {
      //  console.log(JSON.stringify(result));
      res.status(200).send(JSON.stringify(result));
    }
  });
});


app.post('/places', (req,res) => {
    placename = req.body.placename
    startdate_user =  req.body.startdate
    enddate_user =  req.body.enddate 
    adultlist =  req.body.adultlist
    childlist =  req.body.childlist
    console.log("--------------------------------------------------");
    let selectQuery = "SELECT * from homeaway.property where city ="  + '"' + req.body.placename + '"' + " and maxadults >= " + req.body.adultlist + " and maxchild >= " + req.body.childlist + " and " + '"' + startdate_user + '"' + " between startdate and enddate and " + '"' + startdate_user + '"'  +" <= " + '"' + enddate_user + '"' + " and "+ '"' + enddate_user + '"' + " between startdate and enddate and " + '"' + enddate_user + '"'  + " >= " + '"' + startdate_user + '"' + " and id not in ( select distinct(prop_id) from HomeAway.TravellerBookings where " + '"' + startdate_user + '"' + " between  startdate and enddate || " + '"' + enddate_user + '"' + " between startdate and enddate or startdate between " + '"' +  startdate_user + '"' +  " and " + '"' + enddate_user + '"' + " or enddate between " + '"' +  startdate_user + '"' +  " and " + '"' + enddate_user + '"' + ");"
    console.log("Place Search Query is \n\n" + selectQuery )
    console.log("--------------------------------------------------");
      con.query(selectQuery, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Error in Posting property.");
        } else {
          console.log("--------------------------------------------------");
          console.log("Places Fetched from Database \n\n" , JSON.stringify(result));
          console.log("--------------------------------------------------");
          res.status(200).send(JSON.stringify(result));
        }
      });
})
*/
/*
app.get('/places/propertydescription/:id', (req,res) => {
   console.log("--------------------------------------------------");
    let selectQuery =
    "SELECT * from Property where id=" +
    mysql.escape(req.params.id);
    console.log("Query hit for Property Description" + selectQuery);
     console.log("--------------------------------------------------");
    con.query(selectQuery, function(err, result) {
      if (err) {
      	console.log(err)
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in Listing Property Details.");
      } else {
      //	console.log("CALLED")
       console.log("--------------------------------------------------");
       console.log(JSON.stringify(result))
       console.log("--------------------------------------------------");
        res.status(200).send(JSON.stringify(result));
      }
    });
})


app.get("/tripsboard/:id", function(req, res) {
  let selectQuery =
    "SELECT prop_id from TravellerBookings where username=" +
    mysql.escape(req.params.id) +
    " order by startdate desc LIMIT 2";
     console.log("--------------------------------------------------");
     console.log("Place Search Query is \n\n" + selectQuery )
     console.log("--------------------------------------------------");
    con.query(selectQuery, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          console.log(selectQuery);
        res.end("Error in fetching latest properties");
          } 
          else 
          {
             // console.log(result.length)
              if(result.length === 0)
              {
                res.status(200).send(JSON.stringify(result));
              }
              if(result.length === 1)
              {
                var prop_id = [result[0].prop_id];
                  let selectQuery =
                    "SELECT  * from Property where id in (" +
                    prop_id[0] +  
                    ")";
                    con.query(selectQuery, function(err, result) {
                 //   console.log("Fault" + selectQuery);
                        if (err) {
                          res.writeHead(400, {
                            "Content-Type": "text/plain"
                          });
                          res.end("Error in fetching latest properties");
                        } else {
                         console.log("--------------------------------------------------");
                         console.log("Properties Fetched \n\n" + JSON.stringify(result))
                         console.log("--------------------------------------------------");
                          res.status(200).send(JSON.stringify(result));
                        }
                    });
            }
            if(result.length === 2)
            {
                var prop_id = [result[0].prop_id, result[1].prop_id];
                console.log(prop_id);
                let selectQuery =
                  "SELECT  * from Property where id in (" +
                  prop_id[0] +
                  "," +
                  prop_id[1] +
                  ")";
                  con.query(selectQuery, function(err, result) {
                      //console.log("Fault" + selectQuery);
                      if (err) {
                        res.writeHead(400, {
                          "Content-Type": "text/plain"
                        });
                        res.end("Error in fetching latest properties");
                      } else {
                        console.log("RESPONSE IS" + JSON.stringify(result))
                        res.status(200).send(JSON.stringify(result));
                      }
                  });
            }
           }
    });
});

app.get("/allpropertylisting/:id", function(req, res) {
      let selectQuery =
        "SELECT  * from Property where id in (" +
        "SELECT  prop_id from OwnerListings where username=" +
        mysql.escape(req.params.id) +
        ")";
        console.log("--------------------------------------------------");
        console.log("Query hit is "+selectQuery)
        console.log("--------------------------------------------------");
         con.query(selectQuery, function(err, result) {
            if (err) {
              console.log(selectQuery);
              res.writeHead(400, {
                "Content-Type": "text/plain"
              });
              res.end("Error in fetching owner properties");
            } else {
              res.status(200).send(JSON.stringify(result));
            }
      });
});


app.get("/mypropertylistings/:id", function(req, res) {
  let selectQuery =
    "SELECT  prop_id from OwnerListings where username=" +
    mysql.escape(req.params.id) +
    " order by startdate desc LIMIT 2";
    console.log("--------------------------------------------------");
    console.log("Place Search Query is \n\n" + selectQuery )
    console.log("--------------------------------------------------");
    con.query(selectQuery, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          console.log(selectQuery);
          res.end("Error in fetching latest properties");
         } 
        else 
        {
          console.log(result.length)
            if(result.length === 0)
            {
              res.status(200).send(JSON.stringify(result));
            }
            if(result.length === 1)
            {
              var prop_id = [result[0].prop_id];
               // console.log(prop_id);
                let selectQuery =
                "SELECT  * from Property where id in (" +
                prop_id[0] +  
                ")";
                con.query(selectQuery, function(err, result) {
                   // console.log("Fault" + selectQuery);
                      if (err) {
                        res.writeHead(400, {
                          "Content-Type": "text/plain"
                        });
                        res.end("Error in fetching latest properties");
                      } else {
                        console.log("--------------------------------------------------");
                        console.log("Fetching Properties \n " + JSON.stringify(result))
                        console.log("--------------------------------------------------");
                        res.status(200).send(JSON.stringify(result));
                      }
                  });
          }
          if(result.length === 2)
          {
              var prop_id = [result[0].prop_id, result[1].prop_id];
              console.log(prop_id);
              let selectQuery =
              "SELECT  * from Property where id in (" +
              prop_id[0] +
              "," +
              prop_id[1] +
              ")";
                con.query(selectQuery, function(err, result) {
                   // console.log("Fault" + selectQuery);
                    if (err) {
                      res.writeHead(400, {
                        "Content-Type": "text/plain"
                      });
                      res.end("Error in fetching latest properties");
                    } else {
                      console.log("--------------------------------------------------");
                      console.log("Fetching Properties \n " + JSON.stringify(result))
                      console.log("--------------------------------------------------");
                      res.status(200).send(JSON.stringify(result));
                    }
                });
           }
         }
  });
});
*/
app.listen(4004, () => {
	console.log("Listening on port 4004")
})