const { pool } = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const rateLimit = require('express-rate-limit')
const {body, validationResult} = require('express-validator')

const maxAge = 30 * 24 * 60 * 60;

// function isValidEmail(email) {
//     return /^[^\s@]+@[^\s@]+\.com$/.test(email)
// }
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {success: false, message:'too many attemps. Please try again late'}

})

const signupValidationRules = [
    body('email').isEmail().withMessage('please Enter a valid email').normalizeEmail(),
    body('password').notEmpty().withMessage('please enter a password'),
    body('password').isLength({ min: 8})
]
const loginValidationRules = [
    body('email').trim().isEmail().withMessage('please Enter a valid email'),
    body('password').notEmpty().withMessage('please enter a password'),
]
function createToken(id) {
    return jwt.sign({id}, 'secret',{expiresIn: maxAge} )
}


const signup_post = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({success: false, errors: errors.array() })
    }

    const {email, password} = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
        if(rows.length > 0) {
            
            return res.status(400).json({
                success: false,
                errors: [{path: 'email', msg:'email already exist'}]
            })
        }
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt)

        const [result] = await pool.query('INSERT INTO users (email,password) VALUES(?,?)', [email,hashedPassword])
        const token = createToken(result.insertId)

        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge})

        res.status(201).json({user:result.insertId})

    } catch(err) {
        console.log(err)
    }

}

const login_post = async (req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({success: false,errors: errors.array()})
    }

    const {email, password} = req.body;

    try {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE email = ?', [email]
        )
        if(rows.length === 0) {
            
            return res.status(400).json({
                success: false,
                errors: [{path: 'email', msg: 'email not found'}]
            })
        }

        const user = rows[0]

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            
            return res.status(400).json({
                success: false,
                errors: [{path: 'password', msg:'wrong password'}]})
        }

        const token = createToken(user.id)

        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.json({success: true, user: user.id})

    } catch(err) {
        console.log(err)
    }
}

const logout = (req,res) => {
    res.cookie('jwt', '', {maxAge:1})
    res.json({success:true})
}

module.exports = {signup_post, login_post,logout, loginLimiter, loginValidationRules, signupValidationRules}