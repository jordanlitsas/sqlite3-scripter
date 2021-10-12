const mongoose = require('mongoose');
const { Schema } = mongoose;


const databaseSchema = new mongoose.Schema( {
    
    username: String,
    databaseName: String,
    script: Schema.Types.Mixed,
    tables: [{
        tableName: String,
        rows: [{
            dataType: String,
            attribute: String,
            constraint: String
        }]
    }]
});


module.exports = {databaseSchema}