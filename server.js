let express = require("express");
let app = express();
let dbConnecton = require('./dbConnection');
let http = require('http').createServer(app);
let bodyParser = require('body-parser')


//routes
let sqlGenerator = require('./routes/sqlGenerator');
let projectRoutes = require('./routes/projects');
const services = require("./services");

var port = 1010;



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.use(sqlGenerator);
app.use(projectRoutes);



http.listen(port,()=>{
  console.log("Listening on port ", port);
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


