/**
 * Created by Ashish Goyal on 7/12/2017.
 */
const express = require('express');
const cookieParser= require('cookie-parser');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const ejs = require('ejs');
const engine = require('ejs-mate');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const flash = require('connect-flash');
const nodeMailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const async = require('async');



require('./config/passport');

mongoose.Promise = global.Promise;  //for creating my own lib as per docs.
mongoose.connect('mongodb://localhost/review_app');
/*mongoose.Promise = global.Promise;*/


const app = express();
app.use(flash());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//must be used after body-pasrser middleware as per guidelines of docs.
app.use(validator());






app.use(express.static('public'));


app.set('view engine','ejs');
app.engine('ejs',engine);

app.use(cookieParser());

app.use(session({
    secret: "@AshishkrGoyal",
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));


//app.use(connectflash());

app.use(passport.initialize());
app.use(passport.session());



require('./routes/users')(app,passport);


/*app.get('/test',function (req,res) {
    res.render('test');
});*/


app.listen(2822,function () {
    console.log("server has been triggered at port 2422")
});