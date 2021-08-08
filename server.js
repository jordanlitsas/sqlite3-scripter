let express = require("express");
const { dirname } = require("path");
let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//var app = require('express')();
let http = require('http').createServer(app);

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://sit725-prac4:<prac4-pw>@cluster0.gwxoy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



const { MongoClient } = require('mongodb');
const { nextTick } = require("process");
const uri = "mongodb+srv://sit725-prac4:<prac4-pw>@cluster0.gwxoy.mongodb.net/db1?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1});

try {
  client.connect(err => {
    const collection = client.db("db1").collection("users");
    
    collection.insertOne({id: 1})  // perform actions on the collection object
    // client.close();
  });
}
catch(err){
}



var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));





app.get("/sqlite3DatabaseProject", function (request, response) {
  response.redirect(__dirname + "/public/dmbs.html")
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
});
app.post("/switch", function(request, response) {
  var cb = request.body.cb;

  if (cb === 'on'){
  
    

  }
  else {
    response.end("Switch is off.");
  }
});







app.post('/user-entry', function(request, response){

});



http.listen(port,()=>{
  console.log("Listening on port ", port);
});