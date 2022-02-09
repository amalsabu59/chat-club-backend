//importing
import express from 'express';
import  mongoose  from 'mongoose';
import Messages from './dbMessages.js'
import Pusher from 'pusher';
import cors from 'cors'





// app config

const app = express()
const port = process.env.PORT || 9000;

//const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1342139",
  key: "725a0d18aeab76a3b0c0",
  secret: "d3ca5b842a19e26828ad",
  cluster: "ap2",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});

app.use(express.json());
app.use(cors())

const connection_url = "mongodb+srv://admin:tDlSZ8ksrSJKNX8C@cluster0.efthy.mongodb.net/chathouse?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
   
    useNewUrlParser: true,
    useUnifiedTopology: true,

    
    
  }).catch(err => console.log(err));

const db = mongoose.connection;

db.once("open", ()=>{
  console.log("DB connected");

const msgCollection = db.collection("messagecontents")
const changeStream = msgCollection.watch()

changeStream.on("change",(change)=>{
  console.log("A change occured",change);

if (change.operationType === "insert"){
  const messageDetails = change.fullDocument;
  pusher.trigger("messages","inserted",{
    name: messageDetails.user,
    message: messageDetails.message,
    timestamp: messageDetails.timestamp,
    received: messageDetails.received
  })
}else {
  console.log("error in pusher");
}


})

})

app.get('/',(req,res)=>
    res.status(200).send()
);
app.get('/messages/sync',(req,res)=> {
  Messages.find((err,data) => {
    if (err) {
      res.status(500).send(err)
    }else {
      res.status(200).send(data)
    }
  })

})

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