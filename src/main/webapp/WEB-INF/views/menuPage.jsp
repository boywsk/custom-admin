<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
		<link href="../assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link href="../assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
        <link href="../assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="../assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css" />
        <link href="../assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" type="text/css" />
        <!-- END GLOBAL MANDATORY STYLES -->
        <!-- BEGIN PAGE LEVEL PLUGINS -->
        <link href="../assets/global/plugins/datatables/datatables.min.css" rel="stylesheet" type="text/css" />
        <link href="../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css" rel="stylesheet" type="text/css" />
		<link rel="../stylesheet" type="text/css" href="assets/global/plugins/jstree/dist/themes/default/style.min.css"/>
		<link rel="../stylesheet" type="text/css" href="assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css"/>
		<link rel="../stylesheet" type="text/css" href="assets/global/plugins/bootstrap-toastr/toastr.min.css">
		<link href="../assets/global/plugins/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
        <link href="../assets/global/plugins/select2/css/select2-bootstrap.min.css" rel="stylesheet" type="text/css" />
        
        
        <!-- END PAGE LEVEL PLUGINS -->
        <!-- BEGIN THEME GLOBAL STYLES -->
        <link href="../assets/global/css/components.min.css" rel="stylesheet" id="style_components" type="text/css" />
        <link href="../assets/global/css/plugins.min.css" rel="stylesheet" type="text/css" />
        <!-- END THEME GLOBAL STYLES -->
        <!-- BEGIN THEME LAYOUT STYLES -->
        <link href="../assets/layouts/layout/css/layout.min.css" rel="stylesheet" type="text/css" />
        <link href="../assets/layouts/layout/css/themes/darkblue.min.css" rel="stylesheet" type="text/css" id="style_color" />
        <link href="../assets/layouts/layout/css/custom.min.css" rel="stylesheet" type="text/css" />
        <!-- END THEME LAYOUT STYLES -->
        <link rel="shortcut icon" href="favicon.ico" />
<title>角色管理</title>
</head>
<body>
	<div class="container page">
		<div class="row" id="permission-manager-div">
			<div class="col-md-4">
				<div class="portlet light bordered">
					<div class="portlet-title">
						<div class="caption font-red-sunglo">
							<i class="icon-settings font-red-sunglo"></i> <span
								class="caption-subject bold"> 权限列表</span>
						</div>
						<div class="actions">
							<button class="btn btn-danger" @click="addPermission">新增</button>
						</div>
					</div>
					<div class="portlet-body">
						<div id="assign-tree">正在加载权限列表.....</div>
					</div>
				</div>
			</div>
			<div class="col-md-8">
				<div class="portlet light bordered">
					<div class="portlet-title">
						<div class="caption font-red-sunglo">
							<i class="icon-settings font-red-sunglo"></i> <span
								class="caption-subject bold" v-if="node.id">
								编辑:{{node.text}} </span> <span class="caption-subject bold" v-else>
								新增权限 </span>
						</div>
					</div>
					<div class="portlet-body form">
						<form role="form" action="rest/admin/menu/save"
							id="save-permission-form">
							<input type="hidden" name="id" v-model="c.id"> <input
								type="hidden" name="isMenu" value="true" />
							<div class="form-body">
								<div class="form-group" v-if="node.parent!='#'">
									<label>父菜单</label> <select class="form-control" name="parentId"
										v-model="parentId">
										<option v-for="p in permissions" :value="p.id">{{p.text}}</option>
									</select>
								</div>
								<div class="form-group">
									<label>图标</label>
									<div class="input-group">
										<span class="input-group-addon"> <i
											class="fa {{c.menuIcon}}"></i>
										</span> <input type="text" class="form-control" name="menuIcon"
											v-model="c.menuIcon">
									</div>
								</div>
								<div class="form-group">
									<label>菜单名称</label> <input type="text" class="form-control"
										name="permissionName" v-model="c.permissionName">
								</div>
								<div class="form-group">
									<label>菜单地址</label> <input class="form-control"
										name="permissionSign" v-model="c.permissionSign" />
								</div>
								<div class="form-group">
									<label>菜单类型</label> <select class="form-control"
										name="menuType" v-model="c.menuType">
										<option value="Ajax">Ajax</option>
										<option value="Iframe">Iframe</option>
										<option value="Link">Link(Open in new window)</option>
										<option value="Button">Button</option>
									</select>
								</div>
								<div class="form-group">
									<label>菜单排序</label> <input type="text" class="form-control"
										name="sort" v-model="c.sort">
								</div>
								<div class="form-group" v-if="node.parent!='#'&&node.id">
									<label>子权限</label>
									<div>
										<a href="javascript:;" class="btn red margin-right-10"
											@click="editSubPermission(p.id)" v-for="p in c.subPermission"
											:title="p.permissionSign"> {{p.permissionName}} <i
											class="fa fa-close" @click.stop="delPermission(p.id)"></i></a> <a
											href="javascript:;" class="btn blue margin-right-10"
											@click="addSubPermission(c.id)"> <i class="fa fa-plus"></i>
											添加按钮权限
										</a>
									</div>
								</div>
								<div class="form-actions">
									<button type="submit" class="btn blue">Submit</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
	
	<script src="../assets/global/plugins/jquery.min.js" type="text/javascript"></script>
        <script src="../assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="../assets/global/plugins/js.cookie.min.js" type="text/javascript"></script>
        <script src="../assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js" type="text/javascript"></script>
        <script src="../assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
        <script src="../assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
        <script src="../assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
        <script src="../assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
        <!-- END CORE PLUGINS -->
        <!-- BEGIN PAGE LEVEL PLUGINS -->
        <script src="../assets/global/scripts/datatable.js" type="text/javascript"></script>
        <script src="../assets/global/plugins/datatables/datatables.min.js" type="text/javascript"></script>
        <script src="../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js" type="text/javascript"></script>
        <script src="../assets/global/plugins/jstree/dist/jstree.js"></script>
        <script src="../assets/global/plugins/select2/js/select2.full.min.js" type="text/javascript"></script>
        
        <!-- END PAGE LEVEL PLUGINS -->
        
        <!-- BEGIN THEME GLOBAL SCRIPTS -->
        <script src="../assets/global/scripts/app.min.js" type="text/javascript"></script>
        <!-- END THEME GLOBAL SCRIPTS -->
        
        <!-- BEGIN THEME LAYOUT SCRIPTS -->
        <script src="../assets/layouts/layout/scripts/layout.js" type="text/javascript"></script>
        <script src="../assets/layouts/layout/scripts/demo.min.js" type="text/javascript"></script>
        <script src="../assets/layouts/global/scripts/quick-sidebar.min.js" type="text/javascript"></script>
			<!--	CUSTOMER SCRIPTS -->
        <script src="../assets/customer/datatable_lang_ch.js" type="text/javascript" charset="utf-8"></script>
		<script src="../assets/customer/dialog/customer_dialog.js" type="text/javascript" charset="utf-8"></script>
		<script src="../assets/customer/utils.js" type="text/javascript" charset="utf-8"></script>
		<script src="../assets/customer/customerAPI.js" type="text/javascript" charset="utf-8"></script>

</body>
</html>