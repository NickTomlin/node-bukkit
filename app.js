/* Dependencies */
var express = require('express')
, request = require('request')
, bukkits = require('./bukkits.js')
, helpers = require('./helpers.js')
, routes = require('./routes/routes.js')
, path = require ('path')
; /* END dependencies*/


/* ==========================================================================
   Kick off our app
   ========================================================================== */

var app = express();

app.configure(function(){
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
  app.use(express.logger('dev'));
  app.use(require('stylus').middleware(__dirname +'/public'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.compress());
});

app.get('/', routes.index);

/* Move these to a handlers area
=================================*/
app.get('/rand', routes.rand );

// our json route
app.get('/all', routes.all);


var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});

