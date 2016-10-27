var unreadNumList = new Dictionary();
var resendMsgList = new Dictionary();
var msgList = new Dictionary();
var loadMoreList = new Dictionary();
var face_open_number = 1;
var win_id = null;
var tip_options = {
		"closeButton": false,
		"debug": false,
		"newestOnTop": true,
		"progressBar": false,
		"positionClass": "toast-center-center",//toast-center-center
		"preventDuplicates": true,
		"showDuration": "300",
		"hideDuration": "1000",
		"timeOut": "1000",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	};
var login_uid;
function validate_login(){
	var vali_uid;
	if($('#login_uid').val() != ""){
		vali_uid = parseInt($('#login_uid').val());
	}
	if(vali_uid == undefined){
		toastr.warning("您的账号登录已过期，请重新登录！","",tip_options);
		var res = function(){
			window.location = "login";
		}
		setTimeout(res,1000);
	} 
}

$(function(){
	/*window.onbeforeunload = function(event) { return confirm("确定离开此页面吗？"); }*/
	if($('#login_uid').val() != ""){
		login_uid = parseInt($('#login_uid').val());
	}
	
	validate_login();
	
	new InitConf(new IMConstants().setUid(login_uid),new IMCallBack().setAckImMsg(ack_callback)
			.setImMsg(receive_callback).setUserLogin(login_callback).setUserKicked(kick_callback)
			.setUserLogout(logout_callback));
	
	initFace();
	bind_Mouse();
	
	$('#input_content').on('keydown', function(e){
        e = e ? e : window.event;
        if(13 == e.keyCode){
        	sendMessage();
        }
    });
	
	$('#confirm_add').on('click',function(){
		validate_login();
		var f_id = $('#f_id').val();
		if(f_id != ""){
			var groupid = "";
			if(uid > f_id){
				groupid =  f_id + "_" + uid;
			}else{
				groupid =  uid + "_" + f_id;
			}
			var msgSeqId = $('.list_hicurrentListst #'+f_id).attr("msgseqid");
			if(msgSeqId == undefined){
				msgSeqId = 0;
			}
			
			//构建当前和历史的会话列表
			tempContent = '<div class="tab-list" id="'+f_id+'" msgSeqId="'+msgSeqId+'" '
				+ 'groupid="' + groupid +'" grouptype="1"'
				+ 'onclick="showChatBox(this)"><ul>'
				+ '<li class="contacts_li contacts_his" data-load="true">'
				+ '<img src="images/chat/T1TaVTB7LT1R4cSCrK.png">'
				+ '<p id="title"><span class="f14">'+f_id+'</span><span class="fr" >'
				+ date_format(new Date(),"MM-dd HH:mm:ss") +'</span></p>'
				+ '<p class="gray" ></p></li></ul></div>';
			$("#list_cur").prepend(tempContent);
			$("#list_hicurrentListst").prepend(tempContent);
		} 
		var f_id = $('#f_id').val("");
		$('#myModal').modal('hide');
		$('#f_id').val("");
	})
})

var ack_callback =  function(msg) {
	var tab_list_id;
	if(msg.msg.groupType == 1){
		tab_list_id = msg.msg.groupId.replace(""+login_uid,"").replace("_","");
		
	}else if(msg.msg.groupType == 2){
		tab_list_id = msg.msg.groupId;
	}
	var state = $('#msg_container div[msgid="'+msg.msg.msgId+'"]').attr('state');
	if(state == undefined || state == "3"){
		//取消发送中样式，更新消息时间和序列id
		$('#msg_container div[msgid="'+msg.msg.msgId+'"] .msg_sending').attr("style","display:none;");
		$('#msg_container div[msgid="'+msg.msg.msgId+'"]').attr('state','1');
		$('#msg_container div[msgid="'+msg.msg.msgId+'"] .message-time').html(date_format(msg.msg.sendTime,"yyyy-MM-dd HH:mm:ss"));
		$('#msg_container div[msgid="'+msg.msg.msgId+'"]').attr("msgseqid",msg.msg.msgSeqId);
		//更新msgSeqId
		$('#list_cur #'+tab_list_id).attr("msgSeqId",msg.msg.msgSeqId);
		$('#list_hicurrentListst #'+tab_list_id).attr("msgSeqId",msg.msg.msgSeqId);
		$('#list_cur .tab-list[groupid="'+msg.msg.groupId+'"] ul li #title .fr').html(date_format(msg.msg.sendTime,"MM-dd HH:mm:ss"));
		$('#list_hicurrentListst .tab-list[groupid="'+msg.msg.groupId+'"] ul li #title .fr').html(date_format(msg.msg.sendTime,"MM-dd HH:mm:ss"));
		if (Constants.msgType == 1) {
			//修改会话列表最后一条消息和时间
			$('#list_cur .tab-list[groupid="'+msg.msg.groupId+'"] ul li .gray').html(replace_em(Dictionarys.dictionary.get(msg.msg.msgId)));
			$('#list_hicurrentListst .tab-list[groupid="'+msg.msg.groupId+'"] ul li .gray').html(replace_em(Dictionarys.dictionary.get(msg.msg.msgId)));
		} else if (Constants.msgType == 3) {
			/*$('#msg_container div[msgid="'+msg.msg.msgId+'"] .chat_photo').attr("src",IMConstants.IM_LOADFILEURL+"/v1/img/"+ Constants.msgUrl.replace("_Small",""));*/
			//修改会话列表最后一条消息和时间
			$('#list_cur .tab-list[groupid="'+msg.msg.groupId+'"] ul li .gray').html("图片");
			$('#list_hicurrentListst .tab-list[groupid="'+msg.msg.groupId+'"] ul li .gray').html("图片");
		}
		//改变会话列表顺序
		$('#list_cur').children().first().before($('#list_cur .tab-list[groupid="'+msg.msg.groupId+'"]'));
		$('#list_hicurrentListst').children().first().before($('#list_hicurrentListst .tab-list[groupid="'+msg.msg.groupId+'"]'));
	}
}

var receive_callback = function(msg) {
	var tab_list_id;	var tab_avatar;		var tab_msgBody_;
	var msgBody_;
	var session = $('#list_cur div[groupid="'+msg.msg.groupId+'"]').length;;	
	if(msg.msg.groupType == 1){
		if(msg.msg.senderId == login_uid){
			tab_list_id = msg.msg.groupId.replace(""+login_uid,"").replace("_","");
		}else{
			tab_list_id = msg.msg.senderId;
		}
		tab_avatar = "images/chat/T1TaVTB7LT1R4cSCrK.png";
		/*session = $('#list_cur #'+msg.msg.senderId).length;*/
	}else if(msg.msg.groupType == 2){
		tab_list_id = msg.msg.groupId;
		tab_avatar = "images/chat/group_avatar2.png";
		/*session = $('#list_cur #'+msg.msg.groupId).length;*/
	}
	if(msg.msg.msgType == 1){
		tab_msgBody_ = msg.msg.msgBody;
		var start = msg.msg.msgBody.substring(0,1);
		var end = msg.msg.msgBody.substring(msg.msg.msgBody.length-1,msg.msg.msgBody.length);
		if(start == "[" && end == "]"){
			msgBody_ = '<img class="face_img" src="images/faces/default_face/'+msg.msg.msgBody.replace("[","").replace("]","")+'@2x.png">';
		}else{
			msgBody_ = msg.msg.msgBody;
		}
	}else if(msg.msg.msgType == 3){
		tab_msgBody_ = "[图片]";
		msgBody_ = '<img class="chat_photo" src="'+IMConstants.IM_LOADFILEURL+"/v1/img/" 
			+ msg.msg.attch[0].attachUrl.replace("_Small","") + '"/>';
	}
	if(tab_list_id == $('#msg_exist').val()){
		if(msg.msg.senderId == login_uid){
			avatar = 'images/touxiang.jpg';
			tempContent = '<div msgseqid="'+msg.msg.msgSeqId+'" class="message-reply"><div class="message-time">'+date_format(msg.msg.sendTime,"yyyy-MM-dd HH:mm:ss")+'</div>'
	            + '<div class="message-info"><div class="user-info">'
	            + '<img class="user-avatar" src="'+avatar+'">'
	            + '</div><div class="message-content-box"><div class="arrow"></div><div class="message-content">' + msgBody_ 
	            + '</div></div></div></div>';
			$('#msg_container').append(tempContent);
			change_msg_scroll();
		}else{
			avatar = 'images/touxiang.jpg';
			tempContent = '<div msgseqid="'+msg.msg.msgSeqId+'" class="message-receive"><div class="message-time">'+date_format(msg.msg.sendTime,"yyyy-MM-dd HH:mm:ss")+'</div>'
	            + '<div class="message-info"><div class="user-info">'
	            + '<img class="user-avatar" src="'+avatar+'">'
	            + '</div><div class="message-content-box"><div class="arrow"></div><div class="message-content">' + msgBody_ 
	            + '</div></div></div></div>';
			$('#msg_container').append(tempContent);
			change_msg_scroll();
		}
		
		
		if("list_hicurrentListst" == $('#msg_exist').attr("win_id")){
			//判断是否需要更新未读消息
			if(unreadNumList.get(tab_list_id) == undefined){
				unreadNumList.put(tab_list_id,1);
			}else{
				var num = unreadNumList.get(tab_list_id) + 1;
				unreadNumList.put(tab_list_id,num);
			}
			
			if(session == 0){
				
				tempContent = '<div class="tab-list" id="'+tab_list_id+'" msgSeqId="'+msg.msg.msgSeqId+'" '
					+ 'groupid="'+msg.msg.groupId+'" grouptype="'+msg.msg.groupType+'" onclick="showChatBox(this)">'
					+ '<ul><li class="contacts_li contacts_his" data-load="true">'
					+ '<img src="' + tab_avatar + '">'
					+ '<p id="title"><span class="f14">'+tab_list_id+'</span><span class="fr" >'
					+ date_format(msg.msg.sendTime,"MM-dd HH:mm:ss") +'</span></p>'
					+ '<p class="gray" >'
					+ tab_msgBody_ +'</p><div id="unread"><div class="unread">'+unreadNumList.get(tab_list_id)+'</div></div></li></ul></div>';
				$("#list_cur").append(tempContent);
			}else{
				$('#unread').html('<div class="unread">'+unreadNumList.get(tab_list_id)+'</div>');
			}
		}
	}else{
		//判断会话列表中是否已存在会话，存在更新未读消息，不存在创建
		if(unreadNumList.get(tab_list_id) == undefined){
			unreadNumList.put(tab_list_id,1);
		}else{
			var num = unreadNumList.get(tab_list_id) + 1;
			unreadNumList.put(tab_list_id,num);
		}
		if(session == 0){
			tempContent = '<div class="tab-list" id="'+tab_list_id+'" msgSeqId="'+msg.msg.msgSeqId+'" '
				+ 'groupid="'+msg.msg.groupId+'" grouptype="'+msg.msg.groupType+'" onclick="showChatBox(this)">'
				+ '<ul><li class="contacts_li contacts_his" data-load="true">'
				+ '<img src="' + tab_avatar + '">'
				+ '<p id="title"><span class="f14">'+tab_list_id+'</span><span class="fr" >'
				+ date_format(msg.msg.sendTime,"MM-dd HH:mm:ss") +'</span></p>'
				+ '<p class="gray" >'
				+ tab_msgBody_ +'</p><div id="unread"><div class="unread">'+unreadNumList.get(tab_list_id)+'</div></div></li></ul></div>';
			$("#list_cur").append(tempContent);
		}else{
			$('#unread').html('<div class="unread">'+unreadNumList.get(tab_list_id)+'</div>');
		}
	}
	//更新msgSeqId
	$('#list_cur #'+tab_list_id).attr("msgSeqId",msg.msg.msgSeqId);
	$('#list_hicurrentListst #'+tab_list_id).attr("msgSeqId",msg.msg.msgSeqId);
	//更新会话列表最后一条消息时间和内容
	$('#list_cur .tab-list[groupid="'+msg.msg.groupId+'"] ul li .gray').html(tab_msgBody_);
	$('#list_hicurrentListst .tab-list[groupid="'+msg.msg.groupId+'"] ul li .gray').html(tab_msgBody_);
	$('#list_cur .tab-list[groupid="'+msg.msg.groupId+'"] ul li #title .fr').html(date_format(msg.msg.sendTime,"MM-dd HH:mm:ss"));
	$('#list_hicurrentListst .tab-list[groupid="'+msg.msg.groupId+'"] ul li #title .fr').html(date_format(msg.msg.sendTime,"MM-dd HH:mm:ss"));
	//改变会话列表顺序
	$('#list_cur').children().first().before($('#list_cur .tab-list[groupid="'+msg.msg.groupId+'"]'));
	$('#list_hicurrentListst').children().first().before($('#list_hicurrentListst .tab-list[groupid="'+msg.msg.groupId+'"]'));
}

var login_callback = function(msg){
	if(Constants.loginCount == false){
		var sessionList = "";
		var groupName = "";
		sendListGroupMsgs(login_uid,0,IMConstants.IM_TOKEN);
		if(ListGroupMsgsData.listGroupMsgs.group != undefined){
			for(var i = 0;i < ListGroupMsgsData.listGroupMsgs.group.length;i++){
				if(ListGroupMsgsData.listGroupMsgs.group[i].lastMsg == undefined){
					ListGroupMsgsData.listGroupMsgs.group.splice(i,1);
					i--;
				}
			}
			var sort = ListGroupMsgsData.listGroupMsgs.group.sort(  
					function(a, b) {  
						return b.lastMsg.sendTime - a.lastMsg.sendTime;
					}	
	        ); 
			for(var i=0;i < sort.length;i++){
				sessionList = sort[i].groupId.split('_').toString();
				var userId = sessionList.replace(login_uid, "").replace(",","");
				var msgSeqId = sort[i].lastMsg.msgSeqId;
				var avatar;
				var groupType;
				if(sort[i].groupType == 1){
					avatar = "images/chat/T1TaVTB7LT1R4cSCrK.png";
				}else if(sort[i].groupType == 2){
					avatar = "images/chat/group_avatar2.png";
				}
				if(sort[i].lastMsg.msgType == 1){
					var msgTab = $('div[class="tab-list"][id="'+userId+'"]');
					if(msgTab.length == 0){
						tempContent = '<div class="tab-list" id="'+userId+'" msgSeqId="'+msgSeqId+'" '
							+ 'groupid="' + sort[i].groupId+'" grouptype="'+sort[i].groupType+'"'
							+ 'onclick="showChatBox(this)"><ul>'
							+ '<li class="contacts_li contacts_his" data-load="true">'
							+ '<img src="' + avatar + '">'
							+ '<p id="title"><span class="f14">'+userId+'</span><span class="fr" >'
							+ date_format(sort[i].lastMsg.sendTime,"MM-dd HH:mm:ss") +'</span></p>'
							+ '<p class="gray" >'+ sort[i].lastMsg.msgBody +'</p></li></ul></div>';
						$("#list_hicurrentListst").append(tempContent);
					}
				}else if(sort[i].lastMsg.msgType == 3){
					var msgTab = $('div[class="tab-list"][id="'+userId+'"]');
					if(msgTab.length == 0){
						tempContent = '<div class="tab-list" id="'+userId+'" msgSeqId="'+msgSeqId+'" '
							+ 'groupid="' + sort[i].groupId+'" grouptype="'+sort[i].groupType+'"'
							+ 'onclick="showChatBox(this)"><ul>'
							+ '<li class="contacts_li contacts_his" data-load="true">'
							+ '<img src="' + avatar + '">'
							+ '<p id="title"><span class="f14">'+userId+'</span><span class="fr" >'
							+ date_format(sort[i].lastMsg.sendTime,"MM-dd HH:mm:ss") +'</span></p>'
							+ '<p class="gray" >[图片]</p></li></ul></div>';
						$("#list_hicurrentListst").append(tempContent);
					}
				}
			}
		}
		$('#over').attr("style","display:none;");
	}
	Constants.loginCount = true;
}

var kick_callback = function(msg){
	if(msg.head.result == 0){
		toastr.warning("您的账户在其他设备登录，您已被强制下线！","",tip_options);
		var res = function(){
			window.location = "login";
		}
		setTimeout(res,1010);
	}
}

var logout_callback = function(msg){
	if(msg.head.result == 0){
		$.ajax({
			url:'auth/logout',
			type:'get',
			success:function(msg){
				if(msg.status == "ok"){
					window.location = "login";
				}else{
					window.location = "error";
				}
			}
		})
	}else{
		toastr.warning("退出聊天失败","",tip_options);
	}
}

function logout(){
	sendUserLogout();
}

function sendMessage(){
	
	validate_login();
	
	var userId = login_uid;
	var groupType = parseInt($('#msg_exist').attr('groupType'));
	var uids;
	if(groupType == "1"){
		uids = Constants.SESSION_LIST1;
	}else if(groupType == "2"){
		uids = login_uid;
	}
	var msgId = (uids + new Date().getTime()).toString();
	contentElement = $('.input_content');
	msgBody = jQuery.trim(contentElement.val()),
	
	msgList.put(msgId,msgBody);
    Dictionarys.dictionary = msgList;
    var groupId="";
    if(msgBody != "" && uids != undefined){
    	avatar = 'images/touxiang.jpg';
		tempContent = '<div msgid="'+msgId+'" class="message-reply"><div class="message-time">' 
			+ date_format(new Date(),"yyyy-MM-dd HH:mm:ss") + '</div>'
            + '<div class="message-info">'
            + '<div class="user-info"><img class="user-avatar" src="' + avatar + '"></div>'
            + '<div class="message-content-box"><div class="arrow"></div><div class="item-pics-box"></div>'
            + '<div class="message-content">' + msgBody + '</div></div>'
            + '<div class="msg_sending"><img src="images/chat/msg_loading.gif"/></div></div></div>';
		$('#msg_container').append(tempContent);
		change_msg_scroll();
		/*setMsgFail(uids,msgId,1,msgBody,groupType);*/
		var res = function(){
			setMsgFail(uids,msgId,1,msgBody,groupType);
		}
		setTimeout(res,10000);
		if(groupType == 1){
			if(userId>uids){
	        	groupId=uids+"_"+userId;
	    	}else if(uids>userId){
	    		groupId=userId+"_"+uids;
	    	}
		}else if(groupType == 2){
			groupId =Constants.SESSION_LIST1;
		}
		/*sendImMsg(uids,new ImMsg().setMsgId(msgId).setMsgType(1).setSenderId(userId).setGroupId(groupId).setGroupType(1).setMsgBody(msgBody));*/
		sendImMsg(uids,{
			msgId : msgId,
			msgType : 1,
			senderId : login_uid,
			/*senderName : senderName,*/
			groupId : groupId,
			groupType : groupType,
			msgBody : msgBody
		});
    	Constants.msgType = 1;
    }
    
    contentElement.val('');
    
    //更新会话置顶
}

function sendImg(node){
	
	validate_login();
	
	var imgUrl;
	var userId = login_uid;
	var groupId="";
	var groupType = parseInt($('#msg_exist').attr('groupType'));
	var uids;
	if(groupType == "1"){
		uids = Constants.SESSION_LIST1;
	}else if(groupType == "2"){
		uids = login_uid;
	}
	var msgId = (uids + new Date().getTime()).toString();
	var fileSize = node.files[0].size; 
	if(uids != undefined){
		imgUrl = ajaxFileUpload("100","123",'#photo',"123456");
		if(imgUrl != undefined){
			if (node.files && node.files[0]) {  
		    	var reader = new FileReader();  
		    	reader.onload = function(evt){  
		    		var src = evt.target.result; 
		    		avatar = 'images/touxiang.jpg';
		    		tempContent = '<div msgid="'+msgId+'" class="message-reply"><div class="message-time">' 
		    			+ date_format(new Date(),"yyyy-MM-dd HH:mm:ss") + '</div>'
		                + '<div class="message-info">'
		                + '<div class="user-info"><img class="user-avatar" src="' + avatar + '"></div>'
		                + '<div class="message-content-box"><div class="arrow"></div><div class="item-pics-box"></div>'
		                + '<div class="message-content"><img class="chat_photo" src="' + src + '"/>'
		                + '</div></div><div class="msg_sending"><img src="images/chat/msg_loading.gif"/></div></div></div>';
		    		$('#msg_container').append(tempContent);
		    		change_msg_scroll();
		    		var imgBody = {
	    					attachId : Math.uuid(),
	    					attachName : imgUrl,
	    					attachType : 3,
	    					attachUrl : imgUrl,
	    					attachSize : fileSize,
	    					width : Constants.msgWidth,
	    					height : Constants.msgHeight,
	    					attachUploadtime : Constants.msgUploadTime
	    				}
		    		/*setMsgFail(uids,msgId,3,imgBody,groupType);*/
		    		var res = function(){
		    			setMsgFail(uids,msgId,3,imgUrl,groupType);
		    		}
		    		setTimeout(res,10000);
		    		if(imgUrl != undefined){
		    			if(groupType == 1){
		    				if(userId>uids){
		    		        	groupId=uids+"_"+userId;
		    		    	}else if(uids>userId){
		    		    		groupId=userId+"_"+uids;
		    		    	}
		    			}else if(groupType == 2){
		    				groupId =Constants.SESSION_LIST1;
		    			}
		    			/*sendImMsg(uids,new ImMsg().setMsgId(msgId).setMsgType(3).setSenderId(uid).setGroupId(groupId).setGroupType(1).setMsgUrl(Constants.msgUrl));*/
		    			sendImMsg(uids,{
		    				msgId : msgId,
		    				msgType : 3,
		    				senderId : login_uid,
		    				/*senderName : senderName,*/
		    				groupId : groupId,
		    				groupType : groupType,
		    				attch : imgBody
		    			});
		    			/*setTimeout("setMsgFail(mesgId)",1);*/
		    			Constants.msgType = 3;
		    		}
		    	}  
		    	reader.readAsDataURL(node.files[0]);
		    }
		}else{
			
		}
		
	}
	//清空file
	var file = $("#photo"); 
	file.after(file.clone().val("")); 
	file.remove();
}

function sendFace(item){
	
	validate_login();
	
	var userId = login_uid;
	var groupType = parseInt($('#msg_exist').attr('groupType'));
	var uids;
	if(groupType == "1"){
		uids = Constants.SESSION_LIST1;
	}else if(groupType == "2"){
		uids = login_uid;
	}
	var msgId = (uids + new Date().getTime()).toString();
	msgBody = "[" + $(item).attr("face_name") + "]";
	
	msgList.put(msgId,msgBody);
    Dictionarys.dictionary = msgList;
    var groupId="";
    if(msgBody != "" && uids != undefined){
    	avatar = 'images/touxiang.jpg';
		tempContent = '<div msgid="'+msgId+'" class="message-reply"><div class="message-time">' 
			+ date_format(new Date(),"yyyy-MM-dd HH:mm:ss") + '</div>'
            + '<div class="message-info">'
            + '<div class="user-info"><img class="user-avatar" src="' + avatar + '"></div>'
            + '<div class="message-content-box"><div class="arrow"></div><div class="item-pics-box"></div>'
            + '<div class="message-content"><img class="face_img" src="'+$(item).attr('src')+'"></div></div>'
            + '<div class="msg_sending"><img src="images/chat/msg_loading.gif"/></div></div></div>';
		$('#msg_container').append(tempContent);
		change_msg_scroll();
		/*setMsgFail(uids,msgId,1,msgBody,groupType);*/
		var res = function(){
			setMsgFail(uids,msgId,1,msgBody,groupType);
		}
		setTimeout(res,10000);
		if(groupType == 1){
			if(userId>uids){
	        	groupId=uids+"_"+userId;
	    	}else if(uids>userId){
	    		groupId=userId+"_"+uids;
	    	}
		}else if(groupType == 2){
			groupId =Constants.SESSION_LIST1;
		}
		/*sendImMsg(uids,new ImMsg().setMsgId(msgId).setMsgType(1).setSenderId(userId).setGroupId(groupId).setGroupType(1).setMsgBody(msgBody));*/
		sendImMsg(uids,{
			msgId : msgId,
			msgType : 1,
			senderId : login_uid,
			/*senderName : senderName,*/
			groupId : groupId,
			groupType : groupType,
			msgBody : msgBody
		});
    	Constants.msgType = 1;
    	$('#face_box').css('display','none');
    	face_open_number += 1;
    }
}

function setMsgFail(toUid,msgId,msgType,msgBody,groupType) {
	var state = $('#msg_container div[msgid="'+msgId+'"]').attr('state');
	if(state != "1"){
		if(msgType == 1){
			resendMsgList.put(msgId,msgBody);
		}else if(msgType == 3){
			resendMsgList.put(msgId,msgBody);
		}
		var msgLeft = $('#msg_container div[msgid="'+msgId+'"] .msg_sending').position();
		var left
		if(msgLeft != undefined){
			left = msgLeft.left-6;
		}
		 
		$('#msg_container div[msgid="'+msgId+'"]').append('<div class="resend_tip" data-toggle="tooltip" '
				+'style="left:'+left+'px;" data-placement="top" title="重新发送" onclick="resend(this,'+toUid+','+msgType+','+groupType+')"></div>');
		$('#msg_container div[msgid="'+msgId+'"]').attr('state','2');
		$('#msg_container div[msgid="'+msgId+'"] .msg_sending').html('<div class="send_fail">!</div>');
		$('#msg_container div[msgid="'+msgId+'"] .resend_tip').tooltip();
	}
}

function resend(item,toUid,msgType,groupType){
	
	validate_login();
	
	var msgId = $(item).parent().attr("msgid");
	$('#msg_container div[msgid="'+msgId+'"] .resend_tip').css("display","none");
	$('#msg_container div[msgid="'+msgId+'"] .msg_sending').html('<img src="images/chat/msg_loading.gif"/>');
	$('#msg_container div[msgid="'+msgId+'"]').attr('state','3');
	$('#msg_container div[msgid="'+msgId+'"] .message-time').html(date_format(new Date(),"yyyy-MM-dd HH:mm:ss"));
	var msgBody = resendMsgList.get(msgId);
	var newMsgId = (toUid.toString() + new Date().getTime()).toString();
	$('#msg_container div[msgid="'+msgId+'"]').attr('msgid',newMsgId);
	msgList.put(newMsgId,msgBody);
	var groupId = "";
	if(login_uid > toUid){
		groupId = toUid + "_" + login_uid;
	}else{
		groupId = login_uid + "_" + toUid;
	}
	if(msgType == 1){
		/*sendImMsg(toUid,new ImMsg().setMsgId(newMsgId).setMsgType(msgType)
				.setSenderId(uid).setGroupId(groupId).setGroupType(1).setMsgBody(msgBody));*/
		sendImMsg(toUid,{
			msgId : newMsgId,
			msgType : msgType,
			senderId : login_uid,
			/*senderName : senderName,*/
			groupId : groupId,
			groupType : groupType,
			msgBody : msgBody
		});
	}else if(msgType == 3){
		/*sendImMsg(toUid,new ImMsg().setMsgId(newMsgId).setMsgType(msgType)
				.setSenderId(uid).setGroupId(groupId).setGroupType(1).setMsgUrl(msgBody));*/
		sendImMsg(toUid,{
			msgId : newMsgId,
			msgType : msgType,
			senderId : login_uid,
			/*senderName : senderName,*/
			groupId : groupId,
			groupType : groupType,
			attch : msgBody
		});
	}
	var res = function(){
		setMsgFail(toUid,newMsgId,msgType,msgBody,groupType);
	}
	setTimeout(res,10000);
}

function writeMsg(data,sort){
	if(data == undefined){
		$('#over').attr("style","display:none;");
	}else{
		//sort:1-append 2-prepend
		var exist_height = $('#msg_container').height() + 29;
		if(data != undefined){
			if(sort == 1){
				for(var i = data.length - 1;i >= 0; i--){
					write(data[i],sort);
				}
				var tempContent = '<div><div class="history_tip">以上为历史消息</div></div>';
				$('#msg_container').append(tempContent);
			}else if(sort == 2){
				loadMoreList.put("loadMore_imgNum",0);
				for(var i = 0;i < data.length; i++){
					write(data[i],sort);
					$('#more_loading').attr("style","text-align: center; margin-top: 5px;margin-bottom: 4px;display:none;");
					change_loadMore_scroll();
				}
			}
		}
		var options = {
				navbar : false,
				title : false,
				toolbar : false
			}
		$('.chat_photo').viewer(options);
		return true;
	}
}

function write(item,sort){
	if(item.msgType == 3){
		loadMoreList.put("loadMore_imgNum",loadMoreList.get("loadMore_imgNum") + 1);
	}
	
	var msgBody_; var start; var end;
	if(item.msgType == 1){
		start = item.msgBody.substring(0,1);
		end = item.msgBody.substring(item.msgBody.length-1,item.msgBody.length);
	}
	if(start == "[" && end == "]"){
		msgBody_ = '<img class="face_img" src="images/faces/default_face/'+item.msgBody.replace("[","").replace("]","")+'@2x.png">';
	}else{
		msgBody_ = item.msgBody;
	}
	//判断消息发送者
	if(item.senderId == login_uid){
		if(item.msgType == 1){
			avatar = 'images/touxiang.jpg';
			tempContent = '<div msgseqid="'+item.msgSeqId+'" class="message-reply">'
				+ '<div class="message-time">' + date_format(item.sendTime,"yyyy-MM-dd HH:mm:ss") + '</div>'
	            + '<div class="message-info">'
	            + '<div class="user-info"><img class="user-avatar" src="' + avatar + '"></div>'
	            + '<div class="message-content-box"><div class="arrow"></div><div class="item-pics-box"></div>'
	            + '<div class="message-content">' + msgBody_ + '</div></div></div></div>';
			if(sort == 1){
				$('#msg_container').append(tempContent);
			}else if(sort == 2){
				$('#msg_container').prepend(tempContent);
			}
		}else if(item.msgType == 3){
			avatar = 'images/touxiang.jpg';
			if(item.attch == undefined){
				tempContent = '<div msgseqid="' + item.msgSeqId+'" class="message-reply">'
				+ '<div class="message-time">' + date_format(item.sendTime,"yyyy-MM-dd HH:mm:ss") + '</div>'
	            + '<div class="message-info">'
	            + '<div class="user-info"><img class="user-avatar" src="' + avatar + '"></div>'
	            + '<div class="message-content-box"><div class="arrow"></div><div class="item-pics-box"></div>'
	            + '<div class="message-content"><img class="chat_photo" src="'+IMConstants.IM_LOADFILEURL+"/v1/img/" 
	            + item.msgUrl.replace("_Small","") + '"/></div></div></div></div>';
			}else{
				tempContent = '<div msgseqid="' + item.msgSeqId+'" class="message-reply">'
				+ '<div class="message-time">' + date_format(item.sendTime,"yyyy-MM-dd HH:mm:ss") + '</div>'
	            + '<div class="message-info">'
	            + '<div class="user-info"><img class="user-avatar" src="' + avatar + '"></div>'
	            + '<div class="message-content-box"><div class="arrow"></div><div class="item-pics-box"></div>'
	            + '<div class="message-content"><img class="chat_photo" src="'+IMConstants.IM_LOADFILEURL+"/v1/img/" 
	            + item.attch[0].attachUrl.replace("_Small","") + '"/></div></div></div></div>';
			}
			if(sort == 1){
				$('#msg_container').append(tempContent);
			}else if(sort == 2){
				$('#msg_container').prepend(tempContent);
			}
		}
	}else{
		if(item.msgType == 1){
			avatar = 'images/touxiang.jpg';
			tempContent = '<div msgseqid="' + item.msgSeqId+'" class="message-receive">'
				+ '<div class="message-time">'+date_format(item.sendTime,"yyyy-MM-dd HH:mm:ss")+'</div>'
	            + '<div class="message-info"><div class="user-info">'
	            + '<img class="user-avatar" src="'+avatar+'">'
	            + '</div><div class="message-content-box"><div class="arrow"></div><div class="message-content">'
	            + msgBody_ + '</div></div></div></div>';
			if(sort == 1){
				$('#msg_container').append(tempContent);
			}else if(sort == 2){
				$('#msg_container').prepend(tempContent);
			}
		}else if(item.msgType == 3){
			avatar = 'images/touxiang.jpg';
			if(item.attch == undefined){
				tempContent = '<div msgseqid="'+item.msgSeqId+'" class="message-receive">'
				+ '<div class="message-time">'+date_format(item.sendTime,"yyyy-MM-dd HH:mm:ss")+'</div>'
	            + '<div class="message-info"><div class="user-info">'
	            + '<img class="user-avatar" src="'+avatar+'">'
	            + '</div><div class="message-content-box"><div class="arrow"></div><div class="message-content">'
	            + '<img class="chat_photo" src="'+IMConstants.IM_LOADFILEURL+"/v1/img/"
	            + item.msgUrl.replace("_Small","") + '"/></div></div></div></div>';
			}else{
				tempContent = '<div msgseqid="'+item.msgSeqId+'" class="message-receive">'
				+ '<div class="message-time">'+date_format(item.sendTime,"yyyy-MM-dd HH:mm:ss")+'</div>'
	            + '<div class="message-info"><div class="user-info">'
	            + '<img class="user-avatar" src="'+avatar+'">'
	            + '</div><div class="message-content-box"><div class="arrow"></div><div class="message-content">'
	            + '<img class="chat_photo" src="'+IMConstants.IM_LOADFILEURL+"/v1/img/"
	            + item.attch[0].attachUrl.replace("_Small","") + '"/></div></div></div></div>';
			}
			if(sort == 1){
				$('#msg_container').append(tempContent);
			}else if(sort == 2){
				$('#msg_container').prepend(tempContent);
			}
		}
	}
}

function showChatBox(item){
	
	validate_login();
	
	var grand = $(item).parent();
	var sons = grand.children();
	sons.each(function(index){
		$(this).removeClass('select_active');
	});
	$(item).addClass('select_active');
	//移除不同选项卡中得样式
	var bro = grand.parent().siblings();
	var bro_sons = bro.children().children();
	bro_sons.each(function(index){
		$(this).removeClass('select_active');
	});
	
	//打开聊天窗口
	var id = $(item).attr('id');
	var msgSeqId = $(item).attr('msgSeqId');
	var groupType = $(item).attr('grouptype');
	win_id = $(item).parent().attr("id");
	showChat(id,msgSeqId,groupType);
}

function showChat(id,msgSeqId,groupType){
	$('#load_more_msg').attr("style","text-align: center; margin-top: 5px;margin-bottom: 4px;display:none;");
	$('#more_loading').attr("style","text-align: center; margin-top: 5px;margin-bottom: 4px;display:none;");
	$('#noMore').attr("style","text-align: center; margin-top: 5px;margin-bottom: 4px;display:none;");
	if(id != $('#msg_exist').val()/* && parentId != $('#msg_exist').attr("win_id")*/){
		$('#over').removeAttr("style");
		
		$('#msg_container').html("");
		
		Constants.SESSION_LIST1 = id;
		   
		var groupId="";
		if(groupType == 1){
			if(login_uid > Constants.SESSION_LIST1){
				groupId = Constants.SESSION_LIST1+"_"+login_uid;
			}else{
				groupId = login_uid+"_"+Constants.SESSION_LIST1;
			}
		}else if(groupType == 2){
			groupId = id;
		}
		sendListOffileMsgs(groupId,login_uid,IMConstants.IM_TOKEN,msgSeqId);
		if(ListOffileMsgData.listOffileMsg.msg == undefined){
			$('#over').attr("style","display:none;");
		}else{
			if(ListOffileMsgData.listOffileMsg.msg.length == 20){
				$('#load_more_msg').attr("style","text-align: center; margin-top: 5px;margin-bottom: 4px");
			}
			writeMsg(ListOffileMsgData.listOffileMsg.msg,1);
			var imgs = $('#msg_container .chat_photo');
			if(imgs.length == 0){
				$('#over').attr("style","display:none;");
			}
			change_msg_scroll();
		}
		
		//隐藏未读消息数
		$('#list_cur #'+id+' #unread').html("");
		$('#list_hicurrentListst #'+id+' #unread').html("");
		//清空未读消息数
		unreadNumList.remove(id);
		
		$('#msg_exist').val(id);
		$('#msg_exist').attr("win_id",win_id);
		$('#msg_exist').attr("groupType",groupType);
	}else{
		$('#msg_exist').val(id);
		$('#msg_exist').attr("win_id",win_id);
		$('#msg_exist').attr("groupType",groupType);
		//隐藏未读消息数
		$('#list_cur #'+id+' #unread').html("");
		$('#list_hicurrentListst #'+id+' #unread').html("");
		//清空未读消息数
		unreadNumList.remove(id);
	}
	var load_more_msgSeqId = $('#msg_container').children().first().attr("msgseqid");
	loadMoreList.put("toUid",id);
	loadMoreList.put("token",IMConstants.IM_TOKEN);
	loadMoreList.put("msgSeqId",load_more_msgSeqId);
	loadMoreList.put("groupType",groupType);
	
}

function load_more_msg(login_uid,toUid,token,msgSeqId,groupType){
	
	validate_login();
	
	var exist_win_height = $('#msg_container').height();
	loadMoreList.put("exist_win_height",exist_win_height);
	
	var groupId="";
	if(groupType == 1){
		if(login_uid > toUid){
			groupId = toUid+"_" + login_uid;
		}else{
			groupId = login_uid+"_" + toUid;
		}
	}else if(groupType == 2){
		groupId = toUid;
	}
	
	sendListOffileMsgs(groupId,login_uid,token,msgSeqId - 1);
	var res = function(){
		$('#over').attr("style","display:none;");
	}
	if(ListOffileMsgData.listOffileMsg.msg != undefined && ListOffileMsgData.listOffileMsg.msg.length == 20){
		$('#load_more_msg').attr("style","text-align: center; margin-top: 5px;margin-bottom: 4px");
		writeMsg(ListOffileMsgData.listOffileMsg.msg,2);
	}else{
		$('#more_loading').attr("style","text-align: center; margin-top: 5px;margin-bottom: 4px;display:none;");
		$('#load_more_msg').attr("style","text-align: center; margin-top: 5px;margin-bottom: 4px;display:none;");
		$('#noMore').attr("style","text-align: center; margin-top: 5px;margin-bottom: 4px");
		writeMsg(ListOffileMsgData.listOffileMsg.msg,2);
	}
	var load_more_msgSeqId = $('#msg_container').children().first().attr("msgseqid");
	loadMoreList.put("msgSeqId",load_more_msgSeqId);	
}

function bind_Mouse(){
	$('#chat-scroll').mousewheel(function(event, delta) {
		if($('#msg_exist').val()/* != "" && $('#msg_container').children().length == 21*/){
			if($('#chat-scroll').scrollTop() == 0 && delta > 0){
				$('#over').removeAttr("style");
				$('#load_more_msg').attr("style","text-align: center; margin-top: 5px;margin-bottom: 4px;display:none;");
				$('#more_loading').attr("style","text-align: center; margin-top: 5px;margin-bottom: 4px;");
				load_more_msg(login_uid,loadMoreList.get("toUid"),loadMoreList.get("token"),
						loadMoreList.get("msgSeqId"),loadMoreList.get("groupType"));
			}
		}
    });
}

function switch_tab(item){
	var parent = $(item).parent()
	var sons = parent.children();
	sons.each(function(index){
		$(this).removeClass('active');
		$('div[tab_id="'+$(this).attr("inner_div")+'"]').attr("style","display:none;");
	});
	$(item).addClass('active');
	$('div[tab_id="'+$(item).attr("inner_div")+'"]').removeAttr("style");
}

function initFace(){
	var faces = ["微笑@2x.png","色@2x.png","亲亲@2x.png","得意@2x.png","流泪@2x.png","害羞@2x.png","闭嘴@2x.png","鼓掌@2x.png","大哭@2x.png","尴尬@2x.png",
	             "生气@2x.png","调皮@2x.png","呲牙@2x.png","惊讶@2x.png","委屈@2x.png","吐血@2x.png","冷汗@2x.png","抓狂@2x.png","难过@2x.png","偷笑@2x.png",
	             "白眼@2x.png","不屑@2x.png","快哭了@2x.png","困@2x.png","装酷@2x.png","大笑@2x.png","偷瞄@2x.png","奋斗@2x.png","咒骂@2x.png","疑问@2x.png",
	        	"晕@2x.png",
	        	"捶打@2x.png",
	        	"再见@2x.png",
	        	"抠鼻@2x.png",
	        	"发呆@2x.png",
	        	"坏笑@2x.png",
	        	"哈欠@2x.png",
	        	"鄙视@2x.png",
	        	"睡觉@2x.png",
	        	"饿@2x.png",
	        	"阴险@2x.png",
	        	"难受@2x.png",
	        	"可怜@2x.png",
	        	"撇嘴@2x.png",
	        	"石化@2x.png",
	        	"泪眼@2x.png"];
	var imgs = '';
	for(var i = 0;i < faces.length;i++){
		imgs += '<img class="face_img" '
			+ 'src="images/faces/default_face/'+ faces[i] +'" face_name="'+faces[i].replace("@2x.png","")
			+'" onclick="sendFace(this)">'
	}
	$('#face_box').html(imgs);
	$('#face_box').css('display','none');	
}

function show_faces(){
	face_open_number += 1;
	if(face_open_number % 2 == 0){
		$('#face_box').css('display','block');
	}else{
		$('#face_box').css('display','none');
	}	
}

function change_msg_scroll(){
	$('#chat-scroll').scrollTop($('#msg_container').height());
	//图片消息等加载完毕之后计算高度
	var imgs = $('#msg_container .chat_photo');
	var num = 0;
	if(imgs.length != 0){
		for(var i = 0;i < imgs.length;i ++){
			var img = new Image;  
			img.src = imgs[i].src;
			img.onload = function(){  
				num += 1;
				var height = img.height + 50;
				var exist_height = $('#chat-scroll').scrollTop();
				$('#chat-scroll').scrollTop(exist_height + height);
				if(num == imgs.length){
					$('#over').attr("style","display:none;");
				}
			}
		}
	}
	
	var options = {
		navbar : false,
		title : false,
		toolbar : false
	}
	$('.chat_photo').viewer(options);
}

function change_loadMore_scroll(){
	var res = function(){
		$('#over').attr("style","display:none;");
	}
	if(loadMoreList.get("loadMore_imgNum") == 0){
		$('#chat-scroll').scrollTop($('#msg_container').height() - loadMoreList.get("exist_win_height"));
		setTimeout(res,1000);
	}else{
		var imgs = $('#msg_container .chat_photo');
		var num = 0;
		if(imgs.length != 0){
			for(var i = 0;i < imgs.length;i ++){
				var img = new Image;  
				img.src = imgs[i].src;
				img.onload = function(){  
					num += 1;
					if(num == imgs.length){
						$('#chat-scroll').scrollTop($('#msg_container').height() - loadMoreList.get("exist_win_height"));
						setTimeout(res,1000);
					}
				}
			}
		}
	}
}

function openNewChat(){
	$('#myModal').modal('show');
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

function date_format(timeStamp,formatStr){
	Date.prototype.pattern=function(fmt) {         
	    var o = {         
	    "M+" : this.getMonth()+1, //月份         
	    "d+" : this.getDate(), //日         
	    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
	    "H+" : this.getHours(), //小时         
	    "m+" : this.getMinutes(), //分         
	    "s+" : this.getSeconds(), //秒         
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
	    "S" : this.getMilliseconds() //毫秒         
	    };         
	    var week = {         
	    "0" : "/u65e5",         
	    "1" : "/u4e00",         
	    "2" : "/u4e8c",         
	    "3" : "/u4e09",         
	    "4" : "/u56db",         
	    "5" : "/u4e94",         
	    "6" : "/u516d"        
	    };         
	    if(/(y+)/.test(fmt)){         
	        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
	    }         
	    if(/(E+)/.test(fmt)){         
	        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
	    }         
	    for(var k in o){         
	        if(new RegExp("("+ k +")").test(fmt)){         
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
	        }         
	    }         
	    return fmt;         
	}
	var newDate = new Date();
	newDate.setTime(timeStamp);
	return newDate.pattern(formatStr);
}