const mongoose = require('mongoose');

const query_schema = new mongoose.Schema({
    username : {
        type : String,
        default : "Anonmous"
    },
    domain : {
        type : String
    },
    curl_resposne : {
        type : String
    },
    response_to_client : {
        type : String
    }
})

const query = mongoose.model('query',query_schema);
module.exports = query;
