

var express = require('express');
var tokenVerify = require('../tokenVerify.js');
var router = express.Router();

var adminRegistrationLogin = require('./adminRegistrationLogin')
router.post('/registration', adminRegistrationLogin.registration)
router.post('/login', adminRegistrationLogin.login)
router.get('/logout', tokenVerify, adminRegistrationLogin.logout)


var userDetails = require('./taskDetails')
router.post('/taskDetails', userDetails.getTasks)

var assignTasks = require('./assignTask')
router.post('/assign',tokenVerify, assignTasks.assignTask)

module.exports = router;