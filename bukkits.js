var request = require('request')
, cheerio = require('cheerio')
;

/**
 * Scrapes bukk.it for image urls, stores them in an array and passes that to a callback.
 * @param  {Function} callback a callback function that accepts an array of bukkits
 *
 */
exports.get = function get(callback) {

  var bukkitData = []; // hold our bukkit objects
  var url = 'http://bukk.it/'; // bukk.it
  var targets = 'td a';

  request(url, function(err, resp, body){
    if (err) return;

    $ = cheerio.load(body);
    // for each of our targets (within the request body)...
    $(targets).each(function(){
      var content = $(this).text();
      bukkitData.push(content);
    });
    callback(bukkitData);
  }); // end request

};

exports.format = function format(array) {

};

/**
 * takes an
 * @param  {[type]} bukkits [description]
 * @return {[type]}         [description]
 */
exports.store = function store (array){
  console.log('yeah'); // pass
  // bukkitsJson = JSON.stringify(bukkits)
};