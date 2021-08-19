import {getDBMSView} from '../resources/HTML_Views.js'
import {tableCount, currentFocus, addTable, addAttribute, test} from './dbmsUserEntry.js'

window.addEventListener('DOMContentLoaded', (event) => {
              
  document.querySelector("#createBtn").onclick = createDatabase;
  document.querySelector("#login").onclick = getDatabase;
  
});



//Global Variables
var userInstance = {
  user: {name: null, database: null},
  database: null
}




const saveDatabase = () => {
    let dataType = $('#data-type').val();
    let attribute = $('#attribute').val();
    let constraint = $('#constraint').val();
    let tableName = $('#table1NameInput').val();
    

    
    let table = {
        'name': tableName,
        'datatype': dataType,
        'attribute': attribute,
        'constraint': constraint
    }
    
    $.ajax({
      url: '/saveDatabase',
      contentType: 'application/json',
      data: JSON.stringify([userInstance.user, table]),
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


