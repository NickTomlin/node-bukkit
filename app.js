var express = require('express')
, request = require('request')
, util = require('util')
, bukkits = require('./bukkits.js')
, helpers = require('./helpers.js')
, routes = require('./routes/routes.js')
, path = require ('path')
;


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

// consider merging these?
app.get('/rand', routes.rand );
app.get('/all', routes.selection);
app.get('/all/:number',routes.selection);


var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});

