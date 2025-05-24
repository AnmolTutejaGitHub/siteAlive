require('dotenv').config();
const express = require("express");
const app = express();
require('../database/mongoose');
const cors = require('cors');
const Query = require("../database/Model/Query");
const axios = require("axios");
const isValidURL = require(".utils/isValidUrl");


const PORT = process.env.PORT || 8080;

const d_servers = [
    'http://localhost:9191'
]

app.use(cors({
    origin: `http://localhost:5173`,
    credentials: true
}));

app.use(express.json());

app.get("/check/:url", async(req, res) => {
    const url = req.params.url;
    const valid = isValidURL(url);
    if(!valid) return res.status(400).send({
        message : 'invalid url'
    })
    const d_servers_response = [];
    let up_count = 0;
    for(const server_url in d_servers){
        const resposne = await axios.get(`${server_url}/ping/${url}`);
        if(resposne.data.up){
            up_count++;
        }else up_count--;
        d_servers_response.push(resposne.data);
    }

    const query = new Query({
        url : url,
        d_servers_response :  d_servers_response,
        d_servers_count : d_servers.length,
        url_reachable : up_count
    })

    await query.save();

    return res.status(200).send({status : query});
  });

app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
})