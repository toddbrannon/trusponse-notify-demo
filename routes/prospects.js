var express     = require("express");
var router      = express.Router();
var Prospect    = require("../models/prospect.js");


// INDEX ROUTE - show all prospects
router.get("/", isLoggedIn, function(req, res){
    // Get all prospects from DB
    Prospect.find({}, function(err, allProspects){
        if(err){
            console.log(err);
            req.flash("error", "Something went wrong. Please contact your system administrator!");
        } else {
            res.render("prospects", {prospects:allProspects});
        }
    });
});

// CREATE ROUTE - add new prospect to the DB
router.post("/", isLoggedIn, function(req, res){
    // get data from form and add to prospects array
    var firstname = req.body.firstName;
    var lastname = req.body.lastName;
    var emailaddress = req.body.emailAddress;
    var phonenumber = req.body.phoneNumber;
    var message = req.body.message;
     var newProspect = { firstName: firstname, lastName: lastname, emailAddress: emailaddress, phoneNumber: phonenumber, message: message };
    // Create a new prospect and save to DB
    Prospect.create(newProspect, function (err, newlyCreated){
        if(err){
            console.log(err);
            req.flash("error", "Unable to add your prospect. Please try again or contact your system administrator for help.");
        } else {
            //redirect back to prospects page
            req.flash("success", "Your prospect has been added!");
            res.redirect("/");
        }
    });
});
// NEW ROUTE - show form to create new prospect
router.get("/new", isLoggedIn, function(req, res){
    res.render("new.ejs");
});


// SHOW ROUTE - shows more info about one prospect
router.get("/:id", isLoggedIn, function(req, res){
    //find the prospect with provided ID
    Prospect.findById(req.params.id, function(err, foundProspect){
       if(err){
            console.log(err);
       } else {
            //render show template with that prospect
            res.render("show", {prospect: foundProspect});
       }
    });
});

// EDIT ROUTE - edit an order
router.get("/:id/edit", isLoggedIn, (req, res) => {
    // the order with the provided ID
    //render edit template with that order
    Prospect.findById(req.params.id, (err, foundProspect) => {
        if (err) {
            res.redirect("/prospects");
        } else {
            res.render("edit", { prospect: foundProspect });
        }
    });
});

// UPDATE ROUTE - update an prospect
router.put("/:id", isLoggedIn, (req, res) => {
    // find and update the correct prospect
    Prospect.findByIdAndUpdate(req.params.id, req.body.prospect, (err, updatedProspect) => {
        if (err) {
            req.flash("error", "Unable to process your request at this time. Try again or contact your system administrator for help.");
            res.redirect("/prospect");
            console.log(err);
        } else {
            req.flash("success", "Your changes have been saved.");
            res.redirect("/prospects/" + req.params.id);
        }
    });
    // redirect to the 'show' page (to see changes)
});

// DESTROY ROUTE - delete an order
router.delete("/:id", isLoggedIn, (req, res) => {
    Prospect.findByIdAndRemove(req.params.id, (err, updatedProspect) => {
        if (err) {
            req.flash("error", "Unable to process your request at this time. Try again or contact your system administrator for help.");
            res.redirect("/prospects");
            console.log(err);
        } else {
            req.flash("success", "Prospect has been deleted.");
            res.redirect("/prospects");
        }
    });
})

// EMAIL ROUTE - shows the email form to compose a new email
/*router.get("/:id", isLoggedIn, function(req, res){
    res.render("email");
});*/

// EMAIL ROUTE - shows the email form to compose a new email
router.get("/:id/email", isLoggedIn, (req, res) => {
    // the order with the provided ID
    //render edit template with that order
    Prospect.findById(req.params.id, (err, foundProspect) => {
        if (err) {
            res.redirect("/prospects");
        } else {
            res.render("email", { prospect: foundProspect });
        }
    });
});

// COMPOSE ROUTE - compose email in the email form
router.post("/:id/email", isLoggedIn, function (req, res) {
    var transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'toddqbrannon@gmail.com',
            pass: '12RR0m@n50ld13r5'
        }
    });
    // get data from the email form
    var mailOptions = {
        from: '"Todd Brannon" <toddqbrannon@gmail.com>', // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.body, // plain text body
        html: '<b>NodeJS Email Tutorial</b>' // html body
    };
    // send the email
    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            return console.log(err);
        } else {
        console.log('Message %s sent: %s', info.messageId, info.response);
            res.render("/prospects");
        }
    });
});

// Middleware ==================================================================
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login3");
    console.log("Redirecting to login from isLoggedIn middleware.");
}

module.exports = router;