let mysql = require('mysql2')



let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'carlSQL88',
    database: 'mydb2'
})

con.connect((err) => {
    if(err) throw err;
    console.log('connected');
    let sql = "UPDATE customers SET name = 'carlo' WHERE id = 8"

    con.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result.affectedRows + "records updated")
    })
    con.query("SELECT * FROM ")
})