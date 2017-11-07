const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username:String,
	googleId:String,
	thumbnail:String,
	strPts:Number,
	agiPts:Number,
	vitPts:Number,
	intPts:Number,
	wsdPts:Number,
	chrPts:Number
});

const User = mongoose.model('user', userSchema);

module.exports = User;
