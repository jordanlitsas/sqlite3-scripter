let sqlSyntax = require("../resources/sqlSyntax");
// const  tables  = require("./dbmsUserEntry");

var userInstance;



const getScript = (user) => {
    //ensure userInstance is not null
    if (user == null){return null;}
    else {
        userInstance = user;
    }


    //table names
    let sql_tables = [];
    userInstance.tables.forEach(userInstanceTable => {
        let sql_createTable = createTable(userInstanceTable);
        sql_tables.push(sql_createTable)
    });

    //rows
    let sql_rows = [];
   

    userInstance.tables.forEach(table => {
        let rows = new Array();

        table.rows.forEach(row => {
        let dataType, attribute, constraint;
        dataType = row.dataType;
        attribute = row.attribute;
        constraint = row.constraint;

        row = [dataType, attribute, constraint];
        rows.push(row);
        })
        
        sql_rows.push(rows);
    })


    convertArrayToSqlSyntax(sql_tables, sql_rows);

    let result = {"tables": sql_tables, "rows": sql_rows}

    return result;
    

    
    
} 


const convertArrayToSqlSyntax = (sql_tables, sql_rows) => {
    let script = "";
    sql_tables.forEach(table => {
        script += table;
     
    })
}

const createTable = (table) => {
    let tableName = table.tableName;
    let sql_createTable = sqlSyntax.createTable();
    sql_createTable = sql_createTable + " " + tableName;
    return sql_createTable;

    
}

module.exports = {getScript}