
let hpA = 2000
let hpB = 2000

let phase = "scissor"

let moveA = null
let moveB = null

let roundActive = false

function updateHP(){

document.getElementById("hpA").style.width = hpA/20+"%"
document.getElementById("hpB").style.width = hpB/20+"%"

}

function setPhase(p){

document.querySelectorAll(".phase div").forEach(e=>e.classList.remove("active"))

if(p==="scissor")document.getElementById("p_scissor").classList.add("active")
if(p==="rock")document.getElementById("p_rock").classList.add("active")
if(p==="paper")document.getElementById("p_paper").classList.add("active")

}

function startRound(){

roundActive = true

phase="scissor"
setPhase("scissor")

setTimeout(()=>{
phase="rock"
setPhase("rock")
},1000)

setTimeout(()=>{
phase="paper"
setPhase("paper")
},2000)

setTimeout(()=>{
resolveRound()
},3000)

}

function resolveRound(){

roundActive=false

let winner = rps(moveA,moveB)

if(winner==="A"){

let dmg = calcDamage(moveA)

hpB -= dmg
showDamage("damageB",dmg)

}

if(winner==="B"){

let dmg = calcDamage(moveB)

hpA -= dmg
showDamage("damageA",dmg)

}

updateHP()

moveA=null
moveB=null

}

function rps(a,b){

if(!a||!b)return null

if(a===b)return null

if(a==="rock"&&b==="scissor")return "A"
if(a==="scissor"&&b==="paper")return "A"
if(a==="paper"&&b==="rock")return "A"

return "B"

}

function calcDamage(move){

let r = Math.random()

if(move==="scissor"){

return r<0.3?900:400

}

if(move==="rock")return 700

if(move==="paper")return 900

}

function showDamage(id,d){

let el=document.getElementById(id)

el.innerText="-"+d

setTimeout(()=>el.innerText="",1000)

navigator.vibrate(100)

}

updateHP()

document.getElementById("center").addEventListener("touchstart",startRound)

document.getElementById("up").onclick=()=>moveA="rock"
document.getElementById("left").onclick=()=>moveA="paper"
document.getElementById("right").onclick=()=>moveA="scissor"
document.getElementById("down").onclick=()=>resolveRound()

document.getElementById("restart").onclick=()=>{

hpA=2000
hpB=2000

updateHP()

}
