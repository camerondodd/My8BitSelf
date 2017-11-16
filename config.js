exports.PORT = process.env.PORT || 8080;

exports.clientID = process.env.clientID ||
                       global.clientID;
                       
exports.clientSecret = process.env.clientSecret ||
                       global.clientSecret;
exports.dbURI = process.env.dbURI ||
                       global.dbURI;
exports.dbURITest = process.env.dbURITest ||
                       global.dbURITest;
exports.cookieKey = process.env.cookieKey ||
                       global.cookieKey;