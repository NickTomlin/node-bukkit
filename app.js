/* Dependencies */
var express = require('express')
, request = require('request')
, bukkits = require('./bukkits.js')
, helpers = require('./helpers.js')
; /* END dependencies*/


/* ==========================================================================
   Kick off our app
   ========================================================================== */

var app = express();

app.get('/', function(req, response){

  response.send("Index. Dawg.");

});

/* Move these to a handlers area
=================================*/
app.get('/rand', function(req, response){
    bukkits.get(randBukkit);

    function randBukkit(bukkits) {
      var randomBukkit = bukkits[helpers.rand(1,bukkits.length)];
      var returnBukkit = 'http://bukk.it/' +randomBukkit;

      // an attempt at cache-busting for img[src]; does not work at the moment
      response.header("Cache-Control", "no-cache, no-store, must-revalidate");
      response.header("Pragma", "no-cache");
      response.header("Expires", 0);
      response.redirect(307,returnBukkit);
    }
});

// our json route
app.get('/all', function(req, response) {

  bukkits.get(allBukkits);
    function allBukkits(bukkits) {
      var returnBukkit = JSON.stringify(bukkits);
      response.send(returnBukkit);
    }

});


var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});

