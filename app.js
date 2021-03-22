const express               = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
//    Comment                 = require("./models/comment"),
    User                    = require("./models/user"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    // nodeMailer              = require("nodemailer"),
//    seedDB                  = require("./seeds");
    flash                   = require("connect-flash"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    methodOverride          = require("method-override"),
    createError             = require('http-errors'),
    logger                  = require('morgan');
    // csv                     = require('csvtojson/v1'),
    // schedule                = require('node-schedule'),
    // template                = require('./template.js');

const port = process.env.PORT || 3000;

app.use(logger('dev'));

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(methodOverride("_method"));
app.use(flash());

app.use(bodyParser.urlencoded({extended: true}));
    
//seedDB();
    
// Requiring Routes ============================================================
var prospectsRoutes         = require("./routes/prospects"),
    indexRoutes             = require("./routes/index"),
    expandRoutes            = require("./routes/expand_demo");
//==============================================================================

// Load Keys ===================================================================
// const keys                  = require('./config/keys');   // For Dev only!
// Use mongoURI for production (Heroku - ) 

// MongoDB Atlas Dev
const mongoURI = `mongodb+srv://toddqbrannon-admin:MongoDBTruSponse470dd!@trusponse.ugdwe.mongodb.net/notifydemo?retryWrites=true&w=majority`
// MongoDB Atlas Prod

// const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@trusponse.ugdwe.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`   

// Map global promises
mongoose.Promise            = global.Promise;

// mongoose.connect("mongodb://localhost/trusponse_notify");
// Below updated 3/17/2021
const connection = mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
     })
    .then(() => console.log('connected to the trusponse-notify-demo mongodbatlas collection...'))
    .catch(err => console.log(err)
);
    



//==============================================================================
// PASSPORT CONFIGURATION
//==============================================================================
app.use(require("express-session")({
    secret:`${process.env.PASSPORT_SECRET}`,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//=  Routes  ===================================================================

app.use("/", indexRoutes);
app.use("/prospects", prospectsRoutes);
app.use("/expand_demo", expandRoutes);

app.listen(port, () => {
    console.log(`The server is running on port ${port}...`);
});