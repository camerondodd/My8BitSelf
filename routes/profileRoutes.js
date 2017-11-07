const express = require('express');
const router = require('express').Router();
const User = require('../models/userModel');

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

router.delete('/stats/:id', (req,res)=>{
	console.log('del request landed');
	// User.delete(req.params.id);
	User.remove({_id:req.params.id}).then(()=>{
		res.sendStatus(204);
	});
	console.log('user deleted');
	res.render('login');
})

module.exports = router;