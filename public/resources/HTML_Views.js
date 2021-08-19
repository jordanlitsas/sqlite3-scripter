function getNewTableRow(table){
    

    let tableNumber = table.id.substring(5);
    let totalRowNumber;
    if (document.getElementById(table.id).childNodes.length == null){
        totablRowNumber = 1;
    } 
    else {
        document.getElementById(table.id).childNodes.length; 
    }



    let rowTR = document.createElement('tr');
    rowTR.id = `table${tableNumber}row${totalRowNumber}`;//totalRowNumber remains unchanged because we aren't going to count the header row as a part of the entity/table
    let dataTypeTD = document.createElement('td')
    let attributeTD = document.createElement('td');
    let constraintTD = document.createElement('td');

    let placeholderDataType = document.createElement('option');
    placeholderDataType.text = 'select one';
    let placeholderConstraint = document.createElement('option');
    placeholderConstraint.text = 'select one';

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

    let fkOpt = document.createElement('option');
    fkOpt.value = 'FOREIGN KEY';
    let fkOptTextNode = document.createTextNode('FOREIGN KEY');
    fkOpt.appendChild(fkOptTextNode);

    let constraintOptions = [placeholderConstraint, notNullOpt, uniqueOpt, checkOpt, pkOpt, fkOpt];

    //add data types to select
    i = 0;
    for (i; i < constraintOptions.length; i++){
        constraintInput.appendChild(constraintOptions[i]);
    }


    dataTypeTD.appendChild(dataTypeInput);
    attributeTD.appendChild(attributeInput);
    constraintTD.appendChild(constraintInput);

    rowTR.appendChild(dataTypeTD);
    rowTR.appendChild(attributeTD);
    rowTR.appendChild(constraintTD);

    return rowTR;


        
}





function getTableListItemForSidebarHTML(tableCount){
    let li = document.createElement('li');
    li.id = `tableSidebarListItem${tableCount}`;

    let tableNameInput = document.createElement('input');
    tableNameInput.placeholder = `table ${tableCount}`;
    tableNameInput.id = `tableNameInput${tableCount}`;

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
                                            <li id = "save-database"><a>save</a></li>
                                            <li id = "test"><a>test</a></li>
                                        </ul>
                                    </div>
                                </nav>
                
                            
                
                        </div>
                
                    </div>
                `;
}

export {getDBMSView, getTableHTML, getNewTableRow, getTableListItemForSidebarHTML}