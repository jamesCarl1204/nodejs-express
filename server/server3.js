const express = require('express')
const  {products} = require('./data.js')
const app = express()
const people = require('./routes/people')
const auth = require('./routes/auth')


app.use(express.static('node-js/server/frontend'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use('/api/people', people) 

app.use('/api/people', auth)

// app.post('/"login', (req,res) => {
//     const { name } = req.body
//     if(name) {
//         return res.status(200).send(`Welcome ${name}`)
//     }
//     res.status(401).send('Please provide Credentials')
// }
// )
app.listen(3000)