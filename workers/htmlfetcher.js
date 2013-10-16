// eventually, you'll have some code here that uses the tested helpers 
// to actually download the urls you want to download.

var helpers = require('./lib/html-fetcher-helpers');

helpers.readUrls('../../data/sites.txt', function(urls){
  sites = helpers.downloadUrls(urls);
  for (var site in sites) {
    fs.writeFile('../../data/sites/' + site, sites[site], function (err) {
      if (err) throw err;
    });
  }
});