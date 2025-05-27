require('dotenv').config();
const express = require("express");
const cors = require('cors');
const app = express();
require('../database/mongoose');
const Query = require("../database/Model/Query");
const axios = require("axios");
const isValidURL = require("../utils/isValidUrl");


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const PORT = process.env.PORT || 8080;

const d_servers = [
    'http://d1:9001',
    'http://d2:9002',
    'http://d3:9003',
]


app.use(express.json());

app.get("/check", async(req, res) => {
    const url = req.query.url;
    const valid = isValidURL(url);
    if(!valid.valid) return res.status(400).send({
        message : 'invalid url'
    })
    const d_servers_response = [];
    let up_count = 0;
    let down_count = 0;
    for(const server_url of d_servers){
        try{
        const resposne = await axios.get(`${server_url}/ping?url=${encodeURIComponent(url)}`);
        if(resposne.data.up){
            up_count++;
        }else down_count++;
        d_servers_response.push(resposne.data);
        }catch(err){
            d_servers_response.push({ up: false, statusCode : "invalid url",error : "url does not exist" });
            down_count++;
            console.log(err);
        }
    }

    const query = new Query({
        url : url,
        d_servers_response :  d_servers_response,
        d_servers_count : d_servers.length,
        url_reachable : up_count,
        url_notreahable : down_count,
        reachable : up_count > down_count ? true : false,
        domain : valid.domain
    })

    await query.save();
    console.log(query);

    return res.status(200).send({status : query});
  });

  app.get('/recentCheck', async (req, res) => {
    try {
      const queries = await Query.find().sort({ timestamp: -1 }).limit(10);            
      res.status(200).json(queries);
    } catch (error) {
      res.status(400).send({error : error});
    }
  });

  app.get("/query/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const query = await Query.findById(id);
        res.status(200).send(query);
    }catch(err){
        console.log(err);
        res.status(400).send({error : err});
    }
  })


app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
})