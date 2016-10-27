<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" href="global/imageViewer/viewer.css">
<script src="js/jquery.min.js"></script>
<script type="text/javascript" src="global/imageViewer/viewer.js"></script>
</head>
<script type="text/javascript">
$(function(){
	$('.image').viewer();

	//View some images
	$('.images').viewer();
})

function add(){
	$('#aaaa').html('<img class="image" src="images/touxiang.jpg" alt="Picture">'
	+'<img class="image" src="images/touxiang.jpg" alt="Picture">');
}
</script>
<body>
	<input type="button" onclick="add()">
	<div id="aaaa">
	</div>

	<div>
		<ul class="images">
			<li><img src="images/touxiang.jpg" alt="Picture"></li>
			<li><img src="images/touxiang.jpg" alt="Picture 2"></li>
			<li><img src="images/touxiang.jpg" alt="Picture 3"></li>
		</ul>
	</div>
</body>
</html>