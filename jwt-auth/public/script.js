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

const signupEmailErr = document.querySelector('#sign-in-container .email-error')
const signupPasswordErr = document.querySelector('#sign-in-container .password-error')

const loginEmailErr = document.querySelector('#login-container .email-error')
const loginPasswordErr = document.querySelector('#login-container .password-error')

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

window.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/me')
    const data =await response.json();

    if(data.user) {
        document.getElementById('user-name').textContent = data.user.email
    }
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
        signupEmailErr.textContent = ''
        signupEmailErr.textContent = ''
       data.errors.forEach(err => {
         if(err.path === 'email') signupEmailErr.textContent = err.msg
         if(err.path === 'password') signupPasswordErr.textContent = err.msg
    })
    }
    
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
    try {
    const response = await fetch('/login', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({email:email, password: password})
    })

    const data = await response.json()

    if(data.errors) {
        data.errors.forEach(err => {
            if (err.path === 'email')  loginEmailErr.textContent = err.msg
            if(err.path === 'password') loginPasswordErr.textContent= err.msg
        })
      
    }

    if(data.user) {
        window.location.href = '/'
    }
}catch(err) {
    console.log(err)
}
})



projectBtn.addEventListener('click', async (e) => {
    const response = await fetch('/api/me',{
        method:'GET'
    })
    const data = await response.json();

    if(data.user) {
        window.location.href = '/projects'
    } else {
        loginContainer.style.display = 'flex'
    }
})

