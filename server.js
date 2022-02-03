//importing
import express from 'express';
import  mongoose  from 'mongoose';
import Messages from './dbMessages.js'


// app config

const app = express()
const port = process.env.PORT || 9000;

app.use(express.json());

const connection_url = "mongodb+srv://admin:tDlSZ8ksrSJKNX8C@cluster0.efthy.mongodb.net/chathouse?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
   
    useNewUrlParser: true,
    useUnifiedTopology: true,

    
    
  }).catch(err => console.log(err));



app.get('/',(req,res)=>
    res.status(200).send()
);

app.post("/messages/new",(req,res)=>{
  const dbMessage = req.body

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err)
      console.log(err);

    } else {
      res.status(201).send(data)
    }
  })
})

app.listen(port,()=>console.log(`listening on localhost:${port}`))