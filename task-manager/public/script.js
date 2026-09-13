const submitBtn = document.getElementById('submit-btn')
const output = document.getElementById('output')
const taskVal = document.getElementById('task-input')
const deleteB = document.getElementById('delete-btn')

let id = 1
async function fetchTask() {
    const response = await fetch('/api/task')
    const {data}= await response.json()

    output.innerHTML = data.map(task => `
        <div class="task">
           <p>${task.task}</p>
           <div>
           <button>edit</button>
           <button onclick="deleteBtn(${task.id})">del</button>
           </div>
         </div>
         `).join('')
}

fetchTask()



submitBtn.addEventListener('click', async (e) => {
     const task = taskVal.value
     if(!task) return

    try {
    const response = await fetch('/api/task', {
        method: 'POST', 
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({id: id, task: task})
    })
    const data = await response.json()

    id++

    fetchTask()

    taskVal.value = ''

   } catch (err) {
    output.innerHTML = err
}

})

async function deleteBtn (taskId) {

    try {
    const response = await fetch(`/api/task/${taskId}`,{
        method: 'DELETE',
        headers: {
            'Content-type':'application/json'
        }
    }
    )
    const data = await response.json()

    fetchTask()

    }catch (err) {
    output.innerHTML = err
}
    
}

