// let sqlSyntax = require("../public/resources/sqlSyntax");
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
        let foreignKeys = "";
        let appendLine = "";
        let rowCounter = 0;
        
        //for each row
        while (rowCounter < userInstanceTable.rows.length){

        //Handles unique foreign key syntax requirements
        //Later versions should have unique syntax organised seperately
        let constraint = userInstanceTable.rows[rowCounter].constraint;
           
           

        if (constraint.includes("REFERENCES")){
            let constraintPhrases = constraint.split(" ").splice(0);
            if (appendLine != ""){
                appendLine += ` ,FOREIGN KEY (${userInstanceTable.rows[rowCounter].attribute}) REFERENCES ${constraintPhrases[constraingPhrases.length-1]}`;
            } else {
                appendLine += `FOREIGN KEY (${userInstanceTable.rows[rowCounter].attribute}) REFERENCES ${constraintPhrases[constraintPhrases.length-1]}`;

            }
            attributes += `${userInstanceTable.rows[rowCounter].dataType} ${userInstanceTable.rows[rowCounter].attribute}, `
            
            // if (constraintPhrases[0] != "REFERENCES"){
            //     console.log(constraintPhrases)
            //     if (constraintPhrases[0] == "NOT"){
            //         attributes += ` ${userInstanceTable.rows[rowCounter].dataType} ${userInstanceTable.rows[rowCounter].attribute} ${constraintPhrases[0]} ${constraintPhrases[1]}, `;
            //         foreignKeys += `FOREIGN KEY (${userInstanceTable.rows[rowCounter].attribute}) REFERENCES ${constraintPhrases[3]}, `
            //     } else {
            //         attributes += ` ${userInstanceTable.rows[rowCounter].dataType} ${userInstanceTable.rows[rowCounter].attribute} ${constraintPhrases[0]}, `;
            //         foreignKeys += `FOREIGN KEY (${userInstanceTable.rows[rowCounter].attribute}) REFERENCES ${constraintPhrases[2]}`
            //     }
                
            // } else {
                
            //     attributes += ` ${userInstanceTable.rows[rowCounter].dataType} ${userInstanceTable.rows[rowCounter].attribute}, `;
            //     foreignKeys += `FOREIGN KEY (${userInstanceTable.rows[rowCounter].attribute}) REFERENCES ${constraintPhrases[1]}, )`


            // }
        } else{
            //at minimum, datatype and attribute name are required -> add to attributes string
            attributes += userInstanceTable.rows[rowCounter].dataType + " " + userInstanceTable.rows[rowCounter].attribute + " " + constraint;
            if (rowCounter != userInstanceTable.rows.length-1){
                attributes += ","
            }
        }

        
        rowCounter++;

    }

        
        // if (attributes != ""){
            if (appendLine != ""){
                attributes += ", " + appendLine;
            } 
            script = script + " ( " + attributes + " );";
        // }

        
        sql_entities.push(script);
    });

   
 

    return sql_entities;    
} 


const sort = (sql_script) => {
    let sql_scriptArr = sql_script;
    let sql_orderedScriptArr = [];
    let counter = 0;

    //tables without foreign keys are created first
    for (counter; counter < sql_scriptArr.length; counter++){
        if (!(sql_scriptArr[counter].includes("REFERENCES"))){
            console.log("FOREIGN KEY TABLE")
          sql_orderedScriptArr.push(sql_scriptArr[counter]);
          sql_scriptArr[counter] = null;
        }
    }

 

    //clean the array
    sql_scriptArr = sql_scriptArr.filter(function (el){
        return el != null;
    })

    //With the remaining tables that have foreign keys, those that do not reference the other tables that are left should come first.
    //i.e., a refereces b | b references C, order is: c -> b -> a
    counter = 0;
    for(counter; counter < sql_scriptArr.length; counter++){
        let createTableCommandBrokenIntoArray = sql_scriptArr[counter].split(" ").splice(0);
        let fkCounter = 0;
        createTableCommandBrokenIntoArray.forEach(word => {
            if (word == "REFERENCES"){
                fkCounter++;
            }
        })
    }


    let resp = [sql_scriptArr, sql_orderedScriptArr];
    return resp;
}    
   
 
module.exports = {getScript, sort}