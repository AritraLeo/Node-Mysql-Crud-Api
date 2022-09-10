const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
// const pool = require('./db');

const app = express();

const port = 5000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MYSQL

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    // password: ' ',
    database: 'node_mysql_crud'
});


// Get all the data:

app.get('/', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected at id: ${connection.threadId}`);
        connection.query('SELECT * FROM users', (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            }
            else
                console.log(err);
        });
    });
});


// Get by Id:

app.get('/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected at id: ${connection.threadId}`);
        connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            }
            else
                console.log(err);
        });
    });
});



// Delete by Id:

app.delete('/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected at id: ${connection.threadId}`);
        connection.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release();

            if (!err) {
                res.send(`Deleted element at  id: ${req.params.id}`);
            }
            else
                console.log(err);
        });
    });
});


// Insert data

app.post('/', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected at id: ${connection.threadId}`);

        const params = req.body;
        connection.query('INSERT INTO users SET ?', params, (err, rows) => {
            connection.release();

            if (!err) {
                res.send(`Inserted element with name: ${params.name} Succesfully`);
            }
            else
                console.log(err);
        });
    });
});




// Update data by Id:

app.put('/', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected at id: ${connection.threadId}`);

        const {id, name, tagline, description, image} = req.body;
        connection.query('UPDATE users SET name = ?, tagline = ?, description = ?, image = ? WHERE id = ? ', [name, tagline, description, image, id], (err, rows) => {
            connection.release();

            if (!err) {
                res.send(`Updated element with name: ${name} Succesfully`);
            }
            else
                console.log(err);
        });
    });
});



// Listen
app.listen(port, () => { console.log(`Listning on port ${port}`) });