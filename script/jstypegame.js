
function hidebg() {
    $('.bg').hide('slow');
}

function hideintro() {
    $('#intro').fadeOut('slow');
}


$(window).keydown(function(e){
    console.log(e.code + " " + e.keyCode + " ");
    if (PLAYING) {
        if (e.keyCode <= 90 && e.keyCode >=65) {
            var blocklist = document.getElementsByClassName("block");
            hit = 0;
            for (i=0;i<blocklist.length;i++) {
                var item = blocklist[i];
                //console.log(item.innerText);
                if (item.innerText.charCodeAt(0) == e.keyCode) {
                    item.parentNode.removeChild(item);
                    hit += 1;
                }

            }
            if (hit <1) {
                SCORE -=1;
            } else {
                SCORE +=1;
            }
            $('#score').text("分数：" + SCORE);
        }


    } else {
        if (e.keyCode == 13) {   //Enter - start game
            hideintro();
            LIFE = MAXLIFE;
            $('#life').text("生命值：" + '❤️'.repeat(LIFE));
            PLAYING = true;
            window.requestAnimationFrame(moveObject);
            //createBlock();   use setTimeOut
            
        }
    }
    

});

function setLive(num) {
    if (num) {
        MAXLIFE = num;
        LIFE = MAXLIFE;
    }
    $('#life').text("生命值：" + '❤️'.repeat(LIFE));
}

function setSpeed(num) {
    if (num) {
        SPEED = num;
    }
}

function setSpawn(num) {
    if (num) {
        SPAWNGap = num * 1000;
    }
}

function resetTimer() {
    while (TIMEOUTList.length >0) {
        item = TIMEOUTList.pop();
        clearTimeout(item);
    }
    
    createBlock();
    $('#timeoutNumber').text('Timer数：' + TIMEOUTList.length);
}

function settingsClicked() {
    if (SETTING) {
        $('#settings').slideUp('slow');
        SETTING = false;
    } else {
        $('#settings').slideDown('slow');
        SETTING = true;
    }
}

function createBlock() {
    if (PLAYING) {
        var pageWidth = document.documentElement.clientWidth;
        let block = document.createElement("div");
        let face = t.charAt(Math.floor(Math.random() * 26));
        let node=document.createTextNode(face);
        block.appendChild(node);
        block.style.left = (Math.floor(Math.random() * (pageWidth-300)) + 150) + "px";
        block.style.top = "0px";
        block.setAttribute("class","block")
        var element = document.getElementById("field");
        element.appendChild(block);   
    } 
    TIMEOUTList.push(setTimeout("createBlock()", 
                     Math.floor(Math.random() * SPAWNTIME) + SPAWNGap)
                    );
    $('#timeoutNumber').text('Timer数：' + TIMEOUTList.length);
}

function moveObject(timestamp) {
    var blocklist = document.getElementsByClassName("block");
    if (PLAYING) {       

        for (i=0;i<blocklist.length;i++) {
            var item = blocklist[i];
            var top_pos = parseInt(item.style.top) + SPEED;
            if (top_pos >= 680) {
                item.parentNode.removeChild(item);
                LIFE -=1;
                if (LIFE > 0) {
                    $('#life').text("生命值：" + '❤️'.repeat(LIFE));
                } else {
                    $('#life').text("生命值：" + '💀');
                    PLAYING = false;
                    if (SCORE > HIGHSCORE) {
                        HIGHSCORE = SCORE;
                    }
                    SCORE = 0;
                    $('#score').text("分数：" + SCORE);
                    $('#highscore').text("最高分：" + HIGHSCORE);

                    $('#intro').fadeIn('slow');
                }
                                
            } else {
                item.style.top = top_pos + 'px';
            }
           
        }
        
    window.requestAnimationFrame(moveObject);
    } else {
        
        while(blocklist.length > 0){
            blocklist[0].parentNode.removeChild(blocklist[0]);
        }       
    }
}


var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

var PLAYING = false;
var SPEED = 1;
var SCORE = 0;
var HIGHSCORE = 0;
var MAXLIFE = 3;
var LIFE = MAXLIFE;
var TIMEOUTList = [];
var SPAWNTIME = 1500;
var SPAWNGap = 2000;

var start = null;
var intro_element = document.getElementById("intro");

var SETTING = false;
$('#settings').hide();

var pageWidth = document.documentElement.clientWidth;
console.log('pageWidth='+pageWidth)

$('#life').text("生命值：" + '❤️'.repeat(LIFE));

TIMEOUTList.push(setTimeout("createBlock()", 
                            Math.floor(Math.random() * SPAWNTIME) + SPAWNGap)
                );

function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    var centerPos = parseInt((pageWidth - 546) / 2)
    intro_element.style.left = Math.min(progress / 10, centerPos) + 'px';
    if (progress <= centerPos*10) {
        window.requestAnimationFrame(step);
    }
}
 
window.requestAnimationFrame(step);