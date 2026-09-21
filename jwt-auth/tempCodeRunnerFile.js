const express = require('express');
const path = require('path')
const authRoutes = require('./routes/authRoutes')
const app = express();
const cookieParser = require('cookie-parser')

const {requireAuth, checkUser} = require('./middleware/authMiddleware')

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(cookieParser())

//app.use(checkUser)
app.use(authRoutes)

app.get('/api/me', checkUser, (req,res) => {
    res.json({user:res.locals.user})
})
app.get('/projects', requireAuth , (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'project', 'index.html' ))
})



app.listen(3000)

