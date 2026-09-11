const express = require('express')
const router = express.Router();
const {getPeople,createPerson,updatePerson,deletePerson} = require('../controllers/peopleController')

let {people} = require('../data')

router.get('/', getPeople)

router.post('/api/postman/people', createPerson)

router.put('/:id',updatePerson)

router.delete('/api/people/:id', deletePerson)




module.exports = router