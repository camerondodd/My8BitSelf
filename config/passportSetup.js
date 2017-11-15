const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
// const keys = require('./keys');
const User = require('../models/userModel');
const {clientID, clientSecret} = require('../config');

passport.serializeUser((user, done)=>{
	done(null, user.id);
});

passport.deserializeUser((id, done)=>{
	User.findById(id).then((user)=>{
		done(null, user);
	});
});

// const clientIDEnc = keys.google.clientID;
// const clientSecretEnc = keys.google.clientSecret;

passport.use(
	new GoogleStrategy({
		// options for the google strat
		callbackURL:"/auth/google/redirect",
		clientID:clientID,
		clientSecret:clientSecret
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
					class:"Novice",
					avatar:"../0.jpg",
					level:1,
					xp:0,
					strPts:0,
					strS:1,
					agiPts:0,
					agiS:1,
					vitPts:0,
					vitS:1,
					intPts:0,
					intS:1,
					wsdPts:0,
					wsdS:1,
					chrPts:0,
					chrS:1
				}).save().then((newUser)=>{
					console.log('new user created' + newUser);
					done(null,newUser);
				});
			}
		});

		
	})
);