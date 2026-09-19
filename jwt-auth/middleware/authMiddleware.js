const jwt = require('jsonwebtoken');
const {con} =require('../config/db')

const requireAuth = (req, res, next) => {
    
    const token = req.cookies.jwt

    if(token) {
        jwt.verify(token, 'secret', (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect('/login')
            }
        })
    }
}