var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request("http://www.buzzfeed.com", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  console.log($)

});