let {people} = require('../data')

const  getPeople = (req,res) => {
res.status(200).json({success: true, data: people})
}

const createPerson = (req, res ) => {
    const {name} = req.body;
    if(!name) {
        return res.status(400).json({success: false, msg: 'please Provide name value'})
    }
    res.status(200).send({success:true, data: [...people,name]})
}

const updatePerson =  (req,res) => {
    const {id} =req.params
    const {name} = req.body;
    const person = people.find((person) => person.id === Number(id))
    if(!person) {
        return res.status(404).json({success: false, msg: `no person with id`})
    }
    person.name = name
    res.json(person)
}

const deletePerson = (req,res)=> {
    const person = people.find((person) => person.id === Number(req.params.id))
    if(!person) {
        res.status(404).json({success:false, msg:'no person with id'})
    }

     people = people.filter((person) => person.id !== Number(req.params.id))
    res.json(people)
}

module.exports = {getPeople, createPerson, updatePerson,deletePerson}