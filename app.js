/* Dependencies */
var express = require('express')
, request = require('request')
, cheerio = require('cheerio');

// [Authenticate with redis](https://devcenter.heroku.com/articles/redistogo#using-with-node)
if (process.env.REDISTOGO_URL) {
  var rtg = require("url").parse(process.env.REDISTOGO_URL);
  var redis = require("redis").createClient(rtg.port,rtg.hostname);

  redis.auth(rtg.auth.split(":")[1]);

} else {
  var redis = require("redis").createClient();
}

/* ==========================================================================
   Kick off our app
   ========================================================================== */

var app = express();

app.get('/', function(req, response) {
  // TO-DO: why can't we push to this?

  var bukkits = []; // hold our bukkit objects
  var url = 'http://bukk.it/'; // bukk.it
  var targets = 'td a';

  request(url, function(err, resp, body){
    $ = cheerio.load(body);
    // for each of our targets (within the request body)...
    $(targets).each(function(){
      content = $(this).text();
      // redis.set($(this).text());
      redis.set("bukkit:" + content, content);
    })
  });

  redis.randomkey( function (err, key) {
        console.log (key)
    });
  response.send("<h1>bloop</h1>" );
  // this is NOT working right now, do I need to request this as part of a function or something?
	// response.send('<img src="http://bukk.it/' + redis.get(".gif") + '">');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	  console.log("Listening on " + port);
});

/* using [jsDom](https://github.com/tmpvar/jsdom) */
// grab all the bukkit images (with name), and store them in a json array

function dom_it(){
}// dom_it()
