let express = require("express");
const { dirname } = require("path");
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);





var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
console.log(__dirname + "/public")

app.get("/sqlite3DatabaseProject", function (request, response) {

  response.redirect(__dirname + "/public/dmbs.html")
  // response.end("DBMS SQLite3")
});

app.get("/mainProject", function (request, response) {
  var html = `This page will present my main project for this unit.`
  response.end(html);
});

app.get("/chessProject", function (request, response) {
  var html = `This page will support a .net terminal so the user can play a text-based chess game.`
  response.end(html);
});

app.get("/weatherApp", function(request, response) {
  response.end("Im in the process of finding where I left those files ........");
})







http.listen(port,()=>{
  console.log("Listening on port ", port);
});