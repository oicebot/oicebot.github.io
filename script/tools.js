//---------- Clock ---------------

var canvas = document.getElementById("clock");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90

function drawClock() {
	drawFace(ctx, radius);
	drawTime(ctx, radius);
	drawNumbers(ctx, radius);
}

function drawFace(ctx, radius) {
	var grad;
	ctx.beginPath();
	ctx.arc(0, 0, radius, 0, 2*Math.PI);
	ctx.strokeStyle = "white";
	ctx.stroke();
	ctx.fillStyle = "black";
	ctx.fill();

}

function drawNumbers(ctx, radius) {
	var ang;
	var num;
	ctx.font = radius*0.15 + "px arial";
	ctx.textBaseline="middle";
	ctx.textAlign="center";

	for(num = 1; num < 13; num++){
		ang = num * Math.PI / 6;
		ctx.rotate(ang);
		ctx.translate(0, -radius*0.8);
		ctx.rotate(-ang);
		ctx.fillText(num.toString(), 0, 0);
		ctx.rotate(ang);
		ctx.translate(0, radius*0.8);
		ctx.rotate(-ang);

		ctx.strokeStyle = "white";
		ctx.lineWidth = 1
		x = Math.sin(ang)*radius;
		y = Math.cos(ang)*radius;
		ctx.moveTo(x,y);
		x = Math.sin(ang)*(radius-6);
		y = Math.cos(ang)*(radius-6);
		ctx.lineTo(x,y);
		ctx.stroke();


	}
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07, "#f2f2f2");
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07, "#f2f2f2");
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02, "#ff3300");

	ctx.beginPath();
	ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
	ctx.fillStyle = '#CCC';
	ctx.fill();
}

function drawHand(ctx, pos, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
	ctx.strokeStyle = color;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}


function printTime() {
    var time = new Date();
    var hours = time.getHours();
    if (hours<9) { hours = "0"+hours; }
    var mins = time.getMinutes();
    if (mins<9) { mins = "0"+mins; }
    var secs = time.getSeconds();
    if (secs<9) { secs = "0"+secs; }
    var out_text = hours+":"+mins+":"+secs;
	var target_div = document.getElementById("time")
	target_div.innerHTML = "<big><b>"+out_text+"</b></big>";
}

setInterval(printTime,1000);
setInterval(drawClock,1000);

function emptyResults(target) {
	if (target) {
		//document.getElementById("date_result").innerHTML = "";
	} else {
		document.getElementById("date_result").innerHTML = "";
	}
}

function appendWords(item_content,item_target) {
	var spn = document.createElement('p');
	spn.appendChild(document.createTextNode(item_content));
	document.getElementById(item_target).appendChild(spn);
	spn = null;
}

function formatDate(date1) {
    return date1.getFullYear() + '年' + (date1.getMonth()+1) + '月' + date1.getDate()+'日';
}


function displayDateResult() {
    var text1 = document.getElementById("date1").value;
    var checked = document.getElementById("radio1").checked;
    var text2 = '';
    var result;
    if (checked) {
        text2 = document.getElementById("date2").value;
        
        result = calcDate(text1,text2);
        result = '两个日期间相差 ' + result + ' 天';

    }
    else {
        text2 = document.getElementById("days").value;

        var date0 = new Date(text1 + ' GMT-0800');
        var tdate0 = formatDate(date0);
        date0.setDate(date0.getDate() + parseInt(text2));
        result = tdate0 +  ' 过 ' + text2 + ' 天是： ' + formatDate(date0);
     
    }

    appendWords(result,"date_result");

}

function calcDate(text1,text2) {
    var date1 = new Date(text1 + ' GMT-0800');
    var date2 = new Date(text2 + ' GMT-0800');

    return Math.abs(date1-date2) / 3600 / 24 / 1000;


}