const { pool } = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const maxAge = 30 * 24 * 60 * 60;

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.com$/.test(email)
}
function createToken(id) {
    return jwt.sign({id}, 'secret',{expiresIn: maxAge} )
}

const signup_post = async (req, res) => {

    const {email, password} = req.body;
    const errors = {}

    if(!email) {
        errors.email = 'please enter an email'
        return res.status(400).json({success: false, errors })
    } else if(!isValidEmail(email)){
        errors.email = 'please enter a valid email'
    }
    if(!password) {
        errors.password = 'please enter an password'
        return res.status(400).json({success: false, errors})
    }
    if(password.length < 7) {
        errors.password = 'password must be at least 8 character'
        return res.status(400).json({success: false, errors})
    }
    if(Object.keys(errors).length > 0) {
        return res.status(400).json({success: false, errors})
    }

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
        if(rows.length > 0) {
            errors.email = 'email already exist'
            return res.status(400).json({success: false, errors})
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

    const {email, password} = req.body;
    const errors = {}

    if(!email) {
        errors.email = 'please enter an email'
        return res.status(400).json({success:false, errors})
    } else if(!isValidEmail(email)) {
        errors.email = 'please enter a valid email'
        return res.status(400).json({success:false, errors})
    }
    if(!password) {
        errors.password = 'please enter an password'
        return res.status(400).json({success: false, errors})
    }
    if(password.length < 8) {
        errors.password = 'password must be atleast 8 characters'
    }

    try {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE email = ?', [email]
        )
        if(rows.length === 0) {
            errors.email = "email not found"
            return res.status(400).json({success: false, errors})
        }

        const user = rows[0]

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            errors.password = 'wrong password'
            return res.status(400).json({success: false, errors})
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

module.exports = {signup_post, login_post,logout}