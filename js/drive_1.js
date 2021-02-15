
var mvLeft = false;
var mvRight = false;

var rotKorp = 0;
var rotKoles = 0;

var rotKolesSpeed = 3;
var rotKorpSpeed = .8;
var rotKorpMove = 1.08

var maxKorpRot = 93.2;

var moveSpeed = 2;
var moveFallSpeed = 1;
var poseX =  500;

var scrollX = 0;

var winW = 0;
var winH = 0;

var fall = false;
var reStarted = false;

var rekord = -1000;

window.addEventListener("load", function() {
	
	var robot = document.getElementById("robot");
	var korpus = document.getElementById("korpus");
	var koleso = document.getElementById("koleso");
	var flagRekord = document.getElementById("flag_rekord");
	flagRekord.style.left = rekord + 500 + "px";
	
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
	
	anim();
	winSize();
	
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
		
		if((poseX - 500 > rekord) && (poseX > 700)) rekord = poseX - 500;
		
		window.setTimeout( function() { reStart() }, 1500 );
		
		reStarted = true;
		
	}
	
	robot.style.left = poseX + "px";
	koleso.style.transform = "rotate(" + rotKoles + "deg)";
	korpus.style.transform = "rotate(" + rotKorp + "deg)";
	
	if(scrollX < poseX-(winW/2)+0) scrollX++;
	if(scrollX > poseX-(winW/2)+200) scrollX--;
	window.scroll(scrollX, 0);
	
}

function winSize() {
	
	winW = document.documentElement.clientWidth;
	winH = document.documentElement.clientHeight;
	
}

function reStart() {
	
	mvLeft = false;
	mvRight = false;
	
	rotKorp = 0;
	rotKoles = 0;
	
	moveSpeed = 2;
	poseX =  500;
	
	scrollX = 0;
	
	fall = false;
	reStarted = false;
	
	document.getElementById("flag_rekord").style.left = rekord + 500 + "px";
	
}

