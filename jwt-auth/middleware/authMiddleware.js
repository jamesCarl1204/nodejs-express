const jwt = require('jsonwebtoken');
const {pool} =require('../config/db')

const requireAuth = (req, res, next) => {
    
    const token = req.cookies.jwt

    if(token) {
        jwt.verify(token, 'secret', (err, decodedToken) => {
            if(err) {
                console.log(err.message);
            } else {
                console.log(decodedToken)
                next()
            }
        })
    }
    // else {
    //     res.redirect('/login')
    // }

}

const checkUser = (req, res,next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, 'secret', async (err, decodedToken) => {
            if(err) {
                console.log(err)
                res.locals.user = null
                next()
            } else { [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [decodedToken.id])
                res.locals.user = rows[0]
                next()
            
            }
        })
    }
    else {
       res.locals.user = null
       next()
    }
}

module.exports = {requireAuth, checkUser}