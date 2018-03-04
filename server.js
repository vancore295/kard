var http = require('http');
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
var plaid = require('plaid');
var app = express();

dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

var PLAID_PUBLIC_KEY = (process.env.PLAID_PUBLIC_KEY);
var PLAID_ENV = (process.env.PLAID_ENV);

var controllers = require("./controllers");

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;
var server = http.createServer(app);
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("db connected");
    server.listen((process.env.PORT || 3000));
    console.log("kard test running on port: " + (process.env.PORT || 3000));

    app.get("/", function(req, res) {
        res.status(200).json({
            PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
            PLAID_ENV: PLAID_ENV,
        });
    });

    controllers.init(app);
});