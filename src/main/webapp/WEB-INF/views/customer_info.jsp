<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>账户设置</title>
<link href="../bootstrap/css/bootstrap.css" rel="stylesheet">
<script src="../js/jquery.min.js"></script>
<script src="../bootstrap/js/bootstrap.min.js"></script>
<script src="../js/jquery-upload-file/jquery.ui.widget.js"></script>
<script src="../js/jquery-upload-file/jquery.iframe-transport.js"></script>
<script src="../js/jquery-upload-file/jquery.fileupload.js"></script>
</head>
<script>var role=${user.roleLevel}</script>
<body>
	<div class="panel panel-default">
		<!-- <ol class="breadcrumb">
			  <li><span class="glyphicon glyphicon-menu-hamburger"></span><a href="#">账号设置</a></li>
		</ol>  -->
		
		<ul class="nav nav-tabs" role="tablist">
			  <li role="presentation" class="active"><a href="#home" role="tab" data-toggle="tab">基本信息</a></li>
			  <c:if test="${user.roleLevel==1 }">
			  <li role="presentation"><a href="#profile" role="tab" data-toggle="tab">商户信息</a></li>
			  </c:if>
		</ul>
	
			<div class="tab-content">
				<div id="success" class="alert alert-success" role="alert" style="display:none;"></div>
				<div id="error" class="alert alert-danger" role="alert" style="display:none;"></div>
				<div role="tabpanel" class="tab-pane fade in active" id="home">
					<form class="form-horizontal" id="fm1">
					  <input type="hidden" name="id" value="${user.id }"/>
					  <input type="hidden"  id="licenceImg" name="picture" value="${user.picture}">
					  <div class="row">
						  <div class="col-xs-6 col-md-3">
							<a href="#" class="thumbnail" style="margin-left: 98px;">
							 <c:if test="${user.picture==null }">
							  <img id="headImg" src="../images/user-head-pic.png" class="img-circle" style="width:181px;height:180px;box-shadow: 3px 3px 5px #888888;">
							 </c:if>
							 <c:if test="${user.picture!=null }">
							  <img id="headImg" src="${user.picture}" class="img-circle" style="width:181px;height:180px;box-shadow: 3px 3px 5px #888888;">
							 </c:if>
							</a>
							<input id="fileupload" type="file" name="files" data-url="../user/upload" style="display:none" multiple>
						  </div>
						</div>
					  <div class="form-group">
						<label for="inputEmail3" class="col-sm-1 control-label">用户名</label>
						<div class="col-sm-10">
							<input type="text" name="userName" class="form-control" id="inputEmail3" placeholder="请输入用户名" value="${user.userName }">
						</div>
					  </div>
					  <div class="form-group">
						<label for="inputEmail3" class="col-sm-1 control-label">昵称</label>
						<div class="col-sm-10">
							<input type="text" name="nickName" class="form-control" id="inputEmail3" placeholder="请输入昵称" value="${user.nickName }">
						</div>
					  </div>
					  <div class="form-group">
						<label for="inputPassword3" class="col-sm-1 control-label">密码</label>
						<div class="col-sm-10">
							<input type="password" name="password" class="form-control" id="inputPassword3" placeholder="请输入密码" value="${user.password }">
						</div>
					  </div>
					  <div class="form-group">
						<label for="inputEmail3" class="col-sm-1 control-label">座机</label>
						<div class="col-sm-10">
							<input type="text" name="telephone" class="form-control" id="inputEmail3" value="${user.telephone }">
						</div>
					  </div>
					  <div class="form-group">
						<label for="inputEmail3" class="col-sm-1 control-label">手机号</label>
						<div class="col-sm-10">
							<input type="text" name="phone" class="form-control" id="inputEmail3" value="${user.phone }">
						</div>
					  </div>
					  <div class="form-group">
						<label for="inputEmail3" class="col-sm-1 control-label">邮箱</label>
						<div class="col-sm-10">
							<input type="text" name="email" class="form-control" id="inputEmail3" value="${user.email }">
						</div>
					  </div>
					  <!--<div class="checkbox">
						<label>
						  <input type="checkbox"> Check me out
						</label>
					  </div>-->
					  <div class="form-group" style="margin-left:70px;">
						<div class="col-sm-offset-2 col-sm-10">
						  <input type="button" class="btn btn-danger" id="sub1" value="保存">&nbsp;&nbsp;&nbsp;
						  <input type="button" class="btn btn-primary" id="reset1" value="重置">
						</div>
					  </div>
					 
					</form>
				</div>
				<!-- 商户 -->
				<c:if test="${user.roleLevel==1 }">
				<div role="tabpanel" class="tab-pane fade" id="profile">
					<form class="form-horizontal" id="fm2">
					<input type="hidden" name="id" value="${businessConfig.id }"/>
					  <div class="form-group">
						<label for="inputEmail3" class="col-sm-1 control-label">商户名称</label>
						<div class="col-sm-10">
							<input type="text" name="businessName" class="form-control" id="inputEmail3" placeholder="请输入商户名" value="${businessConfig.businessName }">
						</div>
					  </div>
					  <div class="form-group">
						<label for="inputEmail3" class="col-sm-1 control-label">商户类型</label>
						<div class="col-sm-10">
							<input type="text" name="businessType" class="form-control " id="inputEmail3" placeholder="请输入商户名" value="<c:if test="${user.businessType==1}">一级商户</c:if><c:if test="${user.businessType==2}">二级商户</c:if>" disabled>
						</div>
					  </div>
					  <!-- 超级管理员权限 -->
					  <div class="form-group">
						<label for="inputEmail3" class="col-sm-1 control-label">坐席数量</label>
						<div class="col-sm-10">
							<input type="text" name="seats" class="form-control" id="inputEmail3" <c:if test="${user.businessType!=1}">disabled</c:if> value="${businessConfig.seats}">
						</div>
					  </div>
					  <div class="form-group">
						<label for="inputEmail3" class="col-sm-1 control-label">服务上限</label>
						<div class="col-sm-10">
							<input type="text" name="visitors" class="form-control" id="inputEmail3" <c:if test="${user.businessType!=1}">disabled</c:if> value="${businessConfig.visitors}">
						</div>
					  </div>
					  
					  <div class="form-group">
						<div class="col-sm-offset-2 col-sm-10">
						  <input type="button" class="btn btn-danger" id="sub2" value="保存">
						</div>
					  </div>
					 
					</form>
				</div>
				</c:if>
			 </div>
		
	</div>
 </body>
 <script src="../js/ocs/c-info.js"></script>
</html>
