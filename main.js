const input = document.getElementById("input-text");
const editBtn = document.getElementById("Edit")
const startBtn = document.getElementById("button") 
const newBtn = document.getElementById("new-button") 
const listCont = document.getElementsByClassName("list-cont")[0]
const resultCont = document.getElementsByClassName("result-container")[0]
const deleteBtn = document.getElementById("delete")
const changeBtn = document.getElementById("change")
const restartBtn = document.getElementById("restart")
const resultName = document.getElementsByClassName("result-name")[0]
const divPart = document.getElementsByClassName("participants")[0]
const participantes = document.getElementById('participants-list')
const inputIndex = document.getElementById("entry")
const changeIndex = document.getElementById("change-text")
const changeFunction = document.getElementsByClassName("change-function")[0]
const backArrow = document.getElementById("back")
const menu = document.getElementById("menu-button")
const sideBar = document.getElementsByClassName("sidebar")[0]
const menuItem = document.getElementsByClassName("menu-item")
const root = document.querySelector(':root');
const version = document.querySelectorAll(".version")

let names = []

version.forEach(box =>{
    box.textContent = "1.1.0"
})

// ---------------- Utility functions ------------------ //

function debug(){
    console.log("click");
}

function underDev(){
    alert("This function is under development")
}

function changeStatus(object){
    if(object.classList.contains("hide")){
        object.classList.replace("hide", "show")
    }else{
        object.classList.replace("show", "hide")
    }
}

function shuffle(array) {
    const newArray = [...array]
    const length = newArray.length
    
    for (let start = 0; start < length; start++) {
        const randomPosition = Math.floor((newArray.length - start) * Math.random())
        const randomItem = newArray.splice(randomPosition, 1)
        
        newArray.push(...randomItem)
    }
    
    return newArray
}

// ---------------- Listing ------------------ //

// The input text function
input.addEventListener('keyup', printNames)

// All functions needed for interact with the first part of the app
input.onkeypress = function(e) {
    var chr = String.fromCharCode(e.which);
    if ("></\"\'.,;[]{}!@#$%^&*()¿¡²³¤¤€¼½¾‘’¥×«»¶´ç¿:?\\".indexOf(chr) >= 0)
        return false;
};

function printNames(e){
    if(e.keyCode === 13){
        // Enter names into the main array: names[]
        let textInput = input.value, aux
        aux = textInput.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        names.push(aux.toUpperCase())
        console.log(names);
        
        // Clean theinput.value
        input.value = '';
        
        //  ------- Print Names --------
        const li = document.createElement('li')
        li.setAttribute("class", "item")
        li.textContent = textInput
        participantes.appendChild(li)
    }
}

// ---------------- Edit ------------------ //

// Listeners to the editing list feature
restartBtn.addEventListener('click', restartList)
editBtn.addEventListener('click', showEdit)
deleteBtn.addEventListener("click", deleteEntry)
changeBtn.addEventListener("click", changeEntry)

// Editing list functions
function showEdit(){
    const editOptions = document.getElementsByClassName("edit-options")[0]
    changeStatus(editOptions)
}

function restartList(e){
    location.reload()
}

changeIndex.onkeypress = function(e) {
    var chr = String.fromCharCode(e.which);
    if ("></\"\'.,;[]{}!@#$%^&*()¿¡²³¤¤€¼½¾‘’¥×«»¶´ç¿\\:?".indexOf(chr) >= 0)
        return false;
};


function changeEntry(e){
    let index = inputIndex.value
    index -= 1
    let item = changeIndex.value
    if(names[index] !== undefined){
        // The array modding
        let aux = item.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        names[index] = item.toUpperCase()
        // Modding the HTML
        participantes.children[index].textContent = item
        changeIndex.value = ''
        inputIndex.value = ''
    }else{
        alert("The index do not exists in the list")
    }
}

function deleteEntry(e){
    let index = inputIndex.value
    index -= 1
    if(names[index] !== undefined){
        names.splice(index,index+1)
        participantes.removeChild(participantes.children[index])
        inputIndex.value = ''
    }else{
        alert("The index do not exists in the list")
    }
}

// ---------------- Side bar ------------------ //

menu.addEventListener("click", showSideBar)
backArrow.addEventListener("click", back)
menuItem[0].addEventListener("click", back) // Home
menuItem[1].addEventListener("click", result) // Result
menuItem[2].addEventListener("click", underDev) // Link
menuItem[3].addEventListener("click", underDev) // Mode
menuItem[4].addEventListener("click", underDev) // About


function showSideBar(e){
    changeStatus(sideBar)
}

function back(){
    root.style.setProperty('--main-color','#288743')
    listCont.classList.replace("hide", "show")
    startBtn.classList.replace("hide", "show")
    newBtn.classList.replace("show", "hide")
    resultCont.classList.replace("show","hide")
    sideBar.classList.replace("show","hide")
    input.placeholder = "Enter names"
    input.value = ''



    input.removeEventListener("keyup", showName)
    input.addEventListener('keyup', printNames)
}

function result(){
    if(names.length != 0){
        root.style.setProperty('--main-color','red')
        listCont.classList.replace("show", "hide")
        input.placeholder = "Who are you?"
        
        startBtn.classList.replace("show", "hide")
        newBtn.classList.replace("hide", "show")
        sideBar.classList.replace("show","hide")

        input.removeEventListener("keyup", printNames)
        input.addEventListener('keyup', showName)
    }else{
        alert("The app is not started")
    }
}


// ----------------- Result ------------------ //


// Event Listeners
startBtn.addEventListener("click", randomFriend)
newBtn.addEventListener("click", newFriend)


// Functions
function randomFriend(e){
    root.style.setProperty('--main-color','#e03838')
    listCont.classList.replace("show", "hide")
    input.placeholder = "Who are you?"

    startBtn.classList.replace("show", "hide")
    newBtn.classList.replace("hide", "show")

    input.removeEventListener("keyup", printNames)
    input.addEventListener('keyup', showName)
    matches = createSantas()
}

function showName(e){
    if(e.keyCode === 13){
        newFriend()
        displayFriend()
    }
}

function createSantas(e){
    const randomNames = shuffle(names);
    const matches = randomNames.map((name, index) => {
        return {
          santa: name,
          receiver: randomNames[index + 1] || randomNames[0],
        } 
    });

    console.log(matches);
    return matches
}

function displayFriend(){
    let textInput = input.value
    let index, aux
    aux = textInput.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    for(let i = 0; i<matches.length; i++){
        if(matches[i].santa == aux.toUpperCase()){
            index = i;
            console.log(index);
            resultName.textContent  = matches[i].receiver[0] + matches[i].receiver.substring(1).toLowerCase()
        }
    }

}

function error(){
    alert(input.value + " not found")
}

function newFriend(e){
    let textInput = input.value, aux
    aux = textInput.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    if(names.includes(aux.toUpperCase())){
        if(resultCont.classList.contains("hide")){
            resultCont.classList.replace("hide","show")
        }else{
            resultCont.classList.replace("show","hide")
            input.value = ''
        }
    }else{
        error()
    }
}
// .