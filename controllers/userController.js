let service = require('../services');

const getUser = (req, res) => {
    console.log(req.body)
    let user = req.body;
    let query = {name: user.name, database: user.database};
    console.log('controller: getUser');
    service.userService.getUser(res, query)
}

const createUser = (req, res) => {
    service.userService.createUser(req, res);
}



module.exports = {
    getUser, createUser
}