var express = require('express');
var router = express.Router();
var Profile = require('../models/profile');
var profile = new Profile();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	// res.redirect('/');
	return res.send({ success : false, message : 'authentication failed' });
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', function (req, res) {
		passport.authenticate('login', function(err, user, info) {
			if (err) { 
				return res.send({ success : false, message : err }); 
			}
			if (!user) { 
				return res.send({ success : false, message : 'user not found' }); 
			}
			req.logIn(user, function(err) {
				if (err) { 
					return res.send({ success : false, message : err }); 
				}
				return res.send({ success : true, message : 'authenticated' });
			});
		})(req, res);
	});

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', function (req, res) {
		// Adds user to db and authenticates user
		passport.authenticate('signup', function (err, user, info) {
			if (err) { 
				return res.send({ success : false, message : err }); 
			}
			if (!user) { 
				return res.send({ success : false, message : 'user not found' }); 
			}
			req.logIn(user, function(err) {
				if (err) { 
					return res.send({ success : false, message : err }); 
				}
				return res.send({ success : true, message : 'authenticated' });
			});
		})(req, res);
	});

	router.post('/profile', isAuthenticated, function (req, res) {
		profile.getProfile(req.body, function (err, result) {
			if (err) {
				return res.send({success : false, message : err});
			}
			return res.send({success : true, message : result});
		})
	});

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		// res.render('home', { user: req.user });
		return res.send({ success : true, message : 'home' });
	});

	/* Handle Logout */
	// Must be logged in to logout
	router.get('/logout', isAuthenticated, function(req, res) {
		req.logout();
		return res.send({ success : true, message : 'logged out' });
	});

	router.get('/addMessage', isAuthenticated, function(req, res){
		console.log("hi");
	});

	return router;
}
