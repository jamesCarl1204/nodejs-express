const express = require('express')
const app = express() 
let {people} = require('./data')

app.use(express.static('node-js/server/frontend'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/api/people', (req, res) => {
    res.status(200).json({success:true,data:people})
})

app.post('/api/postman/people', (req,res) => {
    const {name} = req.body;
    if(!name) {
        return res.status(400).json({success: false, msg: 'please Provide name value'})
    }
    res.status(200).send({success:true, data: [...people,name]})
})

app.post('/api/people', (req,res) => {
    const {name} = req.body;
    res.status(201).json({success: true, data:{name}})
})

app.put('/api/people/:id', (req,res) => {
    const {id} =req.params
    const {name} = req.body;
    const person = people.find((person) => person.id === Number(id))
    if(!person) {
        return res.status(404).json({success: false, msg: `no person with id`})
    }
    //  people = people.map((person)=> {
    //     if(person.id === Number(id) ){
    //        person.name = name
    //     }
    // })
    person.name = name
    res.json(person)
})

app.delete('/api/people/:id', (req,res)=> {
    const person = people.find((person) => person.id === Number(req.params.id))
    if(!person) {
        res.status(404).json({success:false, msg:'no person with id'})
    }

     people = people.filter((person) => person.id !== Number(req.params.id))
    res.json(people)
})

app.post('/login', (req, res) => {

    const {name} = req.body
    if(name) {
        return res.status(200).send(`welcome${name}`)
    }
    console.log(req.body)
})
app.listen(3000)