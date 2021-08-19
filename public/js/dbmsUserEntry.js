import {getTableHTML, getTableListItemForSidebarHTML, getNewTableRow} from '../resources/HTML_Views.js'

var tableCount, currentFocus;

var tables = [];





const addTable = () => {
    if (typeof(tableCount) == 'undefined') {tableCount = 1};

    let sidebarNode = getTableListItemForSidebarHTML(tableCount);
    let newTableNode = getTableHTML(tableCount);
    tables.push(newTableNode);

    sidebarNode.onclick = () => {
        changeTableView(sidebarNode);
    }
    
    document.getElementById('table-tabs').appendChild(sidebarNode);

    tableCount++;
}

//-------------------------------------------------------------------------------------------------------------------


const changeTableView = (sidebarNode) => {

    let tableNumber = sidebarNode.id.substring(20);
    
    try{
        let currentViewTableNumber = document.getElementById('main').firstElementChild.id.substring(5);
        if (tableNumber == currentViewTableNumber){
            return null;
        }
    }catch{}
   
        
        
        //iterates through tables to find the element with id equal to the number at end of id for the sidebar nav link that was clicked.
        //click sidebar link with id equal to 'tableSidebarListItem2', loop selects table with id equal to 'table2'
        let tableToView;
        let i = 0;
        for (i; i < tables.length; i++){
            if (tables[i].id.substring(5) == tableNumber){
                tableToView = tables[i];
                tables.splice(i, 1);
            }
        }

        if (document.getElementById('main').firstElementChild == null){
            document.getElementById('main').appendChild(tableToView);
        }
        else {
            let oldTable = document.getElementById('main').firstElementChild;
            document.getElementById('main').removeChild(oldTable);
            document.getElementById('main').appendChild(tableToView);
            tables.push(oldTable);
        }
        
        currentFocus = tableToView;
    
    



}


   

const addAttribute = () => {
    let table = document.getElementById('main').childNodes[0];
    let newRow = getNewTableRow(table);

    table.appendChild(newRow);

}
    







const test = () => {
    
        console.log(currentFocus.id)


}
   







export {tableCount, currentFocus, addAttribute, addTable, test}

















{/* <tr>
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
</tr> */}