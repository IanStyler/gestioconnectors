const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const mysql = require('mysql');

port = 3080;

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});

//E3
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234Abcd',
  database: 'DAMOscarHerran'
});
db.connect((err) => {
  if (err) throw err;
  console.log('Connectat a la base de dades MySQL!');
});


//E4
app.get('/api/selectClients',(req,res)=> {
  db.query("SELECT * FROM DAMOscarHerran.Clients",(err,rows)=>{
    if(err) throw err;
    res.json(rows);
  });
});

//E5
app.post('/api/creaTaula', (req, res) => {
  const sql = `CREATE TABLE ${req.body.Nom} (
    Col1 VARCHAR(30) PRIMARY KEY,
    Col2 INT CHECK ( Col2 >= 10 ),
    Col3 VARCHAR(60)
  )`;

  db.query(sql, (err, result) => {
    if (err) {
      if(err.code == 'ER_TABLE_EXISTS_ERROR'){
        res.status(500).send('Error: Possiblement la taula que vols crear ja existeix!');
        console.error('Error: Possiblement la taula que vols crear ja existeix!');
        return;
      }else {
        console.error(`No s'ha pogut crear la taula ${req.body.Nom}`, err);
        res.status(500).send(`No s'ha pogut crear la taula ${req.body.Nom} ${err}`);
        return;
      }
    }
    console.log(`La taula ${req.body.Nom} s'ha creat correctamemt`);
    res.send(`La taula ${req.body.Nom} s'ha creat correctamemt`);
  });
});
app.post('/inserirDades', (req, res) => {
  const query = req.body.query;
  const valors = req.body.valors;
  db.query(query, valors, (err, result) => {
    if (err) {
      res.status(500).send(`Error: ${err}`);
    } else {
      res.send(`Registre inserit amb èxit`);
    }
  });
});
app.post('/actualitzarDades', (req, res) => {
  const query = req.body.query;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send(`Error: ${err}`);
    } else {
      res.send(`Registre actualitzat amb èxit`);
    }
  });
});




