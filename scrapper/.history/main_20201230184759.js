var request = require('request');
var cheerio = require('cheerio');

request("https://www.airlines-manager.com/home", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);

  }
  console.log(typeof(response.statusCode))
  if( response.statusCode ==! 200 ) {
      console.log("Status code: " + response.statusCode);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  let title = $('title');

  console.log(title.text());

});