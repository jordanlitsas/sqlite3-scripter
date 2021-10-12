const mongoose = require('mongoose');
const schema = require('./_schemas');
const databaseModel = mongoose.model('sqlDB', schema.databaseSchema);



const createUser = async (user) => {
    
    let existingUser = await databaseModel.find({username: user.username, databaseName: user.databaseName});

    if (existingUser.length == 0){
        let newUser = new databaseModel(user);
        let success = await newUser.save();
        return success;
    } else {
        return null;
    }
    
    
    
}

const saveUser = async (query) => {
    let savedUser = await databaseModel.findOneAndUpdate({username: query.username, databaseName: query.databaseName}, {$set: query}, {upsert: true, new: true});
    return savedUser;
    
}


const getUser = async (query) => {

    let user = await databaseModel.findOne(query);
    // console.log(query)
    return user;
}
module.exports = {createUser, getUser, saveUser}