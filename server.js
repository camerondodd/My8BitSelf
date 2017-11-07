const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const {PORT, DATABASE_URL} = require('./config');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const passportSetup = require('./config/passportSetup');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

app.use(morgan('common'));
mongoose.Promise = global.Promise;

// set up view engine
app.set("view engine",'ejs');

app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, ()=>{
	console.log('connected to mongodb');
});

//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// home route
app.get('/',(req,res)=>{
	res.render('home',{user:req.user});
});
// app.use(express.static('public'));



app.listen(process.env.PORT || 8080);
exports.app=app;
