import {getDBMSView, getTableHTML, getTableListItemForSidebarHTML, getNewTableRow} from './HTML_Views.js'
import {updateDBManager, tableCount, currentFocus, addTable, addAttribute, tables, changeTableView} from './dbmsUserEntry.js';
window.addEventListener('DOMContentLoaded', (event) => {
              
  document.querySelector("#createBtn").onclick = createDatabase;
  document.querySelector("#login").onclick = getDatabase;
  
});



//Global Variables
var userInstance = {
  id: null,
  username: null,
  databaseName: null,
  tables: []
};

let autoSaveToggle = false;


const generateSqlScript = () => {
  captureTables();
  $.ajax({
    url: '/api/generate',
      contentType: 'application/json',
      data: JSON.stringify(userInstance), 
      type: 'POST',
      success: function(result){
        createTextFile(result)
        
      }
  })
}

const createTextFile = (result) => {
  // let scriptText = "";
  // result.forEach(line => {
  //   scriptText += line + " \n";
  // })
  //   var element = document.createElement('a');
  //   element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(scriptText));
  //   element.setAttribute('download', userInstance.databaseName);
  
  //   element.style.display = 'none';
  //   document.body.appendChild(element);
  
  //   element.click();
  
  //   document.body.removeChild(element);
  }
  
  
  



const deleteDatabase = () => {
  let data = {id: userInstance.id};
  $.ajax({
    async: true,
    url: '/api',
    contentType: 'application/json',
    data: JSON.stringify(data),
    type: 'DELETE',
    success: function(){
      location.reload();
    },
    error: function(result){
      console.log('deletion failure')

    } 
      
    })
}



  
const  createDatabase = () => {

    let name = $('#username').val();
    let dbName = $('#database').val();

   
    let user = {name: name, database: dbName};


 
    $.ajax({
      url: '/api',
      contentType: 'application/json',
      data: JSON.stringify(user),
      type: 'POST',
      success: function(result){
          if (result.result == "used"){
            M.toast({html: 'Name already taken.\nTry Again.'})
          } else {
            userInstance.id = result._id;
            userInstance.username = name;
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

    userInstance.username = name;
    userInstance.databaseName = dbName;

    console.log(user)
    
    $.ajax({
      async: false,
      url: '/api/login',
      contentType: 'application/json',
      data: JSON.stringify(user),
      type: 'POST',
      success: function(data, responseText, jqXHR){
        if (jqXHR.status == 204){
          M.toast({html: 'That username and database combination does not exist.'})
        } 
        
        else if (jqXHR.status == 200){
            if (captureUserInstance(data)){
              loadUserInstance();
            }
        }
        
        },
      error: function(){

      } 
        
      })

}

const saveDatabase = () => {
  captureTables();

    $.ajax({
      url: '/api',
      contentType: 'application/json',
      data: JSON.stringify(userInstance), 
      type: 'PATCH',
      success: function(result){
        M.toast({html: 'Your database has been saved.'})
      }, 
      error: function(result){
          M.toast({html: `Database save has failed.`})
      }
    })    
}


//Set user's instance to global variables. Returns false if any values don't exist.
const captureUserInstance = (returnedUserInstance) => {

  try {
    userInstance.id = returnedUserInstance._id;
    userInstance.username = returnedUserInstance.username;
    userInstance.databaseName = returnedUserInstance.databaseName;
    userInstance.tables = returnedUserInstance.tables;
    return true;
  }
  catch {
    return false;
  }
  
}


const loadUserInstance = () => {
 let tableHTML = convertTableJsonToHtml();
 updateDBManager(tableHTML)
  initialiseDatabaseView(); //set event handlers and html for view of database manager
  try {  
    document.getElementById('main').appendChild(tables[0]);
  }
  catch {}
  LoadTableNames(); //table names from json --> sidebar navigation items with <input> value for table name pre-defined.

}
 

const convertTableJsonToHtml = () => {
  
  let htmlTables = [];
  let tableCounter = 0;
  
  for (tableCounter; tableCounter < userInstance.tables.length; tableCounter++){
    let tableHtml = getTableHTML(tableCounter);
    let rowCounter = 0;
    for (rowCounter; rowCounter < userInstance.tables[tableCounter].rows.length; rowCounter++){
      let tableRowHtml = getNewTableRow(tableHtml);
    
      tableRowHtml.childNodes[1].firstElementChild.value = userInstance.tables[tableCounter].rows[rowCounter].dataType; 
      tableRowHtml.childNodes[2].firstElementChild.value = userInstance.tables[tableCounter].rows[rowCounter].attribute;
      tableRowHtml.childNodes[3].firstElementChild.firstElementChild.value = userInstance.tables[tableCounter].rows[rowCounter].constraint;

      


      if (typeof(userInstance.tables[tableCounter].rows[rowCounter].constraint) != "undefined"){
        // if constraint contains references, handle accordingly...
        if (userInstance.tables[tableCounter].rows[rowCounter].constraint.includes("REFERENCES")){
          let fk = document.createElement('option');
          fk.value = 'FOREIGN KEY';
          let fkOptTextNode = document.createTextNode(`${userInstance.tables[tableCounter].rows[rowCounter].constraint}`);
          fk.appendChild(fkOptTextNode)
          tableRowHtml.childNodes[3].firstElementChild.firstElementChild.appendChild(fk);

        
          //selected index if theres a foreign key is that option that holds both constraint and fk
          tableRowHtml.childNodes[3].firstElementChild.firstElementChild.selectedIndex =  tableRowHtml.childNodes[3].firstElementChild.firstElementChild.options.length-1;

          //set foregin key checkbox to ticked
          tableRowHtml.childNodes[3].firstElementChild.childNodes[1].firstElementChild.checked = true;
        }
      }
     
      
      tableHtml.appendChild(tableRowHtml);

    }    

    htmlTables.push(tableHtml);

  }
  
  return htmlTables;
}


const LoadTableNames = () => {
  let tableCount = 0;
  let numberOfTables = userInstance.tables.length;

  while (tableCount < numberOfTables){
    let li = getTableListItemForSidebarHTML(tableCount);
    li.firstElementChild.value = userInstance.tables[tableCount].tableName;

    document.getElementById('table-tabs').appendChild(li);
    li.onclick = () => {
      changeTableView(li);
  }
    tableCount++;

  }
}



const captureTables = () => {

  let tablesToConvert = tables.slice(0);
  userInstance.tables = new Array();
  let currentRowNumber = 1;
  let currentTableNumber = 0;

  let currentViewedTable = document.getElementById('main').firstElementChild;

  if (currentViewedTable != null){
    tablesToConvert.push(currentViewedTable);
  }

  //loop over each table
  while (currentTableNumber < tableCount){

    let table = getTableObj(); //base table json
    let tableNumber = tablesToConvert[currentTableNumber].id;
    tableNumber = tableNumber.substring(5)
    table.tableName = document.getElementById(`tableNameInput${tableNumber}`).value;
    // table.tableName = document.getElementById(`tableNameInput${currentTableNumber}`).value; //get name from sidebar inputs
    let rowCount = tablesToConvert[currentTableNumber].childNodes.length; //length = table rows = attributes to loop over 

   
    
    while (currentRowNumber < rowCount){
   
      // let row = getRowObj(); //base row json
      let row = {};
      let rowElement = tablesToConvert[currentTableNumber].childNodes[currentRowNumber]; //capturing each row element
      
      //capture each table data input's value, assign it to the row object
      row.dataType = rowElement.childNodes[1].firstElementChild.value
      row.attribute = rowElement.childNodes[2].firstElementChild.value

      //Constraint Option element value for FK is 'foreign key', and not the actual foreign key value.
      //This takes the Option index text value
      row.constraint = rowElement.childNodes[3].firstElementChild.firstElementChild;
      row.constraint = row.constraint.options[row.constraint.selectedIndex].text
      
      table.rows.push(row); //push unique row object into table object
      currentRowNumber++; 
    }

    userInstance.tables.push(table);
    currentTableNumber++;
    currentRowNumber = 1; //if you forget to reset nested loop's counter again, and spend an hour scratching your head like an idiot, you should go back to working in kitchens.    
  }
}





const getTableObj = () =>{
  return {
    tableName: null,
     rows: []
    };
}





var socket = io();
let autoSaveTimer;

socket.on('welcome', (message) => {
  console.log(message)
})

const autoSave = () => {
  let message = {};
  
  if (!autoSaveToggle){
    M.toast({html: `Autosave has been turned on.`})

    autoSaveToggle = true;

    message.toggle = autoSaveToggle;

   
    autoSaveTimer = setInterval(() => {
      captureTables();
      message.state = userInstance;
      socket.emit('autoSave', message);
    
    }, 3000);

  } else {
    M.toast({html: `Autosave has been turned off`})

    autoSaveToggle = false;
    message.toggle = autoSaveToggle;
    clearInterval(autoSaveTimer);
    socket.emit('autoSave', message)
  }



  
}



const initialiseDatabaseView = () => {
  document.querySelector('body').innerHTML = getDBMSView();
  document.getElementById('new-table').addEventListener('click', addTable);
  document.getElementById('new-attribute').addEventListener('click', addAttribute);
  document.getElementById('save-database').addEventListener('click', saveDatabase);
  document.getElementById('generate-sql-script').addEventListener('click', generateSqlScript);
  document.getElementById('auto-save').addEventListener('click', autoSave);
  document.getElementById('delete-database').addEventListener('click', deleteDatabase);
}








export {userInstance, captureTables}