let service = require('../services');

const getUser = (req, res) => {
    service.userService.getUser(req, res)
}

const createUser = (req, res) => {
    service.userService.createUser(req, res);
}

const saveUserDatabase = (req, res) => {
    service.userService.saveUserDatabase(req, res);
}
module.exports = {
    getUser, createUser, saveUserDatabase
}