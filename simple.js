request = require('request');
cheerio = require('cheerio');

 var bukkits = []; // hold our bukkit objects
  var url = 'http://bukk.it/'; // bukk.it
  var targets = 'td a';

  request(url, function(err, resp, body){
    $ = cheerio.load(body);
    console.log(body);

  });