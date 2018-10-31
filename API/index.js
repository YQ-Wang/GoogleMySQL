const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL = 'SELECT * FROM RTU_EVENT';

const connection = mysql.createConnection({
    host: '35.192.121.176',
    user: 'root',
    password: 'ece4970',
    database: 'scada'
})

connection.connect(err => {
    if(err) {
        return err;
    }
});

app.use(cors());

app.get('/', (req, res) => {
    connection.query(SELECT_ALL, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
});

app.listen(4000, () => {
    console.log(`Products server listening on port 4000`)
});