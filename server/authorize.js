const authorize = (req,res,next) => {
    const {user} = req.query
    if(user === 'carl') {
        req.user = {name:'carl', id: 4}
        next()
    }
    else {
        res.status(401).send('unauthorized')
    }
    
    console.log('authorize')
    next()
}

module.exports = authorize