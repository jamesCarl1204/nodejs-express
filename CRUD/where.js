let mysql = require('mysql2')

let con = mysql.createConnection ({
    host : 'localhost',
    user: 'root',
    password: 'carlSQL88',
    database: 'mydb2'
})

con.connect((err) => {
    if(err) throw err;
    con.query("SELECT * FROM customers WHERE name = 'john'", (err, result) => {
            if(err) throw err
            console.log(result)
        }
    )
    con.query("SELECT * FROM customers WHERE name LIKE 'j%'", (err, result) => {
        if(err) throw err;
        console.log(result)
    })

    let name = 'john'

    let sql = 'SELECT * FROM customers WHERE address = ' + mysql.escape(name)

    con.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
    })
})