    //Here we would verify the JWT Tokens for the protected routes
    var jwt = require('jsonwebtoken');


    tokenVerify = (function(req, res, next) {
        // console.log(req.headers['x-access-token'])
        var superSecret = req.app.get('secretKey')
            // check header or url parameters or post parameters for token
        var token = req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, superSecret, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    // console.log("Done")
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }

    });

    module.exports = tokenVerify;