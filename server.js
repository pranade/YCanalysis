var request = require ('request');
var fs = require('fs');
 
var express = require("express");
var app = express();
  
// app.get("/", function(req, res) {
//   res.sendfile('YCvisualizer.html')
// });
//
// app.get("/data.csv", function(req, res) {
//   res.sendfile('data.csv')
// });

app.get("/", function(req, res) {
  res.sendfile('index.html')
});

app.get("/data.txt", function(req, res) {
  res.sendfile('ycdata.txt')
  // res.sendfile('genes10.txt')
});

app.get("/colorbrewer.js", function(req, res) {
  res.sendfile('colorbrewer.js')
});

app.get("/barchart.js", function(req, res) {
  res.sendfile('barchart.js')
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
 console.log("Listening on " + port);
});