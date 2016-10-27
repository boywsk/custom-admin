var options = {
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

$(function(){
	$('#username').on('keydown', function(e){
        e = e ? e : window.event;
        if(13 == e.keyCode){
        	$('#submit').focus(); 
        	$('#submit').onclick();
        }
    });
	
	$('#password').on('keydown', function(e){
        e = e ? e : window.event;
        if(13 == e.keyCode){
        	$('#submit').focus(); 
        	$('#submit').onclick();
        }
    });
	
	$('#submit').bind('click',function(){
		if(validateForm() == true){
			var data = $('#login_form').serialize();
			$.ajax({
				url:'auth/login',
				method:'post',
				data:data,
				success:function(msg){
					if(msg.status == "ok"){
						window.location = "chat";
						/*IM_login(msg.data.id);*/
					}
					if(msg.status == "fail"){
						$('#login_form')[0].reset();
						toastr.error("用户名或密码错误","",options);
					}
				}
			})
		}
	})
})

function validateForm(){
	if($('#username').val() == ""){
		toastr.warning("用户名不能为空","",options);
		return false;
	}else if($('#password').val() == ""){
		toastr.warning("密码不能为空","",options);
		return false;
	}else{
		return true;
	}
}

function IM_login(uid){
	new IMConstants().setUid(uid);
}