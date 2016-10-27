$(function(){
	//上传头像
	 $('#headImg').click(function() {
	     $("#fileupload").trigger("click");
	})

	$('#fileupload').fileupload({
		 	autoUpload: true,
		 	dataType: "text",
	        done: function (e, data) {
				if(data.result.indexOf("error:") > -1 ){
					alert(data.result.slice(6));
				}else{
					$("#licenceImg").attr("value",data.result);
					$("#headImg").attr("src",data.result);
	             
				}
	        },
		    fail: function(e, data) {
		    }
	     });

	 
	 if(role==2){
		 $('ul').find('li').eq(1).remove();
		
	 }
	 
	 $('.nav .nav-tabs a').click(function (e) {
		  e.preventDefault();
		  $(this).tab('show');
	 })
	 
	 $('#sub1').on('click', function() {
		$.ajax({
			type : "POST",
			url : "../user/saveUser",
			data : $('#fm1').serialize(),
			async : false,
			error : function(request) {
				var $error=$('#error');
				$error.hide();
				$error.html("Connection error");
				$error.slideDown();
				setTimeout(function(){$success.fadeOut('slow');},'2000');	
			},
			success : function(data) {
				var $success=$('#success');
				$success.hide();
				$success.html(data);
				$success.slideDown();
				setTimeout(function(){$success.fadeOut('slow');},'2000');
			}
		});
	})
	
	$('#sub2').on('click', function() {
		$.ajax({
			type : "POST",
			url : "../tblBusinessConfig/updateTblBusinessConfig",
			data : $('#fm2').serialize(),
			async : false,
			error : function(request) {
						var $error=$('#error');
						$error.hide();
						$error.html("Connection error");
						$error.slideDown();
						setTimeout(function(){$error.fadeOut('slow');},'2000');	
			},
			success : function(data) {
						var $success=$('#success');
						$success.hide();
						$success.html(data);
						$success.slideDown();
						setTimeout(function(){$success.fadeOut('slow');},'2000');	
				
			}
		});
	});
	
	$('#reset1').on('click', function() {
		$('#fm1').find('input[type!="hidden"][type!="button"]').val('');
	});
 })