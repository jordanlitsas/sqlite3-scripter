let express = require("express");
let app = express();
let dbConnecton = require('./dbConnection');
let http = require('http').createServer(app);
let bodyParser = require('body-parser')


//routes
let userRoutes = require('./routes/users');
let projectRoutes = require('./routes/projects');

var port = 8080;

const { dirname } = require("path");


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.use(userRoutes);
app.use(projectRoutes);



http.listen(port,()=>{
  console.log("Listening on port ", port);
});



