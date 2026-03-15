const game = {

hpA:2000,
hpB:2000,

moveA:null,
moveB:null,

round:1,
maxRound:5

}

/* 顯示元素 */

const statusA = document.getElementById("statusA")
const statusB = document.getElementById("statusB")
const roundInfo = document.getElementById("roundInfo")

/* 階段顯示 */

function setPhase(icon){

document.getElementById("phaseA").innerText = icon
document.getElementById("phaseB").innerText = icon

}

setPhase("✊")

/* 傷害顯示 */

function showDamage(player,amount){

let el = document.getElementById("damage"+player)

el.innerText = "-" + amount

el.classList.remove("show")
void el.offsetWidth
el.classList.add("show")

}

/* HP更新 */

function updateHP(){

document.getElementById("hpA").style.width = (game.hpA/2000*100) + "%"
document.getElementById("hpB").style.width = (game.hpB/2000*100) + "%"

}

/* 技能高亮 */

function highlightMove(player,move){

let pad = document.getElementById("pad"+player)

pad.querySelectorAll(".skill").forEach(s=>{
s.classList.remove("selected")
})

let btn = pad.querySelector(`[data-move="${move}"]`)

if(btn){
btn.classList.add("selected")
}

}

/* 更新玩家狀態 */

function updateStatus(){

statusA.innerText = game.moveA ? "已選：" + emoji(game.moveA) : "未選擇"
statusB.innerText = game.moveB ? "已選：" + emoji(game.moveB) : "未選擇"

}

/* move轉emoji */

function emoji(move){

if(move==="rock") return "👊"
if(move==="paper") return "🖐"
if(move==="scissors") return "✌️"

return "?"

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
highlightMove("A",move)

}

if(player==="fistB"){

game.moveB = move
highlightMove("B",move)

}

updateStatus()

checkRound()

}

/* 檢查是否兩人出招 */

function checkRound(){

if(game.moveA && game.moveB){

setTimeout(resolveRound,500)

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

highlightMove("A",null)
highlightMove("B",null)

updateStatus()

game.round++

roundInfo.innerText = "Round " + game.round

checkGameEnd()

}

/* 檢查遊戲結束 */

function checkGameEnd(){

if(game.hpA<=0 || game.hpB<=0 || game.round>game.maxRound){

let winner="平手"

if(game.hpA>game.hpB) winner="玩家A勝利"
if(game.hpB>game.hpA) winner="玩家B勝利"

setTimeout(()=>{
alert("遊戲結束\n"+winner)
location.reload()
},600)

}

}

/* 初始化 */

enableDrag("fistA")
enableDrag("fistB")

updateHP()
updateStatus()

roundInfo.innerText = "Round 1"
