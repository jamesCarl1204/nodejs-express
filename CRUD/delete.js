const mysql = require('mysql2')



let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'carlSQL88',
    database: 'mydb2'
})

con.connect((err) => {
    if(err) throw err;
    console.log('connected')
    let sql = "DELETE FROM customers WHERE name = 'dhe'";
    
    con.query(sql, (err, result) => {
        if(err) throw err;
        console.log('Number of records deleted: ' + result.affectedRows)
    })
})