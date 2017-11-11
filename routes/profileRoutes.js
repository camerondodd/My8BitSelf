const express = require('express');
const router = require('express').Router();
const User = require('../models/userModel');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

const authCheck = (req, res, next) => {
	if(!req.user){
		// if user is not logged in
		res.redirect('/auth/login');
	}
	else{
		// if logged in
		next();
	}
};

router.get('/', authCheck, (req, res)=>{
	res.render('profile', {user:req.user});
});

router.get('/account', (req, res)=>{
	res.render('account', {user:req.user});
});

router.get('/adv', (req, res)=>{
	res.render('adv', {user:req.user});
});

router.get('/stats', (req, res)=>{
	res.json({user:req.user});
});

router.get('/avatar',(req,res)=>{
	res.render('avatar', {user:req.user});
});

router.delete('/stats/:id', (req,res)=>{
	console.log('del request landed');
	// User.delete(req.params.id);
	User.remove({_id:req.params.id}).then(()=>{
		// res.Status(204).end();
		res.Status(204).then(()=>{
			res.redirect('/auth/login')
		}).end();
	});
	console.log('user deleted');
	// res.render('login');
});

router.put('/stats/:id',jsonParser,(req,res)=>{
	console.log('stats updated');
	console.log(req.body);
	return updatedItem = User.findByIdAndUpdate(req.user._id,{
		"username":req.body.username,
		"class":req.body.class,
		"avatar":req.body.avatar,
		"strPts":req.body.strPts,
		"agiPts":req.body.agiPts,
		"vitPts":req.body.vitPts,
		"intPts":req.body.intPts,
		"wsdPts":req.body.wsdPts,
		"chrPts":req.body.chrPts
	})
	.then(()=>{res.status(204).json();});	
});

module.exports = router;