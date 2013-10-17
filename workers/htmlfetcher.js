// eventually, you'll have some code here that uses the tested helpers
// to actually download the urls you want to download.
var helpers = require('./lib/html-fetcher-helpers');
var path = require('path');
console.log("directory ",__dirname);
console.log("path.join ",path.join(__dirname, "../data/sites.txt"));
helpers.readUrls(path.join(__dirname, "../data/sites.txt"), helpers.downloadUrls);