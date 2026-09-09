const express = require('express')
const  {products} = require('./data.js')
const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Home</h1><a href="/api/products">products</a>')
})

app.get('/api/products', (req,res) => {
    const {products} = products

    res.status(200).send(products)
})
app.get('/api/products/:productID', (req, res) => {
    console.log(req.params)

    const {productID} = req.params
   const singleproduct = products.find((product)=> product.id === Number(productID))
 
   if(!singleproduct) {
    return res.status(404).send('not found')
   }
    res.json(singleproduct)
})

app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    res.send('hello')

   
})


app.get('/api/v1/query', (req, res) => {
     const { search, limit } = req.query;
    let sortedProducts = [...products]

    if(search) {
        sortedProducts = sortedProducts.filter((product)=> {
            return product.name.startsWith(search)
        })
    }
    if(limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
        
    }

    res.status(200).json(sortedProducts)
})

app.listen(3000)