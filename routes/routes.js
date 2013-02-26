var bukkits = require('../bukkits.js');
var helpers = require('../helpers.js');

exports.index = function index (req,res) {
  res.render('index', {
    title : 'Bukkit Api'
  });
};

exports.rand = function rand (req, res){
    bukkits.get(
    // callback
      function(bukkits) {
        var randomBukkit = bukkits[helpers.rand(1,bukkits.length)];
        var returnBukkit = 'http://bukk.it/' +randomBukkit;

        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        res.redirect(307,returnBukkit);
    });
};

exports.all = function(req, res) {
  bukkits.get(
    // callback
    function allBukkits(bukkits) {
      var returnBukkit = JSON.stringify(bukkits);
      res.send(returnBukkit);
  });
};