//importing
import express from 'express';

// app config

const app = express()
const port = process.env.PORT || 9000

app.get('/',(req,res)=>{
    res.status(200).send('hellow world')
})

app.listen(port,()=>console.log(`listening in localhost:${port}`))