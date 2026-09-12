const task = []

const get = (req, res) => {
    res.status(200).send({success: true, data: task})
}



module.exports = {get, }