var bukkits = require('../bukkits.js');
var _ = require('lodash');

exports.index = function index (req,res) {
  res.render('index', {
    title : 'Bukkit Api'
  });
};

exports.rand = function rand (req, res){
    bukkits.get(
    // callback
      function(bukkits) {
        var randomBukkit = bukkits[_.random(1, bukkits.length)];
        var returnBukkit = 'http://bukk.it/' +randomBukkit;
        // attempt to foil browser caching of resources, non-working
        res.set({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": 0
        });

        res.redirect(307,returnBukkit);
      });
};

// /all/:number
exports.selection = function(req, res) {
  bukkits.get(
    function allBukkits(bukkits) {
      console.log('Received request for %s bukkits',req.params.number);
      var num = Math.abs(req.params.number); // not that we would ever get passed a negative number...
      var gatheredBukkits = [];

      if (num && num < bukkits.length) {
        gatheredBukkits = _.shuffle(bukkits).slice(0,num);
      }
      // if request does not include a number, just give all bukkits
      else {
        gatheredBukkits = bukkits;
      }

      responseBukkits = [];

      _(gatheredBukkits).each(function(bukkit){
        responseBukkits.push('http://bukk.it/' + bukkit);
      });

      console.log('Returning %s bukkits', responseBukkits.length);
      res.set({
        'Content-Type': 'application/json'
      });
      res.status(200);
      res.send( JSON.stringify({ "content" : responseBukkits}) );
  });
};