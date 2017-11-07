const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/userModel');

passport.serializeUser((user, done)=>{
	done(null, user.id);
});

passport.deserializeUser((id, done)=>{
	User.findById(id).then((user)=>{
		done(null, user);
	});
});

const clientIDEnc = keys.google.clientID;
const clientSecretEnc = keys.google.clientSecret;

passport.use(
	new GoogleStrategy({
		// options for the google strat
		callbackURL:"/auth/google/redirect",
		clientID:clientIDEnc,
		clientSecret:clientSecretEnc
},(accessToken, refreshToken, profile, done)=>{
		// check if user already exists
		User.findOne({googleId:profile.id}).then( (currentUser) => {
			if(currentUser){
				// already have user
				console.log('user is' + currentUser);
				done(null,currentUser);
			}
			else{
				// if not, create user
				new User({
					username: profile.displayName,
					googleId: profile.id,
					thumbnail: profile._json.image.url,
					strPts:1,
					agiPts:1,
					vitPts:1,
					intPts:1,
					wsdPts:1,
					chrPts:1
				}).save().then((newUser)=>{
					console.log('new user created' + newUser);
					done(null,newUser);
				});
			}
		});

		
	})
);