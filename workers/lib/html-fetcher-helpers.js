var fs = require('fs');
var http = require('http-get');

exports.readUrls = function(filePath, cb){
  fs.readFile(filePath, 'utf8', function(err,data){
    if (err) { throw err; }
    cb(data.split('\n'));
  });
};

exports.downloadUrls = function(urls){
  urls = urls || [];
  var buffers = {};
  for (var i=0; i<urls.length; i++) {
    http.get({url: urls[i]}, function (error, result) {
      if (error) {
        console.error(error);
      } else {
        buffers[urls[i]] = result.buffer;
      }
    });
  }
  return buffers;
};
