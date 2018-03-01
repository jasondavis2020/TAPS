var __theapp = $.Deferred();
$(function(){
	var me = {};
	me.appid="TRACEPROTECTION";
	me.uploadURL="//traceprotection.com/_json";
	me.cdn="//traceprotection.com";
	me.mobile=false;
	me.goto=function(url){
		window.location = url;
	}
	me.jumpto=function(h){
		var url = location.href;
		location.href = h;
		history.replaceState(null,null,url); 
	}
	me.clearsession = function() {
		me.storage.removeAll();
		$.removeCookie('us',{path:'/'});
		me.userstore = {};
	}
	me.logoff = function() {
		me.storage.removeAll();
		$.removeCookie('us',{path:'/'});
		window.location = "/";
	}
	me.ajax = function(obj, url, showloading, baseurl) {
		baseurl = baseurl?baseurl:"//traceprotection.com/_json";
		url = baseurl + url;
		if (typeof obj !== 'object') obj = {"i":obj};
		if (me.userstore) obj.us=me.userstore;
		var deferred = $.Deferred();
		var ajaxpromise = $.ajax({
			url:url,
			type:'POST',
			data:{json:JSON.stringify(obj)},
			dataType:'json',
			beforeSend:function(){
				//if (showloading) me.loading();
			},
			complete:function(){
				//if (showloading) me.removeLoading();
			}
		});
		$.when(ajaxpromise).done(function(data){
			//console.log(data);
			if (data.rstatus == "00")
				deferred.resolve(data);
			else if (data.rstatus == "-1")
				me.logoff();
			else
				deferred.reject(data);
		});
		return deferred.promise();		
	}
	me.sessionBasedMenu=function(curuser){
	}
	me.qs=function(){
		if (me.saveqs) return me.saveqs;
		me.saveqs = [];
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(m,key,value){me.saveqs[key] = value});
		return me.saveqs;
	}
	me.getCenteredPosition=function(elWidth,elHeight){
		var viewportHeight=window.innerHeight||document.documentElement.clientHeight,
			viewportWidth=window.innerWidth||document.documentElement.clientWidth,
			viewportLeft=window.screenX||window.screenLeft,
			viewportTop=window.screenY||window.screenTop;
		return{
			left:viewportLeft+~~(viewportWidth/2)-~~(elWidth/2),
			top:viewportTop+~~(viewportHeight/2)-~~(elHeight/2)
		};
	}
	me.checkMobile=function(){
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?me.mobile=true:me.mobile=false;
	}
	me.paypal=function(data){
		if (!data.paypalurl || !data.paypal) return;
		var tmpl = '';
		tmpl += '<form action="'+data.paypalurl+'" method="post" id="ppform">';
		tmpl += '<input type="hidden" name="cmd" value="_s-xclick">';
		tmpl += '<input type="hidden" name="encrypted" value="'+data.paypal+'">';
		tmpl += '</form>';
		$('body').append(tmpl);
		$('#ppform').submit();		
	}
	me.checkMobile();
	__theapp.resolve(me);
	return me;
});
var app_debug = false;
function htmlEscape(str){
	return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function debug(str){
	if (!app_debug) return;
	if (!$('#debug_div').length) $('.container_body').append('<div id="debug_div" style="display:none"></div>');
	$('#debug_div').prepend("<p>" + str + "</p>");
}
function ceilNearest(i,v){
	return Math.ceil(i/v) * v;
}
function floorNearest(i,v){
	return Math.floor(i/v) * v + 1;
}