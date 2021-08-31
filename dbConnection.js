const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://prac4-pw:prac4-pw@cluster0.gwxoy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let userCollection;

//Opens connection to MongoDB database.
mongoClient.connect((err, db) => {
    userCollection = mongoClient.db("db").collection('users');
    if (!err){
      console.log("DB Connected.")
    }
    else{
      console.log(err)
    }
    
  });

  exports.mongoClient = mongoClient;


mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log("Mongoose Connection");
})


// const { Schema } = mongoose;

// const databaseSchema = new Schema( {

//     username: String
//     ,
//     database: {
//         databaseName: String,
//         tables: [{
//             tableName: String,
//             rows: [{
//                 dataType: String,
//                 attribute: String,
//                 constraint: String
//             }]
//         }]
//     }

// } )

// const database = mongoose.model('database_schema', databaseSchema);

// const user = new database ( {username: 'adminMongoose'} );

// user.save(function(err){
//   console.log(err);
// });