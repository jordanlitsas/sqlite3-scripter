const services = require('../services');
let Service = require('../services');



const generateSqlScript = async (req, res) => {
    let userInstance = req.body;


    const getScript = (userInstance) => {

   
        //validate user
        if (userInstance == null){return null;}
       
    
        let tableArray = [];
        userInstance.tables.forEach(userInstanceTable => {
    
            let tableName = userInstanceTable.tableName;
            let appendLine = "";
            let rowi = 0;
            let row = {name: tableName, attributes: [], containsForeignKey: false, references: []};
            //for each row
            while (rowi < userInstanceTable.rows.length){
    
                //Handles unique foreign key syntax requirements
                //Later versions should have unique syntax organised seperately
                let constraint = userInstanceTable.rows[rowi].constraint;
                
                if ( !constraint.includes("REFERENCES") ){
                    row.attributes.push(`${userInstanceTable.rows[rowi].dataType} ${userInstanceTable.rows[rowi].attribute} ${constraint}`)
                } else {
                    
                    row.containsForeignKey = true;
                    let constraintPhrases = constraint.split(" ").splice(0);
                    if (constraintPhrases[0] != "REFERENCES"){
                        row.attributes.push(`${userInstanceTable.rows[rowi].dataType} ${userInstanceTable.rows[rowi].attribute} ${constraintPhrases[0]}`);
                    } else {
                        row.attributes.push(`${userInstanceTable.rows[rowi].dataType} ${userInstanceTable.rows[rowi].attribute}`);
                    }
                    if (appendLine != ""){
                        appendLine += ` FOREIGN KEY (${userInstanceTable.rows[rowi].attribute}) REFERENCES ${constraintPhrases[constraintPhrases.length-1]}`;
                        let referencedTableName = getFkTableReferenceName(`FOREIGN KEY (${userInstanceTable.rows[rowi].attribute}) REFERENCES ${constraintPhrases[constraintPhrases.length-1]}`);
                        row.references.push(referencedTableName);
                    } else {
                        appendLine += `FOREIGN KEY (${userInstanceTable.rows[rowi].attribute}) REFERENCES ${constraintPhrases[constraintPhrases.length-1]}`;
                        let referencedTableName = getFkTableReferenceName(`FOREIGN KEY (${userInstanceTable.rows[rowi].attribute}) REFERENCES ${constraintPhrases[constraintPhrases.length-1]}`);
                        row.references.push(referencedTableName);
                    }        
                }
        
                if (rowi == userInstanceTable.rows.length - 1 && appendLine != ""){
                    row.attributes.push(appendLine);
                }
                rowi++;
            }
        tableArray.push(row);
      
    
        });
    
        
        
        return {tableArray};    
    } 
    
    
       
    const getFkTableReferenceName = (attribute) => {
        let endIndex = attribute.split('(', 2).join('(').length;
    
        let counter = 0;
    
        let startIndex = endIndex-1;
        while (counter != 1){
            let character = attribute.charAt(startIndex);
        if (character == " "){
            break;
        }
        startIndex--;
        }
    
        let name = attribute.substring(startIndex+1, endIndex);
        return name;
    }

    //Array of create table syntax ... - extract table data and convert to sql table creation statements
    let sqlScriptAndFK = getScript(userInstance);
    
    
    

    let sql_script = [];

    // //Foreign keys are turned off by default for backwards compatibility with sqlite. This enables foreign keys if the user's db has one.
    for (let i = 0; i < sqlScriptAndFK.tableArray.length; i++){
        if (sqlScriptAndFK.tableArray[i].containsForeignKey){
            sql_script.splice(0, 0, "PRAGMA foreign_keys = ON");
            break;
        }
    }
    

    for (let i  = 0; i < sqlScriptAndFK.tableArray.length; i++){
        let script = `CREATE TABLE IF NOT EXISTS ${sqlScriptAndFK.tableArray[i].name} (`;
        for (let j = 0; j < sqlScriptAndFK.tableArray[i].attributes.length; j++){
            if (j == sqlScriptAndFK.tableArray[i].attributes.length-1){
                script += sqlScriptAndFK.tableArray[i].attributes[j];
            } else {
                script += `${sqlScriptAndFK.tableArray[i].attributes[j]}, `;
            }
        }
        script += `);`;
        sql_script.push(script);
    }
    res.send(sql_script)
}    

    // let query = {username: userInstance.username, databaseName: userInstance.databaseName, script: sql_script};
    // Service.sqlGeneratorService.saveUserDatabase(query).then(saveSuccess => {
    //     if (!saveSuccess){
    //         res.status(400).send();
    //     } else {
    //         res.status(200).send(sql_script);
    //     }
    // })



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
            res.status(202).send({result: 'used'});
        } else {
            res.status(200).send(creationSuccess);
        }
    }).catch();
}

const saveUserDatabase = async (req, res) => {

    let data = req.body;
    let query = {username: data.username, databaseName: data.databaseName, tables: data.tables};
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