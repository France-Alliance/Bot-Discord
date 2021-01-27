var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request("https://www.airlines-manager.com/home", function(error, response, body) {
  if(error) {
    if( error ==! 200) {
        console.log("Error: " + error);
    }
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  let title = $('title');

  console.log(title.text());

});