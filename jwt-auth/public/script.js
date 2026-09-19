const loginSubmit = document.getElementById('login-submit');
const signInSubmit = document.getElementById('sign-in-submit');
const loginBtn = document.getElementById('login-btn');
const signInBtn = document.getElementById('sign-in-btn')
const loginContainer = document.getElementById('login-container')
const signInContainer = document.getElementById('sign-in-container')

const backBtn = document.querySelector('.back-btn')


backBtn.addEventListener('click', (e) => {
    loginContainer.style.display = "none";
    signInContainer.style.display = "none"
})

loginBtn.addEventListener('click', (e) => {
    loginContainer.style.display = "flex"
    
})
signInBtn.addEventListener('click', (e) => {
    loginContainer.style.display = "flex"

})
loginSubmit.addEventListener('click', (e) => {

    const response = fetch('/user/login',{
        method: 'POST',
        headers: {'Content-Type': 'json/application'},

    })

})

