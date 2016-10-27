<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
<title>登录</title>

<!-- CSS -->
<!-- <link rel='stylesheet'
	href='http://fonts.googleapis.com/css?family=PT+Sans:400,700'> -->
<link rel="stylesheet" href="css/auth/reset.css">
<link rel="stylesheet" href="css/auth/supersized.css">
<link rel="stylesheet" href="css/auth/style.css">
<link rel="stylesheet" href="css/auth/login.css">
<link rel="stylesheet" href="global/toastr/toastr.css">

<!-- js -->
<script src="js/jquery.min.js"></script>
<script src="js/auth/supersized.3.2.7.min.js"></script>
<!-- <script src="js/auth/supersized-init.js"></script> -->
<script type="text/javascript" src="global/toastr/toastr.js"></script>
<script type="text/javascript" src="js/auth/login.js"></script>

<script type="text/javascript">
if (window != top) 
	top.location.href = location.href; 
</script>

</head>

<body>

	<div class="page-container">
		<h1>IM-WEB</h1>
		<form id="login_form">
			<input type="text" name="username" class="username" placeholder="用户名" id="username"> 
			<input type="password" name="password" class="password" placeholder="密码" id="password">
			<button type="button" id="submit" >登录</button>
			<div class="error">
				<span>+</span>
			</div>
		</form>
	</div>
	<div align="center" class="brand">
		<p>© 美信网络</p>
	</div>

</body>
</html>