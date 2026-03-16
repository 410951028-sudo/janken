let hpA = 2000
let hpB = 2000

let moveA = null
let moveB = null

let phaseList = ["✌️","✊","🖐️"]
let phaseIndex = 0

function updateUI(){
document.getElementById("hpA").innerText = hpA
document.getElementById("hpB").innerText = hpB
document.getElementById("phase").innerText = phaseList[phaseIndex]
}

function attack(player){

if(player == "A") moveA = "attack"
if(player == "B") moveB = "attack"

checkResolve()

}

function defend(player){

if(player == "A") moveA = "defend"
if(player == "B") moveB = "defend"

checkResolve()

}

function checkResolve(){

if(moveA && moveB){
resolveBattle()
}

}

function resolveBattle(){

if(moveA == "attack" && moveB != "defend"){
hpB -= 300
vibrate()
}

if(moveB == "attack" && moveA != "defend"){
hpA -= 300
vibrate()
}

moveA = null
moveB = null

nextPhase()

updateUI()

checkWin()

}

function nextPhase(){

phaseIndex++

if(phaseIndex > 2){
phaseIndex = 0
}

}

function checkWin(){

if(hpA <= 0){
alert("玩家B勝利")
resetGame()
}

if(hpB <= 0){
alert("玩家A勝利")
resetGame()
}

}

function resetGame(){

hpA = 2000
hpB = 2000
phaseIndex = 0
updateUI()

}

function vibrate(){

if(navigator.vibrate){
navigator.vibrate(100)
}

}

updateUI()
