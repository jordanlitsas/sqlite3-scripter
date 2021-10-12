import {userInstance, captureTables} from "./env.js"


function getFK(fTextNode){
    let fk = document.createElement('option');
    fk.value = 'fkReference';
    let textNode = document.createTextNode(fTextNode);
    fk.appendChild(textNode);
    return fk;
}


function getNewTableRow(table){
    let tableNumber = table.id.substring(5);
    let totalRowNumber;
    try {
        totalRowNumber = document.getElementById(table.id).childElementCount-1;
    }
    catch{
        totalRowNumber = 0;
    }


    let rowTR = document.createElement('tr');
    rowTR.id = `table${tableNumber}row${totalRowNumber}`;//totalRowNumber remains unchanged because we aren't going to count the header row as a part of the entity/table
    let dataTypeTD = document.createElement('td')
    let attributeTD = document.createElement('td');
    let constraintTD = document.createElement('td');

    let placeholderDataType = document.createElement('option');
    let placeholderConstraint = document.createElement('option');

    let dataTypeInput = document.createElement('select');
    
    let nullOpt = document.createElement('option');
    nullOpt.value = 'NULL';
    let nullOptTextNode = document.createTextNode('NULL');
    nullOpt.appendChild(nullOptTextNode);

    let integerOpt = document.createElement('option');
    integerOpt.value = 'INTEGER';
    let integerOptTextNode = document.createTextNode('INTEGER');
    integerOpt.appendChild(integerOptTextNode);

    let realOpt = document.createElement('option');
    realOpt.value = 'REAL';
    let realOptTextNode = document.createTextNode('REAL');
    realOpt.appendChild(realOptTextNode);

    let textOpt = document.createElement('option');
    textOpt.value = 'TEXT';
    let textOptTextNode = document.createTextNode('TEXT');
    textOpt.appendChild(textOptTextNode);

    let blobOpt = document.createElement('option');
    blobOpt.value = 'BLOB';
    let blobOptTextNode = document.createTextNode('BLOB');
    blobOpt.appendChild(blobOptTextNode);

    let dataTypeOptions = [placeholderDataType, nullOpt, integerOpt, realOpt, textOpt, blobOpt];

    //add data types to select
    let i = 0;
    for (i; i < dataTypeOptions.length; i++){
        dataTypeInput.appendChild(dataTypeOptions[i]);
    }



    let attributeInput = document.createElement('input');
    attributeInput.placeholder = 'attribute name';



    let constraintInput = document.createElement('select');
    constraintInput.id = `table${tableNumber}constraint${totalRowNumber}`;
    

    let notNullOpt = document.createElement('option');
    notNullOpt.value = 'NOT NULL';
    let notNullTextNode = document.createTextNode('NOT NULL');
    notNullOpt.appendChild(notNullTextNode);

    let uniqueOpt = document.createElement('option');
    uniqueOpt.value = 'UNIQUE';
    let uniqueTextNode = document.createTextNode('UNIQUE');
    uniqueOpt.appendChild(uniqueTextNode);

    let checkOpt = document.createElement('option');
    checkOpt.value = 'CHECK';
    let checkOptTextNode = document.createTextNode('CHECK');
    checkOpt.appendChild(checkOptTextNode);

    let pkOpt = document.createElement('option');
    pkOpt.value = 'PRIMARY KEY';
    let pkOptTextNode = document.createTextNode('PRIMARY KEY');
    pkOpt.appendChild(pkOptTextNode);


    let constraintOptions = [placeholderConstraint, notNullOpt, uniqueOpt, checkOpt, pkOpt];

    //add data types to select
    i = 0;
    for (i; i < constraintOptions.length; i++){
        constraintInput.appendChild(constraintOptions[i]);
    }

    let fkRadioLabel = document.createElement('label');

    let fkRadioLabelText = document.createElement('span');
    fkRadioLabelText.innerHTML = "foreign key";

    let fkCheckboxInput = document.createElement('input');
    fkCheckboxInput.type = "checkbox";
    fkCheckboxInput.classList += "with-gap";
    fkCheckboxInput.value = 'FOREIGN KEY';
    fkCheckboxInput.classList.add("modal-trigger");
    fkCheckboxInput.href = "#modal1";
   

    

    fkRadioLabel.appendChild(fkCheckboxInput);
    fkRadioLabel.appendChild(fkRadioLabelText);



    dataTypeTD.appendChild(dataTypeInput);
    attributeTD.appendChild(attributeInput);
    constraintTD.appendChild(constraintInput);
    constraintTD.appendChild(fkRadioLabel);

    rowTR.appendChild(dataTypeTD);
    rowTR.appendChild(attributeTD);
    rowTR.appendChild(constraintTD);

    constraintTD.classList += "row valign-wrapper";
    constraintInput.classList += "col s10";
    fkRadioLabel.classList += "col s2";

    dataTypeTD.classList += "valign-wrapper";    

    fkCheckboxInput.onclick = function(){
        let constraintSelect = fkCheckboxInput.parentElement.parentElement.firstElementChild;

        if (fkCheckboxInput.checked == true){
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems);
            instances[0].open();
            setModalEventListener(constraintSelect)

            capturePrimaryKeyAndTableName(fkCheckboxInput);
        }
        else {
            constraintSelect.removeChild(constraintSelect.childNodes[5]);
        }
    }
    return rowTR;
        
}

function setModalEventListener(constraintSelect){
    document.getElementById("fkModalSubmit").onclick = function(){

        let selectedReference = $("#table-and-pk-for-fk").val();

        let NumberForMaxSubstringForTableName = selectedReference.indexOf("(")
        let tableName = selectedReference.substring(0, NumberForMaxSubstringForTableName);

        let attributeStartIndex = selectedReference.indexOf("(")+1
        let attributeEndIndex = selectedReference.indexOf(")");
        let primaryKeyAttribute = selectedReference.substring(attributeStartIndex, attributeEndIndex)

        let fkOpt = document.createElement('option');
        let fkTextNode = document.createTextNode(`${constraintSelect.value} REFERENCES ${tableName}(${primaryKeyAttribute})`);

        fkOpt.appendChild(fkTextNode)
        constraintSelect.appendChild(fkOpt)
        constraintSelect.selectedIndex = 5;
    }
}


    
function capturePrimaryKeyAndTableName(){
    captureTables();
    let tables = userInstance.tables;

    let pkAndNames = [];

    tables.forEach(table => {
        table.rows.forEach(row => {
            if (row.constraint == "PRIMARY KEY"){
                if (row.attribute.length > 0){
                    let obj = {tableName: table.tableName, pk: row.attribute};
                    pkAndNames.push(obj);
                }
               
            }
        })
    })
    document.getElementById("table-and-pk-for-fk").innerHTML = '';
    pkAndNames.forEach(pkAndNameObj => {
        
        let opt = document.createElement('option');
        let optText = document.createTextNode(`${pkAndNameObj.tableName}(${pkAndNameObj.pk})`);
        opt.appendChild(optText);Ta

       
        document.getElementById("table-and-pk-for-fk").appendChild(opt)
    })

}

function getTableListItemForSidebarHTML(tableCount){
    let li = document.createElement('li');
    li.id = `tableSidebarListItem${tableCount}`;
    li.classList.add('dark-grey')
    // li.classList.add('table-name-input');

    let tableNameInput = document.createElement('input');
    tableNameInput.placeholder = `table ${tableCount}`;
    tableNameInput.id = `tableNameInput${tableCount}`;
    tableNameInput.classList.add('table-name-input');
    li.appendChild(tableNameInput);

   
    return li;



}




function getTableHTML(tableCount){
    let table = document.createElement('table');
    table.id = `table${tableCount}`;

    let tableHeaderRow = document.createElement('tr');

    let thDataType = document.createElement('th');
    let thAttribute = document.createElement('th');
    let thConstraint = document.createElement('th');


    let dataTypeTextNode = document.createTextNode('Data Type');
    let attributeTextNode = document.createTextNode('Attribute');
    let constraintTextNode = document.createTextNode('Constraint');
    
    thDataType.appendChild(dataTypeTextNode);
    thAttribute.appendChild(attributeTextNode);
    thConstraint.appendChild(constraintTextNode);


    tableHeaderRow.appendChild(thDataType);
    tableHeaderRow.appendChild(thAttribute);
    tableHeaderRow.appendChild(thConstraint);

    table.appendChild(tableHeaderRow);

    return table;



   
} 


function getDBMSView(){
    return `<nav class = "dark-grey" id = "top-nav">
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

                        <div id="fkModal" class="modal" styled = "display:none">
                            <div class="modal-content">
                                <h4>Identify Foreign Key Reference</h4>

                                <div class = "row">
                                    <div class = "col s12">
                                        <select id = "table-and-pk-for-fk" style = "width: 100%"></select>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="modal-footer">
                                <a  href = "#" id = "fkModalSubmit" class="modal-close waves-effect waves-green dark-grey btn-flat" style = "width:100%; text-align: center !important; color: white;">Submit</a>
                            </div>

                        </div>
                                <div class = "row">
                                    <div class = "col s1">
                                        <span id = "last-auto-save-time-stamp"></span>
                                    </div>
                                </div>
                                <div class = "row" >
                                        <div class = "col s1" id = "sidenav">
                                            <nav class = "dark-grey">
                                                <ul id = "table-tabs">     
                                                <li style = "font-size: 16px; text-align:center !important; width: 100%;">Tables</li>           
                                                </ul>
                
                                            </nav>
                                        
                                        </div>
                                    
                                    <div class = "col s11" id = "main"></div>
                                    
                                </div>
                                
                                <nav class = "dark-grey bottom-nav">
                                    <div  id = "bottom-control">
                                        <ul id = "table-tabs">
                                            <li id = "new-table"><a>new table</a></li>
                                            <li id = "new-attribute"><a>new attribute</a></li>
                                            <li id = "save-database"><a>save</a></li>
                                            <li id = "generate-sql-script"><a>generate SQL script</a></li>
                                            <li id = "auto-save"><a>toggle auto-save</a></li>
                                        </ul>
                                    </div>
                                </nav>
                
                            
                
                        </div>
                
                    </div>
                `;
}

export {getDBMSView, getTableHTML, getNewTableRow, getTableListItemForSidebarHTML, getFK}