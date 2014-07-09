#!/usr/bin/env node


var $ = require('jquery')
, fs = require('fs');

//=========================================================================
// Retrieve JSON data from various services and write it to local files
//=========================================================================

var Fetcher = (function() {
  var Fetcher = function(dataDir) {
    this.DATA_DIR = dataDir || '/res/json/';
  }

  Fetcher.prototype = new (function(foo) {
    this._fetch = function(url, queryObj, outFile, serviceName) {
      var self = this;
      console.log('Fetching ' + serviceName + ' data');
      $.getJSON(url, queryObj , function(data) {
	fs.writeFile(__dirname + self.DATA_DIR + outFile,
		     JSON.stringify(data),
		     function(err) {
		       if (err) {
			 throw err;
		       } else {
			 console.log(serviceName +
				     ' data has been written to: .' +
				     self.DATA_DIR + outFile);
		       }});
      });
      console.log('Done fetching ' + serviceName + ' data');
    };

    this.fetchFlickr = function(tags, outFile) {
      var parent = this;
      this._fetch(
      	'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?' ,
	{
	  tags: tags
	  , tagmode: 'any'
	  , format: 'json'
	}, outFile, 'Flickr');
    };

    this.fetchYoutTube = function(queryString, outFile) {
      var parent = this;
      this._fetch(
    	'https://gdata.youtube.com/feeds/api/videos?',
	{
	  q: queryString
	  , max_results: 50
	  , alt: 'json'
	}, outFile, 'YouTube');
    };

    // this.fetchWikipedia = function(titles, outFile) {
    //   var parent = this;
    //   titles = titles.join(' ');
      
    //   this._fetch(
    // 	'http://en.wikipedia.org/w/api.php?action=query&amp;format=json&amp;callback=?',
    // 	{
    // 	  titles: titles
    // 	  , format: 'json'
    // 	}, outFile, 'Wikipedia');
    // };

  })();


  return Fetcher;
})();


module.exports.Fetcher = Fetcher;


var fetcher = new Fetcher();
fetcher.fetchFlickr('new york', 'newYork.json');
fetcher.fetchYoutTube('cats', 'catVideos.json');
// fetcher.fetchWikipedia(['tree', 'time', 'person'], 'wikipedia.json');
