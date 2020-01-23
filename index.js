const formModal = document.querySelector("#form-div")
const signUpForm = document.querySelector("#sign-up-form")
const logInForm = document.querySelector("#log-in-form")
const leftPage = document.querySelector("#left-page")
const rightPage = document.querySelector("#right-page")
const backButton = document.querySelector("#back-button")
const forwardButton = document.querySelector("#forward-button")
const logOutButton = document.querySelector("#log-out-button")
const splashImage = document.querySelector("#splash-image")

let allGrudges = {}
let displayedGrudges = [0, 1]

retrieveGrudgeList()
checkWhoIsLoggedIn()

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
        if (localStorage.username == "Thorgrim_Grudgebearer"){
            hideModals()
        }
    } else {
        showModals()
    }
}

function retrieveGrudgeList(){
    fetch(`https://dwarven-grudges-submitted.herokuapp.com/grudges`)
        .then(parseResponse)
        .then(result => {
            allGrudges = result
        })
        .then(loadFirstTwoPages)
        .catch(error => console.log(error))
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

function loadFirstTwoPages(){
    firstGrudges = allGrudges.slice(0,2)

    firstGrudges.map((grudge, index) => {

        console.log(index)
        let grudgeUL = document.createElement("ul")
        let offenderLI = document.createElement("li")
        let offenseLI = document.createElement("li")
        let descriptionLI = document.createElement("li")

        offenderLI.textContent = `Offender: ${grudge.offender}`
        offenseLI.textContent = `Offense: ${grudge.offense}`
        descriptionLI.textContent = `Description: ${grudge.description}`

        grudgeUL.append(offenderLI, offenseLI, descriptionLI)
        if (index == 0){
            leftPage.appendChild(grudgeUL)
        } else {
            rightPage.appendChild(grudgeUL)
        }
    })
}