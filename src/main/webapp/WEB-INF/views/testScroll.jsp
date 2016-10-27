<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>美信客服</title>
</head>
<script src="js/jquery.min.js"></script>
<script type="text/javascript">
$(function(){
	$('#b').click(function(){
		$('#d').append("hello world");
		var c = $("#d").height();
		$("#a").scrollTop(c); 
	})
})
</script>
<body>
	<button type="button" id="b">按钮</button>
	<div id="a" style="width:100px;height:100px;border: solid;overflow-y: auto;">
	<div id="d"></div></div>
</body>
</html>