let client = require("../dbConnection");
let userCollection;
setTimeout(() => {
    userCollection = client.mongoClient.db("db").collection('users');
}, 2000)




const createUser = (req, res) => {
    let user = req.body;

    let query = {
        'name': user.name,
        'database': user.database
    }

    //validation - no result can be returned for query.
    userCollection.findOne(query, function (err, result){
        if (err) throw err;
        if (typeof(result) === 'undefined'){
            insertUser(user, res);
        }
        else {
            res.send({error: 'used'})
        }
    })
}

const insertUser = (user, res) => {
    userCollection.insertOne(user, (err, result) => {
        console.log("User Inserted", result)
        res.send({result: 200, newUser: user})
    })
}



const getUser = (res, query) => {

    userCollection.findOne(query, function (err, result){
        if (err) throw err;
        res.send({user: result})
    })
}





module.exports = {
    createUser, getUser
}