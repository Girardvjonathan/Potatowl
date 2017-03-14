// modules =================================================
var express        = require('express');
var app            = express();
var path = require('path');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
// configuration ===========================================


// config files
//online
var db = require('./config/db');
//local
// mongoose.connect('mongodb://localhost/potatowl');
// var db = mongoose.connection;

// set our port
app.set('port', (process.env.PORT || 3000));


// get all data/stuff of the body (POST) parameters
// parse application/json
// app.use(bodyParser.json());
app.use(cookieParser());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


// routes ==================================================
require('./app/routes/routes')(app); // configure our routes

db.connectDB(function() {
    // startup our app at http://localhost:8080
    app.listen(app.get('port'), function(){
        console.log('Server started on port '+app.get('port'));
    });
});


// expose app
exports = module.exports = app;
