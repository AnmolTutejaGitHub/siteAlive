const mongoose = require('mongoose');

const query_schema = new mongoose.Schema({
    username : {
        type : String,
        default : "Anonymous"
    },
    url : {
        type : String
    },
    d_servers_response : {
        type: [Object],
    },
    d_servers_count : {
        type : Number,
        default : 0
    },
    url_reachable : {
        type : Number,
        default : 0
    }
})

const query = mongoose.model('query',query_schema);
module.exports = query;
