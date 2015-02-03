var Tweet = require('../models/Tweet');

module.exports = function (stream, io){

  // When tweets get sent our way ...
  stream.on('data', function (data) {

    // Construct a new tweet object
    var tweet = {
      active     : false,
      twid       : data['id'],
      body       : data['text'],
      date       : data['created_at'],
      author     : data['user']['name'],
      screenname : data['user']['screen_name'],
      avatar     : data['user']['profile_image_url']
    };

    // Create a new model instance with our object
    var tweetEntry = new Tweet(tweet);

    // Save it to the database
    tweetEntry.save(function (err) {

      // If no error, socket.io emits the tweet
      if (!err) io.emit('tweet', tweet);

    });
  });
};
