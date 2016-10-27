<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
<link rel="stylesheet" href="dist/css/custom.css" />
<link rel="stylesheet" href="css/index/index.css">
<link rel="stylesheet" href="global/datatables/plugins/bootstrap/datatables.bootstrap.css">
<link rel="stylesheet" href="global/bootstrap-validator/bootstrapValidator.css">
<link rel="stylesheet" href="global/toastr/toastr.css">

<script src="js/jquery.min.js"></script>
<script type="text/javascript" src="dist/js/bootstrap.js"></script>
<script type="text/javascript" src="global/bootstrap-treeview/bootstrap-treeview.js"></script>
<script type="text/javascript" src="global/datatables/plugins/bootstrap/jquery.dataTables.js"></script>
<script src="global/datatables/plugins/bootstrap/datatables.bootstrap.js" type="text/javascript"></script>
<script src="global/bootstrap-validator/bootstrapValidator.js" type="text/javascript"></script>
<script type="text/javascript" src="js/page/roles.js"></script>
<script src="global/toastr/toastr.js" type="text/javascript"></script>
<title>角色管理</title>
</head>
<body>
	<div class="container page">
		<div class="table-div">
		<div class="table-operator">
			<button id="role_add_btn" class="btn green formbtn-add">新增角色</button>
		</div>
		<div class="clearfix"></div>
		<div class="table-filter">&nbsp;</div>
		<div class="table-body">
			<table class="table table-bordered table-striped table-hover" id="role_table"></table>
		</div>
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title" id="myModalLabel">分配权限</h4>
					</div>
					<div class="modal-body">
						<div id="tree"></div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default"
							data-dismiss="modal" >关闭</button>
						<button id="confirm_add" type="button" class="btn btn-primary">确认</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title" id="myModalLabel">新增角色</h4>
					</div>
					<div class="modal-body">
					<form role="form" id="add_role_form" class="form-horizontal" style="margin-left: 20px;margin-right: 20px;">
						<div class="form-group">
							<label>角色名称</label> <input type="text" class="form-control"
								name="roleName">
						</div>
						<div class="form-group">
							<label>角色描述</label> <input type="text" class="form-control"
								name="description">
							</select>
						</div>
						<div class="form-group">
							<label>角色标示</label> <input type="text" class="form-control"
								name="roleSign">
						</div>
					</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default"
							data-dismiss="modal" >关闭</button>
						<button id="confirm_add_role" type="button" class="btn btn-primary">确认</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="delete_tip" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title">操作提示</h4>
					</div>
					<div class="modal-body">
						<h4 class="modal-title">确认删除该角色吗？</h4>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default"
							data-dismiss="modal" >关闭</button>
						<button id="confirm_delete" type="button" class="btn btn-primary">确认</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
	
</body>
</html>