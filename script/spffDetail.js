//参考了 cnblogs 上的代码
//作者：像风一样
//原文：https://www.cnblogs.com/yueshutong/p/9442118.html


/**
 * 获取URL参数
 * @param 参数名
 * @returns 参数值
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

function getContent(id){
	$("post_items").empty();
	var url="http://spfftmp.campanula.wang/REQ_SEARCH_BY_CASE_ID";
	var message = 'data={"case_id":"'+ id +'"}';
	$(function(){
		$.getJSON(url,message,function(data){
			parseContent(data);
		})
	});
}

function parseContent(data){
	//console.log(data);
	var info = data.data;
	document.getElementById("title").innerHTML = info.title;
	document.getElementById("uploader").innerHTML = info.uploader_info["nickname"];
	document.getElementById("date").innerHTML = info.ctime;
	document.getElementById("case_id").innerHTML = info.case_id;
	document.getElementById("content").innerHTML = info.content.split('\n').join('<br>');

	console.log(info.post_items)
	for (var i=0;i<info.post_items.length;i++) {
		createDiv(info.post_items[i]);
	}
}

function createDiv(data){
	var $pics = $("<img src='"+data+"'/><br>");
	console.log("add pic")
	$pics.appendTo( $('div#post_items') );
}

var case_id = GetQueryString("id");

if (case_id!=null&&case_id.length>0) {
	getContent(case_id);

}


