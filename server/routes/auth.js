const express = require('express')
const router  = express.Router()

router.post('/', (req,res) => {
    const {name} = req.body;
    res.status(201).json({success: true, data:{name}})
})

module.exports = router