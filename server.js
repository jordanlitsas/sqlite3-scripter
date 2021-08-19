let express = require("express");
let app = express();
let dbConnecton = require('./dbConnection');
let http = require('http').createServer(app);
let bodyParser = require('body-parser')


//routes
let userRoutes = require('./routes/users');

var port = 3000;

const { dirname } = require("path");


app.use(bodyParser.urlencoded({ extended: false }))
 app.use(bodyParser.json())
app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.use(userRoutes);




// const insertUser = (user, res) => {
//   userCollection.insert(user, (err, result) => {
//     console.log("User Inserted", result)
//     res.send({result: 200, newUser: user})
//   })
// }



// app.post('/saveDatabase', function(req, res){
  
//   let data = req.body
//   let user = data[0];
//   let table = data[1]

//   let submission = {
//       'rows': [ {table} ]
//   }

//   let tables = [submission];

//   userCollection.updateOne(
//     { name: user.name},
//     {
//       $set: { 'tables': tables},
//       $currentDate: { lastModified: true }
//     }
//   );


//   res.send({result: 200, tableName: table.name});


// });





// app.post('/createDatabase', function(req, res){

//   let user = req.body;
//   let query = {
//     'name': user.name,
//     'database': user.database
//   }
//   userCollection.findOne(query, function (err, result){
//     if (err) throw err;
//     if (typeof(result) === 'undefined'){
//       insertUser(user, res)
//     }
//     else {
//       res.send({error: 'used'})
//     }
//   })
      
// });

// app.post('/getDatabase', function(req, res){
//   let user = req.body;
//   let query = {name: user.name, database: user.database};
//   getUser(res, query);
  
// });

//  const getUser = (res, query) => {
  
//   userCollection.findOne(query, function (err, result){
//     if (err) throw err;
//     res.send({user: result})
//   })
// }





 







http.listen(port,()=>{
  console.log("Listening on port ", port);
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

