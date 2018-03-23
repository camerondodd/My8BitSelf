const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const PORT = require('./config');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const apiRoutes = require('./routes/apiRoutes');
const passportSetup = require('./config/passportSetup');
const cookieSession = require('cookie-session');
const passport = require('passport');
const {cookieKey,dbURI} = require('./config');
const favicon = require('serve-favicon');



app.use(morgan('common'));
mongoose.Promise = global.Promise;

// set up view engine
app.set("view engine",'ejs');

// handles cookies
app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys: [cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(dbURI, ()=>{
	console.log('connected to mongodb');
});

//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/api', apiRoutes);

// home route
app.get('/',(req,res)=>{
	res.render('home',{user:req.user});
});
app.use(express.static('public'));

//sets up favicon
app.use(favicon(path.join(__dirname,'public','favicon.ico')));

// Runs and closes server, used for testing
let server;

function runServer(databaseUrl, port) {
  return new Promise((resolve, reject) => {
    mongoose.createConnection(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

app.listen(process.env.PORT || 8080);
module.exports={app,runServer,closeServer};
