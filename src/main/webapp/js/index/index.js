$(function(){
	
	initLeftMenu();
	
	$('#logout_btn').bind('click',function(){
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
	});
	
	$('#avatar').click(function(){
		$('#avatar-modal').modal('show');
	});
})

function initLeftMenu(){
	
	$.ajax({
		url:'menu/0',
		type:'get',
		async: false,
		success:function(msg){
			if(msg.status == "ok"){
				menus = msg.data;
			}else{
				window.location = "error";
			}
		}
	})
	
	var menulist ='';
    $.each(menus, function(j, o) {
    	if(o.name == "账户管理"){
    		menulist += '<li><a rel="' + o.url + '?id='+ userId +'" >' + o.name + '</a> ';
    		menulist+='</li>';
    	}else{
    		menulist += '<li><a rel="' + o.url + '" >' + o.name + '</a> ';
    		menulist+='</li>';
    	}
    });
	
    $('#left_menu').html(menulist);
    
    $('#left_menu li a').bind('click',function(){
    	if(userId == null){
    		top.location = "login";
    	}
		var grand = $(this).parent().parent();
		var sons = grand.children();
		sons.each(function(index){
			$(this).children().removeClass('active');
		});
		$(this).addClass('active');
		
		var url = $(this).attr('rel');
		if(url == "chat"){
			window.location = url;
			/*IM_login(userId);*/
		}else{
			$('#mainContent').attr('src',url);
		}
		/*$('#mainContent').attr('src',url);*/
	});

}

/*function IM_login(userId){
	new InitConf(new IMConstants().setUid(userId),new IMCallBack().setAckImMsg(function (msg){
		var a = $('#face_box');
	if(Constants.msgType == 1){
		$("#null-nouser").append('</br>'+'</br>'+'<div id="messages" class="webim-msg-value" style="color: blue;text-align:right; width:277.5px; float:right;word-wrap: break-word; word-break: break-all">'+replace_em(Dictionarys.dictionary.get(msg.msg.msgId))+":"+msg.head.uid+'</div>');
	     }else if(Constants.msgType == 3){
	    
	      $("#null-nouser").append('</br>'+'</br>'+'<div id="messages"   style="color: blue;text-align:right; width:277.5px; float:right;word-wrap: break-word; word-break: break-all">'+"<img class='webim-msg-img' alt='' src='"+Constants.msgUrl+"'>"+":"+msg.head.uid+'</div>');
	    }

      }));
}*/