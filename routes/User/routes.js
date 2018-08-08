var express = require('express');
var tokenVerify = require('../tokenVerify.js');
var router = express.Router();

var userRegistrationLogin = require('./UserRegistrationLogin')
router.post('/registration', userRegistrationLogin.registration)
router.post('/login', userRegistrationLogin.login)
router.get('/logout', tokenVerify,userRegistrationLogin.logout)


var taskEntry = require('./taskEntry')
router.post('/taskEntry', tokenVerify, taskEntry.taskEntry)

var assignedTask = require("./completedAssign")
router.get('/aaa',tokenVerify, assignedTask.showAssignedTasks)
router.post('/logAssignedTask',tokenVerify,assignedTask.completeTask)

var history = require('./history')
router.get('/history', tokenVerify, history.history)

var password = require('./password')
router.post('/forgotPassword', password.forgotPassword)
router.post('/changePassword', tokenVerify, password.changePassword)

module.exports = router;