const formModal = document.querySelector("#form-div")
const signUpForm = document.querySelector("#sign-up-form")
const logInForm = document.querySelector("#log-in-form")
const signedupH2 = document.querySelector("#signed-up-h2")
const loggedInH2 = document.querySelector("#logged-in-h2")
const logOutButton = document.querySelector("#log-out-button")
const grudgeUL = document.querySelector("#grudge-ul")
const splashImage = document.querySelector("#splash-image")

let allGrudges = {}

retrieveGrudgeList()
checkWhoIsLoggedIn()

// closeModalButton.addEventListener("click", () => {
//     testModal.classList.remove("visible")
//     testModal.classList.add("hidden")
    
// })

signUpForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let signUpFormData = new FormData(event.target)
    let username = signUpFormData.get("username")
    let password = signUpFormData.get("password")

    fetch(`http://localhost:3000/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: {
                username: username,
                password: password
            }
        })
    })
        .then(parseResponse)
        .then(result => {
            signedupH2.textContent = `${result.message} ${result.user.username}`
        })
        .then(signUpForm.reset())
        .catch(error => console.log(error))
})

logInForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let logInFormData = new FormData(event.target)
    let username = logInFormData.get("username")
    let password = logInFormData.get("password")

    fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: {
                username: username,
                password: password
            }
        })
    })
        .then(parseResponse)
        .then(result => {
            if (result.token){
                localStorage.setItem("token", result.token)
                localStorage.setItem("username", result.username)
            }
        })
        .then(checkWhoIsLoggedIn)
        .then(logInForm.reset())
        .catch(error => console.log(error))
})

logOutButton.addEventListener("click", () => {
    if (localStorage.token){
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        checkWhoIsLoggedIn()
    }
})

function checkWhoIsLoggedIn(){
    if (localStorage.token){
        loggedInH2.textContent = localStorage.username
        grudgeUL.style.visibility = "visible"
        if (localStorage.username == "Thorgrim_Grudgebearer"){
            hideModals()
        }
    } else {
        loggedInH2.textContent = "No one"
        grudgeUL.style.visibility = "hidden"
        showModals()
    }
}

function retrieveGrudgeList(){
    fetch(`https://dwarven-grudges-submitted.herokuapp.com/grudges`)
        .then(parseResponse)
        .then(result => {
            allGrudges = result
        })
        .then(populateGrudgeUL)
        .catch(error => console.log(error))
}

function populateGrudgeUL(){
    allGrudges.map(grudge => {
        makeGrudgeCard(grudge)
    })
}

function makeGrudgeCard(grudge){
    let grudgeLI = document.createElement("li")
    let grudgeDiv = document.createElement("div")
    let offenderH3 = document.createElement("H3")
    let offenseH3 = document.createElement("H3")
    let descriptionH3 = document.createElement("H3")
    offenderH3.textContent = `Offender: ${grudge.offender}`
    offenseH3.textContent = `Offense: ${grudge.offense}`
    descriptionH3.textContent = `Description: ${grudge.description}`
    grudgeDiv.append(offenderH3, offenseH3, descriptionH3)
    grudgeLI.appendChild(grudgeDiv)
    grudgeUL.appendChild(grudgeLI)
}

function parseResponse(response){
    return response.json()
}

function hideModals(){
    formModal.classList.remove("visible")
    formModal.classList.add("hidden")
    splashImage.classList.remove("visible")
    splashImage.classList.add("hidden")
}

function showModals(){
    formModal.classList.remove("hidden")
    formModal.classList.add("visible")
    splashImage.classList.remove("hidden")
    splashImage.classList.add("visible")
}