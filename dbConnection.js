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