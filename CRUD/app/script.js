const name = document.getElementById('input');
const submitBtn = document.getElementById('submit-btn');
const tableBody = document.getElementById('table-body');
const notification = document.getElementById('notification');
const editContainer = document.getElementById('edit-container');
const backBtn = document.getElementById('back-btn')
const idVal = document.getElementById('id-value')
const newName = document.getElementById('new-name');

async function fetchStudents() {

    try {
    const response = await fetch('/api/students');
    const {data} = await response.json();

    tableBody.innerHTML = data.map(item => `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td><button onclick="editName(${item.id})">edit</button> <button onclick="deleteName(${item.id})">del</button></td>
        </tr>`
        ).join('');

    } catch(err) {
        console.log(err);
    }
    

}

fetchStudents();

submitBtn.addEventListener('click', async (e) => {

    const nameVal = name.value;

    if(!nameVal) {
        notification.style.display = "inline-block"
        notification.innerHTML = 'enter a Name';

        setTimeout(() => {
            notification.style.display = "none"
        }, 3000)

        return
    }

    try {
    const response = await fetch('/api/students', {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ data: nameVal})
    });
    const data = await response.json();


    notification.style.display = "inline-block";
    
    notification.innerHTML = data.msg;

    setTimeout(() => {
        notification.style.display = "none";
    },4000)

    fetchStudents();

}  catch (err) {
    console.log(err);
}
})


async function deleteName(studId) {

    const response = await fetch(`/api/students/${studId}`, {
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'},
    })
    const data = await response.json();

    notification.style.display = "inline-block"
    notification.innerHTML = data.msg

    setTimeout(() => {
        notification.style.display = "none";
    },3000)
    
    fetchStudents();
}


async function editName(studId) {
    editContainer.style.display = "flex"

    editContainer.innerHTML = `
    <div id="edit-box">
            <span id="back-btn">back</span>
            <div id="edit-input-box">
             <input id="new-name" placeholder="name...">
             <button id="edit-submit-btn" onclick="editSubBtn(${studId})">Submit</button>
            </div>
        </div>
        `
}

async function editSubBtn(studId){
    const newname = document.getElementById('new-name').value
    if(!newname) {
        notification.style.display = "inline-block"
        
        notification.innerHTML = "enter a name";
        
        setTimeout(() => {
            notification.style.display = "none";
        },4000);
        return;
    }

    try {
    const response = await fetch(`/api/students/${studId}`, {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({data: newname})
    });
    const data = await response.json();

    notification.style.display = "inline-block"
    notification.innerHTML = data.msg
    
    setTimeout(() => {
        notification.style.display = "none"
    },3000)

    fetchStudents()
    editContainer.style.display = "none"

} catch (err) {
    notification.innerHTML = err
}
}


backBtn.addEventListener('click', (e) => {
    editContainer.style.display = "none"
})