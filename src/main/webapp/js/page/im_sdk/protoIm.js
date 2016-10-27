/**
 * @author gangzhidong
 */
// 心跳
var msgTypeConstants = new Object();
msgTypeConstants.TEXT = 1;
msgTypeConstants.VOICE = 2;
msgTypeConstants.PICTURE = 3;
msgTypeConstants.VEDIO = 4;
msgTypeConstants.LOCATION = 5;
var groupTypeConstants = new Object();
groupTypeConstants.SINGLE_CHAT =1;
groupTypeConstants.GROUP_CHAT =2;
groupTypeConstants.SYSTEM_CHAT =3;
groupTypeConstants.SECRETARY_CHAT =4;
groupTypeConstants.CUSTOMER_CHAT =5;

function MsgJson() {
	this.head = null;//消息头
	this.msg = null;//消息体
	this.setHead = function(head){
		this.head = head;
	};
	this.setMsg = function(msg){
		this.msg =msg;
	};
	this.test = function(){
		if(!isNotEmpty(this.head,this,msg)){
			return false
		}
		if(!(this.head instanceof Head)){
			var headTemp = new Head();
			copyAndOverWrite(headTemp, this.head)
			this.head = headTemp;
		}
		if(!this.head.test()){
			return false;
		}
		
		var msgTemp= msgFactory.getProto(this.head.command,this.msg);
		return msgTemp.test();
	};
}

//head消息头
function Head() {
	this.length = 0; // 包头+包体总长
	this.command = 0;// 命令字
	this.uid = 0; // userId
	this.clientId = 30;// 10:ios/11:android/12:wp/20:pc/21:mac/22:ubuntu/23:linux/24:unix/25:ipad/30:Web
	this.iVersion = 1;// 协议版本号
	this.clientType = 0;// 客户端类型;0:IM/1:push
	this.result = 0; // response时的error code
	this.stime = new Date().getTime(); // 服务器端时间
	this.receiveId = 0;// 消息接受者
	this.traceId = getRandomNum(-2147483648, 2147483647); // 染色id/跟踪id
	this.ack = 0; //回包标记(是否是请求应答包)；0:否、1:是
	this.appId = ""; // 应用id
	
	this.setCommand =function(command){
		this.command =command;
		return this;
	};
	
	this.setReceiveId = function(receiveId){
		this.receiveId =receiveId;
		return this;
	};
	this.setStime = function(stime){
		this.stime =stime;
		return this;
	};
	
	this.test = function() {
		return isNotEmpty(this.uid,this.command,this.traceId,this.appId,this.clientId);
	}
}

// CMD:0x0001
function Heartbeat() {
	this.uid = 0; //用户ID
	this.extra = ""; //扩展
	
	this.setUid = function(uid){
		this.uid =uid;
		return this;
	};
	this.setExtra = function(extra){
		this.extra = extra;
		return this;
	};
	this.test = function() {
		return isNotEmpty(this.uid);
	};
}

// 用户登录；用户登录im一般是通过uid和token登录
// CMD:0x0002
function UserLogin() {
	this.uid = 0; //用户ID
	this.token = ""; //登录令牌
	this.apnsToken = ""; //apns消息推送令牌
	this.extra = ""; //扩展
	this.deviceId = IMConstants.IM_DEVICE_ID; //设备id
	
	this.setUid = function(uid){
		this.uid = uid;
		return this;
	};
	
	this.setToken = function(token){
		this.token =token;
		return this;
	};
	
	this.setDeviceId = function(deviceId){
		this.deviceId = deviceId;
		return this;
	};
	
	this.setExtra = function(extra){
		this.extra = extra;
		return this;
	};
	
	this.test = function() {
		return isNotEmpty(this.uid,this.token,this.deviceId);
	}
}

// 用户登出；客户端点击退出按钮退出
// CMD:0x0003
function UserLogout() {
	this.uid = 0; //用户ID
	this.token = ""; //登录令牌
	this.extra = ""; //扩展
	this.deviceId = IMConstants.IM_DEVICE_ID; //设备id
	
	this.setUid = function(uid){
		this.uid = uid;
		return this;
	};
	this.setToken = function(token){
		this.token = token;
		return this;
	}
	this.setDeviceId = function(deviceId){
		this.deviceId = deviceId;
		return this;
	};
	
	this.setExtra = function(extra){
		this.extra = extra;
		return this;
	};
	this.test = function() {
		return isNotEmpty(this.uid,this.token,this.deviceId);
	}
}

// 踢出用户；客户端收到被踢
// CMD:0x0004
function KickUser() {
	this.uid = ""; //用户ID
	this.appId = ""; //应用id
	this.token = ""; //设备硬件id
	this.extra = ""; //扩展
	this.setUid = function(uid){
		this.uid = uid;
		return this;
	};
	this.setAppId = function(appId){
		this.appId = appId;
		return this;
	};
	this.setToken = function(token){
		this.token = token;
		return this;
	}

	this.setExtra = function(extra){
		this.extra = extra;
		return this;
	};
	this.test = function() {
		return isNotEmpty(this.uid,this.appId,this.token);
	}
}

// 强制关闭连接；客户端收到被强制断开
// CMD:0x0005
function CloseChannel() {
	this.uid = 0; //用户id
	this.extra = ""; //扩展
	
	this.setUid = function(uid){
		this.uid = uid;
		return this;
	};
	
	this.setExtra = function(extra){
		this.extra = extra;
		return this;
	};
	
	this.test = function() {
		return isNotEmpty(this.uid);
	}
}

// 获取聊天群组
// CDM:0x0100
function ListGroupMsg() {
	this.uid = 0; //用户id
	this.time = null; //上次获取时间
	this.extra = ""; //扩展
	
	this.setUid = function(uid){
		this.uid = uid;
		return this;
	};
	
	this.setTime = function(time){
		this.time = time;
		return this;
	};
	
	this.setExtra = function(extra){
		this.extra = extra;
		return this;
	};
	
	this.test = function() {
		return isNotEmpty(this.uid);
	}
}

// 获取系统信息(全站广播)群组
// CDM:0x0101
function ListSysGroupMsg() {
	this.uid = 0; //用户id
	this.time = null; //上次获取时间
	this.extra = ""; //扩展
	
	this.setUid = function(uid){
		this.uid = uid;
		return this;
	};
	this.setTime = function(time){
		this.time = time;
		return this;
	};
	
	this.setExtra = function(extra){
		this.extra = extra;
		return this;
	};
	this.test = function() {
		return isNotEmpty(this.uid);
		
	}
}

// 聊天附件
function ImMsgAttach() {
	this.attachId = Math.uuid(); //附件id
	this.attachName = ""; //附件名称
	this.attachType; //附件类型
	this.attachUrl; //附件地址
	this.attachSize = 0; //附件大小
	this.width = 0; //图片宽
	this.height = 0; //图片高
	this.attachPlaytime = 0; //附件播放时长(秒)
	this.attachUploadtime = 0; //附件上传时间
	this.extra = ""; //扩展
	
	this.setAttachId = function(attachId){
		this.attachId = attachId;
		return this;
	};
	this.setAttachName = function(attachName){
		this.attachName = attachName;
		return this;
	};
	this.setAttachType = function(attachType){
		this.attachType = attachType;
		return this;
	};
	this.setAttachUrl = function(attachUrl){
		this.attachUrl = attachUrl;
		return this;
	};
	this.setAttachSize = function(attachSize){
		this.attachSize = attachSize;
		return this;
	};
	
	this.setWidth =function(width){
		this.width = width;
		return this;
	};
	this.setHeight =function(height){
		this.height = height;
		return this;
	};
	this.setAttachPlaytime =function(attachPlaytime){
		this.attachPlaytime = attachPlaytime;
		return this;
	};
	this.setAttachUploadtime =function(attachUploadtime){
		this.attachUploadtime = attachUploadtime;
		return this;
	};
	this.setExtra =function(extra){
		this.extra = extra;
		return this;
	};
	
	
	this.test = function() {
		if(!isNotEmpty(this.attachName,this.attachType,this.attachUrl)){
			return false;
		}
		return true;
	};
}

// 位置
function ImMsgLocation() {
	this.msgId = Math.uuid(); //消息id
	this.longitude; //经度
	this.latitude; //维度
	this.imgUrl; //截图地址
	this.content = ""; //地址描述
	this.extra = ""; //扩展
	
	this.setMsgId =function(msgId){
		this.msgId = msgId;
		return this;
	};
	
	this.setContent =function(content){
		this.content = content;
		return this;
	};
	
	this.setImgUrl =function(imgUrl){
		this.imgUrl = imgUrl;
		return this;
	};
	
	this.setLatitude =function(latitude){
		this.latitude = latitude;
		return this;
	};
	
	this.setLongitude =function(longitude){
		this.longitude = longitude;
		return this;
	};
	
	this.setExtra =function(extra){
		this.extra = extra;
		return this;
	};
	
	this.test = function() {
		return isNotEmpty(this.latitude,this.longitude);
	}
}

// 聊天信息
// CMD:0x0201
function ImMsg() {
	this.msgId = Math.uuid(); //消息id
	this.msgType = null; //消息类型；1:文本、2:语音、3:图片、4:视频、5:位置、6:附件、99:消息透传...
	this.msgBody = null; //消息内容
	this.senderId = null; //消息发送者id
	this.senderName = ""; //消息发送者name
	this.senderRemark = ""; //消息发送者在该群中的昵称
	this.groupId = null; //群组id
	this.groupType = null; //群组类型；1:单聊、2:群聊、3:系统、4:小秘书、5:客服等
	this.groupName = ""; //群组name
	this.sendTime = new Date().getTime(); //发送时间
	this.msgSeqId = 0; //消息seq
	this.msgUrl = ""; //消息url
	this.location = null; 		//附件
	this.origiImg = false;			//消息类型为图片时，是否有原图
	this.attch = []; //附件tional bool origiImg = 14;			//消息类型为图片时，是否有原图/位置
	this.extra =""; //扩展
	this.atUids = []; //被@的用户id列表
	this.pushStatus; //消息推送状态，0:不推送、1:推送
	
	this.test = function(){
		if(!isNotEmpty(this.msgId,this.msgType,this.senderId,this.groupId)){
			return false;
		}
		switch(this.msgType){
		case msgTypeConstants.TEXT:
			return isNotEmpty(this.msgBody);
		case msgTypeConstants.VOICE:
		case msgTypeConstants.PICTURE:
		case msgTypeConstants.VEDIO:
			if(!isNotEmpty(this.attch)){
				return false;
			}
			if(!(this.attch instanceof Array)){
				return false;
			}
			for(var att in this.attch){
				if(!(att instanceof ImMsgAttach)){
					var imMsgAttach = new ImMsgAttach();
					copyAndOverWrite(imMsgAttach, att)
					if(!imMsgAttach.test()){
						return false
					}
				}
			};
			return true;
		case msgTypeConstants.LOCATION:
			if(!isNotEmpty(this.attch)){
				return false;
			}
			if(!(this.attch instanceof Array)){
				return false;
			}
			for(var att in this.attch){
				if(!(att instanceof ImMsgLocation)){
					var imMsgLocation = new ImMsgLocation();
					copyAndOverWrite(imMsgLocation, att)
					if(!imMsgLocation.test()){
						return false
					}
				}
			};
			return true;
		default: return false;
		}
		return true;
	};
	
	this.setMsgId = function(msgId){
		this.msgId =msgId
		return this;
	};
	this.setPushStatus = function(pushStatus){
		this.pushStatus =pushStatus
		return this;
	};
	this.setSendTime = function(sendTime){
		this.sendTime =sendTime
		return this;
	};
	this.setAttch = function(attch){
		this.attch =attch
		return this;
	};
	this.setGroupId = function(groupId){
		this.groupId =groupId
		return this;
	};
	this.setGroupType = function(groupType){
		this.groupType =groupType
		return this;
	};
	this.setGroupName = function(groupName){
		this.groupName =groupName
		return this;
	};
	this.setMsgSeqId = function(msgSeqId){
		this.msgSeqId =msgSeqId
		return this;
	};
	this.setSenderId = function(senderId){
		this.senderId =senderId
		return this;
	};
	this.setSenderName = function(senderName){
		this.senderName =senderName
		return this;
	};
	this.setSenderRemark = function(senderRemark){
		this.senderRemark =senderRemark
		return this;
	};
	
	this.setMsgType = function(msgType){
		this.msgType = msgType;
		return this;
	};
	
	this.setMsgBody = function(msgBody){
		this.msgBody = msgBody;
		return this;
	};
	
	this.setExtra = function(extra){
		this.extra = extra;
		return this;
	};
	
	this.setAtUids = function(atUids){
		this.atUids = atUids;
		return this;
	};
	this.setMsgUrl = function(msgUrl){
		this.msgUrl = msgUrl;
		return this;
	}
	
}

// 离线消息分页获取
// CMD:0x0202
function ListOffileMsg() {
	this.groupId; //群组id
	this.msgSeqId; //消息seq
	this.size; //获取条数
	this.extra = ""; //扩展
	this.setExtra = function(extra){
		this.extra = extra;
		return this;
	};
	this.setMsgSeqId = function(msgSeqId){
		this.msgSeqId = msgSeqId;
		return this;
	};
	this.setGroupId = function(groupId){
		this.groupId = groupId;
		return this;
	};
	this.setSize = function(size){
		this.size = size;
		return this;
	};
	this.test = function(){
		return isNotEmpty(this.size,this.groupId,this.msgSeqId);
	};
}

// 上报/提交readSeqId
// CMD:0x0203
function SubmitReadSeqMsg() {
	this.uid = 0; //用户id
	// repeated ImGroup group;  			//群组列表(只要需要groupId、groupType、readSeqId三个属性)			//群组列表(只要需要groupId、groupType、readSeqId三个属性)
	this.group = []; //群组列表(只要需要groupId、groupType、readSeqId三个属性)			//群组列表(只要需要groupId、groupType、readSeqId三个属性)
	this.extra = ""; //扩展
	this.setUid = function(uid){
		this.uid = uid;
		return this;
	};
	this.setExtra = function(extra){
		this.extra = extra;
		return this;
	};
	this.setGroup =function(group){
		this.group = group;
		return this;
	};
	this.test = function(){
		if(!isNotEmpty(this.uid,this.group)){
			return false;
		}
		if(!(this.group instanceof Array)){
			return false;
		}
		for(var groupTemp in this.group){
			if(!(groupTemp instanceof ImGroup)){
				var imGroup = new ImGroup();
				copyAndOverWrite(imGroup, groupTemp)
				if(!imGroup.test()){
					return false;
				}
			}
		}
		return true;
	}
}

// 下发/转发readSeqId；转发给在线另一类型终端
// CMD:0x0204
function IssueReadSeqMsg() {
	this.uid = 0; //用户id
	//repeated ImGroup group = 2;  			//群组列表(只要需要groupId、groupType、readSeqId三个属性)
	this.group = []; //群组列表(只要需要groupId、groupType、readSeqId三个属性)
	this.extra = ""; //扩展
	this.setUid = function(uid){
		this.uid = uid;
		return this;
	};
	this.setExtra = function(extra){
		this.extra = extra;
		return this;
	};
	this.setGroup = function(group){
		this.group =group;
		return this;
	};
	this.test = function(){
		if(!isNotEmpty(this.uid,this.group)){
			return false;
		}
		if(!(this.group instanceof Array)){
			return false;
		}
		for(var groupTemp in this.group){
			if(!(groupTemp instanceof ImGroup)){
				var imGroup = new ImGroup();
				copyAndOverWrite(imGroup, groupTemp)
				if(!imGroup.test()){
					return false;
				}
			}
		}
		return true;
	};
}

// 咨询类聊天信息(客服类等)
// CMD:0x0205
function ConsultImMsg() {
	this.customerId = IMConstants.IM_CUSTOMER_ID; //客服uid
	//   optional ImMsg imMsg = 2;  			//聊天信息
	this.imMsg = null; //聊天信息
	this.extra = ""; //扩展
	this.setExtra = function(extra){
		this.extra = extra;
		return this;
	};
	this.setCustomerId = function(customerId){
		this.customerId = customerId;
		return this;
	};
	this.setImMsg = function(imMsg){
		this.imMsg =imMsg;
		return this;
	};
	
	
	this.test =function(){
		if(!isNotEmpty(this.customerId,this.imMsg)){
			return false;
		}
		if(!(this.imMsg instanceof ImMsg)){
			var imMsg =new ImMsg();
			copyAndOverWrite(imMsg, this.imMsg);
			this.imMsg = imMsg;
		}
		return this.imMsg.test();
	};
}

// 全站广播；没有pb定义，占位
// CMD:0x0206

//已读消息上报
// CMD:0x0207
function ReadReportMsg() {
	this.uid = IMConstants.IM_UID; //用户id
	this.groupId = null; //群组Id
	this.msgId =null; //消息id
	this.extra = ""; //扩展
	this.setUid = function(uid){
		this.uid = uid;
		return this;
	};
	this.setExtra = function(extra){
		this.extra = extra;
		return this;
	};
	this.setMsgId = function(msgId){
		this.msgId = msgId;
		return this;
	};
	this.setGroupId = function(groupId){
		this.groupId = groupId;
		return this;
	};
	this.test =function(){
		return isNotEmpty(this.uid,this,groupId,this.msgId);
	};
}

//已读消息通知
// CMD:0x0208
function ReadReportSyncMsg() {
	this.uid = IMConstants.IM_UID; //用户id
	this.groupId = null; //群组Id
	this.msgId = Math.uuid(); //消息id
	this.extra = ""; //扩展
	this.setUid = function(uid){
		this.uid = uid;
		return this;
	};
	this.setGroupId = function(groupId){
		this.groupId = groupId;
		return this;
	};
	this.setMsgId = function(msgId){
		this,msgId = msgId;
		return this;
	};
	this.setExtra = function(extra){
		this.extra =extra;
		return this;
	};
	this.test = function(){
		return isNotEmpty(this.uid,this.groupId,this.msgId);
	};
}

//拉取消息已读成员

// 群组信息
function ImGroup() {
	this.groupId; //群组id
	this.groupType; //群组类型；1:单聊、2:群聊、3:系统、4:小秘书等
	this.seqId; //群组seq id
	this.initSeqId; //加入群组时seq id
	this.readSeqId; //读取至seq id
	//ImMsg lastMsg = 6;				//最后一条消息
	this.lastMsg = new ImMsg(); //最后一条消息
	this.isQuit; //是否退出群组
	this.extra = ""; //扩展
	this.isMsgBlocked; //是否免打扰
	
	this.setGroupId = function(groupId){
		this.groupId = groupId;
		return this;
	};
	
	this.setGroupType = function(groupType){
		this.groupType = groupType;
		return this;
	};
	this.setInitSeqId = function(initSeqId){
		this.initSeqId =initSeqId;
		return this;
	};
	 
	this.test =function(){
		return isNotEmpty(this.groupId,this.groupType,this.initSeqId);
	}
}

// 客户端收取消息
function UserData() {
	//	ImGroup group = 1;  		//群组列表
	this.group = new ImGroup(); //群组列表
	//ImMsg msg = 2;  			//消息列表
	this.msg = new ImMsg(); //消息列表
	this.extra = ""; //扩展	
}

// 上报/提交initSeqId
// CMD:0x0209
function SubmitInitSeqMsg() {
	this.uid = IMConstants.IM_UID; //用户id
	//repeated ImGroup group = 2;  			//群组列表(只要需要groupId、groupType、initSeqId三个属性)
	this.group = []; //群组列表(只要需要groupId、groupType、initSeqId三个属性)
	this.extra = ""; //扩展
	this.setUid =function(uid){
		this.uid =uid;
	};
	this.setGroup = function(group){
		this.group = group;
	};
	this.setExtra = function(extra){
		this.extra =extra;
	};
	this.test = function(){
		if(!isNotEmpty(this.uid,this.group)){
			return false;
		}
		if(!(this.group instanceof Array)){
			return false;
		}
		for(var groupTemp in this.group){
			if(!(groupTemp instanceof ImGroup)){
				var imGroup = new ImGroup();
				copyAndOverWrite(imGroup, groupTemp)
				if(!imGroup.test()){
					return false;
				}
			}
		}
		return true;
	};
}

// 下发/转发initSeqId；转发给在线另一类型终端
// CMD:0x0210
function IssueInitSeqMsg() {
	this.uid = ""; //用户id
	//repeated ImGroup group = 2;  			//群组列表(只要需要groupId、groupType、initSeqId三个属性)
	this.group = null; //群组列表(只要需要groupId、groupType、initSeqId三个属性)
	this.extra = ""; //扩展
	this.setUid = function(uid){
		this.uid =uid;
		return this;
	} ;
	this.setGroup = function(group){
		this.group =group;
		return this;
	}
	this.setExtra = function(extra){
		this.extra = extra;
		return this;
	}
	this.test = function(){
		if(!isNotEmpty(this.uid,this.group)){
			return false;
		}
		for(var arg in this.group){
			if(arg instanceof ImGroup){
				if(!arg.test()){
					return false;
				}
			}else{
				var imGroup = new ImGroup();
				imGroup.setGroupId(arg.groupId)
						.setGroupType(arg.groupType)
						.setInitSeqId(arg.initSeqId);
				if(!imGroup.test()){
					return false;
				}
			}
		}
		return true;
	}
}

// 根据群组id获取群组消息；返回数据在UserData ImGroup列表中
// CMD:0x0211
function GetGroupByIdMsg() {
	this.uid = null; //用户id
	this.groupId = ""; //群组Id
	this.extra = ""; //扩展
	this.setGroupId = function(groupIdArg) {
		this.groupId = groupIdArg;
		return this;
	};
	this.setUid = function(uidArg) {
		this.uid = uidArg;
		return this;
	};
	this.setExtra = function(extraArg) {
		this.extra = extraArg;
		return this;
	};
	this.test = function() {
		return isNotEmpty(this,groupId,this.uid);
	};
}

// push消息
// CMD:0x0300
function PushMsg() {
	this.msgId = Math.uuid(); //消息id
	this.alert = new PushAlert(); //消息提醒内容
	this.badge; //未读计数
	this.sound; //提示声音文件名
	this.extra = ""; //扩展
}

//push提醒内容
function PushAlert() {
	this.title = ""; //消息标题
	this.body = ""; //消息体
	this.extra = ""; //扩展
	this.setTitle = function(title){
		this.title = title;
		return this;
	};
	this.setBody = function(body){
		this.body = body;
		return this;
	};
	this.setExtra = function(extra){
		this.extra = extra;
		return this;
	};
	this.test = function(){
		return ieEmpty(this.title,this.body);
	}
}

// 清除push计数
// CMD:0x0301
function CleanPushCount() {
	this.msgId = Math.uuid(); //消息id
	this.apnsToken = ""; //apns token
	this.uid = null; //用户id
	this.extra = ""; //扩展
	this.setMsgId = function(msgId) {
		this.msgId = msgId;
		return this;
	};
	this.setUid = function(uid) {
		this.uid = uid;
		return this;
	};
	this.setExtra = function(extra) {
		this.extra = extra;
		return this;
	};
	this.setApnsToken = function(apnsToken) {
		this.apnsToken = apnsToken;
		return this;
	};
	this.test = function() {
		return isNotEmpty(this.uid,this.msgId);
	}
}
function isNotEmpty(){
	if(arguments == null || arguments.length==0){
		return false;
	}
	for(var arg in arguments){
		if(arg==null || arg==0 || arg=="" || arg==undefined ||arg==[] ||arg=={} ||arg==new Object()){
			return false;
		}
		if((typeof arg == "object" || typeof arg == "array") && arg.length==0){
			return false;
		}
	}
	return true;
}

(function() {
	   // Private array of chars to use
	   var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	   
	   Math.uuid = function (len, radix) {
	     var chars = CHARS, uuid = [], i;
	     radix = radix || chars.length;
	   
	     if (len) {
	       // Compact form
	       for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
	     } else {
	       // rfc4122, version 4 form
	       var r;
	   
	       // rfc4122 requires these characters
	       uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	       uuid[14] = '4';
	   
	       // Fill in random data.  At i==19 set the high bits of clock sequence as
	       // per rfc4122, sec. 4.1.5
	       for (i = 0; i < 36; i++) {
	         if (!uuid[i]) {
	           r = 0 | Math.random()*16;
	           uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	         }
	       }
	     }
	   
	     return uuid.join('');
	   };
	   
	   // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
	   // by minimizing calls to random()
	   Math.uuidFast = function() {
	     var chars = CHARS, uuid = new Array(36), rnd=0, r;
	     for (var i = 0; i < 36; i++) {
	       if (i==8 || i==13 ||  i==18 || i==23) {
	         uuid[i] = '-';
	       } else if (i==14) {
	         uuid[i] = '4';
	       } else {
	         if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
	         r = rnd & 0xf;
	         rnd = rnd >> 4;
	         uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	       }
	     }
	     return uuid.join('');
	   };
	   
	   // A more compact, but less performant, RFC4122v4 solution:
	   Math.uuidCompact = function() {
	     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	       var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	       return v.toString(16);
	     });
	   };
	 })();