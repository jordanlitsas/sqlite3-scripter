let express = require("express");
const { dirname } = require("path");
let app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
let http = require('http').createServer(app);


let circularJSON = require('circular-json');


var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));


const MongoClient = require('mongodb').MongoClient;
const e = require("express");
const uri = `mongodb+srv://prac4-pw:prac4-pw@cluster0.gwxoy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let userCollection;

//Opens connection to MongoDB database.
const openConnection = (message) => {
  client.connect((err, db) => {
    userCollection = client.db("newDB").collection('users');
    if (!err){
      console.log("DB Connected.")
    }
    else{
      console.log(err)
    }
    
  });
}
openConnection();

const insertUser = (user, res) => {
  userCollection.insert(user, (err, result) => {
    console.log("User Inserted", result)
    res.send({result: 200, newUser: user})
  })
}



app.post('/saveDatabase', function(req, res){
  

  let data = req.body
  let user = data[0];
  let table = data[1]

  res.send({'user': user, 'table': table})

  // let query = {
  //   'name': user.name,
  //   'database': user.database
  // };

  // let updateDoc = {$set: {table}}

  // let options = {upsert: true}
  
  
  // userCollection.updateOne(query, updateDoc, options);



});





app.post('/createDatabase', function(req, res){

  let user = req.body;
  userCollection.find({'name': user.name}).toArray(function(err, result){
    if (result.length == 1){
      if (result[0].database != user.database){
        //add database to user's collection
        //call getDatabase( {username: user.name, database: user.database })
      }

      else {
        res.send({result: 'takenName', takenUser: user})
      }

    }
    else if (result.length == 0){
       insertUser(user, res);
    }
  })
});

app.post('/getDatabase', function(req, res){
  let user = req.body;
  let query = {'name': user.name, 'database': user.database};
  res.send( [res, user, query] )

});

 const getUser = (res, user, query) => {
  
  let response = userCollection.find({}).toArray();
  res.send(response)
}

  // userCollection.find(query).toArray(function(err, result){
    // if (err) throw err;
    // res.send(result)
    // return result
    // }
    // try {

    //   if (result[0].name == user.name && result[0].database == user.database){
    //    return {'user': result}

    //   } 
      
    //   else if (result[0].name == user.name && result[0].database != user.database){
    //     return {error: 'db'};
    //   }

    // }
    // catch {
    //   return {error: 'both'};
    // }
// )}




 







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

