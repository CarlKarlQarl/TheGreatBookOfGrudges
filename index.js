const formModal = document.querySelector("#form-div")
const signUpForm = document.querySelector("#sign-up-form")
const logInForm = document.querySelector("#log-in-form")
const bookContainer = document.querySelector("#book-container")
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

    fetch(`https://dwarven-logins.herokuapp.com/users`, {
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
        .then(alert("Successful Sign-up"))
        .catch(error => console.log(error))
})

logInForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let logInFormData = new FormData(event.target)
    let username = logInFormData.get("username")
    let password = logInFormData.get("password")

    fetch(`https://dwarven-logins.herokuapp.com/login`, {
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

forwardButton.addEventListener("click", () => {
    let newGrudgesToDisplay = displayedGrudges.map(number => 
        number + 2
    )
    displayedGrudges = newGrudgesToDisplay
    clearPages()
    loadPages()
})

backButton.addEventListener("click", () => {
    let newGrudgesToDisplay = displayedGrudges.map(number => 
        number - 2
    )
    displayedGrudges = newGrudgesToDisplay
    clearPages()
    loadPages()
})

function checkWhoIsLoggedIn(){
    if (localStorage.token){
        if (localStorage.username == "Thorgrim_Grudgebearer"){
            hideModals()
        } else {
            alert("Halt, trespasser! The Great Book of Grudges is intended for dwarven eyes only, and the only fitting crime for unauthorized access to the Book is death. However, the executioner is fully booked, so your name will be added to the Book instead.")
            addUserToBook(localStorage.username)
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
        .then(clearPages)
        .then(loadPages)
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
    bookContainer.classList.remove("hidden")
    bookContainer.classList.add("visible")
}

function showModals(){
    formModal.classList.remove("hidden")
    formModal.classList.add("visible")
    splashImage.classList.remove("hidden")
    splashImage.classList.add("visible")
    bookContainer.classList.remove("visible")
    bookContainer.classList.add("hidden")
}

function loadPages(){
    twoGrudges = allGrudges.slice(displayedGrudges[0], displayedGrudges[1] + 1)

    twoGrudges.map((grudge, index) => {
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

function clearPages(){
    if (leftPage.firstChild){
        leftPage.firstChild.remove()
    }
    if (rightPage.firstChild){
        rightPage.firstChild.remove()
    }
}

function addUserToBook(username){
    fetch(`https://dwarven-grudges-submitted.herokuapp.com/grudges`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            grudge: {
                offender: username,
                offense: "Unauthorized Access",
                description: "Some human of no import and a strange name attempted to read the Great Book of Grudges. An expedient execution was not available, so a grudge was record instead."
            }
        })
    })
        .then(retrieveGrudgeList)
        .then(showBeginningOfBook)
        .catch(error => console.log(error))
}

function showBeginningOfBook(){
    displayedGrudges = [0,1]
    clearPages()
    loadPages()
}