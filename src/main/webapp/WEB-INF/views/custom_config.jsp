<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>配置管理</title>

<link href="../bootstrap/css/bootstrap.css" rel="stylesheet">
<script src="../js/jquery.min.js"></script>
<script src="../bootstrap/js/bootstrap.min.js"></script>
<script src="../js/ocs/c-config.js"></script>
</head>
<body>
	<div class="panel panel-default">
		<!-- <ol class="breadcrumb">
			  <li><span class="glyphicon glyphicon-menu-hamburger"></span><a href="#">配置管理</a></li>
		</ol> -->
		<div class="well" style="max-width: 1310px; margin: 3px 20px 0px;">
		<a href="#exampleModal" data-toggle="modal"
					data-whatever="新增配置项" onclick="edit(0)" class="btn btn-large btn-block btn-primary"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>新增配置项</button></a>
		</div>
		<!-- Default panel contents -->
		<div class="well" style="max-width: 1310px;margin: 0.5px 20px 10px;">
		<div class="panel-body" style="padding: 0;margin: 3px 3px -15px;">
			
			<table class="table table-bordered table-responsive" style="background-color:#fff;">
			 	<tr>
			 		<th width="5%">序号</th>
			 		<th width="20%">配置项名称</th>
			 		<th width="25%">配置项说明</th>
			 		<th width="25%">配置值</th>
			 		<th width="10%">单位</th>
			 		<th width="15%">操作</th>
			 	</tr>
			 	<c:forEach items="${config_list}" var="config" varStatus="status">
			 	<tr <c:if test="${status.index%2==0 }">class="success"</c:if>>
			 		<td>${status.index+1 }</td>
			 		<td>${config.configName}</td>
			 		<td>${config.configRemark}</td>
			 		<td>${config.configVal}</td>
			 		<td><c:if test="${config.configUnit==''}">无</c:if><c:if test="${config.configUnit!=''}">${config.configUnit }</c:if></td>
			 		<td>
			 		<button type="button"class="btn btn-danger" style="font-size:10px;"  data-target="#exampleModal" data-toggle="modal"
					data-whatever="编辑配置项" onclick="edit(${config.id})"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span><span style="margin-left:3px;vertical-align: middle;">编辑</span></button>
			 		<a class="btn btn-danger" style="font-size:10px;" href="javascript:window.location.href='../c_config/delConfig/${config.id}'"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span><span style="margin-left:3px;vertical-align: middle;">删除</span></a>
			 		</td>
			 	</tr>
			 	</c:forEach>
			</table>
		</div>
		</div>
	</div>
	
	<!--添加配置项 模态框-->
	<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
		aria-labelledby="exampleModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="exampleModalLabel"></h4>
				</div>
				<div class="modal-body">
					
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal"
						id="cancle">取消</button>
					<input type="button" class="btn btn-danger" id="sub" value="提交">
				</div>
			</div>
		</div>
	</div>
</body>
</html>