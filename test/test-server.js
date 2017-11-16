// var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
// var server = require('../server');
var mongoose = require('mongoose');
var faker = require('faker');

var should = chai.should();
var {app,runServer,closeServer} = require('../server');
// var storage = server.storage;

var {dbURITest} = require('../config');
var User = require('../models/userModel');
var router = require('../routes/profileRoutes');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

chai.use(chaiHttp);


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
    return runServer(dbURITest,3000);
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

    it('should return all existing users', function() {
      let res;
      return chai.request(app)
        .get('/profile/stats')
        .then(_res => {
          res = _res;
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.have.length.of.at.least(1);
          return User.count();
        })
        .then(count => {
          res.body.should.have.length.of(count);
        });
    });

    it('should return users with right fields', function() {
      // Strategy: Get back all posts, and ensure they have expected keys

      let resUser;
      return chai.request(app)
        .get('/profile/stats')
        .then(function(res) {

          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.length.of.at.least(1);

          res.body.forEach(function(user) {
            post.should.be.a('object');
            post.should.include.keys('username', 'level', 'class');
          });
          // just check one of the posts that its values match with those in db
          // and we'll assume it's true for rest
          resUser = res.body[0];
          return User.findById(resUser.id);
        })
        .then(user => {
          resUser.username.should.equal(user.username);
          resUser.level.should.equal(user.level);
          resUser.class.should.equal(user.class);
        });
    });
  });

// //////////POST TEST///////////////


  describe('POST endpoint', function() {
    // strategy: make a POST request with data,
    // then prove that the post we get back has
    // right keys, and that `id` is there (which means
    // the data was inserted into db)
    it('should add a new user', function() {

      const newUser = {
        username:faker.name,
		googleId: faker.random.number,
		class:faker.name.jobTitle,
		avatar:faker.image.imageUrl,
		level:faker.random.number,
		xp:0,
		strPts:faker.random.number,
		strS:faker.random.number,
		agiPts:faker.random.number,
		agiS:faker.random.number,
		vitPts:faker.random.number,
		vitS:faker.random.number,
		intPts:faker.random.number,
		intS:faker.random.number,
		wsdPts:faker.random.number,
		wsdS:faker.random.number,
		chrPts:faker.random.number,
		chrS:faker.random.number
      };

      return chai.request(app)
        .post('/profile/stats')
        .send(newUser)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'username', 'level', 'class');
          res.body.username.should.equal(newUser.username);
          // cause Mongo should have created id on insertion
          res.body.id.should.not.be.null;
          res.body.level.should.equal(newUser.level);
          res.body.class.should.equal(newUser.class);
          return User.findById(res.body.id);
        })
        .then(function(user) {
          user.username.should.equal(newUser.username);
          user.level.should.equal(newUser.level);
          user.class.should.equal(newUser.class);
         });
    });
  });

  //////////////////PUT TEST/////////////////

describe('PUT endpoint', function() {

    // strategy:
    //  1. Get an existing post from db
    //  2. Make a PUT request to update that post
    //  4. Prove post in db is correctly updated
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
          updateData.id = user.id;

          return chai.request(app)
            .put(`/profile/stats/${user.id}`)
            .send(updateData);
        })
        .then(res => {
          res.should.have.status(204);
          return User.findById(updateData.id);
        })
        .then(user => {
          user.username.should.equal(updateData.username);
          user.level.should.equal(updateData.level);
          user.class.should.equal(updateData.class);
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
          return chai.request(app).delete(`/profile/stats/${user.id}`);
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