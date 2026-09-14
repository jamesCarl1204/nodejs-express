const mysql = require('mysql2')



let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'carlSQL88',
    database: 'mydb2'
})

con.connect((err) => {
    if (err) throw err;
    console.log('connected');
    con.query(SELECT * FROM customers ORDER BY name", (err, result) => {
        if (err) throw err;
        console.log(result)
    })
})