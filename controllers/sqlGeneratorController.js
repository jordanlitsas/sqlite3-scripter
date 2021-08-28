let service = require('../services');

const getUser = (req, res) => {
    service.sqlGeneratorService.getUser(req, res)
}

const createUser = (req, res) => {
    service.sqlGeneratorService.createUser(req, res);
}

const saveUserDatabase = (req, res) => {
    service.sqlGeneratorService.saveUserDatabase(req, res);
}

const generateSqlScript = (req, res) => {
    service.sqlGeneratorService.generateSqlScript(req, res);
}
module.exports = {
    getUser, createUser, saveUserDatabase, generateSqlScript
}