// User model/schema setup
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username:String,
	googleId:String,
	class:String,
	avatar:String,
	level:Number,
	xp:Number,
	strPts:Number,
	strS:Number,
	agiPts:Number,
	agiS:Number,
	vitPts:Number,
	vitS:Number,
	intPts:Number,
	intS:Number,
	wsdPts:Number,
	wsdS:Number,
	chrPts:Number,
	chrS:Number
});

const User = mongoose.model('user', userSchema);

module.exports = User;
