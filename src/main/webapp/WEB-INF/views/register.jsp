<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<title>用户注册</title>

<!-- js -->
<script src="js/jquery.min.js"></script>
<script src="js/auth/supersized.3.2.7.min.js"></script>
<script src="js/auth/supersized-init.js"></script>
<script src="js/auth/scripts.js"></script>

<!-- CSS -->
<link rel='stylesheet'
	href='http://fonts.googleapis.com/css?family=PT+Sans:400,700'>
<link rel="stylesheet" href="css/auth/reset.css">
<link rel="stylesheet" href="css/auth/supersized.css">
<link rel="stylesheet" href="css/auth/style.css">
<link rel="stylesheet" href="css/auth/register.css">

</head>

<body>

	<div id="header">
		<a href="https://meiqia.com"><image src="images/auth/logo.png"></a>
	</div>
	<div id="register" class="container">
            <h1>用户注册</h1>
            <form class="form-signup" method="post">
                <div class="form-group">
                    <h3>企业名称</h3>
                    <input id="fullname" class="form-control" type="text" placeholder="请填写你的企业名称，例如：苹果公司">
                </div>

                <div class="form-group clearfix">
                    <h3>AppId</h3>
                    <input id="email" class="form-control" type="email" placeholder="例如：123456789">
                </div>

                <div class="form-group clearfix">
                    <h3>AppKey</h3>
                    <input id="email" class="form-control" type="email" placeholder="例如：123456789">
                </div>

                <div id="phone" class="form-group clearfix">
                    <h3>登录邮箱</h3>
                    <input id="email" class="form-control" type="email" placeholder="例如：xiaoming@qq.com">
                </div>
                
                <div id="phone" class="form-group clearfix">
                    <h3>密码</h3>
                    <input id="password" class="form-control" type="password" placeholder="********">
                </div>

                <!-- <div id="captchaHolder" class="clearfix">
                    <h3>验证码</h3>
                    <div class="form-group captcha pull-left">
                        <input id="captcha" class="form-control" type="text" placeholder="请输入右侧的验证码">
                    </div>
                    <img id="captchaImg" class="pull-right" src="" alt="点击刷新验证码">
                </div> -->
                <input id="source" type="hidden" value="" />
                <button id="registerBtn">立即注册<div class="notice"></div></button>
                <label id="agreement"> 点击立即注册即表示你已阅读并同意《美洽服务条款》 </label>
            </form>
        </div>
	<div align="center" class="brand">
		<p>© 美信客服</p>
	</div>

</body>
</html>