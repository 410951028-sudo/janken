<!DOCTYPE html>
<html lang="zh-TW">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>操作盤測試</title>

<style>

body{
margin:0;
height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:#111;
color:white;
font-family:sans-serif;
}

#pad{
width:220px;
height:220px;
border-radius:50%;
background:#222;
position:relative;
touch-action:none;
}

.dir{
position:absolute;
width:70px;
height:70px;
background:#444;
border-radius:12px;
display:flex;
align-items:center;
justify-content:center;
font-size:24px;
}

#up{top:10px;left:75px}
#down{bottom:10px;left:75px}
#left{left:10px;top:75px}
#right{right:10px;top:75px}

#center{
position:absolute;
width:80px;
height:80px;
left:70px;
top:70px;
background:#666;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
font-size:20px;
}

#trail{
position:absolute;
left:0;
top:0;
width:100%;
height:100%;
pointer-events:none;
}

.active{
background:#0af;
}

#log{
position:absolute;
bottom:40px;
font-size:22px;
}

</style>

</head>

<body>

<div id="pad">

<canvas id="trail"></canvas>

<div id="up" class="dir">↑</div>
<div id="down" class="dir">↓</div>
<div id="left" class="dir">←</div>
<div id="right" class="dir">→</div>

<div id="center">●</div>

</div>

<div id="log">等待操作</div>

<script>

const pad = document.getElementById("pad")

const dirs = {
up:document.getElementById("up"),
down:document.getElementById("down"),
left:document.getElementById("left"),
right:document.getElementById("right")
}

const canvas = document.getElementById("trail")
const ctx = canvas.getContext("2d")

canvas.width = pad.offsetWidth
canvas.height = pad.offsetHeight

let centerX = 0
let centerY = 0
let current = "center"

function vibrate(ms){
if(navigator.vibrate) navigator.vibrate(ms)
}

function clearActive(){
for(let d in dirs){
dirs[d].classList.remove("active")
}
}

pad.addEventListener("touchstart",e=>{

const rect = pad.getBoundingClientRect()

centerX = rect.left + rect.width/2
centerY = rect.top + rect.height/2

current = "center"

vibrate(20)

})

pad.addEventListener("touchmove",e=>{

const t = e.touches[0]

let dx = t.clientX - centerX
let dy = t.clientY - centerY

let dist = Math.sqrt(dx*dx + dy*dy)

if(dist < 30){

clearActive()
current="center"

ctx.clearRect(0,0,canvas.width,canvas.height)

return

}

/* 最大拖曳距離 */

let max = 80

if(dist > max){
dx = dx / dist * max
dy = dy / dist * max
}

/* 畫拖曳線 */

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.beginPath()

ctx.moveTo(canvas.width/2,canvas.height/2)

let localX = canvas.width/2 + dx
let localY = canvas.height/2 + dy

ctx.lineTo(localX,localY)

ctx.lineWidth = 6
ctx.strokeStyle = "#0af"
ctx.stroke()

/* 角度判定 */

let angle = Math.atan2(dy,dx) * 180 / Math.PI

let dir

if(angle >= -45 && angle <= 45){
dir="right"
}
else if(angle > 45 && angle < 135){
dir="down"
}
else if(angle >= 135 || angle <= -135){
dir="left"
}
else{
dir="up"
}

if(dir !== current){

current = dir

clearActive()

dirs[dir].classList.add("active")

vibrate(10)

}

})

pad.addEventListener("touchend",e=>{

document.getElementById("log").innerText =
"技能: " + current

vibrate(30)

clearActive()

ctx.clearRect(0,0,canvas.width,canvas.height)

current="center"

})

</script>

</body>

</html>
