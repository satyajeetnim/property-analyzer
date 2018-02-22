var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./app/models/user');
var bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(request, response) {
	response.send('Welcome to Property Analyzer');
});

app.get('/home', function(request, response) {
	response.send('Hello from Home');
});

app.post('/registration', function(request, response) {
	var user = new User();
	user.username = request.body.username;
	user.password = request.body.password;
	user.email = request.body.email;
	if (request.body.username == null || request.body.username == '') {
		response.send('Username is empty');
	} 
	else if (request.body.password == null || request.body.password == '') {
		response.send('Password is empty');
	}
	else if (request.body.email == null || request.body.email == '') {
		response.send('Email is empty');
	}
	else {
		user.save(function(err) {
			if (err) {
				response.send('Username or email already exists');
			} else {
				response.send('User created !!!');
			}
		});
	}
	
});

mongoose.connect('mongodb://localhost:27017/property-analzer', function(err) {
	if (err) {
		console.log('Unable to connect to mongodb: ' + err);
	}
	else {
		console.log('Successfully connected to mongodb');
	}
});

app.listen(port, function() {
	console.log('Running the server on port ' + port);
});