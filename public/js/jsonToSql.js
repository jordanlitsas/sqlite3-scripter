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
    let sql_entities = [];
    userInstance.tables.forEach(userInstanceTable => {

        let name = userInstanceTable.tableName;
        let script = "CREATE TABLE IF NOT EXISTS " + name;
        let attributes = "";


        let rowCounter = 0;
        
        //for each row
        while (rowCounter < userInstanceTable.rows.length){

            if (constraint.includes("FOREIGN KEY")){
                attributes += `FOREIGN KEY ${userInstancetable.rows[rowCounter].attribute} REFERENCES `
                sql_entities.push(constraint)

            }
            //at minimum, datatype and attribute name are required -> add to attributes string
            attributes += `${userInstanceTable.rows[rowCounter].dataType} ${userInstanceTable.rows[rowCounter].attribute}`;
           
            let constraint = userInstanceTable.rows[rowCounter].constraint;

            //If there is a constraint
           if (constraint != ""){


            //if it's the last row, end the loop after adding constraint
            if (rowCounter == userInstanceTable.rows.length-1){
                attributes += ` ${constraint}`
                break;
            }
                //if it's not the last row, add a comma after attribute
                attributes += ` ${constraint}, `;

           rowCounter++;
        }}

        
        if (attributes != ""){
            script = script + "(" + attributes + ");";
        }

        
        sql_entities.push(script);
    });

   
 

    return sql_entities;    
} 



module.exports = {getScript}