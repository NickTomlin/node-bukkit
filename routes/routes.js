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

// /all/:number
exports.all = function(req, res) {
  bukkits.get(
    function allBukkits(bukkits) {
      var length = bukkits.length;
      var num = req.params.number;
      console.log(req.params.number);
      var slice = num  && num < length ? length - num : 0;
      console.log("slice " + slice);
      var returnBukkit = JSON.stringify({ "root": 'http://bukk.it', "content" : bukkits.slice(slice)});
      res.send(returnBukkit);
  });
};