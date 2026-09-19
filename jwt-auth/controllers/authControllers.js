const { pool } = require('../config/db')
const bcrypt = require('bcrypt')

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.com$/.test(email)
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

        res.sta
    } catch(err) {

    }

}