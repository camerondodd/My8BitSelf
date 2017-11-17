// var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
// var server = require('../server');
var mongoose = require('mongoose');
var faker = require('faker');

var should = chai.should();
var {app,runServer,closeServer} = require('../server');
// var storage = server.storage;

var {dbURI} = require('../config');
var User = require('../models/userModel');
var router = require('../routes/profileRoutes');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

chai.use(chaiHttp);

console.log(process.env.NODE_ENV);

describe('index page', function() {
  it('exists', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
    });
  });
});



function tearDownDb() {
	console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

function seedUserData() {
  console.info('seeding user data');
  const seedData = [];
  for (let i=1; i<=10; i++) {
    seedData.push({
        username:faker.name.findName(),
		googleId: faker.random.number(),
		class:faker.name.jobTitle(),
		avatar:faker.image.imageUrl(),
		level:faker.random.number(),
		xp:0,
		strPts:faker.random.number(),
		strS:faker.random.number(),
		agiPts:faker.random.number(),
		agiS:faker.random.number(),
		vitPts:faker.random.number(),
		vitS:faker.random.number(),
		intPts:faker.random.number(),
		intS:faker.random.number(),
		wsdPts:faker.random.number(),
		wsdS:faker.random.number(),
		chrPts:faker.random.number(),
		chrS:faker.random.number()
    });
  }
  // this will return a promise
  return User.insertMany(seedData);
}

describe('user API resource', function() {

  before(function() {
    return runServer(dbURI,3000);
  });

  beforeEach(function() {
    return seedUserData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

//////////GET TEST////////////////

  describe('GET endpoint', function() {

    it('should return all existing users', function(done) {
      let res;
      return chai.request(app)
        .get('/api/scores')
        .then(_res => {
          res = _res;
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.have.length.of.at.least(1);
          return User.count();
        })
        .then(count => {
          res.body.should.have.length.of(count);
        }).then(done,done);
    });
});

  //   it('should return users with right fields', function(done) {
  //     // Strategy: Get back all posts, and ensure they have expected keys

  //     let resUser;
  //     return chai.request(app)
  //       .get('/api/scores/:id')
  //       .then(function(res) {

  //         res.should.have.status(200);
  //         res.should.be.json;
  //         res.body.should.have.length.of.at.least(1);

  //         res.body.forEach(function(user) {
  //           post.should.be.a('object');
  //           post.should.include.keys('username', 'level', 'class');
  //         });
  //         // just check one of the posts that its values match with those in db
  //         // and we'll assume it's true for rest
  //         resUser = res.body[0];
  //         return User.findById(resUser.id);
  //       })
  //       .then(user => {
  //         resUser.username.should.equal(user.username);
  //         resUser.level.should.equal(user.level);
  //         resUser.class.should.equal(user.class);
  //       }).then(done,done);
  //   });
  // });

// //////////POST TEST///////////////


  describe('POST endpoint', function() {
    it('should add a new user', function(done) {

      const newUser = {
        username:faker.name.findName(),
		googleId: faker.random.number(),
		class:faker.name.jobTitle(),
		avatar:faker.image.imageUrl(),
		level:faker.random.number(),
		xp:0,
		strPts:faker.random.number(),
		strS:faker.random.number(),
		agiPts:faker.random.number(),
		agiS:faker.random.number(),
		vitPts:faker.random.number(),
		vitS:faker.random.number(),
		intPts:faker.random.number(),
		intS:faker.random.number(),
		wsdPts:faker.random.number(),
		wsdS:faker.random.number(),
		chrPts:faker.random.number(),
		chrS:faker.random.number()
      };

      return chai.request(app)
        .post('/api/scores')
        .send(newUser)
        .then(function(res) {
        	console.log('below is res.body');
        	console.log(res.body);
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'username', 'level', 'class');
          res.body.username.should.equal(newUser.username);
          // cause Mongo should have created id on insertion
          res.body._id.should.not.be.null;
          res.body.level.should.equal(newUser.level);
          res.body.class.should.equal(newUser.class);
          return User.findById(res.body.id);
        }).then(done,done);
    });
  });

//   //////////////////PUT TEST/////////////////

describe('PUT endpoint', function() {


    it('should update', function() {
      const updateData = {
        username: "Dorito",
		googleId: 555555555,
		class:"Taco",
		avatar:"../14.jpg",
		level:99,
		xp:0,
		strPts:496,
		strS:99,
		agiPts:496,
		agiS:99,
		vitPts:496,
		vitS:99,
		intPts:496,
		intS:99,
		wsdPts:496,
		wsdS:99,
		chrPts:496,
		chrS:99
        };

      return User
        .findOne()
        .then(user => {
        	console.log('**************');
        	console.log(user);
        	// user.class="WEB DEVELOPER";
           updateData.id = user.id;

          return chai.request(app)
            .put(`/api/scores/${user._id}`)
            .send(updateData)
            // .then(function(res){console.log(res)})
        })
        .then(res => {
        	console.log(res);
          res.should.have.status(200);
          // 
          User.findOne({_id: res.body._id},
		(err, user) => {  
    		if (err) {
        		console.log('oops');
    		} else 
			{	
		  user.username.should.equal(updateData.username);
          user.level.should.equal(updateData.level);
          user.class.should.equal(updateData.class);
        };
        })
    });
  });
  });

///////////////DELETE TEST//////////////////

describe('DELETE endpoint', function() {
     it('should delete a user by id', function() {

      let user;

      return User
        .findOne()
        .then(_user => {
          user = _user;
          return chai.request(app).delete(`/api/scores/${user.id}`);
        })
        .then(res => {
          res.should.have.status(204);
          return User.findById(user.id);
        })
        .then(_user => {
            should.not.exist(_user);
        });
    });
  });
});