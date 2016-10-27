<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
<link rel="stylesheet" href="dist/css/custom.css" />
<link rel="stylesheet" href="css/chat/chat.css" type="text/css">
<link rel="stylesheet" href="css/chat/pop.css">
<link rel="stylesheet" href="global/imageViewer/viewer.css">
<link rel="stylesheet" href="global/toastr/toastr.css">

<script src="js/jquery.min.js"></script>
<script type="text/javascript" src="dist/js/bootstrap.js"></script>

<script type="text/javascript" src="js/page/im_sdk/IMConf.js"></script>
<script type="text/javascript" src="js/page/im_sdk/base64.js"></script>
<script type="text/javascript" src="js/page/im_sdk/common.js"></script>
<script type="text/javascript" src="js/page/im_sdk/event.js"></script>
<script type="text/javascript" src="js/page/im_sdk/IMUtils.js"></script>
<script type="text/javascript" src="js/page/im_sdk/json2.js"></script>
<script type="text/javascript" src="js/page/im_sdk/md5.js"></script>
<script type="text/javascript" src="js/page/im_sdk/plugins.js"></script>
<script type="text/javascript" src="js/page/im_sdk/protoIm.js"></script>
<script type="text/javascript" src="global/imageViewer/viewer.js"></script>
<script src="global/toastr/toastr.js" type="text/javascript"></script>
<script type="text/javascript" src="js/jquery.mousewheel.js"></script>

<script type="text/javascript" src="js/page/chat.js"></script>

<title>聊天</title>
</head>
<body class="opg">
	<input id="login_uid" type="hidden" value="${user.id}"/>
	<div id="over" class="over">
		<div id="over_layout" class="over_layout"><img src="images/chat/loading.gif"/></div>
	</div>
	
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
					aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">新增聊天</h4>
				</div>
				<div class="modal-body">
					<form role="form" id="add_form" class="form-horizontal" style="margin-left: 20px;margin-right: 20px;">
						<div class="form-group">
							<label>请输入聊天对象Id</label> <input type="text" class="form-control"
								id="f_id" name="f_id">
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
				src="images/auth/logo.png"> <a class="navbar-brand" href="#">IM-web</a>

		</div>
		<div id="navbar" class="navbar-collapse collapse">
			<button id="logout_btn" class="logout_btn" onclick="logout()">退出</button>
		</div>
	</div>
	</nav>
	<div id="app">
		<div>
			<div _v-213025aa="" ></div>
			<div class="wrap-box clearfix" >
				<div class="im-left" _v-ab46b9a0="" >
					<div class="left-tab" >
						<a href="javascript:void(0)"  class="active" onclick="switch_tab(this)" inner_div="list_cur">当前联系人
							<em class="icon-tab" ></em>
						</a> 
						<a href="javascript:void(0)" onclick="switch_tab(this)" inner_div="list_hicurrentListst">历史联系人
							<em class="icon-tab" ></em>
						</a>
					</div>
					<div tab_id="list_cur" class="left_tab_">
						<div class="list_cur" id="list_cur"></div>
					</div>
					<div class="left_tab_" tab_id="list_hicurrentListst" style="display: none;">
						<div class="list_hicurrentListst" id="list_hicurrentListst"></div>
					</div>
				</div>
				<div class="im-chat" _v-51c1a524="" >
					<div class="chatrecord" >
						<div  class="right-chat" style="height: 430px;" >
							<div id="chat-scroll" class="chat-scroll">
								<div id="load_more_msg" style="text-align: center; margin-top: 5px; display: none;">上拉加载更多消息</div>
								<div id="more_loading" style="text-align: center; margin-top: 5px; display: none;"
									>正在加载中...</div>
								<div id="noMore" style="text-align: center; margin-top: 5px; display: none;"
									>没有更多</div>
								<input type="hidden" id="msg_exist"/>
								<div id="msg_container"></div>
							</div>
						</div>
						<div class="chat-send" >
							<div class="send-title" >
								<a id="face_button" onclick="show_faces()" class="icon icon-expression face_button" >
								<a style="position: relative" class="icon icon-img"
									> <input class="photo" id="photo"
									style="opacity: 0; width: 26px; position: absolute; top: 0; left: 0;"
									type="file" accept="image/png,image/gif,image/jpeg" onchange="sendImg(this)">
								</a>
								<!--<a href="javascript:;" class="icon icon-cut"></a>-->
								<a class="btn btn-gray" >结束当前会话</a>
								<div id="face_box" class="expression-box clearfix face_box"></div>
							</div>
							<div class="send-text" style="position: relative" >
								<textarea id="input_content" class="input_content"
									style="position: relative; z-index: 50" row="4" ></textarea>
								<div class="img_content"
									style="position: absolute; top: 0; left: 0; width: 526px; height: 60px; padding: 5px; z-index: 100; display: none; background-color: #f9f9f9"
									></div>
								<div class="send-btn" >
									<div class="btn-send" >
										<a class="send btn btn-blue"  id="send_btn_" onclick="sendMessage()">发送</a><span
											class="icon-down" ></span>
									</div>
									<div class="btn-send-empty" 
										style="display: none;">
										<em class="sanjiao" ></em><span >!</span>发送内容不能为空！
									</div>
									<div class="btn-send-s"  style="display: none;">
										<a class="enter active" >Enter发送</a> <a
											class="c_enter" >ctrl+Enter发送</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="im-right" style="height: 600px;" 
					>
					<div id="drag_area" style="position: relative; height: 47px;"
						>
						<div class="link-a" style="margin-bottom: 8px;" >
							<a href="javascript:;" >模块</a> <a
								href="javascript:;" >模块</a> <a
								href="javascript:;" >模块</a>
						</div>
						<div class="icon-dian"
							style="position: absolute; bottom: 0; left: 0; width: 100%; cursor: s-resize"
							></div>
					</div>
					<div id="behind" style="overflow: hidden" >
						<div class="left-tab" >
							<a href="javascript:;" class="active" >模块<em
								class="icon-tab" ></em></a> <a href="javascript:;"
								>模块<em class="icon-tab" ></em></a>
							<a href="javascript:;" >模块<em
								class="icon-tab" ></em></a>
						</div>
						<div class="right-search" >
							<input class="common" type="text" placeholder="模块"
								> <em class="icon-clear" ></em>
							<a href="javascript:void(0)" class="btn-search" ></a>
						</div>
						<div class="im-phrase-list" >
							<div class="phrase-list" >
								<button id="confirm_add" type="button" class="btn btn-primary"
									onclick="openNewChat()">新建聊天</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>