<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
<link rel="stylesheet" href="dist/css/custom.css" />
<link rel="stylesheet" href="css/index/index.css">
<link rel="stylesheet" href="global/cropper/cropper.css" />

<script src="js/jquery.min.js"></script>
<script type="text/javascript" src="dist/js/bootstrap.js"></script>
<script type="text/javascript" src="global/cropper/cropper.js"></script>
<script type="text/javascript" src="js/index/avatar.js"></script>

<title>美信客服</title>
</head>
<script type="text/javascript">
	var userId = ${user.id};
	var appId = ${user.appId};
</script>
<body>

	<div style="min-height:100%;">
	<!-- 上导航 -->
	<nav class="navbar navbar-inverse navbar-fixed-top">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed"
				data-toggle="collapse" data-target="#navbar" aria-expanded="false"
				aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span> <span
					class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<img class="navbar-brand sysLogo" alt="Brand"
				src="images/auth/logo.png"> <a class="navbar-brand" href="#">美信客服</a>

		</div>
		<div id="navbar" class="navbar-collapse collapse">
			<button id="logout_btn" class="logout_btn">退出</button>
		</div>
	</div>
	</nav>
	<div class="main">
		<div class="left">
			<div class="Head_portrait">
				<img id="avatar" class="avatar" src="images/touxiang.jpg" />
			</div>
			<ul id="left_menu" class="left_menu"></ul>
		</div>
		<div></div>
		<div class="content">
			<iframe id="mainContent" class="mainContent"
				src="localhost:8080/im-customer/login"></iframe>
		</div>
	</div>

	<div class="modal fade" id="avatar-modal" aria-hidden="true"
		aria-labelledby="avatar-modal-label" role="dialog" tabindex="-1">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<form class="avatar-form" action="pic/avatar"
					enctype="multipart/form-data" method="post">
					<div class="modal-header">
						<button class="close" data-dismiss="modal" type="button">&times;</button>
						<h4 class="modal-title" id="avatar-modal-label">头像上传</h4>
					</div>
					<div class="modal-body">
						<div class="avatar-body">
							<div class="avatar-upload">
								<input class="avatar-src" name="avatar_src" type="hidden">
								<input class="avatar-data" name="avatar_data" type="hidden">
								<label for="avatarInput">请选择头像</label> <input
									class="avatar-input" id="avatarInput" name="avatar_file"
									type="file">
							</div>
							<div class="row">
								<div class="col-md-9">
									<div class="avatar-wrapper"></div>
								</div>
								<div class="col-md-3">
									<div class="avatar-preview preview-lg"></div>
									<div class="avatar-preview preview-md"></div>
									<div class="avatar-preview preview-sm"></div>
								</div>
							</div>
							<div class="row avatar-btns">
								<div class="col-md-9">
									<div class="btn-group">
										<button class="btn" data-method="rotate" data-option="-90"
											type="button" title="Rotate -90 degrees">
											<i class="fa fa-undo"></i> 向左旋转
										</button>
									</div>
									<div class="btn-group">
										<button class="btn" data-method="rotate" data-option="90"
											type="button" title="Rotate 90 degrees">
											<i class="fa fa-repeat"></i> 向右旋转
										</button>
									</div>
								</div>
								<div class="col-md-3">
									<button class="btn btn-success btn-block avatar-save"
										type="submit">
										<i class="fa fa-save"></i> 保存修改
									</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	</div>

	<div class="loading" aria-label="Loading" role="img" tabindex="-1"></div>

	<script type="text/javascript" src="js/index/index.js"></script>
</body>
</html>