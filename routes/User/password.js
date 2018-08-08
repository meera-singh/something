var dbUserLogin = require('../../models/login')
var generator = require('generate-password');

var generatePassword = () => {
    return new Promise((resolve, reject) => {
        var password = generator.generate({
            length: 10,
            numbers: true,
            symbols: true,
            uppercase: true,
            exclude: '"',
            exclude: "'"
        });
        resolve(password)
    })
}
var emailtemplate = require('../mail')

exports.forgotPassword = (req, res) => {
    if (!req.body.email) {
        res.json({
            success: false,
            msg: "Please insert email"
        })
    } else {
        generatePassword().then(password => {
            dbUserLogin.findOneAndUpdate({ email: req.body.email }, { $set: { password: password } }, (err, data) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: "Error while resetting password"
                    })
                } else {
                    emailtemplate.sendPassword(req.body.email, password).then(data => {
                        res.json({
                            success: true,
                            msg: "Your password has been mailed to you"
                        })
                    }).catch(err => {
                        console.log(err);
                        console.log(err)
                        res.json({
                            success: false,
                            msg: "Something went wrong please retry."
                        })
                    })
                }
            })
        }).catch(err => {
            res.json({
                success: false,
                msg: "Something went wrong"
            })
        })

    }
}

exports.changePassword = (req, res) => {
    if (!req.body.oldPassword || !req.body.newPassword) {
        res.json({
            success: false,
            msg: "Please provide both password"
        })
    } else {
        dbUserLogin.findOne({ $and: [{ email: req.decoded.email }, { password: req.body.oldPassword }] }, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "Something went wrong while updating password. Please try again"
                })
            } else if (!data || data == null) {
                res.json({
                    success: false,
                    msg: "Please provide correct old password"
                })
            } else {
                dbUserLogin.findOneAndUpdate({ email: req.decoded.email }, { $set: { password: req.body.newPassword } }, (err, uData) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: "Something went wrong. Please try again after some time."
                        })
                    } else {
                        res.json({
                            success: true,
                            msg: "Password changed"
                        })
                    }
                })
            }
        })
    }
}