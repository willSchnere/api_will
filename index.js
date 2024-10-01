const express = require('express')
const app = express();

app.use(express.json());

let personList = []

const port = 3000;

app.get('/visualizar',(req,res)=>{
    res.send(personList)
})

app.get('/params/:id',(req,res)=>{
    const {id} = req.params;
    res.send(id)
})

app.post('/cadastro',(req,res)=>{
    const {name , age}= req.body;
    personList.push({name,age})
    res.send(`Usuario identificado nome do usuario ${name}`)
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})
