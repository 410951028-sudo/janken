const game = {

hpA:2000,
hpB:2000,

moveA:null,
moveB:null,

}

/* 階段顯示 */

function setPhase(icon){

document.getElementById("phaseA").innerText = icon
document.getElementById("phaseB").innerText = icon

}

setPhase("✌️")

/* 傷害顯示 */

function showDamage(player,amount){

let el = document.getElementById("damage"+player)

el.innerText = amount

el.classList.remove("show")

void el.offsetWidth

el.classList.add("show")

}

/* 拖曳系統 */

function enableDrag(fistId){

const fist = document.getElementById(fistId)

let startX=0
let startY=0

fist.addEventListener("pointerdown",e=>{

startX=e.clientX
startY=e.clientY

fist.setPointerCapture(e.pointerId)

})

fist.addEventListener("pointerup",e=>{

let dx=e.clientX-startX
let dy=e.clientY-startY

let move = detectDirection(dx,dy)

if(move){

console.log("出招:",move)

triggerMove(fistId,move)

}

})

}

/* 判斷拖曳方向 */

function detectDirection(dx,dy){

const threshold=40

if(Math.abs(dx)<threshold && Math.abs(dy)<threshold){
return null
}

if(Math.abs(dx)>Math.abs(dy)){

if(dx>0){
return "scissors"
}else{
return "rock"
}

}else{

if(dy<0){
return "paper"
}else{
return "rock"
}

}

}

/* 玩家出招 */

function triggerMove(player,move){

if(player==="fistA"){

game.moveA = move
console.log("玩家A出",move)

}

if(player==="fistB"){

game.moveB = move
console.log("玩家B出",move)

}

checkRound()

}

/* 檢查是否兩人出招 */

function checkRound(){

if(game.moveA && game.moveB){

setTimeout(resolveRound,300)

}

}

/* 剪刀石頭布判定 */

function judge(a,b){

if(a===b) return "draw"

if(
(a==="rock" && b==="scissors")||
(a==="scissors" && b==="paper")||
(a==="paper" && b==="rock")
){
return "A"
}

return "B"

}

/* 結算回合 */

function resolveRound(){

const result = judge(game.moveA,game.moveB)

let damage = 700

if(result==="A"){

game.hpB -= damage
showDamage("B",damage)

}

if(result==="B"){

game.hpA -= damage
showDamage("A",damage)

}

updateHP()

game.moveA=null
game.moveB=null

}

/* 更新血量 */

function updateHP(){

document.getElementById("hpA").style.width = game.hpA/20 + "%"
document.getElementById("hpB").style.width = game.hpB/20 + "%"

}

/* 初始化 */

enableDrag("fistA")
enableDrag("fistB")

updateHP()