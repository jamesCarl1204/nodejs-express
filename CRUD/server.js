let mysql = require('mysql2')
const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config({path:path.join(__dirname, '/.env')})

app.use(express.json())
app.use(express.static('./node-js/CRUD/app'))

let con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

con.connect((err) => {
    if (err) throw err;
    console.log('connected');
})

app.get('/api/students', (req, res) => {
    con.query('SELECT * FROM students', (err, results) => {
        if(err) return res.status(400).json({success: false, msg: err})
      
        res.status(200).json({success: true, data: results})
    })
})

app.post('/api/students', (req, res) => {
    const {data} = req.body
    if(!data) {
        return res.status(400).json({success: false, msg: 'name is required'})
    }
    con.query(`INSERT INTO students (name) VALUES (?)`, [data], (err, result) => {
        if(err) return res.status(400).json({success: false, msg:err})
            res.status(201).json({success: true, msg: 'Student added'})
    })
}) 

app.delete('/api/students/:id', (req,res) => {
    const {id} = req.params;
    
    con.query(`DELETE FROM students WHERE id = ?`,[id], (err, result) => {
        if(err) return res.status(400).json({success: false, msg:err})
            res.status(200).json({success: true, msg:'Deleted successfully'})
    })
})

app.put('/api/students/:id', (req, res) => {
    const {id} = req.params;
    const {data} = req.body

    con.query(`UPDATE students SET name = ? WHERE id = ? `, [id,data], (err, result) => {
        if(err) return res.status(400).json({success: false, msg:err})
            res.status(200).json({success: true, msg:'Successfully updated'})
    })
})
app.listen(3000)

