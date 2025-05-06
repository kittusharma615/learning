const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const {URLNotFound} = require('./middleware/notFound')
const route = require('./routes/route')

dotenv.config()
const app = express();
app.use(express.json());

const port = 8080 || process.env.PORT;

mongoose.connect(process.env.DB)
.then(()=>{console.log('MongoDB Connected')})
.catch((e)=>{console.log(e)})

app.use('/',route)
app.use(URLNotFound) 

app.listen(port,()=>{console.log(`Server is Running ${port}`)})