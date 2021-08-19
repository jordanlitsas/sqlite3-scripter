let client = require("../dbConnection");
let userCollection;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const databaseSchema = new Schema( {

    username: String,
    database: {
        databaseName: String,
        tables: [{
            tableName: String,
            rows: [{
                dataType: String,
                attribute: String,
                constraint: String
            }]
        }]
    }

} )

const database = mongoose.model('database_schema', databaseSchema);


















setTimeout(() => {
    userCollection = client.mongoClient.db("db").collection('users');
}, 2000)




const createUser = (req, res) => {

    let user = new database ( {
        username: req.body.name,
        database: {
            databaseName: req.body.database
        }
    });
  
    let query = {
        username: user.username,
         database: {databaseName: user.database.databaseName}
    };

    createUserIfDoesntExist(query, user, res);
    
    
   
}


const createUserIfDoesntExist = async (query, user, res) => {
    database.findOne(query, function(err, result){
        if (result === null){
            user.save(function(err){
                if (err) {console.log('Error creating new user/database.')}
                res.send({newUser: user});
            })
        }
        else {
            res.send({error: 'used'})
        }
    });

}




const getUser = (req, res) => {
    let userDetails = req.body;
    let query = {
        name: user.name, 
        database: user.database
    };

    userCollection.findOne(query, function (err, result){
        if (err) throw err;
        res.send({user: result})
    })
}


const saveUserDatabase = (req, res) => {
    let data = req.body
    let user = data[0];
    let table = data[1]
  
    let submission = {
        'rows': [ {table} ]
    }
  
    let tables = [submission];
  
    userCollection.updateOne(
      { name: user.name},
      {
        $set: { 'tables': tables},
        $currentDate: { lastModified: true }
      }
    );
  
  
    res.send({result: 200, tableName: table.name});
}


module.exports = {
    createUser, getUser, saveUserDatabase
}