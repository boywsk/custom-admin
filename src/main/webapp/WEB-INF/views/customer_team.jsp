<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="com.gomeplus.im.customer.model.User"%>
<%
	User user = (User) request.getSession().getAttribute("user");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>首页</title>
<link href="../bootstrap/css/bootstrap.css" rel="stylesheet">
<script src="../js/jquery.min.js"></script>
<script src="../bootstrap/js/bootstrap.min.js"></script>
<script src="../js/jquery-upload-file/jquery.ui.widget.js"></script>
<script src="../js/jquery-upload-file/jquery.iframe-transport.js"></script>
<script src="../js/jquery-upload-file/jquery.fileupload.js"></script>
<script src="../js/ocs/c-team.js"></script>
</head>
<body>
	<div class="panel panel-default">
		<!--<ol class="breadcrumb">
			  <li><span class="glyphicon glyphicon-menu-hamburger"></span><a href="#">客服管理</a></li>
		</ol>  -->

		<ul class="nav nav-pills" role="tablist">
			<li role="presentation" class="active"><a href="#home"
				aria-controls="home" role="tab" data-toggle="tab">今天</a></li>
			<li role="presentation"><a href="#home" aria-controls="home"
				role="tab" data-toggle="tab">昨天</a></li>
			<li role="presentation"><a href="#home" aria-controls="home"
				role="tab" data-toggle="tab">过去7天</a></li>
			<li role="presentation"><a href="#home" aria-controls="home"
				role="tab" data-toggle="tab">过去30天</a></li>

		</ul>

		<!-- Default panel contents -->
		<div class="panel-body">
			<p>
				<c:if test="${user.picture==null }">
					<img src="../images/user-head-pic.png" class="img-circle"
						style="width: 100px; height: 100px; box-shadow: 3px 3px 5px #888888; margin-left: -12px;">
				</c:if>
				<c:if test="${user.picture!=null }">
					<img src="${ user.picture}" class="img-circle"
						style="width: 100px; height: 100px; box-shadow: 3px 3px 5px #888888; margin-left: -12px;">
				</c:if>

			</p>
			<p>
				<c:if test="${user.nickName==null}">${user.userName}</c:if>
				<c:if test="${user.nickName!=null}">${user.nickName}</c:if>
				<c:if test="${user.roleLevel==1}">
					<a href="#exampleModal" data-toggle="modal" data-whatever="添加客服"><span
						class="label label-info glyphicon glyphicon-plus" aria-hidden="true">添加客服</span></a>
				</c:if>
			</p>
		</div>

		<!-- Table -->
		<table class="table table-hover tab-pane fade in active"
			role="tabpanel" id="home">
			<thead>
				<tr>
					<th></th>
					<th>客服</th>
					<th>角色</th>
					<th>状态</th>
					<th>对话量</th>
					<th>消息数</th>
					<th>平均对话时长</th>
					<th>平均响应时长</th>
					<th>操作</th>
				</tr>
			</thead>
			<c:forEach items="${user_list}" var="user">
				<tr>
					<th scope="row"><c:if test="${user.picture==null  || user.picture==''}">
							<img src="../images/default.png" class="img-circle">
						</c:if> <c:if test="${user.picture!=null  && user.picture!=''}">
							<img src="${ user.picture}" class="img-circle"
								style="width: 50px; height: 50px;">
						</c:if></th>
					<td><c:if test="${user.nickName==null}">${user.userName}</c:if>
						<c:if test="${user.nickName!=null}">${user.nickName}</c:if></td>
					<td><c:if test="${user.roleLevel==1}">管理员</c:if> <c:if
							test="${user.roleLevel==2}">普通客服</c:if></td>
					<td><c:if test="${user.state==1}">
							<span class="label label-success">在线</span>
						</c:if> <c:if test="${user.state==0 || user.state==null}">
							<span class="label label-danger">离线</span>
						</c:if></td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td><a href="javascript:void(0);" class="del"
						rev='{"ids":${user.id},"businessId":${user.businessId},"roleLevel":${user.roleLevel}}'><span
							class="glyphicon glyphicon-trash"></span></a></td>
				</tr>
			</c:forEach>
		</table>
	</div>

	<!--添加客服 模态框-->
	<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
		aria-labelledby="exampleModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="exampleModalLabel">添加</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" id="fm" enctype="multipart/form-data">
						<input type="hidden" id="licenceImg" name="picture" value="">
						<div class="form-group">
							<a href="#" class="thumbnail"> <img id="headImg"
								src="../images/user-head-pic.png" class="img-circle"
								style="width: 181px; height: 180px; box-shadow: 3px 3px 5px #888888;" />
							</a> <input id="fileupload" type="file" name="files"
								data-url="../user/upload" style="display: none" multiple>
						</div>
						<div class="control-group">
							<label for="recipient-name" class="control-label">用户名:</label>
							<div class="controls">
								<input type="text" name="userName" class="form-control"
									id="recipient-name">
							</div>
						</div>
						<div class="control-group">
							<label for="recipient-password" class="control-label">密码:</label>
							<div class="controls">
								<input type="password" name="password" class="form-control"
									id="recipient-password">
							</div>
						</div>
						<c:if test="${user.roleLevel==1 && user.businessType==1}">
							<div class="control-group">
								<label for="recipient-visitors" class="control-label">服务上限:</label>
								<div class="controls">
									<input type="text" name="visitors" class="form-control"
										id="recipient-visitors">
								</div>
							</div>
							<div class="control-group">
								<label for="recipient-seats" class="control-label">坐席数量:</label>
								<div class="controls">
									<input type="text" name="seats" class="form-control"
										id="recipient-seats">
								</div>
							</div>
						</c:if>
						<div class="control-group">
							<label for="recipient-roles" class="control-label">账号权限:</label>
							<div class="controls">
								<label
									<c:if test="${user.businessType==1}">class="radio-inline"</c:if>
									<c:if test="${user.businessType==2}">class="radio-inline disabled"</c:if>>
									<input type="radio" name="roleLevel" id="roles" value="1"
									checked> 管理员
								</label> <label class="radio-inline"> <input type="radio"
									name="roleLevel" id="roles" value="2"
									<c:if test="${user.businessType==2}">checked</c:if>>
									普通客服
								</label>

							</div>
						</div>
						<c:if test="${user.roleLevel==1 && user.businessType==1}">
							<div class="control-group">
								<label for="recipient-business" class="control-label">商户名称:</label>
								<div class="controls">
									<input type="text" name="businessName" class="form-control"
										id="recipient-business">
								</div>
							</div>
						</c:if>
						<!--<div class="form-group">
				<label for="message-text" class="control-label">Message:</label>
				<textarea class="form-control" id="message-text"></textarea>
			  </div>-->
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal"
						id="cancle">取消</button>
					<button type="button" class="btn btn-danger" id="sub">添加</button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>