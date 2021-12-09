const express=require('express')
const cors=require('cors');
const fs=require('fs');
require('dotenv').config();
// import connectToMongo from './db';
const connectToMongo=require('./db.js');
const app=express();

// database connection
connectToMongo();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// autoload routes
fs.readdirSync("./routes").map((r)=>app.use("/api",require(`./routes/${r}`)));

const port=process.env.PORT || 8000;

app.listen(port,()=>console.log(`Server running on port ${port}`));
