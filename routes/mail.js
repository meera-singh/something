var email = require('emailjs');

var mailSender = email.server.connect({
    user: "testuserdmt@gmail.com",
    password: "Testuserdmt_1234",
    host: "smtp.gmail.com",
    ssl: true
});

exports.sendPassword = (email, password) => {
    return new Promise(function(resolve, reject) {
        var message = {
            text: "",
            from: "Zenways",
            to: email,
            subject: "Time sheet password reset",
            attachment: [{
                data: "<html>Hi ,<br>Your new password for signing into zenways is:-<br><strong> " + password + "</strong>",
                alternative: true
            }]
        };
        mailSender.send(message, function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}