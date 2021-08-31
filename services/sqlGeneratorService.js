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


const createUserIfDoesntExist = (query, user, res) => {
    database.findOne(query, function(err, result){
        if (result == null){
            user.save();
            res.status(200);
            res.send({newUser: user});
        } 
        else {
            res.status(400);
            res.send({result: 'used'})
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
        if (typeof(result.doc) == 'undefined'){
            res.status(400);
            res.send();
        }
        else if (result.doc[0].username == query.username && result.doc[0].databaseName == query.databaseName){
            res.status(200);
            res.send({doc: result})
        }
        
    });
}


//Query is user and db name, selects a unique document. Add table objects to document.
const saveUserDatabase = (req, res) => {
    let data = req.body;

    let query = {username: data.username, databaseName: data.databaseName};

    database.find(query, function(err, result){
        if (typeof(result.doc) == 'undefined'){
            res.status(400);
            res.send();
        }
    })

    database.findOneAndUpdate(query, {$set: {tables: data.tables}}, {upsert: true, new: true}, function (err, result){
        if (err) {res.send(500, {error: err})};
       
        res.status(200);
        res.send({doc: result})

        
    });


    


}

const generateSqlScript = (req, res) => {
    let userInstance = req.body;
   
    let script = sql.getScript(userInstance);

    res.send({result: script})
    
}


module.exports = {
    createUser, getUser, saveUserDatabase, generateSqlScript
}