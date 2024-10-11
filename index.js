const express = require('express');
const db = require('./db');
const app = express();
app.use(express.json());
const port = 3000;

let veiculos = [];

// CREATE TABLE veiculos (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     marca VARCHAR(50) NOT NULL,
//     modelo VARCHAR(50) NOT NULL,
//     ano INT NOT NULL,
//     cor VARCHAR(30),
//     preco DECIMAL(10, 2) NOT NULL
// );

// novo veículo
app.post('/inserir', (req, res) => {
    const { marca, modelo, ano, cor, proprietario } = req.body;
    // memória volátil(apenas na memória) => veiculos.push({ id, marca, modelo, ano, cor, proprietario });
    db.query(
        `INSERT INTO veiculos (marca, modelo, ano, cor, proprietario) VALUES (?, ?, ?, ?, ?)`,
        [marca, modelo, Number(ano), cor, proprietario],
        function (err, results, fields) {
          if (err) {
            console.error('Erro na inserção:', err);
            return;
          }
          console.log(results);
          console.log(fields);
        }
      );
    res.send(`Veículo inserido!\n\nMarca: ${marca} \nModelo: ${modelo} \nAno: ${ano} \nCor: ${cor} \nProprietário: ${proprietario}`);
});

// selecionar todos os veículos
app.get('/veiculos', (req, res) => {
    db.query(
      `SELECT * FROM veiculos`,
      function (err, results, fields) {
        if (err) {
          console.error('Erro na consulta:', err);
          return res.status(500).json({ error: 'Erro ao consultar veículos' });
        }
        // Retorna os resultados como um objeto JSON
        return res.json(results);
      }
    );
  });

// atualizar por ID
app.put('/atualizar/:id', (req, res) => {
    const { id } = req.params;
    const { marca, modelo, ano, cor, proprietario } = req.body;

    db.query(
        `UPDATE veiculos SET marca = ?, modelo = ?, ano = ?, cor = ?, proprietario = ? WHERE id = ?`,
        [marca, modelo, Number(ano), cor, proprietario, id],
        function(err, results, fields) {
            if (err) {
                console.error('Erro na consulta:', err);
                return res.status(500).json({ error: 'Erro ao consultar veículos' });
            }

            res.send(`Veículo atualizado!\n${id}\nMarca: ${marca} \nModelo: ${modelo} \nAno: ${ano} \nCor: ${cor} \nProprietário: ${proprietario}`)
        }
    );
});
// deletar por ID
app.delete('/deletar/id/:id', (req, res) => {
    const { id } = req.params;
    const {marca , modelo , ano , cor, proprietario } = req.body;
    db.query(
        `DELETE FROM veiculos WHERE ID = ?`,
        [id],
        function(err,results,fields){
            if(err){
                console.error('Erro para deletar',err);
                return res.status(500).json({error:'Erro para deletar'})
            }
            return res.json(results)
        }
    )
});
// deletar por modelo
app.delete('/deletar/modelo/:modelo', (req, res) => {
    const {modelo} = req.params;
    db.query(
        `DELETE FROM veiculos where modelo = modelo`,
        [modelo],
        function(err,results,fields){
            if(err){
                console.error('Erro para deletar',err);
                return res.status(500).json({error:'Erro para deletar'})
            }
            return res.json(results)
        }
    )
});
// selecionar por ID
app.get('/veiculos/:id', (req, res) => {
    const {id} = req.params;
    db.query(
        `SELECT * FROM veiculos where id = ?`,
        [id],
        function(err,results,fields){
            if(err){
                console.error('erro para puxar',err);
                return res.status(500).json({error:'Erro para puxar'})
            }
            return res.json(results)
        }
    )
});
 
// selecionar por ano
app.get('/veiculos/ano/:ano', (req, res) => {
    const {ano} = req.params;
    db.query(
        `SELECT * FROM veiculos where ano=?`,
        [ano],
        function(err,results,fields){
            if(err){
                console.error('Erro para deletar',err);
                return res.status(500).json({error:'Erro para deletar'})
            }
            return res.json(results)
        }
    )
});

// selecionar todos os veículos da cor AZUL
app.get('/veiculos/cor/azul', (req, res) => {
    db.query(
        `select * from veiculos where cor = "azul"`,
        function(err,results,fields){
            if(err){
                console.error('Erro para puxar',err);
                return res.status(500).json({error:'Erro para puxar'})
            }
            return res.json(results)
        }
    )
});
app.listen(port, () => {
    console.log(`Server listening on  http://localhost:${port}`);
});
