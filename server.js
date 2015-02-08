// Require our dependencies
var express       = require('express');
var exphbs        = require('express-handlebars');
var http          = require('http');
var mongoose      = require('mongoose');
var twitter       = require('ntwitter');
var routes        = require('./routes');
var config        = require('./config');
var streamHandler = require('./utils/streamHandler');

// Create an express instance and set a port variable
var app  = express();
var port = process.env.PORT || 8080;

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');

// Connect to our mongo database
mongoose.connect('mongodb://marc:password@ds053818.mongolab.com:53818/dripfeed');

// Create a new ntwitter instance
var twit = new twitter(config.twitter);

// Index Route
app.get('/', routes.index);

// Page Route
app.get('/page/:page/:skip', routes.page);

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));

// Start the server
var server = http.createServer(app).listen(port, function () {
  console.log('Express server listening on port ' + port);
});

// Initialize socket.io
var io = require('socket.io').listen(server);

// Set a stream listener for tweets matching tracking keywords
twit.stream('statuses/filter', {track: 'tesla,spacex,elon musk'}, function (stream) {
  streamHandler(stream, io);
});
