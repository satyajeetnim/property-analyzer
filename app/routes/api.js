var User = require('../models/user');

module.exports = function(router) {
    router.post('/registration', function(request, response) {
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
    return router;
}