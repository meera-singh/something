var dbUserLogin = require('../../models/login')
var jwt = require('jsonwebtoken')

exports.registration = (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.name) {
        res.json({
            success: false,
            msg: "Enter email and password both."
        })
    } else {
        var newUser = new dbUserLogin({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            status: 1,
            admin: false
        })
        dbUserLogin.findOne({ email: req.body.email }, (err, lData) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "Database error"
                })
            } else if (lData != null || lData) {
                res.json({
                    success: false,
                    msg: "You have already registered"
                })
            } else {
                newUser.save((err, savedData) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: "Database Error"
                        })
                    } else {
                        res.json({
                            success: true,
                            msg: "Registered"
                        })
                    }
                })
            }
        })
    }
}

exports.login = (req, res) => {
    console.log('here')
    if (!req.body.email || !req.body.password) {
        res.json({
            success: false,
            msg: "Enter email and password both."
        })
    } else {
        dbUserLogin.findOne({ email: req.body.email }, (err, lData) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "Database error"
                })
            } else if (!lData || lData == null) {
                res.json({
                    success: false,
                    msg: "You have not registered."
                })
            } else if (lData.status == -1) {
                res.json({
                    success: false,
                    msg: "You are no longer a zenways employee"
                })
            } else {
                if (req.body.password == lData.password) {
                    var newTime = {
                        loginTime: new Date()
                    }
                    dbUserLogin.findOneAndUpdate({ email: req.body.email }, { $push: { time: newTime } }, (err, data) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: "Database error"
                            })
                        } else {
                            var tdata = {
                                name: lData.name,
                                email: lData.email,
                                admin: lData.admin
                            }
                            var token = jwt.sign(tdata, req.app.get('secretKey'))
                            res.json({
                                success: true,
                                token: token,
                                mag: "Login Done"
                            })
                        }
                    })
                } else {
                    res.json({
                        success: false,
                        msg: "Wrong password"
                    })
                }
            }
        })
    }
}


exports.logout = (req, res) => {
    dbUserLogin.findOne({ email: req.decoded.email }, (err, lData) => {
        if (err) {
            res.json({
                success: false,
                msg: "Database error"
            })
        } else if (!lData || lData == null) {
            res.json({
                success: false,
                msg: "You have not registered."
            })
        } else {
            var len = lData.time.length - 1;
            var id = lData.time[len]._id;
            dbUserLogin.findOneAndUpdate({ $and: [{ email: req.decoded.email }, { 'time._id': id }] }, { $set: { 'time.$.logoutTime': new Date() } }, (err, data) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: "Database error"
                    })
                } else {
                    res.json({
                        success: true,
                        mag: "Logout Successful"
                    })
                }
            })
        }
    })

}