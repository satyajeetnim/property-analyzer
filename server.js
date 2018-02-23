var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);

mongoose.connect('mongodb://localhost:27017/property-analzer', function(err) {
	if (err) {
		console.log('Unable to connect to mongodb: ' + err);
	}
	else {
		console.log('Successfully connected to mongodb');
	}
});

app.get('*', function(request, response) {
	response.sendfile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function() {
	console.log('Running the server on port ' + port);
});