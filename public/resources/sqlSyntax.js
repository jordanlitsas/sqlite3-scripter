const createTable = () => {
    let sql =   `CREATE TABLE IF NOT EXISTS ${tableName}(${rows})`;
    return sql;
}


module.exports = {createTable}