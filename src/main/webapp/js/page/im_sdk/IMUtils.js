function IMConstants() {
	this.setHeartBeatTime = function(heartBeat) {
		IMConstants.IM_HEART_BEAT_TIME = heartBeat;//心跳间隔
		return this;
	};
	this.setUid = function(uid) {
		IMConstants.IM_UID = uid;
		return this;
	};
	this.setAppId = function(appId) {
		IMConstants.IM_APP_ID = appId;
		return this;
	};
	this.setClientId = function(clientId) {
		IMConstants.IM_CLIENT_ID = clientId;
		return this;
	};
	this.setDeviceId = function(deviceId) {
		IMConstants.IM_DEVICE_ID = deviceId;
		return this;
	};
	this.setCustomerId = function(customerId) {
		IMConstants.IM_CUSTOMER_ID = customerId;
		return this;
	};
	this.setWebsocketChannel = function(websocketChannel) {
		IMConstants.IM_WEBSOCKET_CHANNEL = websocketChannel;
	};
	this.setLastCommunicateTime = function(lastTime) {
		IMConstants.IM_LAST_COMMUBICATE_TIME = lastTime;
	};
	this.setImServer = function(imGatewayServer) {
		IMConstants.IM_SERVER = imGatewayServer;
	};
}

//IMConstants.IM_MESSAGE_TIMEOUT = 50000;//心跳间隔

function IMCallBack() {
	this.setConnectLost = function(connectLostFunc) {
		IMCallBack.connectLost = connectLostFunc;//连接断开
		return this;
	};
	this.setConnectRebuild = function(connectRebuildFunc) {
		IMCallBack.connectRebuild = connectRebuildFunc;//连接恢复
		return this;
	};
	this.setAckImMsg = function(ackImMsgFunc) {
		IMCallBack.ackImMsg = ackImMsgFunc;//收到回调消息
		return this;
	};
	this.setAckUserLogin = function(ackUserLoginFunc) {
		IMCallBack.ackUserLoginFunc = ackUserLoginFunc;//收到回调消息
		return this;
	};
	this.setAckUserLogout = function(ackUserLogoutFunc) {
		IMCallBack.ackUserLogout = ackUserLogoutFunc;//收到回调消息
		return this;
	};
	/*this.setMsgTimeout = function(msgTimeoutFunc){
	 IMCallBack.msgTimeout  = msgTimeoutFunc;//消息超时
	 return this;
	 };*/
	this.setUserLogin = function(userLoginFunc) {
		IMCallBack.userLogin = userLoginFunc;//用户登录成功
		return this;
	};
	this.setUserLogout = function(userLogoutFunc) {
		IMCallBack.userLogout = userLogoutFunc;////用户下线成功
		return this;
	};
	this.setUserKicked = function(userKickedFunc) {
		IMCallBack.userKicked = userKickedFunc; //用户强制下线
		return this;
	};
	this.setImMsg = function(receiveImMsgFunc) {
		IMCallBack.imMsg = receiveImMsgFunc; //收到Im消息
		return this;
	};

	/*this.setGetGroupByIdMsg = function(getGroupByIdMsgFunc){
	 IMCallBack.getGroupByIdMsg = getGroupByIdMsgFunc;
	 return this;
	 };*/

	this.setUserData = function(userDataFunc) {
		IMCallBack.userData = userDataFunc;
		return this;
	};
	this.setConsultImMsg = function(consultImMsgFunc) {
		IMCallBack.consultImMsg = consultImMsgFunc;
		return this;
	};

	/*this.setListOffileMsg = function(listOffileMsgFunc){
	 IMCallBack.listOffileMsgFunc = listOffileMsgFunc;
	 return this;
	 };*/
}

// _________分割线

function Global() {
}
Global.websocketChannel;
Global.lastTime;
Global.loginStatus;
Global.lastLoginTime;
Global.retryConnectTime = 0;

var IMEventConstants = new Object();

IMEventConstants.WESOCKET_CONNECT_SUCCESS = "websocketConnectSuccess";
IMEventConstants.REQUERY_WESOCKET_CONNECT = "requeryWebsocketConnect";
IMEventConstants.GET_TOKEN_SUCCESS = "getTokenSuccess";
IMEventConstants.REQUERY_GET_TOKEN = "requeryGetToken";
IMEventConstants.GET_SERVER_SUCCESS = "getServerSuccess";
IMEventConstants.REQUERY_GET_SERVER = "requeryGetServer";
IMEventConstants.REQUERY_SEND_LOGIN = "requerySendLogin";
IMEventConstants.SEND_LOGIN_SUCCESS = "sendLoginSuccess";
IMEventConstants.UPLOAD_ATTACH_SUCESS = "uploadAttachSuccess";

var DepencyFunc = new Object();
// DepencyFunc.getToken = function() {
// return "d879e744693147d78d4ad308816058be";
// };//获取token的方法
DepencyFunc.getToken = function(appId, imUserId, callBack, args) {
	var timestamp = Date.parse(new Date());
	var keyStr = appId + imUserId + timestamp;
	var signature = md5(keyStr);
	
	$.ajax({
		// 提交数据的类型 POST GET
		type : "GET",
		// 提交的网址
		url : IMConf.IM_API_URL+"token/getIMToken.json?appId="
				+ appId + "&imUserId=" + imUserId + "&timestamp=" + timestamp
				+ "&signature=" + signature+"&deviceType="+IMConf.DEVICE_TYPE,
		 async:false,
	     contentType: false,    //这个一定要写
	     processData: false, //这个也一定要写，不然会报错
		 data : {},
		// 返回数据的格式
		datatype : "application/jsonp",
		// 在请求之前调用的函数
		// beforeSend:function(){},
		// 成功返回之后调用的函数
		success : function(data) {

			IMConstants.IM_TOKEN = data.data.token;
			if (typeof callBack == "function") {
				callBack(args);
			}
		},
		// 调用执行后调用的函数
		complete : function(XMLHttpRequest, textStatus) {
		},
		crossDomain : true,
		// 调用出错执行的函数
		error : function() {
			// 请求出错处理
		}
	});
};
/*DepencyFunc.getServer = function(callBack) {
 var servers = [];
 servers.push("ws://10.125.3.21:7398/websocket");
 // servers.push("ws://127.0.0.1:7398/websocket");
 return servers;
 };// 获取接入层的ip和port的方法
 */
DepencyFunc.getServer = function(appId, imUserId, callBack, args) {
	if (typeof arguments[0] != "string") {
		appId = arguments[0][0];
		imUserId = arguments[0][1];
		callBack = arguments[0][2];
		args = arguments[0][3];
	}
	if (!IMConstants.IM_TOKEN) {
		DepencyFunc.getToken(appId, imUserId, DepencyFunc.getServer, [appId,
				imUserId, callBack, args ]);
	}
	
			$.ajax({
				// 提交数据的类型 POST GET
				type : "GET",
				// 提交的网址
				//				url : "http://10.125.3.61:8080/im-platform/address/getIMAddress.json?appId="
				url : IMConf.IM_API_URL+"address/getAddress.json?appId="
						+ appId
						+ "&imUserId="
						+ imUserId
						+ "&token="
						+ IMConstants.IM_TOKEN
						+"&deviceType="
						+IMConf.DEVICE_TYPE,
				// 返回数据的格式
				 datatype : "application/jsonp",
				 async:false,
			     contentType: false,    //这个一定要写
			     processData: false, //这个也一定要写，不然会报错
				// 在请求之前调用的函数
				// beforeSend:function(){},
				// 成功返回之后调用的函数
				success : function(data) {
				   var serverList = [];
				   var fileServerList = "";
				    for(var i=0;i<data.data.imServerList.length;i++){
				    	
				    	serverList.push("ws://" + data.data.imServerList[i]+ "/websocket");
				    }
				   // IMConstants.IM_Server = ["ws://10.125.3.21:7398/websocket"];
				    IMConstants.IM_Server = ["ws://10.125.2.158:7398/websocket"];
					for(var j=0;j<data.data.fileServerList.length;j++){
						
						fileServerList = data.data.fileServerList[j];
					}
					IMConstants.IM_FILESERVERLIST = fileServerList;
					IMConstants.IM_LOADFILEURL = data.data.loadFileUrl;
					if (typeof callBack == "function") {
						callBack(args);
					}
				},
				// 调用执行后调用的函数
				complete : function(XMLHttpRequest, textStatus) {
				},
				crossDomain : true,
				// 调用出错执行的函数
				error : function() {
					// 请求出错处理
				}
			});
};// 获取接入层的ip和port的方法

DepencyFunc.uploadAttachFile = function(file, callback, args) {
	var appId = IMConstants.IM_APP_ID;
	var uid = IMConstants.IM_UID;
	var nowTime = (new Date()).valueOf();
	var keyStr = appId + uid + nowTime;
	var keys = md5(keyStr);
	var traceId = Math.uuid();
	var formData = new FormData();
	formData.append('file', $("#file")[0].files[0]); //将文件转成二进制形式
	formData.append('appId', appId);
	formData.append('uid', uid);
	formData.append('currentTime', nowTime);
	formData.append('key', keys);
	formData.append('traceId', traceId);
	$.ajax({
		type : "post",
		url : "http://127.0.0.1:8080/im-upload/ImageUploadServlet.do",
		async : false,
		contentType : false, //这个一定要写
		processData : false, //这个也一定要写，不然会报错
		data : formData,
		dataType : 'json', //返回类型，有json，text，HTML。这里并没有jsonp格式，所以别妄想能用jsonp做跨域了。
		success : function(data) {
			if (typeof callback == "function") {
				callback(args);
			}
			console.log(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown, data) {
			alert(errorThrown);
		}
	});
};
function InitConf(imConstants, callback) {
	if (!(imConstants instanceof IMConstants)) {
		throw "need IMConstants instance";
	}
	if (!(callback instanceof IMCallBack)) {
		throw "need IMCallBack instance";
	}
	if (!IMConstants.IM_UID) {
		IMConstants.IM_UID = 617;
	}
	if (!IMConstants.IM_APP_ID) {
		IMConstants.IM_APP_ID = IMConf.APPID;
	}
	if (!IMConstants.IM_Server) {
		// IMConstants.IM_Server = DepencyFunc.getServer(IMConstants.IM_APP_ID,IMConstants.IM_UID);
		  DepencyFunc.getServer(IMConstants.IM_APP_ID,IMConstants.IM_UID,DepencyFunc.getToken(IMConstants.IM_APP_ID,IMConstants.IM_UID,null,null), [null, null]);
		// IMConstants.IM_Server = ["ws://10.125.3.21:7398/websocket"];
		 // IMConstants.IM_Server = ["wss://10.69.8.92:8443/websocket"];
		//IMConstants.IM_Server = ["ws://10.69.16.9:7398/websocket"];
	}
	if (!IMConstants.IM_CUSTOMER_ID) {
		IMConstants.IM_CUSTOMER_ID = 9999999999;
	}
	if (!IMConstants.IM_CLIENT_ID) {
		IMConstants.IM_CLIENT_ID = 30;
	}
	if (!IMConstants.IM_DEVICE_ID) {
		IMConstants.IM_DEVICE_ID =  new Date().getTime()+"!"+Math.random(10000);   
	}
	if (!IMConstants.IM_HEART_BEAT_TIME) {
		IMConstants.IM_HEART_BEAT_TIME = 25000;
	}
	IMEvent.on(IMEventConstants.WESOCKET_CONNECT_SUCCESS, sendLogin);
	
	sendLogin();
	if (Global.heatbeatTimer) {
		clearInterval(Global.heatbeatTimer);
	}
	Global.heatbeatTimer = setInterval("sendHeartBeat()",
			IMConstants.IM_HEART_BEAT_TIME);
}

function channelCache() {

}
channelCache._loginChannel;
channelCache.getChannel = function() {
	return channelCache._loginChannel;
}
channelCache.setChannel = function(channel) {
	channelCache._loginChannel = channel;
}
channelCache.removeChannel = function() {
	channelCache._loginChannel = null;
}

function CommandConstants() {
}
// 心跳;1
CommandConstants.CMD_HEARTBEAT = 0x0001;
// 用户登录;2
CommandConstants.CMD_USER_LOGIN = 0x0002;
// 用户登出;3
CommandConstants.CMD_USER_LOGOUT = 0x0003;
// 用户登出;4
CommandConstants.CMD_USER_KICK = 0x0004;
// 强制关闭用户连接;5
CommandConstants.CMD_CLOSE_CHANNEL = 0x0005;

//客户端拉取获取聊天群组;256
CommandConstants.CMD_LIST_GROUP = 0x0100;
// 客户端拉取获取系统信息(全站广播)群组;257
CommandConstants.CMD_LIST_SYS_GROUP = 0x0101;

// 客户端发送IM消息，包括group消息和单聊消息;513
CommandConstants.CMD_IM_SEND_MSG = 0x0201;
// 客户端拉取离线消息或增量消息同步;514
CommandConstants.CMD_IM_OFFLINE_MSG = 0x0202;
// 上报/提交readSeqId;515
CommandConstants.CMD_SUBMIT_READ_SEQ = 0x0203;
// 下发/转发readSeqId；转发给在线另一类型终端;516
CommandConstants.CMD_ISSUE_READ_SEQ = 0x0204;

// 咨询类消息
CommandConstants.CMD_CONSULT_IM_MSG = 0x0205;

// push消息;768
CommandConstants.CMD_PUSH_MSG = 0x0300;
// 清除push计数;769
CommandConstants.CMD_CLEAN_PUSH_COUNT = 0x0301;

// 上报/提交initSeqId;521
CommandConstants.CMD_SUBMIT_INIT_SEQ = 0x0209;
// 下发/转发initSeqId；转发给在线另一类型终端;522
CommandConstants.CMD_ISSUE_INIT_SEQ = 0x0210;
// 根据群组id获取群组消息；返回数据在UserData ImGroup列表中;523
CommandConstants.CMD_GROUP_BY_ID = 0x0211;
// 客户端收取消息
// CommandConstants.CMD_USER_DATA = 0;
//全站广播;518
CommandConstants.CMD_BROADCAST_IM_MSG = 0x0206;
// 已读消息上报
CommandConstants.CMD_READ_REPORT_MSG = 0x0207;
//添加好友
CommandConstants.CMD_ADD_FRIENT_MSG = 0x0605;
//已读消息通知
CommandConstants.CMD_READ_REPORT_SYNC_MSG = 0x0208;

// CommandConstants.CMD_IM_GROUP_MSG = 0;

function msgFactory() {
}

msgFactory.getProto = function(command, param) {
	switch (command) {
	case CommandConstants.CMD_HEARTBEAT:
		var heartbeat = new Heartbeat(param);
		return heartbeat;
	case CommandConstants.CMD_USER_LOGIN:
		var userLogin = new UserLogin(param);
		return userLogin;
	case CommandConstants.CMD_USER_LOGOUT:
		var userLogout = new UserLogout(param);
		return userLogout;
	case CommandConstants.CMD_USER_KICK:
		var kickUser = new KickUser(param);
		return kickUser;
	case CommandConstants.CMD_CLOSE_CHANNEL:
		var closeChannel = new CloseChannel(param);
		return closeChannel;
		//	case CommandConstants.CMD_ADD_FRIEND:
		//		 var addFriend = new AddFriend(param);
		//		 return addFriend;
		// case CommandConstants.CMD_DEL_FRIEND:
		// var heartbeat = new Heartbeat();
		// return heartbeat;
		// case CommandConstants.CMD_AGREE_FRIEND:
		// var heartbeat = new Heartbeat();
		// return heartbeat;
		// case CommandConstants.CMD_OPERATE_GROUP:
		// var heartbeat = new Heartbeat();
		// return heartbeat;
		// case CommandConstants.CMD_AUDIT_MEMBER:
		// var heartbeat = new Heartbeat();
		// return heartbeat;
		// case CommandConstants.CMD_AGREE_MEMBER:
		// var heartbeat = new Heartbeat();
		// return heartbeat;
	case CommandConstants.CMD_LIST_GROUP:
		var listGroupMsg = new ListGroupMsg(param);
		return listGroupMsg;
	case CommandConstants.CMD_IM_SEND_MSG:
		var imMsg = new ImMsg(param);
		return imMsg;
	case CommandConstants.CMD_IM_OFFLINE_MSG:
		var listOffileMsg = new ListOffileMsg(param);
		return listOffileMsg;
	case CommandConstants.CMD_SUBMIT_READ_SEQ:
		var submitReadSeqMsg = new SubmitReadSeqMsg(param);
		return submitReadSeqMsg;
	case CommandConstants.CMD_ISSUE_READ_SEQ:
		var issueReadSeqMsg = new IssueReadSeqMsg(param);
		return issueReadSeqMsg;
	case CommandConstants.CMD_CONSULT_IM_MSG:
		var consultImMsg = new ConsultImMsg(param);
		return consultImMsg;
	case CommandConstants.CMD_PUSH_MSG:
		var pushMsg = new PushMsg(param);
		return pushMsg;
	case CommandConstants.CMD_CLEAN_PUSH_COUNT:
		var cleanPushCount = new CleanPushCount(param);
		return cleanPushCount;
	case CommandConstants.CMD_SUBMIT_INIT_SEQ:
		var submitInitSeqMsg = new SubmitInitSeqMsg(param);
		return submitInitSeqMsg;
	case CommandConstants.CMD_ISSUE_INIT_SEQ:
		var issueInitSeqMsg = new IssueInitSeqMsg(param);
		return issueInitSeqMsg;
	case CommandConstants.CMD_GROUP_BY_ID:
		var getGroupByIdMsg = new GetGroupByIdMsg(param);
		return getGroupByIdMsg;
	case CommandConstants.CMD_READ_REPORT_MSG:
		var readReportMsg = new ReadReportMsg(param);
		return readReportMsg;
	case CommandConstants.CMD_LIST_SYS_GROUP:
		var listSysGroupMsg = new ListSysGroupMsg(param);
		return listSysGroupMsg;

	}
}

function MsgUtils() {

}
MsgUtils.initHead = function(headParam) {
	var head = new Head();
	assemble.call(head, headParam);
	return head;
};
MsgUtils.initMsgBody = function(cmd, param) {
	var msg = msgFactory.getProto(cmd, param);
	assemble.call(msg, param);
	simpleTrim.call(msg);
	return msg;
};
MsgUtils.initJsonMsg = function(headParam, cmd, param) {
	var msgJson = new MsgJson();
	if (headParam == null) {
		headParam = new Object();
	}
	headParam.command = cmd
	msgJson.head = MsgUtils.initHead(headParam);
	msgJson.msg = MsgUtils.initMsgBody(cmd, param);
	return msgJson;

};

function getRandomNum(Min, Max) {
	var Range = Max - Min;
	var Rand = Math.random();
	return (Min + Math.floor(Rand * Range));
}

function msgHandle(msg) {
	if (typeof msg == "string") {
		msg = JSON.parse(msg);
	}
	var head = msg.head;
	var command = head.command;
	var ack = head.ack;
	if (ack != 0) {
		msgAckHandle(msg);
		return;
	}
	switch (command) {
	case CommandConstants.CMD_IM_SEND_MSG:
		imMsgHandle(msg);
		return;
	case CommandConstants.CMD_GROUP_BY_ID:
		if (typeof IMCallBack.getGroupByIdMsg == "function") {
			IMCallBack.getGroupByIdMsg(msg);
		}
		return;
	case CommandConstants.CMD_LIST_GROUP:
	case CommandConstants.CMD_LIST_SYS_GROUP:
	case CommandConstants.CMD_IM_OFFLINE_MSG:
		if (typeof IMCallBack.userData == "function") {
			IMCallBack.userData(msg);
		}
		return;
		
	case CommandConstants.CMD_USER_KICK:
	case CommandConstants.CMD_CLOSE_CHANNEL:
		if (Global.heatbeatTimer) {
			clearInterval(Global.heatbeatTimer);
		}
		if(typeof IMCallBack.userKicked == "function"){
			
			IMCallBack.userKicked(msg);
		}
		return;
	default:
		return;
	}
}

function msgAckHandle(msg) {
	var command = msg.head.command;
	switch (command) {
	case CommandConstants.CMD_IM_SEND_MSG:
		if (typeof IMCallBack.ackImMsg == "function") {
			IMCallBack.ackImMsg(msg);
		}
		return;
	case CommandConstants.CMD_LIST_GROUP:
	case CommandConstants.CMD_LIST_SYS_GROUP:
	case CommandConstants.CMD_IM_OFFLINE_MSG:
		if (typeof IMCallBack.userData == "function") {
			IMCallBack.userData(msg);
		}
		return;
	case CommandConstants.CMD_USER_LOGIN:
		if (msg.head.result == -2 || msg.head.result == -4) {
			IMConstants.IM_TOKEN = null;
			sendLogin();
			Global.loginStatus = false;
		} else if (msg.head.result == 0) {
			Global.loginStatus = true;
			if (typeof IMCallBack.userLogin == "function") {
				IMCallBack.userLogin();
			}
		} else {
			Global.loginStatus = false;
		}
		return;
	 case CommandConstants.CMD_USER_LOGOUT:
			if (Global.heatbeatTimer) {
				clearInterval(Global.heatbeatTimer);
			}
		 if(typeof IMCallBack.userLogout == "function"){
			 IMCallBack.userLogout(msg);
			 Global.loginStatus = false;
		 }
		 return;
	default:
		return;
	}

}

function imMsgHandle(msg) {
	if (typeof IMCallBack.imMsg == "function") {
		IMCallBack.imMsg(msg);
	}

}

function sendHeartBeat() {
	if (Global.loginStatus && Global.loginStatus == true) {
		var msg = MsgUtils.initJsonMsg(null, CommandConstants.CMD_HEARTBEAT,
				null);
		sendMsg(msg);
	}
	if (!isNaN(Global.lastTime) && Global.lastTime != 0) {
		var nowTime = new Date().getTime();
		if (nowTime - Global.lastTime > 1.5 * IMConstants.IM_HEART_BEAT_TIME) {
			console.info("Time: " + new Date().toString()
					+ " Global.lastTime: " + Global.lastTime + " now:"
					+ nowTime + " sub: " + (nowTime - Global.lastTime));
			Global.loginStatus == false;
			if(typeof IMCallBack.connectLost == "function"){
				IMCallBack.connectLost();
			}
			webSocketRebuild();
			return;
		}
		if (Global.lastLoginTime
				&& (!Global.loginStatus || Global.loginStatus == false)) {
			webSocketRebuild();
		}
	} else {
		Global.lastTime = new Date().getTime();
	}

}

function webSocketRebuild() {

	if (Global.websocketChannel) {
		Global.websocketChannel.close();
		channelCache.removeChannel();
		Global.websocketChannel = null;
	}
	WebsocketChannel();

}

function sendLogin() {
	var callback;
	var args;
	if (arguments && arguments.length > 0) {
		if (arguments[0] && arguments[0].length > 1) {
			if (typeof arguments[0][0] == "function") {
				callback = arguments[0][0];
			}
			args = arguments[0][1];
		} else {
			if (arguments[0]) {
				callback = arguments[0];
			}
			if (arguments[1]) {
				args = arguments[1];
			}
		}
	}
	if (IMConstants.IM_TOKEN && IMConstants.IM_Server) {
		var now = new Date().getTime();
		if (Global.lastLoginTime && now - Global.lastLoginTime < 0.3 * IMConstants.IM_HEART_BEAT_TIME) {
		} else {
			var msg = MsgUtils.initJsonMsg(null,
					CommandConstants.CMD_USER_LOGIN, null);
			sendMsg(msg);
		}
		Global.lastLoginTime = now;

		if (typeof callback == "function") {
			if (callback.name == "send") {
				sendMsg(args);
			} else {
				callback(args);
			}

		}
	} else if (!IMConstants.IM_TOKEN) {
		DepencyFunc.getToken(IMConstants.IM_APP_ID, IMConstants.IM_UID,
				sendLogin, [ callback, args ]);
	} else if (!IMConstants.IM_Server) {
		DepencyFunc.getServer(IMConstants.IM_APP_ID, IMConstants.IM_UID,
				sendLogin, [ callback, args ]);
	}

}

function sendImMsg(receiveId, imMsg) {
	var headParam = new Object();
	headParam.receiveId = receiveId;
	var msg = MsgUtils.initJsonMsg(headParam, CommandConstants.CMD_IM_SEND_MSG,
			imMsg);
	sendMsg(msg);
}

function sendListOffileMsg(listOffileMsg) {
	var msg = MsgUtils.initJsonMsg(null, CommandConstants.CMD_IM_OFFLINE_MSG,
			listOffileMsg);
	sendMsg(msg);
}

function sendAddFriend(addFriendMsg) {
	var msg = MsgUtils.initJsonMsg(null, CommandConstants.CMD_ADD_FRIENT_MSG,
			addFriendMsg);
	sendMsg(msg);
}
function sendListGroupMsg(listGroupMsg) {
	var msg = MsgUtils.initJsonMsg(null, CommandConstants.CMD_LIST_GROUP,
			listGroupMsg);
	sendMsg(msg);
}
function sendListSysGroupMsg(listSysGroupMsg) {
	var msg = MsgUtils.initJsonMsg(null, CommandConstants.CMD_LIST_SYS_GROUP,
			listSysGroupMsg);
	sendMsg(msg);
}
function sendRichImMsg(receiveId, imMsg, file) {
	var headParam = new Object();
	headParam.receiveId = receiveId;
	//	uploadfile().;
	var msg = MsgUtils.initJsonMsg(headParam, CommandConstants.CMD_IM_SEND_MSG,
			imMsg);
	sendMsg(msg);
}

function sendGetGroupByIdMsg(getGroupByIdMsg) {
	var msg = MsgUtils.initJsonMsg(null, CommandConstants.CMD_GROUP_BY_ID,
			getGroupByIdMsg);
	sendMsg(msg);
}

function sendUserLogout() {
	var msg = MsgUtils.initJsonMsg(null, CommandConstants.CMD_USER_LOGOUT,
			{});
	sendMsg(msg);
}

function sendMsg(msg) {
	if (typeof msg == "string") {
		msg = JSON.parse(msg);
	}
	if (Global.websocketChannel == undefined || Global.websocketChannel == null) {

		var cb = function() {
			if (msg.head.command != CommandConstants.CMD_USER_LOGIN
					&& msg.head.command != CommandConstants.CMD_USER_LOGOUT) {
				sendLogin(Global.websocketChannel.send, JSON.stringify(msg));
			} else {
				console.info("Time: " + new Date().toString()
						+ " send command: " + msg.head.command + " msg: "
						+ JSON.stringify(msg));
				Global.websocketChannel.send(JSON.stringify(msg));
			}

		};
		WebsocketChannel(cb);
		return;

	}
	try {
		console.info("Time: " + new Date().toString() + " send command: "
				+ msg.head.command + " msg: " + JSON.stringify(msg));
		Global.websocketChannel.send(JSON.stringify(msg));
	} catch (e) {
		webSocketRebuild();

	}

}

function WebsocketChannel(cb) {

	if (IMConstants.IM_Server && IMConstants.IM_Server.length > 0) {
		var socketChannel;
		if (Global.retryConnectTime && Global.retryConnectTime > 4) {
			var now = new Date().getTime();
			if (now - Global.lastTryOpenConnectTime < 10 * IMConstants.IM_HEART_BEAT_TIME) {
				return;
			} else {
				Global.retryConnectTime = 1;
			}

		} else {
			Global.lastTryOpenConnectTime = new Date().getTime();
		}
		Global.retryConnectTime = Global.retryConnectTime + 1;
		if ((arguments.length == 0) || typeof cb != "string") {
			var url = IMConstants.IM_Server[getRandomNum(0,
					IMConstants.IM_Server.length)];
			socketChannel = new WebSocket(url);
		} else if (typeof cb == "string") {
			socketChannel = new WebSocket(arguments[0]);
		}
		socketChannel.onopen = function() {
			Global.websocketChannel = socketChannel;
			Global.retryConnectTime = 0;
		
			if (typeof IMCallBack.connectRebuild == "function") {
				IMCallBack.connectRebuild();
			}

			channelCache.setChannel(this);
			if (typeof cb == "function") {
				cb();
			} else {
				IMEvent.trigger(IMEventConstants.WESOCKET_CONNECT_SUCCESS);
			}
		};

		socketChannel.onmessage = function(msg) {
			msgHandle(msg.data);
			console.info("Time: " + new Date().toString()
					+ " receive command: " + JSON.parse(msg.data).head.command
					+ " msg: " + msg.data);
			Global.lastTime = new Date().getTime();
		};

		socketChannel.onclose = function(msg) {
			channelCache.removeChannel();
			Global.loginStatus = false;
			if(typeof IMCallBack.connectLost == "function"){
				IMCallBack.connectLost();
			}
			socketChannel = new WebSocket(IMConstants.IM_Server[getRandomNum(0,
					IMConstants.IM_Server.length)]);
		};

		socketChannel.onerror = function(msg) {
			channelCache.removeChannel();
			Global.loginStatus = false;
			if(typeof IMCallBack.connectLost == "function"){
				IMCallBack.connectLost();
			}
			socketChannel = new WebSocket(IMConstants.IM_Server[getRandomNum(0,
					IMConstants.IM_Server.length)]);
		};
		WebsocketChannel.prototype = socketChannel;
		return socketChannel;
	} else {
		DepencyFunc.getServer(IMConstants.IM_APP_ID, IMConstants.IM_UID,
				WebsocketChannel, cb);
	}

}
function getSocket() {
	var socketChannel;
	if (arguments.length == 0) {
		var url = IMConstants.IM_Server[getRandomNum(0,
				IMConstants.IM_Server.length)];
		socketChannel = new WebSocket(url);
	} else {
		socketChannel = new WebSocket(arguments[0]);
	}
	socketChannel.onopen = function() {
		if (Global.heatbeatTimer) {
			clearInterval(Global.heatbeatTimer);
		}
		Global.heatbeatTimer = setInterval("sendHeartBeat()", IMConstants.IM_HEART_BEAT_TIME);
		if (typeof IMCallBack.connectRebuild == "function") {
			IMCallBack.connectRebuild();
		}

		channelCache.setChannel(this);
	};

	socketChannel.onmessage = function(msg) {
		msgHandle(msg);
		Global.lastTime = new Date().getTime();
	};

	socketChannel.onclose = function(msg) {
		channelCache.removeChannel();
		socketChannel = new WebSocket(IMConstants.IM_Server[getRandomNum(0,
				IMConstants.IM_Server.length)]);
	};

	socketChannel.onerror = function(mssg) {
		channelCache.removeChannel();
		socketChannel = new WebSocket(IMConstants.IM_Server[getRandomNum(0,
				IMConstants.IM_Server.length)]);
	};
	// return socketChannel;
}
// WebsocketChannel.prototype = getSocket();
function copyAndOverWrite(copier, temple) {
	for ( var arg in temple) {

		var param = temple[arg];
		var paramType = typeof param;
		if (param == null || param == undefined) {
			continue;
		}
		if (typeof param === "function") {
			continue;
		}
		if (paramType == "number" || paramType == "string"
				|| paramType == "boolean") {
			copier[arg] = param;
			continue;
		}
		if (param instanceof Array) {
			copier[arg] = [];
		} else {
			copier[arg] = new Object();
		}

		copyAndOverWrite(copier[arg], param)
	}
}

function assemble() {
	var args = arguments.callee.arguments;

	if (args.length != 0 && args != undefined && args != null && args != "") {
		if (args.length == 1) {
			for ( var key in args) {
				copyAndOverWrite(this, args[key]);
			}
		}
		if (args.length % 2 == 0) {
			for (var i = 0; i < args.length;) {
				this[arg[i++]] = args[i++];
			}
		}
	}
	if (this.uid !== undefined
			&& (this.uid == null || !isNaN(this.uid) || this.uid == 0)) {
		this.uid = IMConstants.IM_UID;
	}
	if (this.appId !== undefined && (this.appId == "" || this.appId == null)) {
		this.appId = IMConstants.IM_APP_ID;
	}
	if (this.token !== undefined && (this.token == "" || this.token == null)) {
		this.token = IMConstants.IM_TOKEN;
	}
	if (this.deviceId !== undefined
			&& (this.deviceId == "" || this.deviceId == null)) {
		this.deviceId = IMConstants.IM_DEVICE_ID;
	}
	if (this.clientId !== undefined
			&& (this.clientId == "" || this.clientId == null)) {
		this.clientId = IMConstants.IM_CLIENT_ID;
	}
	if (this.receiveId !== undefined
			&& (this.receiveId == 0 || this.receiveId == null)) {
		this.receiveId = IMConstants.IM_UID;
	}
}

function simpleTrim() {
	for ( var field in this) {
		var value = this[field];
		if (value == "" || value == [] || value == {} || value == null
				|| value == undefined) {
			delete this[field];
		}
	}
}
