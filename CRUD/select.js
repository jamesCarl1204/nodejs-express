const mysql = require('mysql2')

let con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "carlSQL88",
    database: 'mydb2'
})

con.connect((err) => {
    if(err) throw err;
    console.log('connected');
    con.query("SELECT * FROM customers", (err, result, fields) => {
        if(err) throw err;
        console.log(result)
    })
    con.query("SELECT name, address FROM customers", (err, result, fields) => {
        if(err) throw err;
        console.log(result)
        console.log(fields)
    })
})
