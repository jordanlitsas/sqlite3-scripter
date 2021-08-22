let client = require("../dbConnection");
let userCollection;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const databaseSchema = new Schema( {
    
    username: String,
    databaseName: String,
    tables: [{
        tableName: String,
        rows: [{
            dataType: String,
            attribute: String,
            constraint: String
        }]
    }]
});

const database = mongoose.model('database_schema', databaseSchema);


setTimeout(() => {
    userCollection = client.mongoClient.db("db").collection('users');
}, 2000)




const createUser = (req, res) => {


    let user = new database ( {
        username: req.body.name,
        databaseName: req.body.database,
        database: {
            tables: []
        }
    });

    let query = {
        username: user.username,
        databaseName: user.databaseName
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

    let data = req.body;
    let query = {
        username: data.username,
         database: {
             databaseName: data.databaseName
        }
    };

    console.log(query)
    console.log(data)
    database.find({username: 'final', database: {databaseName: 'final_database'}}, function(err, result){
        res.send({final: result})
        // if (result != null){
        //     res.send({userInstance: result});
        // }
        // else { res.send({code: 400})};
    });
}


//Query is user and db name, selects a unique document. Add table objects to document.
const saveUserDatabase = (req, res) => {
    let data = req.body;

    let query = {username: data.username, databaseName: data.databaseName};
    let update = {tables: data.database.tables};
    
    database.findOneAndUpdate(query, {$set: {tables: data.database.tables}}, {upsert: true}, function (err, result){
        if (err) {res.send(500, {error: err})};
        res.send({success: result})
    });

}


module.exports = {
    createUser, getUser, saveUserDatabase
}