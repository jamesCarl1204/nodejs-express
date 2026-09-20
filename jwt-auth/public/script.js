const loginSubmit = document.getElementById('login-submit');
const signInSubmit = document.getElementById('sign-in-submit');
const loginBtn = document.getElementById('login-btn');
const signInBtn = document.getElementById('sign-in-btn')
const projectBtn = document.getElementById('project-btn')

const loginContainer = document.getElementById('login-container')
const signInContainer = document.getElementById('sign-in-container')

const emailSignInput =  document.getElementById('email-sign-input')
const emailLoginInput = document.getElementById('email-login-input')
const passwordSignInput = document.getElementById('pword-sign-input')
const passwordLoginInput = document.getElementById('pword-login-input')
const backBtn = document.querySelector('.back-btn')
const emailErr = document.querySelector('.email-error')
const passwordErr = document.querySelector('.password-error')

backBtn.addEventListener('click', (e) => {
    loginContainer.style.display = "none";
    signInContainer.style.display = "none"
})

loginBtn.addEventListener('click', (e) => {
    loginContainer.style.display = "flex"
})

signInBtn.addEventListener('click', (e) => {
    signInContainer.style.display = "flex"

})

signInSubmit.addEventListener('click', async (e) => {
    e.preventDefault()
    const email = emailSignInput.value
    const password = passwordSignInput.value
    try {
    const response = await fetch('/signup',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email, password: password})
    })

    const data = await response.json()

    if(data.errors) {
        emailErr.textContent = data.errors.email;
        passwordErr.textContent = data.errors.password
    }
    console.log(data.user)
    if(data.user){
        signInContainer.style.display = "none"
    }
    
} catch(err) {
    console.log(err)
}

})

loginSubmit.addEventListener('click', async (e) => {
    e.preventDefault()

    const email = emailLoginInput.value;
    const password = passwordLoginInput.value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({email:email, password: password})
    })

    const data = await response.json()

    if(data.errors) {
        emailErr.textContent = data.errors.email
        passwordErr.textContent= data.errors.password
    }

    if(data.user) {
        window.location.href = '/projects'
    }
})

projectBtn.addEventListener('click', (e) => {
   loginContainer.style.display = "flex"
})

