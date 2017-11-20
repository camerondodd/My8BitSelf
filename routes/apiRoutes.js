// Routes for outside api calls and testing
const express = require('express');
const router = require('express').Router();
const User = require('../models/userModel');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

// GET all users
router.get('/scores',(req, res)=>{
	User.find()
	.then((users)=>{
		res.json(users);
	});
});

// GET one user
router.get('/scores/:id',(req, res)=>{
	User.findOne({_id: req.params.id}).then((user)=>{
		res.json(user);
	});
    

});

// PUT updated user info
router.put('/scores/:id',jsonParser,(req,res)=>{
	console.log('stats updated');
	User.findOne({_id: req.params.id },
		(err, user) => {  
    // Handle any possible database errors
    if (err) {
        res.status(500).send(err);
    } else 
	{	user.username=req.body.username;
		user.class=req.body.class;
		user.avatar=req.body.avatar;
		user.level=req.body.level;
		user.xp=req.body.xp;
		user.strPts=req.body.strPts;
		user.strS=req.body.strS;
		user.agiPts=req.body.agiPts;
		user.agiS=req.body.agiS;
		user.vitPts=req.body.vitPts;
		user.vitS=req.body.vitS;
		user.intPts=req.body.intPts;
		user.intS=req.body.intS;
		user.wsdPts=req.body.wsdPts;
		user.wsdS=req.body.wsdS;
		user.chrPts=req.body.chrPts;
		user.chrS=req.body.chr;
		console.log(user);
		user.save((err, user) => {
            if (err) {
                res.status(500).send(err)
            }
            res.json(user);
        });
	}})
});

// POST new user
router.post('/scores',(req, res)=>{	
	User.create({
		username:req.body.username,
		googleId:req.body.googleID,
		class:req.body.class,
		avatar:req.body.avatar,
		level:req.body.level,
		xp:req.body.xp,
		strPts:req.body.strPts,
		strS:req.body.strS,
		agiPts:req.body.agiPts,
		agiS:req.body.agiS,
		vitPts:req.body.vitPts,
		vitS:req.body.vitS,
		intPts:req.body.intPts,
		intS:req.body.intS,
		wsdPts:req.body.wsdPts,
		wsdS:req.body.wsdS,
		chrPts:req.body.chrPts,
		chrS:req.body.chrS
	},function(err,user){
		console.log(user);
		res.json(user);})
});

// DELETE user
router.delete('/scores/:id',(req, res)=>{
	User.remove({_id:req.params.id}).then(()=>{
		res.status(204).end();
	});
	console.log('user deleted');
});

module.exports = router;