var express = require("express");
var app = express();
var http = require('http');
var server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const dbConnection = require('./dbConnection');
const Service = require('./services')
const bodyParser = require('body-parser')
require('dotenv').config();


//routes
let sqlGenerator = require('./routes/sqlGenerator');


var port = process.env.PORT;



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.use(sqlGenerator);




//sockets
io.on('connection', (socket) => {

  socket.on('autoSave', (message) => {
      Service.sqlGeneratorService.toggleAutoSave(message);
  })
});



server.listen(3000, () => {
  console.log('listening on ' + 3000);
});


//TESTING - The number 'api' refers to a specific test. The reference for this code can be found in test/test.js as a comment above each it() implementation.
app.get('/test/:api', function(req, res){
  let api = parseInt(req.params.api);
  let services = require('./services/sqlGeneratorService');

  switch (api){


  //1, 2: creating user/database instance with Mongoose


    case 1: 
      req.body = {
        name: "test",
        database: "test",
      };
      services.createUser(req, res);
    break;

    case 2:
      req.body = {
        name: "test1",
        database: "test1",
      };
      services.createUser(req, res);
    break;

    case 3: 
      req.body = {
        username: "test",
        databaseName: "test"
      };
      services.saveUserDatabase(req, res)
    break;

    case 4: 
      req.body = {
        username: "doesNotExist",
        databaseName: "doesNotExist"
      };
      services.saveUserDatabase(req, res)
    break;

    case 5: 
      req.body = {
        username: "test",
        databaseName: "test"
      };
      services.getUser(req, res);
    break;

    case 6: 
      req.body = {
        username: "doesNotExist",
        databaseName: "doesNotExist"
      };
      services.getUser(req, res);
    break;
  }
});
