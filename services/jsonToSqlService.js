var userInstance;

const getScript = (user) => {

   
    //validate user
    if (user == null){return null;}
    else {
        userInstance = user;
    }

    let tableArray = [];
    userInstance.tables.forEach(userInstanceTable => {

        let tableName = userInstanceTable.tableName;
        let appendLine = "";
        let rowi = 0;
        let row = {name: tableName, attributes: [], containsForeignKey: false};
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
            } else {
                appendLine += `FOREIGN KEY (${userInstanceTable.rows[rowi].attribute}) REFERENCES ${constraintPhrases[constraintPhrases.length-1]}`;
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


const sort = (sqlObj) => {
    let orderedScriptArr = [];

    //tables without foreign keys are created first
    for (let i = 0; i < sqlObj.tableArray.length; i++){
        if (!sqlObj.tableArray[i].containsForeignKey){
          orderedScriptArr.push(sqlObj.tableArray[i]);
          sqlObj.tableArray.splice(i, 1);
        }
    }

    /*
        Some remaining table creation commands with FK will reference other entities with FK left in sqlObj.sql_entities.
        This will order those remaining table creation commands.

        WHAT COMES FIRST
        - FK that reference a table in the unordered list must be created after that other table.

        WHAT COMES LAST
        - Tables that reference other tables in the ordered list and not those in the unordered list.    
        
    */
      
}    

const getTableName = (createTableStatement) => {
    //CREATE TABLE IF NOT EXISTS ______
    let tableName = createTableStatement.split(" ").splice(0)[5];
    return tableName;
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
 
module.exports = {getScript, sort}