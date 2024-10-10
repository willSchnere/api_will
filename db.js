const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'root',
    database: 'aula',
});

connection.connect(err =>{
    if(err){
        console.error('Erro ao conectar ao banco de dados',err)
        return;
    }
    console.log('Conectados ao banco dados');
});
module.exports = connection;