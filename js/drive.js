
var i = 0;

var mvLeft = false;
var mvRight = false;

var rotKorp = 0;
var rotKoles = 0;

var rotKolesSpeed = 3;
var rotKorpSpeed = .9;
var rotKorpMove = 1.06;

var maxKorpRot = 93.2;

var moveSpeed = 2;
var moveFallSpeed = 1;
var poseX =  0;

var scrollX = 0;

var winW = 0;
var winH = 0;

var fall = false;
var reStarted = false;

var rekord = -1000;

var cm = 0;

var started = false;

znv = 0;
znvM = 1;

window.addEventListener("resize", function() { winSize(); reStart(); }, false);

document.addEventListener('touchstart', function(event) {
	for(i=0; i<event.touches.length; i++) {
		if(event.touches[i].pageX > winW/2) mvRight = true;
		else mvLeft = true;
	}
	event.preventDefault();
}, false);
document.addEventListener('touchend', function() {
	mvRight = false;
	mvLeft = false;
	event.preventDefault();
}, false);

window.addEventListener("load", function() {
	
	if(localStorage.getItem("used") == "true") rekord = parseInt(localStorage.getItem("rekord"));
	
	var robot = document.getElementById("robot");
	var korpus = document.getElementById("korpus");
	var koleso = document.getElementById("koleso");
	var ground = document.getElementById("ground");
	var flagStart = document.getElementById("flag_start");
	var flagRekord = document.getElementById("flag_rekord");
	var zanaves = document.getElementById("zanaves");
	var zanavesMain = document.getElementById("zanavesMain");
	//flagRekord.style.left = rekord + 500 + "px";
	var text = document.getElementById("text");
	
	window.addEventListener("keydown", function(e) {
		
		if(e.which == 65) {mvLeft = true;}
		if(e.which == 68) {mvRight = true;}
		if(e.which == 37) {mvLeft = true;}
		if(e.which == 39) {mvRight = true;}
		
	}, false);
	
	window.addEventListener("keyup", function(e) {
		
		if(e.which == 65) {mvLeft = false;}
		if(e.which == 68) {mvRight = false;}
		if(e.which == 37) {mvLeft = false;}
		if(e.which == 39) {mvRight = false;}
		
	}, false);
	
	winSize();
	anim();
	
	window.setTimeout( function() { started = true }, 3000);
	
}, false);

function anim() {
	requestAnimationFrame(anim);
	
	if(mvRight) { rotKoles += rotKolesSpeed; rotKorp -= rotKorpSpeed; poseX += moveSpeed; }
	if(mvLeft) { rotKoles -= rotKolesSpeed; rotKorp += rotKorpSpeed;  poseX -= moveSpeed; }
	
	rotKorp *= rotKorpMove;
	
	if(rotKorp > maxKorpRot) { rotKorp = maxKorpRot; fall = true }
	if(rotKorp < maxKorpRot * (-1)) { rotKorp = maxKorpRot * (-1); fall = true; }
	
	if(fall && !reStarted) {
		moveSpeed = moveFallSpeed;
		if((poseX - winH/2 > rekord) && (poseX + scrollX > winH*1.1)) {
			rekord = (poseX - winH/2);
			localStorage.setItem("used", true);
			localStorage.setItem("rekord", rekord);
		}
		window.setTimeout( function() { reStart() }, 1500 );
		reStarted = true;
	}
	
	if(poseX < winH/4) window.setTimeout( function() { reStart() }, 1500 );
	
	robot.style.left = poseX - scrollX + "px";
	koleso.style.transform = "rotate(" + rotKoles + "deg)";
	korpus.style.transform = "rotate(" + rotKorp + "deg)";
	
	if(scrollX < poseX-(winH/2)) scrollX++;
	if(scrollX > poseX-(winH/2)) scrollX--;
	
	ground.style.backgroundPosition = scrollX * (-1) + "px 0";
	document.getElementById("flag_start").style.left = winH/2 + winH/12 - scrollX + "px";
	document.getElementById("flag_rekord").style.left = winH/2 + winH/12 + rekord - scrollX + "px";
	
	text.innerHTML = "дистанция: " + Math.floor((poseX-(winH/2)) / cm) + " см";
	if(rekord > 0) text.innerHTML += ", рекорд: " + Math.floor((rekord) / cm) + " см";
	
	znv -= .01;
	if(started) znvM -= .03;
	if(znv < 0) znv = 0;
	zanaves.style.opacity = znv;
	zanavesMain.style.opacity = znvM;
	
}

function winSize() {
	
	winW = document.documentElement.clientWidth;
	winH = document.documentElement.clientHeight;
	
	cm = (winH - (winH/6)) / 30;
	
	robot.style.width = winH/6 + "px";
	robot.style.height = winH/6 + "px";
	robot.style.top = winH/1.5 + "px";
	korpus.style.width = winH/6 + "px";
	korpus.style.height = winH - (winH/6) + "px";
	korpus.style.top = (winH) * (-.5) + "px";
	koleso.style.width = winH/6 + "px";
	koleso.style.height = winH/6 + "px";
	
	ground.style.height = winH/2 + "px";
	ground.style.top = (winH/1.53 +  winH)/2 - 3 + "px";
	ground.style.backgroundSize = "auto " + winH + "px";
	document.getElementById("flag_start").style.bottom = winH/6 + "px";
	document.getElementById("flag_start").style.left = winH/2 + winH/12 + "px";
	document.getElementById("flag_start").style.height = (winH/3) * 1.2 + "px";
	document.getElementById("flag_start").style.width = (winH/4) * 1.2 + "px";

	document.getElementById("flag_rekord").style.bottom = winH/6 + "px";
	document.getElementById("flag_rekord").style.left = rekord + "px";
	document.getElementById("flag_rekord").style.height = (winH/3) * 1.2 + "px";
	document.getElementById("flag_rekord").style.width = (winH/4) * 1.2 + "px";
	
	
	text.style.fontSize = winW/25 + "px";
	
	poseX = winH / 2;
	moveSpeed = winH / 200;
	moveFallSpeed = moveSpeed/2;
	
}

function reStart() {
	
	mvLeft = false;
	mvRight = false;
	
	rotKorp = 0;
	rotKoles = 0;
	
	znv = 1;
	
	moveSpeed = winH / 200;
	poseX = winH / 2;
	
	scrollX = 0;
	
	fall = false;
	reStarted = false;
	
	document.getElementById("flag_rekord").style.left = winH/2 + rekord + "px";
	
}
