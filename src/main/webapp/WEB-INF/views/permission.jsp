<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
<link rel="stylesheet" href="dist/css/custom.css" />
<link rel="stylesheet" href="css/index/index.css">
<link rel="stylesheet" href="global/datatables/datatables.css">
<link rel="stylesheet" href="global/dialog/ui-dialog.css">
<link rel="stylesheet" href="global/bootstrap-combobox/bootstrap-combobox.css">
<link rel="stylesheet" href="global/toastr/toastr.css">
<link rel="stylesheet" href="global/bootstrap-validator/bootstrapValidator.css">

<script src="js/jquery.min.js"></script>
<script type="text/javascript" src="dist/js/bootstrap.js"></script>
<script type="text/javascript"
	src="global/bootstrap-treeview/bootstrap-treeview.js"></script>
<script type="text/javascript" src="js/page/permission.js"></script>
<script type="text/javascript" src="global/bootstrap-combobox/bootstrap-combobox.js"></script>
<script src="global/toastr/toastr.js" type="text/javascript"></script>
<script src="global/bootstrap-validator/bootstrapValidator.js" type="text/javascript"></script>
<title>权限管理</title>
</head>
<body>
	<div class="container page">
		<div class="row">
			<div class="col-md-4">
				<div id="tree"></div>
			</div>
			<div class="col-md-8">
				<form role="form">
					<div class="form-group">
						<label>权限名称</label> <input type="text" class="form-control"
							id="permissionName">
					</div>
					<div class="form-group">
						<label>是否为菜单</label> <select id="isMenu" class="form-control">
							<option selected="selected">请选择</option>
							<option>是</option>
							<option>否</option>
						</select>
					</div>
					<div class="form-group">
						<label>权限路径</label> <input type="text" class="form-control"
							id="permissionUrl">
					</div>
					<div class="form-group">
						<label>上级权限</label> <input type="text" class="form-control"
							id="parent">
					</div>
					<button id="addChildNode" class="btn btn-primary" type="button">增加子权限</button>
					<button class="btn btn-danger">删除该权限</button>
					<button type="submit" class="btn btn-primary">确认</button>
				</form>
				<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
					aria-labelledby="myModalLabel">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal"
									aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 class="modal-title" id="myModalLabel">增加子权限</h4>
							</div>
							<div class="modal-body">
								<form role="form" id="add_form" class="form-horizontal" style="margin-left: 20px;margin-right: 20px;">
									<div class="form-group">
										<label>权限名称</label> <input type="text" class="form-control"
											id="add_permissionName" name="permissionName">
									</div>
									<div class="form-group">
										<label>是否为菜单</label> <select id="add_isMenu" class="form-control" name="isMenu">
											<option selected="selected">请选择</option>
											<option value="1">是</option>
											<option value="0">否</option>
										</select>
									</div>
									<div class="form-group">
										<label>权限路径</label> 
										<select id="add_permissionUrl" class="form-control combobox" name="permissionUrl">
											<!-- <option selected="selected">请选择</option>
											<option value="1">是</option>
											<option value="0">否</option> -->
										</select>
									</div>
									<div class="form-group">
										<label>上级权限</label> <input type="text" class="form-control"
											id="add_parent" readonly="readonly" name="parent_id">
									</div>
								</form>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default"
									data-dismiss="modal">关闭</button>
								<button id="confirm_add" type="button" class="btn btn-primary">确认</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</body>
</html>