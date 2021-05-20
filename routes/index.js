var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// Root route===================================================================
router.get("/", function(req, res){
    res.render("landing");
});

//==============================================================================
// AUTH ROUTES
//==============================================================================
// Show signup/register form ===================================================
router.get("/register", function(req, res){
    res.render("register");
    console.log("Register view rendered.")
});

// Handling user sign up =======================================================
// router.post("/register", function(req, res){
//     var newUser = new User({username: req.body.username});
//     req.body.password;
//     console.log(newUser);
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             req.flash("error", err);
//             return res.render("register");
//         }
//         passport.authenticate("local")(req, res, function(){
//             res.redirect("/prospects");
//         });
//     });
// });

//==============================================================================

//====================== Register ROUTES =================================

// Render register form ===========================================================
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    req.body.password;
    console.log(newUser + ";" + req.body.password);
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log("There was an error: " + err);
            req.flash("error", err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
            console.log("Passport authentication successful")
        });
    });
});

//==============================================================================

//====================== login + LOGOUT ROUTES =================================

// Render login form ===========================================================
router.get("/login3", function(req, res){
    res.render("login3");
});

// login logic =================================================================
router.post("/login3", passport.authenticate("local", 
    {
        successRedirect: "/",
        successFlash: 'You are now logged in!',
        failureRedirect: "/login3",
        failureFlash: 'Invalid username or password.'
    }));

//==============================================================================

// Logout route ================================================================
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You have successfully logged out!");
    res.redirect("/");
});

// Middleware ==================================================================
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login3");
}

module.exports = router;