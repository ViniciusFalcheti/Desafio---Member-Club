const form = document.querySelector("form")
const input = document.querySelector("input")
const button = document.querySelector("button")

input.oninput = (event) => {

    if(input.value != "") {
        button.disabled = false;
    }
    else {
        button.disabled = true;
    }

    // input.value = input.value.replace(/\D+/g,"")
    // input.value = input.value.replace(/[^0-9]/,"")

    if(input.value.length < 14 && input.value.length >=3 && event.inputType != 'deleteContentBackward') {
        if(input.value.replace(/-/g,'').length % 3 === 0){
            input.value = input.value + '-'
        }
    }
}


form.onsubmit = async (event) =>  {
	event.preventDefault()

    // const response = fetch("http://localhost:3000/clients").then((response) => response.json()).then((data) => console.log(data))


    try {
        // let client = await fetchClient ('207-245-699-104')
        // let client = await fetchClient ('124-537-835-230')
        let client = await fetchClient (input.value)
        ShowContent()

        allClientData (client)
        
    }
    catch (e){
        console.log("ERRO: ", e)

        alert("O ID digitado não foi encontrado! Digite o ID de um cliente cadastrado!")

        hideContent()

        input.focus()
        input.select()
    }
    

} 


async function fetchClient (id) {
    const response = await fetch(`http://localhost:3000/clients/${id}`)
    const data = await response.json()

    return data
}

function hideContent() {
    let main = document.querySelector("main")
    main.classList.add("hide")
}

function ShowContent() {
    let main = document.querySelector("main")
    main.classList.remove("hide")
}

function allClientData (client) {
    userData(client)
    historyData(client)
    cardData(client)
    progressData(client)
}

function userData(client) {
    document.querySelector(".user-name h2").textContent = client.name
    document.querySelector(".user-name p").textContent = `Cliente desde ${client.clientSince}`

    const userPhoto = document.querySelector(".user-photo img")
    userPhoto.setAttribute("src", client.photo)

}

function historyData(client) {
    let appointmentHistory = client.appointmentHistory.length
    const cutsHistory = document.querySelector(".cuts-history")
    const cutsQuantity = document.querySelector(".history header p")

    cutsQuantity.textContent = `${client.loyaltyCard.totalCuts} cortes`

    for(let i = 0; i < appointmentHistory; i++) {
        const historyRow = document.createElement("div")
        const historyDiv = document.createElement("div")

        const historyH4 = document.createElement("h4")
        const historyP = document.createElement("p")

        const historyImg = document.createElement("img")

        

        historyRow.classList.add("history-row", "flex")

        historyH4.textContent = client.appointmentHistory[i].date
        historyP.textContent = client.appointmentHistory[i].time

        historyImg.setAttribute("src", "assets/icons/PinCheck2.png")

        historyDiv.append(historyH4, historyP)
        historyRow.append(historyDiv, historyImg)
        cutsHistory.append(historyRow)
    }
}

function cardData(client) {
    const userId = document.querySelector(".loyalty-id h3")
    const totalCuts = client.loyaltyCard.totalCuts
    // let pinCheck = document.createElement("img")

    userId.textContent = `ID: ${client.id}`

    // pinCheck.setAttribute("src", "/assets/icons/PinCheck.png")

    for(let i = 0; i < totalCuts; i++) {
        // document.querySelectorAll(".slot-item")[i].append(pinCheck)
        let slot = document.querySelectorAll(".slot-item img")[i]

        slot.classList.remove("hide")
        // slot.append(pinCheck)
        // slot.append('pinCheck')

        if (i === 9) {
            slot.setAttribute("src", "/assets/icons/PinCheck.png")
        }
    }

}

function progressData(client) {
    
    const cutsRemaining = document.querySelector(".cuts-content strong")
    const progressText = document.querySelector(".progress-bar p")
    const progressBar = document.querySelector(".progress")
    const totalCuts = client.loyaltyCard.totalCuts
    cutsRemaining.textContent = client.loyaltyCard.cutsRemaining
    progressText.textContent = `${totalCuts} de 10`

    const progressWidth = `${parseInt(totalCuts) * 10}%`
    progressBar.style.width = progressWidth
}