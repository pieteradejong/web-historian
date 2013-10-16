var path = require('path');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.

module.exports.handleRequest = function (request, response) {
  var statusCode = 404;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  var responseBody = "Not Found";

  // REPLACING THIS WITH QUERYSTRING MODULE
  // var parseQueryString = function(url){
  //   var options = {};
  //   var queryString = url.slice(url.indexOf('?')+1);
  //   if (queryString === url) { return options; }
  //   var pairs = queryString.split('&');
  //   for (var i=0; i<pairs.length; i++) {
  //     var pair = pairs[i].split('=');
  //     options[pair[0]] = pair[1];
  //   }
  //   return options;
  // };

  var root = function(){
    // statusCode = 200;
    // if (pathname === '/') {
    //   headers['Content-Type'] = "text/html";
    //   responseBody = fs.readFileSync('../client/index.html');
    // } else {
    //   headers['Content-Type'] = (pathname === '/styles/styles.css') ? "text/css" : "text/javascript";
    //   responseBody = fs.readFileSync('../client/' + pathname);
    // }
    if (request.method === 'POST') {
      sitePost();
    } else {
      statusCode = 200;
      responseBody = "<input />";
    }
  };

  var sitePost = function() {
    var blah = querystring.parse(url);
    console.log(blah);
    var blah = querystring.parse(url.slice(url.indexOf('?')+1));
    console.log(blah);
    statusCode = 302;
    console.log(request.url);
    var url = request.url.slice(1);
    fs.appendFile(module.exports.datadir, url, function(err){
      if (err) throw err;
      console.log(url + " was appended to file");
    });
  };

  var getSite = function(pathname){
    file = path.join(__dirname, "../data/sites", pathname);
    if (file) {
      statusCode = 200;
      responseBody = fs.readFileSync(file);
    } else {
      statusCode = 404;
      responseBody = "Site not found.";
    }
    
  };

  

  var router = {
    '/': root,
    '/www.google.com': getSite
  };

  var pathname = url.parse(request.url).pathname;
  router[pathname](pathname);
  response.writeHead(statusCode, headers);
  response.end(responseBody);
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};