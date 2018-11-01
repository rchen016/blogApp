var mongoose          = require("mongoose"),
    User              = require("./models/user"),
    passport          = require("passport"),
    LocalStrategy     = require("passport-local");

function seedDB(){
	console.log("Making Admin");
	var newUser = new User({username: "admin"});
    var password = "zx1230321";
    console.log("ReCreate Admin");
    User.register(newUser, password,function(err){
  	  if(err){
  		  console.log("err");
  	  }
    });
}

module.exports = seedDB;
