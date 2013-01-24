/* Dependencies */
var express = require('express');
var jsdom = require("jsdom");

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

var app = express();

app.get('/', function(request, response) {

  // TO-DO: why can't we push to this?
  var bukkits = []; // hold our bukkit objects

    jsdom.env(
    "http://bukk.it/",
    ["http://code.jquery.com/jquery.js"],
    function (errors, window) {
      anchors = window.$('td a');
      console.log("crawling", anchors.length, "bukkits");
      anchors.each(function(){
        item = {};
        item.url = this.getAttribute("href");
        item.name = this.innerHTML; // perhaps chop off the extension later on?
        redis.set(item.name,item.url);
        console.log(item);
        bukkits.push(item);
      });
    }
    );
    // this is NOT working right now, do I need to request this as part of a function or something?
	response.send('<img src="http://bukk.it/' + redis.get("wubwubwub.gif") + '">');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	  console.log("Listening on " + port);
});

/* using [jsDom](https://github.com/tmpvar/jsdom) */
// grab all the bukkit images (with name), and store them in a json array

function dom_it(){
}// dom_it()
