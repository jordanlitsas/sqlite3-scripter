let sqlSyntax = require("../resources/sqlSyntax")

var userInstance;
var script;


const getScript = (user) => {
    //ensure userInstance is not null
    if (!user){return null;}
    else {
        userInstance = user;
        script = "";
    }

    let tables = [];
    userInstance.tables.forEach(table => {
        table = createTable(table);
        tables.push(table)
    });
    
} 

const createTable = (table) => {
    let tablename = table.tableName;
    let tableSqlSyntax = sqlSyntax.createTable();

    console.log(tableSqlSyntax);
    

    
}

module.exports = {getScript}