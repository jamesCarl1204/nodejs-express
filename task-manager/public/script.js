const submitBtn = document.getElementById('submit-btn')
const output = document.getElementById('output')

async function fetchTask() {
    const response = await fetch('/api/user')
    const {data}= await response.json()

    const task = document.createElement('div');
    
    task.classList.add('task')
   

    output.innerHTML 
}



submitBtn.addEventListener('click', async (e) => {

})