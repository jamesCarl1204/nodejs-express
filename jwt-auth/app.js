const express = require('express');
const path = require('path')
const authRoutes = require('./routes/authRoutes')
const app = express();
const cookieParser = require('cookie-parser')

const {requireAuth} = require('./middleware/authMiddleware')

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(cookieParser())

app.use(authRoutes)

app.get('/projects', requireAuth , (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'project', 'index.html' ))
})


app.listen(3000)

