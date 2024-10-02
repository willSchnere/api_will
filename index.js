const express = require('express')
const app = express();

app.use(express.json());

let personList = []

const port = 3000;

app.get('/visualizar',(req,res)=>{
    res.send(personList)
})
/*
app.get('/params/:id',(req,res)=>{
    const {id} = req.params;
    res.send(id)
})
*/

app.post('/cadastro',(req,res)=>{
    const {name,age,}= req.body;
    personList.push({name,age,})
    res.send(`Usuario identificado nome do usuario ${name}`)
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})

app.delete('/delete/:id',(req,res)=>{
    const {id} = req.params;
    const index = parseInt(id,1)
    personList.splice(index,1)
    res.send(`Usuario deletado `)
})

app.put('/update/:id',(req,res)=>{
    const {id} =req.params;
    const {name,age} = req.body
    const index =parseInt(id)

    res.send(id)

    if(index >=0 && index < personList.length){
        personList[index] = {name,age}
        res.send(`Usuário ${id} atualizar com sucesso`)
    }else{
        res.send('Usuário não encontrado')
    }
})