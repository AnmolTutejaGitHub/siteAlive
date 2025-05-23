require('dotenv').config();
const express = require("express");
const app = express();
require('../database/mongoose');
const cors = require('cors');
const Query = require("../database/Model/Query");


const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: `http://localhost:5173`,
    credentials: true
}));

app.use(express.json());

app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
})