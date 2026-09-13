let tasks = []

const get = (req, res) => {
    res.status(200).send({success: true, data: tasks})
}

const addTask = (req, res) => {
    const {id,task} = req.body
    if(!tasks) {
        res.status(400).json({success: false, msg: 'not valid task'})
    }
    tasks.push({id,task})
    res.status(200).json({success: true, data: tasks})
}

const deleteTask = (req, res) => {
    const {id} = req.params
    if(!id) {
        res.status(400).json({success: false, msg: 'this id is not valid' })
    }
        tasks = tasks.filter(task => task.id != id)

        res.status(200).json({success: true, data: tasks })
}


module.exports = {get, addTask, deleteTask}