import {getDBMSView, getTableHTML, getTableListItemForSidebarHTML} from '../resources/HTML_Views.js'
import {tableCount, currentFocus, addTable, addAttribute, test, tables} from './dbmsUserEntry.js'

window.addEventListener('DOMContentLoaded', (event) => {
              
  document.querySelector("#createBtn").onclick = createDatabase;
  document.querySelector("#login").onclick = getDatabase;
  
});



//Global Variables
var userInstance = {
  username: null,
  databaseName: null,
  tables: []
};

const loadUserInstance = () => {
  console.log(userInstance)
  initialiseDatabaseView(); //set event handlers and html for view of database manager
  let numberOfTables = userInstance.tables.length;
  captureTableNames(numberOfTables); //table names from json --> sidebar navigation items with <input> value for table name pre-defined.
  // captureTableObjects(numberOfTables);
}


const captureTableObjects = (numberOfTables) => {
  let i = 0;
  let tables = [];

  while (i < numberOftables){
    let tableHTML = getTableHTML();

  }
}


const captureTableNames = (numberOfTables) => {
  let tableNumber = 0;


  while (tableNumber < numberOfTables){
    let li = getTableListItemForSidebarHTML(tableNumber);
    li.firstElementChild.value = userInstance.tables[tableNumber].tableName;

    document.getElementById('table-tabs').appendChild(li);
    tableNumber++;

  }
}




const captureTables = () => {
  
  let currentRowNumber = 1;
  let currentTableNumber = 0;

 let tablesToConvert = tables.slice(0);

 let currentViewedTable = document.getElementById('main').firstElementChild;
  if (currentViewedTable != null){
    tablesToConvert.push(currentViewedTable);
  }
  
  //loop over each table
  while (currentTableNumber < tableCount){

    let table = getTableObj(); //base table json
    table.tableName = document.getElementById(`tableNameInput${currentTableNumber}`).value; //get name from sidebar inputs
    let rowCount = tablesToConvert[currentTableNumber].childNodes.length; //length = table rows = attributes to loop over (-1 because it includes labels)

    //loop over each row of each table, skipping the first as this is the table header
    while (currentRowNumber < rowCount){

      let row = getRowObj(); //base row json
      let rowElement = tablesToConvert[currentTableNumber].childNodes[currentRowNumber]; //capturingg each row element
  
      //capture each table data input's value, assign it to the row object
      row.dataType = rowElement.childNodes[0].firstElementChild.value
      row.attribute = rowElement.childNodes[1].firstElementChild.value
      row.constraint = rowElement.childNodes[2].firstElementChild.value
      
      table.rows.push(row); //push unique row object into table object
      currentRowNumber++; 
    }

    userInstance.tables.push(table); //push completed table object into collection of tables
    currentTableNumber ++;
    currentRowNumber = 1; //if you forget to reset nested loop's counter again, and spend an hour scratching your head like an idiot, you should go back to working in kitchens.
    
  }

}


const generateSqlScript = () => {
  captureTables();
  $.ajax({
    url: '/generateSqlScript',
      contentType: 'application/json',
      data: JSON.stringify(userInstance), 
      type: 'POST',
      success: function(result){
        console.log(result);
      }
  })
}


const saveDatabase = () => {
  captureTables();
  // console.log(userInstance)
    $.ajax({
      url: '/saveDatabase',
      contentType: 'application/json',
      data: JSON.stringify(userInstance), 
      type: 'POST',
      success: function(result){
        if (result.code == 400){
          M.toast({html: `Database save has failed.`})
        }
        else if (result.code == 200){
          M.toast({html: 'Your database has been saved.'})
        }
      }
    })    
}

  
const  createDatabase = () => {

    let name = $('#username').val();
    let dbName = $('#database').val();

   
    let user = {name: name, database: dbName};
    
    $.ajax({
      url: '/createDatabase',
      contentType: 'application/json',
      data: JSON.stringify(user),
      type: 'POST',
      success: function(result){
        if (result.error == 'used'){
          M.toast({html: 'Name already taken.\nTry Again.'})
        }
        else { 
          M.toast({html: 'User and database created.'})
          userInstance.username= name;
          userInstance.databaseName = dbName;
          initialiseDatabaseView();


          
        }
      }
    })
}
              
             
const getDatabase = () => {
    let name = $('#username').val();
    let dbName = $('#database').val();

    var user = {
      username: name, 
      databaseName: dbName
    }


    $.ajax({
      async: false,
      url: '/getDatabase',
      contentType: 'application/json',
      data: JSON.stringify(user),
      type: 'POST',
      success: function(result){
        if (Object.keys(result).length === 1){
          let returnedUserInstance = result.doc[0];

          if (captureUserInstance(returnedUserInstance)){
            loadUserInstance();
          }
        }
        else {
          M.toast({html: 'That username and database combination does not exist.'})
        }
          
        }
        
      })
}



//ToDo: clean mongoDB autogenerated document id from rows.
const captureUserInstance = (returnedUserInstance) => {

  try {
    userInstance.username = returnedUserInstance.username;
    userInstance.databaseName = returnedUserInstance.databaseName;
    userInstance.tables = returnedUserInstance.tables;
    return true;
  }
  catch {
    return false;
  }
  
}
const getTableObj = () =>{
  return {
    tableName: null,
     rows: []
    };
}

const getRowObj = () => {
  return {
    dataType: null,
    attribute: null,
    constraint: null
  };
}
const initialiseDatabaseView = () => {
  document.querySelector('body').innerHTML = getDBMSView();
  document.getElementById('new-table').addEventListener('click', addTable);
  document.getElementById('new-attribute').addEventListener('click', addAttribute);
  document.getElementById('save-database').addEventListener('click', saveDatabase);
  document.getElementById('generate-sql-script').addEventListener('click', generateSqlScript);
}


