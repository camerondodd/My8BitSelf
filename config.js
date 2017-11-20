 // const keys = require('./config/keys');

exports.PORT = process.env.PORT || 8080;

exports.clientID = process.env.clientID ||
                       global.clientID||
                       keys.google.clientID;
                       
exports.clientSecret = process.env.clientSecret ||
                       global.clientSecret||
                       keys.google.clientSecret;

if (process.env.NODE_ENV==="test"){
  exports.dbURI = process.env.dbURITest ||
                       global.dbURITest||
                       keys.mongodb.dbURITest;
}
else{
    exports.dbURI = process.env.dbURI ||
                       global.dbURI ||
                       keys.mongodb.dbURI;  
}
exports.cookieKey = process.env.cookieKey ||
                       global.cookieKey||
                       keys.session.cookieKey;