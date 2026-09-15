const name = document.getElementById('input')
const submitBtn = document.getElementById('submit-btn')
const tableBody = document.getElementById('table-body')
const notification = document.getElementById('notification')

async function fetchStudents() {

    try {
    const response = await fetch('/api/students')
    const {data} = await response.json()

    tableBody.innerHTML = data.map(item => `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td><button onclick="editName(${item.id})">edit</button> <button onclick="deleteName(${item.id})">del</button></td>
        </tr>`
        ).join('')

    } catch(err) {
        console.log(err)
    }
    

}

fetchStudents()

submitBtn.addEventListener('click', async (e) => {

    const nameVal = name.value;
    try {
    const response = await fetch('/api/students', {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({success: true, data: nameVal})
    })
    const data = await response.json();


    notification.style.display = "inline-block"
    
    notification.innerHTML = data.msg

    setTimeout(() => {
        notification.style.display = "none"
    },3000)

    fetchStudents()
}  catch (err) {
    console.log(err)
}
})


async function deleteName(studId) {

    const response = await fetch(`/api/students/${studId}`, {
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'},
    })
    const data = await response.json()

    fetchStudents()
}
