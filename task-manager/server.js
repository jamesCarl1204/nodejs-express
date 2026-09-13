const express =require('express');
const app = express()
const {get, addTask, deleteTask} = require ('./controllers/userController')

app.use(express.json())

app.use(express.static('node-js/task-manager/public'))


app.get('/api/task', get)

app.post('/api/task', addTask)

app.delete('/api/task/:id', deleteTask)







app.listen(3000)
