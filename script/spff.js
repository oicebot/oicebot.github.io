//参考了CSDN上的代码
//作者：LeetCoder 
//来源：CSDN 
//原文：https://blog.csdn.net/baozhiqiangjava/article/details/80212965 

var divString ='<div class="rows">'+
'    <h3><span class="result_title"></span></h3>'+
'    <div class="details">'+
'        <span class="date span">时间:<span></span></span><br>'+
'        <span class="id span">ID:<span></span></span>'+
'    </div>'+
'</div>';

function getContent(){
	$("result1").empty();
	var url="http://spfftmp.campanula.wang/REQ_SEARCH_BY_TIME";
	var message = 'data={"limit_year_time":"2019"}';
	$(function(){
		$.getJSON(url,message,function(data){
			parseContent(data);
		})
	});
}

function parseContent(data){
	//console.log(data);
	var rows = data.data.result_list;
	//console.log(rows);
	for (var i=0;i<rows.length;i++) {
		createDiv(rows[i]);
	}
}

function createDiv(data){
	$div=$(divString);
	$div.find('.result_title').html("<a href='/spffDetail?id="+data.case_id+"'>"+ data.title + "</a>");
	$div.find('.date span').html(data.ctime);
	$div.find('.id span').html(data.case_id);

	$div.appendTo( $('div#result1') );
	//console.log('div inserted');
}

getContent();
