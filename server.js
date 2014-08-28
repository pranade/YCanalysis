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


app.get("/themes", function(req, res) {
  res.sendfile('ycdata3.txt')
});

app.get("/industries", function(req, res) {
  res.sendfile('industries.csv')
});

app.get("/status", function(req, res) {
  res.sendfile('deadoralive.csv')
  // res.sendfile('biz2biz.csv')
});

app.get("/b2b", function(req, res) {
  res.sendfile('biz2biz.csv')
});



app.get("/colorbrewer.js", function(req, res) {
  res.sendfile('colorbrewer.js')
});

app.get("/barchart.js", function(req, res) {
  res.sendfile('barchart.js')
});


app.get("/", function(req, res) {
  res.sendfile('index.html')
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
 console.log("Listening on " + port);
});