var tableCount, currentFocus;
var currentUser = {
    name,
    database
}





const generate = () => {
let dataType = $('#data-type').val();
let attribute = $('#attribute').val();
let constraint = $('#constraint').val();
let tableName = $('table0NameInput').val();


let table = {
    'name': tableName,
    'datatype': dataType,
    'attribute': attribute,
    'constraint': constraint
}

$.ajax({
  url: '/saveDatabase',
  contentType: 'application/json',
  data: JSON.stringify([currentUser, table]),
  type: 'POST',
  success: function(result){
   
  }
}) 


}
  

addAttribute = () => {
let focus = currentFocus;
alert(focus)
console.log(currentUser)

}

     


addTable = () => {
    if (typeof(tableCount) == 'undefined'){ tableCount = 1;}

    let li = document.createElement("li");
    li.classList.add('table-name-input')
    li.classList.add('blue-grey')
    li.id = `table${tableCount}Tab`;
    let a =  document.createElement("a");

   

    let tableNameInput = document.createElement('input');
    tableNameInput.classList.add('table-name-input');
    tableNameInput.placeholder = `table${tableCount}`;
    tableNameInput.id = `table${tableCount}NameInput`;

    a.appendChild(tableNameInput);
    li.appendChild(a);

    document.querySelector("ul#table-tabs").appendChild(li);
    tableCount++;

    li.addEventListener("click", loadTableView(li.id));
    


    li.addEventListener("click", function(){
        currentFocus = li;
    });



}

loadTableView = (id) => {
    let tableNumber = id.substring(1, 5);
    let main = document.querySelector("#main");
    main.innerHTML = `
                        <table>
                        
                            <thead>
                                <th>Data Type</th>
                                <th>Attribute</th>
                                <th>Constraint</th>
                            </thead>

                            <tr>
                                <td>
                                    <div class="input-field col s12">
                                        <select id = "data-type">
                                            <option value="" disabled selected>Data Type</option>
                                            <option value="1">Option 1</option>
                                            <option value="2">Option 2</option>
                                            <option value="3">Option 3</option>
                                        </select>
                                    </div>

                                </td>
                                <td>
                                    <input type = "text" class = "validate" id = "attribute">
                                </td>
                                <td>
                                    <div class="input-field col s12">
                                        <select id = "constraint">
                                            <option value="" disabled selected>Constraint</option>
                                            <option value="1">Option 1</option>
                                            <option value="2">Option 2</option>
                                            <option value="3">Option 3</option>
                                        </select>
                                    </div>

                                </td>
                            </tr>
                            
                        </table`;
}











// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------











window.addEventListener('DOMContentLoaded', (event) => {
              
  document.querySelector("#createBtn").onclick = createDatabase;
  document.querySelector("#login").onclick = getDatabase;
});


  createDatabase = () => {

      let username = $('#username').val();
      let dbName = $('#database').val();

      let user = {
        name: username,
        database: dbName
      }
      
      $.ajax({
        url: '/createDatabase',
        contentType: 'application/json',
        data: JSON.stringify(user),
        type: 'POST',
        success: function(result){
          if (result.result == 'takenName'){
            M.toast({html: 'Name already taken.\nTry Again.'})
          }
          else { 
            M.toast({html: 'User and database created.'})
            user = {
              name: result.newUser.name,
              database: result.newUser.database,
              collectionID: result.newUser._id
            }
            document.querySelector('body').innerHTML = getBaseDBMS_HTML();
            currentUser = user;
            document.getElementById("new-table").addEventListener("click", addTable)
            document.getElementById("new-attribute").addEventListener("click", addAttribute) 
            document.getElementById("generate").addEventListener("click", generate) 
          }
        }
      })
  }
            
           


  getDatabase = () => {
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
          if (result['error'] == 'both'){
            M.toast({html: `This combination doesn't exist.`})
          }
          else if (result.error == 'db'){
            M.toast({html: `Your database name is not associated with this user.`})
          }
          else {
            console.log(result);
            // currentUser.name = result.name;
            // currentUser.database = result.user[0].database;
            // currentUser.id = result.user[0]._id;
            // document.querySelector('body').innerHTML = restoreDBMS_HTML();
            }
          }
          
        })
  }

  const getBaseDBMS_HTML = () => {
    return `<nav class = "blue-grey" id = "top-nav">
  <div class = "top-nav">
      <ul>
          <li><a href = "./index.html">Home</a></li>
          <li><a href = "#">About</a></li>
          <li><a href = "/dbmsUserEntry.html">Contact</a></li> 
      </ul>
  </div>
</nav>

  <div class = "container-fluid">

      <div id = "board">
        

              <div class = "row" >
                      <div class = "col s1" id = "sidenav">
                          <nav class = "blue-grey">
                              <ul id = "table-tabs">
                                  <li  href = "#"><a>ERD</a></li>

                              </ul>

                          </nav>
                      
                      </div>
                  
                  <div class = "col s11" id = "main"></div>
                  
              </div>
              
              <nav class = "blue-grey bottom-nav">
                  <div  id = "bottom-control">
                      <ul id = "table-tabs">
                          <li id = "new-table"><a>new table</a></li>
                          <li id = "new-attribute"><a>new attribute</a></li>
                          <li id = "generate"><a>generate</a></li>
                      </ul>
                  </div>
              </nav>

          

      </div>

  </div>
`;
  }
  