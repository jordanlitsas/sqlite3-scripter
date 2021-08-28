let express = require("express");
let app = express();
let dbConnecton = require('./dbConnection');
let http = require('http').createServer(app);
let bodyParser = require('body-parser')


//routes
let sqlGenerator = require('./routes/sqlGenerator');
let projectRoutes = require('./routes/projects');

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



