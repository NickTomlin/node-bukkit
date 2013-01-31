/* Dependencies */
var express = require('express')
, request = require('request')
, cheerio = require('cheerio');

/* ==========================================================================
   Helpers (move these into another module)
   ========================================================================== */
function rand(min,max){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/* ==========================================================================
   Kick off our app
   ========================================================================== */

var app = express();
app.get('/', function(req, response){

response.send("Index. Dawg.")

});


app.get('/rand', function(req, response){

  var bukkits = []; // hold our bukkit objects
  var url = 'http://bukk.it/'; // bukk.it
  var targets = 'td a';

  request(url, function(err, resp, body){
    $ = cheerio.load(body);
    // for each of our targets (within the request body)...
    $(targets).each(function(){
      content = $(this).text();
      bukkits.push(content);
    })
    if (err) {
      return
    }
    //  use our randNum function from blackjack
      var randBukkit = rand(1,bukkits.length);
      // 'http://bukk.it/'+bukkits[randBukkit],
      // response.send( '<img src="http://bukk.it/'+ bukkits[randBukkit] + "\">");
     // response.send( '<img src="http://bukk.it/'+ bukkits[randBukkit] + "\">");

     response.send('<img src="http://bukk.it/clint.jpg"> <p>' + bukkits[1]  + '</p>');
  });

});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});

