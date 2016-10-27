$(function(){
	logins();
})

function logins() {
	
	Constants.uid = uid;

	new InitConf(new IMConstants().setUid(uid),new IMCallBack().setAckImMsg(function(msg) {
		if (Constants.msgType == 1) {
			
			tempContent = '<div class="message-reply"><div class="message-time">' + new Date().pattern("yyyy-MM-dd HH:mm:ss") + '</div>'
	            + '<div class="message-info">'
	            + '<div class="user-info"><img class="user-avatar" src="' + avatar + '"></div>'
	            + '<div class="message-content-box"><div class="arrow"></div><div class="item-pics-box"></div>'
	            + '<div class="message-content">' + msg.msg.msgBody + '</div></div></div></div>';
			
			$('#msg_container').append(tempContent);
		} else if (Constants.msgType == 3) {
		
		}
	}).setImMsg(function(msg) {
		if (msg.msg.msgType == 1) {
			tempContent = '<div class="message-receive"><div class="message-time">'+new Date().pattern("yyyy-MM-dd HH:mm:ss")+'</div>'
	            + '<div class="message-info"><div class="user-info">'
	            + '<img class="user-avatar" src="'+avatar+'">'
	            + '</div><div class="message-content-box"><div class="arrow"></div><div class="message-content">' + msg.msg.msgBody + '</div></div></div></div>';
		
			$('#msg_container').append(tempContent);				
		} else if (msg.msg.msgType == 3) {

		}
	}).setUserData(function(msg) {
	
	}).setUserLogin(function(msg){
		var sessionList = "";
		var groupName = "";
		sendListGroupMsgs(uid,0,IMConstants.IM_TOKEN);
		for(var i=0;i<ListGroupMsgsData.listGroupMsgs.group.length;i++){
			if(ListGroupMsgsData.listGroupMsgs.group[i].groupType == 1){
				sessionList = ListGroupMsgsData.listGroupMsgs.group[i].groupId.split('_').toString();
				var sessionList1 = sessionList.replace(uid, "").replace(",","");
				$("#chatRoomListUL").append('<li><a id="'+sessionList1+'" groupType = "1"   onclick="showChat(this);" value="'+sessionList1+'">'+sessionList1+'</a></li>');	   	    
			}else if(ListGroupMsgsData.listGroupMsgs.group[i].groupType == 2){
				var groupId = ListGroupMsgsData.listGroupMsgs.group[i].groupId;
				groupName += groupId+",";
				$("#chatRoomListUL").append('<li><a id="'+groupId+'" groupType = "2"  onclick="showChat(this);" value="'+groupId+'">'+groupId+'</a></li>');	   	    
    	    }
		}
	}));
}