const services = require('../services');
let Service = require('../services');



const generateSqlScript = async (req, res) => {
    let userInstance = req.body;

    //Array of create table syntax ... - extract table data and convert to sql table creation statements
    // let sql_script = Service.jsonToSqlService.getScript(userInstance);
    let sql_script = Service.jsonToSqlService.getScript(userInstance);
    

    /*
    Array needs to be sorted so that tables are created in a proper order. i.e., table1's foreign key references table2's primary key. Table 1 cannot be created before table2/table 1 cannot
    //have an earlier index than table2.
    */
    // sql_script = Service.jsonToSqlService.sort(sql_script);
    // sql_script = sql_script[1];
    let query = {username: userInstance.username, databaseName: userInstance.databaseName, script: sql_script};
    Service.sqlGeneratorService.saveUserDatabase(query).then(saveSuccess => {
        if (!saveSuccess){
            res.status(400).send();
        } else {
            res.status(200).send(sql_script);
        }
    })

}





const getUser = async (req, res) => {
    let data = req.body;
    let query = {
        username: data.username,
        databaseName: data.databaseName
    };

    Service.sqlGeneratorService.getUser(query).then(returnedUser => {

        if (returnedUser == null){
            res.status(204).send();
        } else {
            res.status(200).send(returnedUser)
        }
    })
}

const createUser = async (req, res) => {
    let user = {
        username: req.body.name,
        databaseName: req.body.database,
        database: {
            tables: []
        }
    };

    Service.sqlGeneratorService.createUser(user).then(creationSuccess => {
        
        if (creationSuccess == null){
            res.status(400).send({result: 'used'});
        } else {
            res.status(200).send(creationSuccess);
        }
    }).catch();
}

const saveUserDatabase = async (req, res) => {

    let data = req.body;
    let query = {username: data.username, databaseName: data.databaseName, tables: data.tables};
      console.log(JSON.stringify(data, null, 2))

    Service.sqlGeneratorService.saveUserDatabase(query).then(saveSuccess => {
        res.send(saveSuccess)
    })
}

const deleteDatabase = async (req, res) => {

    let id = req.body.id;

    let response = await Service.sqlGeneratorService.deleteDatabaseWithId(id);
    if (response != null){
        res.status(200).send()
    } else {
        res.status(400).send();
    }
}

module.exports = {
    getUser, createUser, saveUserDatabase, generateSqlScript, deleteDatabase
}