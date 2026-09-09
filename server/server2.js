const express = require('express')
const logger = require('./logger')
const authorize = require('./authorize')
const app = express()

app.use(logger, authorize)

app.get('/',  (req,res) => {
    res.send('home')
})


app.get('/about/query',(req,res) => {
    res.send('about')
})

app.get('/products',(req,res) => {
    res.send('products')
})   
app.listen(3000)