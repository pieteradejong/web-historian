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

  var root = function(){
    if (request.method === 'POST') {
      postRouter();
    } else {
      statusCode = 200;
      responseBody = "<input />";
    }
  };

  var postRouter = function() {
    var siteUrl = request._postData.url;
    var pathname = '/' + siteUrl;
    if (router[pathname]) {
      getSite(pathname);
    } else {
      router[pathname] = getSite;
      sitePost(siteUrl);
    }
  };

  var sitePost = function(siteUrl) {
    statusCode = 302;
    router[pathname] = getSite;
    var text = siteUrl + "\n";
    fs.appendFileSync(module.exports.datadir, text, 'utf8', function(err){
      if (err) throw err;
      console.log(url + " was appended to file");
    });
  };

  var getSite = function(pathname){
    file = path.join(__dirname, "../data/sites", pathname);
    statusCode = 200;
    responseBody = fs.readFileSync(file);
  };

  var router = {
    '/': root,
    '/www.google.com': getSite
  };

  var pathname = url.parse(request.url).pathname;
  if (router[pathname]) { router[pathname](pathname); }
  response.writeHead(statusCode, headers);
  response.end(responseBody);
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};