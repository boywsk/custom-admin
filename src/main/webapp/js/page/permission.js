$(function() {
	
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
	
	var treeData = null;
	$.ajax({
		url : 'permission/listData',
		type : 'get',
		async : false,
		success : function(msg) {
			treeData = msg.data;
		}
	});
	$('#tree').treeview({
		data : treeData, // data is not optional
		backColor : '#E4E4E4',
	});
	var nodeData = null;
	$('#tree').on('nodeSelected', function(event, data) {
		nodeData = data;
		if(nodeData.level == 4){
			$('#addChildNode').attr("disabled","disabled");
		}else{
			$('#addChildNode').removeAttr("disabled","disabled");
		}
		$('#permissionName').val(data.text);
		if (data.isMenu == 1) {
			$('#isMenu').val("是");
		}
		if (data.isMenu == 0) {
			$('#isMenu').val("否");
		}
		$('#permissionUrl').val(data.href);

		if (data.parentId != null) {
			var parent = $('#tree').treeview('getParent', data.nodeId);
			$('#parent').val(parent.text);
		} else {
			$('#parent').val("菜单节点，无父权限");
		}

	});
	$('#addChildNode').bind('click', function() {
		if (nodeData == null) {
			toastr.warning("请选择一个节点再进行此操作","",options);
		}else{
			$.ajax({
				url:'permission/allUrl',
				type:'get',
				async : false,
				success:function(msg){
					if(msg.status == "ok"){
						var options = '<option value="" selected="selected">请输入或选择</option>';
						$.each(msg.data, function(j, o) {
							options += '<option value="' + o + '">' + o + '</option>';
					    });
						$('#add_permissionUrl').html(options);
					}else{
						alert("哎呀，出错了！");
					}
				}
			});
			$('#add_permissionUrl').combobox();
			
			$('#myModal').modal('show');
			$('#add_form').bootstrapValidator({
				fields: {
					permissionName: {
			            validators: {
			                notEmpty: {
			                    message: '权限名称不能为空'
			                }
			            }
					},
					isMenu: {
					    validators: {
					    	between: {
		                        min: 0,
		                        max: 1,
		                        message: '请选择是否为菜单'
		                    }
					    }
					},
					permissionUrl: {
						selector: '.combobox',
					    validators: {
					        notEmpty: {
					            message: '权限路径不能为空'
					        }
					    }
					}
				}
			});
			$('#add_parent').val(nodeData.text);
			$('#add_parent').attr("readonly", "readonly");
			var width = $('.input-group').width();
			$('.input-group ul').width(width);
		}

	});
	$('#confirm_add').bind('click',function() {
		if($('#add_form').data('bootstrapValidator').isValid()){
			var data={};
			$('#add_form').find('input,select').each(function(){
				if(this.name == "parent_id"){
					data[this.name] = nodeData.permissionId;
				}else if(this.name == "isMenu"){
					var isMenu = parseInt(this.value, 10);
					data[this.name] = isMenu;
				}else{
					data[this.name] = this.value;
				}
			});
			data["level"] = nodeData.level+1;
			$.ajax({
				url : 'permission/add',
				type : 'post',
				contentType:'application/json;charset=utf8',
				data : JSON.stringify(data),
				dataType:'json',
				success : function(msg) {
					if (msg.status == "ok") {
						$('#myModal').modal('hide');
						toastr.success("新增成功","",options);
						$("#tree").treeview("addNode", [ nodeData.nodeId, {
							node : {
								text : data.permissionName,
								href : data.permissionUrl,
								permissionId : msg.id,
								level : msg.level
							}
						} ]);
						$('#tree').treeview('expandNode',
								[ nodeData.nodeId, {
									silent : true
								} ]);
					} else {
						toastr.error("哎呀，出错了，宝宝也不知道什么情况","",options);
					}
				}
			});
		}else{
			$('#add_form').bootstrapValidator('validate');
		}
	});

})