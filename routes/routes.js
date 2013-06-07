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
      var responseBukkits = [];

      if (num && num < bukkits.length) {
        console.log('Done collecting bukkits');
        responseBukkits = _.shuffle(bukkits).slice(0,num);
      }
      // if request does not include a number, just give all bukkits
      else {
        responseBukkits = bukkits;
      }

      console.log('Returning %s bukkits', responseBukkits.length);
      res.set({
        'Content-Type': 'application/json'
      });
      res.send( JSON.stringify({ "root": 'http://bukk.it', "content" : responseBukkits}) );
  });
};