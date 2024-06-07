require('dotenv').config();
const express = require('express');
const cors = require("cors");

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));



app.listen(port,()=>{
    console.log('Tu app esta lista por http://localhost:' + port);
});