/* Dependencies */

var express = require('express');

// Authenticate with redis
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

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
	  response.send('Hello World!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	  console.log("Listening on " + port);
});
