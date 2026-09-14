let mysql = require('mysql2')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('./node-js/CRUD/app'))

let con = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "carlSQL88",
    database: "mydb2"
})

con.connect((err) => {
    if (err) throw err;
    console.log('connected');
    // let sql = "CREATE TABLE students (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))"
    // con.query(sql, (err, result) => {
    //     if (err) throw err;
    //     console.log("table created")
    // })
})

app.get('/api/students', (req, res) => {
    con.query('SELECT * FROM students', (err, results) => {
        if(err) {res.status(400).json({success: false, msg: err})}
      
        res.status(200).json({success: true, data: results})
    })
})

app.post('/api/students', (req, res) => {
    const {name} = req.body
    if(name) {
        return res.status(400).json({success: false, msg: 'name is required'})
    }
    con.query(`INSERT INTO students (name) VALUES (?)`, [name], (err, result) => {
        if(err) return res.status(400).json({success: false, msg:err})
            res.status(201).json({success: true, msg: 'Student added'})
    })
}) 
app.listen(3000)

