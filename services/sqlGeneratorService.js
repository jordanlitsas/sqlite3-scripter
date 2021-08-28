let client = require("../dbConnection");
let sql = require("../public/js/jsonToSql")
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

    let user = req.body;
    let query = {
        username: user.username,
        databaseName: user.databaseName
    };

    
    database.find(query, function(err, result){
        res.send({doc: result})
        
    });
}


//Query is user and db name, selects a unique document. Add table objects to document.
const saveUserDatabase = (req, res) => {
    let data = req.body;

    let query = {username: data.username, databaseName: data.databaseName};
    let update = {tables: data.tables};
    let tables = data.tables;
    // database.findOneAndUpdate(query, {$set: {tables: data.tables}}, {upsert: true}, function (err, result){
    //     if (err) {res.send(500, {error: err})};
    //     res.send({success: result})
    // });


    

    console.log(tables)
    res.send({result: tables})
}

const generateSqlScript = (req, res) => {
    let userInstance = req.body;
    let script = sql.getScript(userInstance);

    if (script){
        res.send({result: script})
    }
}


module.exports = {
    createUser, getUser, saveUserDatabase, generateSqlScript
}