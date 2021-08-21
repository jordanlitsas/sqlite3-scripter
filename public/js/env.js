import {getDBMSView} from '../resources/HTML_Views.js'
import {tableCount, currentFocus, addTable, addAttribute, test, tables} from './dbmsUserEntry.js'

window.addEventListener('DOMContentLoaded', (event) => {
              
  document.querySelector("#createBtn").onclick = createDatabase;
  document.querySelector("#login").onclick = getDatabase;
  
});



//Global Variables
var userInstance = {
  username: null,
  database: {
      databaseName: null,
      tables: []
  }
};

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

const saveDatabaseStateToUserInstance = () => {
    
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

    userInstance.database.tables.push(table); //push completed table object into collection of tables
    currentTableNumber ++;
    currentRowNumber = 1; //if you forget to reset nested loop's counter again, and spend an hour scratching your head like an idiot, you should go back to working in kitchens.
    
  }

}


const saveDatabase = () => {
  saveDatabaseStateToUserInstance();
  console.log(userInstance)
    $.ajax({
      url: '/saveDatabase',
      contentType: 'application/json',
      data: JSON.stringify(userInstance), //changed args
      type: 'POST',
      success: function(result){
        if (result.result == 200){
          M.toast({html: `Table ${result.tableName} has been saved.`})
        }
      }
    })    
}

  
const  createDatabase = () => {

    // let username = $('#username').val();
    // let dbName = $('#database').val();

    // userInstance.user.name = username;
    // userInstance.user.database = dbName;
    
    // $.ajax({
    //   url: '/createDatabase',
    //   contentType: 'application/json',
    //   data: JSON.stringify(userInstance.user),
    //   type: 'POST',
    //   success: function(result){
    //     if (result.error == 'used'){
    //       M.toast({html: 'Name already taken.\nTry Again.'})
    //     }
    //     else { 
    //       M.toast({html: 'User and database created.'})
    //       userInstance.user = {
    //         name: result.newUser.name,
    //         database: result.newUser.database,
    //         collectionID: result.newUser._id
    //       }
          initialiseDatabaseView();


          
    //     }
    //   }
    // })
}
              
             
const getDatabase = () => {
    let username = $('#username').val();
    let dbName = $('#database').val();

    var user = {
      name: username, 
      database: dbName
    }


    $.ajax({
      async: false,
      url: '/getDatabase',
      contentType: 'application/json',
      data: JSON.stringify(user),
      type: 'POST',
      success: function(result){
        if (Object.keys(result).length === 1){
          console.log(result)
          userInstance.user = result.user;
          userInstance.user.database = result.tables;
          loadUserDatabase();
        }
        else {
          M.toast({html: 'That username and database combination does not exist.'})
        }
          
        }
        
      })
}

const loadUserDatabase = () => {
  console.log(userInstance);
}

const initialiseDatabaseView = () => {
  document.querySelector('body').innerHTML = getDBMSView();
  document.getElementById('new-table').addEventListener('click', addTable);
  document.getElementById('new-attribute').addEventListener('click', addAttribute);
  document.getElementById('save-database').addEventListener('click', saveDatabase);
  document.getElementById('test').addEventListener('click', test);
}


