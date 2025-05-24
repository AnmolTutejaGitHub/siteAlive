require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const { exec } = require('child_process');

const PORT = process.env.PORT || 9000;

app.use(cors({
    origin: `http://main-server:8080`,
    credentials: true
}));

app.use(express.json());

app.get("/ping",async(req,res)=>{
    const url = req.query.url;
    exec(`curl -A "Mozilla/5.0" -s -o /dev/null -w "%{http_code}" ${url}`, (error, stdout, stderr) => {
        if (error) {
          return res.status(400).send({ up: false, error: error.message });
        }
      
        const statusCode = parseInt(stdout, 10);
      
        if (statusCode >= 200 && statusCode < 400) {
          return res.status(200).send({ up: true ,statusCode});
        } else {
          return res.status(200).send({ up: false, statusCode });
        }
      });
})

app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
})