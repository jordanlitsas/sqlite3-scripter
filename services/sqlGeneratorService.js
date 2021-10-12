let userCollection;
const mongoose = require('mongoose');
const { Schema } = mongoose;
let database = require('./sqlGeneratorDatabaseConnection')




const toggleAutoSave = (message) => {
    
    if (message.toggle){
        database.saveUser(message.state)
    }
}




const createUser = async (user) => {
    let userCreationSuccess = await database.createUser(user);
    return userCreationSuccess;
}



const getUser = async (query) => {
    let user = await database.getUser(query);
    return user;
}


//Query is user and db name, selects a unique document. Add table objects to document.
const saveUserDatabase = async (query) => {
    let saveSuccess = await database.saveUser(query);
    return saveSuccess
}

module.exports = {
    createUser, getUser, saveUserDatabase, toggleAutoSave
}