var fs = require('fs');
var http = require('http-get');
var path = require('path');

exports.readUrls = function(filePath, cb){
  fs.readFile(filePath, 'utf8', function(err,data){
    if (err) { throw err; }
    cb(data.split("\n"));
  });
};

exports.downloadUrls = function(urls){
  urls = urls || [];
  for (var i = 0; i < urls.length; i++) {
    http.get(urls[i], path.join(__dirname, "../../data/sites/") + urls[i], function (error, result) {
      if (error) {
        console.error(error);
      } else {
        console.log("wrote url to file" + result.file);
      }
    });
  }
};
