const mysql = require('mysql2')

let con = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "carlSQL88",
    database: "mydb2"
})

con.connect((err) => {
    if(err) throw err; 
    console.log('connected');
    let sql = "INSERT INTO customers (name, address) VALUES ('ACCENTURE', 'HIGHWAY')"
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log('1 record inserted')
    })
})

con.connect((err) => {
    if (err) throw err;
    console.log('connected');
    let sql = "INSERT INTO customers (name, address) VALUES ?"
    let values= [
        ['john', 'highway'],
        ['dhe', 'highway'],
        ['dkoon', 'highway'],
        ['joro', 'highway']
    ];

    con.query(sql, [values], (err, result) => {
        if(err) throw err;
        console.log("Number of records inserted: " + result.affectedRows + "and 1 record inserted, ID: " + result.insertId)
    })
})