exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      // 'mongodb://localhost/capstone2';
                      'mongodb://user:password@ds243285.mlab.com:43285/capstone2';
exports.PORT = process.env.PORT || 8080;

exports.clientID = process.env.clientID ||
                       global.clientID;

exports.clientSecret = process.env.clientSecret ||
                       global.clientSecret;
exports.dbURI = process.env.dbURI ||
                       global.dbURI;
exports.cookieKey = process.env.cookieKey ||
                       global.cookieKey;