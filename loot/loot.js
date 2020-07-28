
function emptyResults(target) {
	if (target) {
		document.getElementById(target).innerHTML = "";
	} else {
		document.getElementById("loot_result").innerHTML = "";
	}
}

function appendWords(item_content,class_name,item_target) {
    var spn = document.createElement('div');
    spn.setAttribute("class",class_name);
    var childNode = document.createElement("p");
    childNode.innerHTML = item_content;
    spn.appendChild(childNode);
	document.getElementById(item_target).appendChild(spn);
	spn = null;
}

Math.seed = 5;
Math.seededRandom = function(max, min) {
    max = max || 1;
    min = min || 0;
 
    Math.seed = (Math.seed * 7141 + 54773) % 259200;
    var rnd = Math.seed / 259200.0;
 
    return Math.floor( min + rnd * (max - min) );   //向下取整
};

function getDateNum() {
	var date = new Date();
	var year = date.getFullYear(); //获取完整的年份(4位)
	var month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
	var day = date.getDate(); //获取当前日期
	if (month <= 9) {
		month = "0" + month;
	}
	if (day <= 9) {
		day = "0" + day;
	}
	var currentdate = year + month + day;
	return parseInt(currentdate);
}


function nameToInt(name) {
    var unicodeID = escape(name).split("%u");
    var num = 0;
    for (i in unicodeID) {
        var c = parseInt("0x"+unicodeID[i]);
        if (!c) {
            c = 0
        }
        num += c;
    }
    return num;
}

function displayLootResult() {
    var name = document.getElementById("name").value;
    var num1 = nameToInt(name);
    var num2 = getDateNum();
    var result;
    var imgName;
    var z = true;
    if (document.getElementById("aq20").checked) {
        var lootData = aq20_data;
        var dungeonName = "安其拉废墟";
    }
    else if (document.getElementById("aq40").checked) {
        var lootData = aq40_data;
        var dungeonName = "安其拉神殿";
    }
    else {
        var lootData = bwl_data;
        var dungeonName = "黑翼之巢";
    }
    document.getElementById("loot_result").innerHTML = "";
    document.getElementById("information").innerHTML = "<center><h3>预测今天<span style='color:yellow'>" + name + "</span>在<span style='color:yellow'>" + dungeonName + "</span>：</h3></center><br>";
        
    Math.seed = num1+num2;

    for (i = 0; i<lootData["bossNum"];i++) {
        var currentBossName = lootData["bossName"][i];
        appendWords("<b>" + currentBossName + "</b>","boss","loot_result");
        for (var key in lootData[currentBossName]) {
            var currentLootList = lootData[currentBossName][key];
            result = currentLootList[Math.seededRandom(0,currentLootList.length)];
            z = true;
            
            if (result.length > 0) {

                if (result[result.length-1] == 'b') {
                    z = false;
                    result = result.substr(0,result.length-1);
                }
                var prefixP = "<span style='display:inline-block; vertical-align:middle;color:blue; padding-left:0.5rem'>";
                if (z) {
                    prefixP = "<span style='display:inline-block; vertical-align:middle;color:purple;padding-left:0.5rem'>";
                }
                
                if (icon_pair[result]) {
                    imgName = icon_pair[result] + ".png"
                    imgName = '<img align="middle" src="https://cdn.jsdelivr.net/gh/oicebot/oicebot.github.io/loot/icons/' + imgName + '" />'
                }

                appendWords(imgName + prefixP + result + "</span>","item","loot_result");
            }
        }

    }

    appendWords("<b>小怪掉落</b>","boss","loot_result");
    var mobItemNum = Math.seededRandom(0, Math.ceil(lootData["bossNum"]/2+1));
    for (i=0;i<mobItemNum;i++) {
        result = lootData["小怪掉落"]["loot0"][Math.seededRandom(0,lootData["小怪掉落"]["loot0"].length)];
        z = true;
        if (result.length > 0) {
            if (result[result.length-1] == 'b') {
                z = false;
                result = result.substr(0,result.length-1);
            }
            var prefixP = "<span style='display:inline-block; vertical-align:middle;color:purple;padding-left:0.5rem'>";
            if (!z) {
                prefixP = "<span style='display:inline-block; vertical-align:middle;color:blue;padding-left:0.5rem'>";
            }
            if (icon_pair[result]) {
                imgName = icon_pair[result] + ".png"
                imgName = '<img align="middle" src="https://cdn.jsdelivr.net/gh/oicebot/oicebot.github.io/loot/icons/' + imgName + '" />'
            }

            appendWords(imgName + prefixP + result + "</span>","item","loot_result");
        }
    }

}
