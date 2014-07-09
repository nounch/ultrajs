#!/usr/bin/env node



var fs = require('fs')
, child_process = require('child_process')
, vm = require('vm')

, $ = require('jquery');


//=========================================================================
// Setup
//=========================================================================

// Include external .js library which is itself not a node module
var ULTRAJS_PATH = __dirname + '/ultra.js'
var includeInThisContext = function(path) {
  var code = fs.readFileSync(path);
  vm.runInThisContext(code, path);
}.bind(this);
includeInThisContext(ULTRAJS_PATH);


var dataFile = __dirname + '/res/json/data5.json';
var outFile = __dirname + '/res/html/data.html';
var prettyOutFile = __dirname + '/res/html/data.pretty.html';
var data = JSON.parse(fs.readFileSync(dataFile));

var ultra = new UltraRenderer();

// Special __DEBUG__ variable
var __DEBUG__ = false;
var __DEBUG__PRETTY__PRINT__ = false;
var __DEBUG__OPEN__BROWSER__ = false;


if (__DEBUG__) {
  // Render using <table>, <tr> and <td> tags and custom CSS
  ultra.useTableTags = true;
  ultra.tableTags.open.table =
    '<table style="border: 1px solid red; border-spacing: 0;">';
  ultra.tableTags.open.td =
    '<td style="border: 1px solid red; vertical-align: top; text-align: left;">';
}

var renderedData = '<html>'
renderedData += '<head>';
renderedData += '</head>';
renderedData += ultra.render(data);
renderedData += '</html>';

fs.writeFile(outFile, renderedData, function(err) {});



//=========================================================================
// Pretty print the HTML output
//=========================================================================


if (__DEBUG__PRETTY__PRINT__) {
  var prettyPrintCommand = 'echo \'' + renderedData +
    '\' | xmllint --format -';

  child_process.exec(prettyPrintCommand, function(err, output) {
    if (err) {
      throw err;
    } else {
      fs.writeFile(prettyOutFile, output, function(err) {
	if (err) {
	  throw err;
	}
	console.log('HTML written to: ' + prettyOutFile);
      });
    }
  });
}

//=========================================================================
// Automatically open the HTML output in the standard browser
//=========================================================================
//
// Using 'open' or child_process.spawn bares the risk of not working
// correctly. If a file:// url for a local file is used on a DEBIAN system,
// then xdg-open is used to open the file. xdg-open, however, tries uses
// sensible-browser, which will end up using www-browser instead of
// x-www-browser if $DISPLAY is not set adequately. An ugly hack would be
// to set $DISPLAY correctly and restore it afterwards. This, however may
// cause side effects.
//
// So this will fail:
//
// var fileURI = 'file:/' + outFile;
// open(fileURI);
// open('http://www.google.com');
//
// This will fail, too:
//
// child_process.spawn('open', ['file://' + outFile]);
//
// The only sensible option here is:
//

if (__DEBUG__OPEN__BROWSER__) {
  child_process.exec('$BROWSER ' + prettyOutFile, function(err, output) {
    if (err) {
      throw err
    }
  });
}
