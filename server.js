//importing
import express from 'express';
import  mongoose  from 'mongoose';

// app config

const app = express()
const port = process.env.PORT || 9000;

const connection_url = "mongodb+srv://admin:tDlSZ8ksrSJKNX8C@cluster0.efthy.mongodb.net/chathouse?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
    useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true,
    serverSelectionTimeoutMS: 5000
  }).catch(err => console.log(err.reason));

app.get('/',(req,res)=>
    res.status(200).send('hellow world')
);

app.listen(port,()=>console.log(`listening on localhost:${port}`))