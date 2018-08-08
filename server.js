var express = require("express")
var mongoose = require("mongoose")
var mongodb = require("mongodb").MongoClient
var bodyParser = require("body-parser")
    // var port = process.env.PORT || 8000;
var option = process.argv
var app = express();
mongoose.Promise = global.Promise;
var user = require('./routes/User/routes')
var admin = require('./routes/Admin/routes')
var config = require('./config/config.json')
var error = require('./error')
var mongoURI = config.development.MONGO_URI
var port = config.development.PORT
var secret = config.development.SECRET
app.set('secretKey', secret)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect(mongoURI, { useMongoClient: true }, function(err) {
    if (!err) { console.log('connection successful'); } else { console.log(err) }
})
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,x-access-token, Accept");
    next();
});
app.post('/err', error.logError)
app.use('/user', user);
app.use('/admin', admin)

app.use(express.static(__dirname + '/dist'))
app.use(function(req, res) {
    res.sendFile(__dirname + '/dist/index.html')
})

app.listen(process.env.PORT || 8000);
console.log('Server started, Port : ' + (process.env.PORT || 8000))