var request = require('request');
var cheerio = require('cheerio');

exports.get = function get(callback) {

  var bukkitData = []; // hold our bukkit objects
  var url = 'http://bukk.it/'; // bukk.it
  var targets = 'td a';

  request(url, function(err, resp, body){
    $ = cheerio.load(body);
    // for each of our targets (within the request body)...
    $(targets).each(function(){
      content = $(this).text();
      bukkitData.push(content);
    });
    if (err) {
      return;
    }
    callback(bukkitData);
  }); // end request

};

