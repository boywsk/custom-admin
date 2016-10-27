var baseUrl = "role/";
var nodeData = null;
var roleId = null;
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
	
	// 初始化数据列表
	initDataTable();

	$('#role_add_btn').bind('click', function() {
		$('#addModal').modal('show');
		$('#add_role_form').bootstrapValidator({
			fields: {
				roleName: {
		            validators: {
		                notEmpty: {
		                    message: '角色名称不能为空'
		                }
		            }
				},
				description: {
				    validators: {
				        notEmpty: {
				            message: '角色描述不能为空'
				        }
				    }
				},
				roleSign: {
				    validators: {
				        notEmpty: {
				            message: '角色标示不能为空'
				        }
				    }
				}
			}
		});
	});

	$('#confirm_add_role').bind('click', function() {
		if($('#add_role_form').data('bootstrapValidator').isValid()){
			var data = {};
			$('#add_role_form').find('input').each(function() {
				data[this.name] = this.value;
			});
			$.ajax({
				url : 'role/add',
				type : 'post',
				contentType : 'application/json;charset=utf8',
				data : JSON.stringify(data),
				dataType : 'json',
				success : function(msg) {
					if (msg.status == "ok") {
						toastr.success("新增成功","",options);
						$('#add_role_form').bootstrapValidator('resetForm', true);
						$('#addModal').modal('hide');
						$("#role_table").DataTable().ajax.reload();
					} else {
						toastr.error("哎呀，出错了，宝宝也不知道什么情况","",options);
						$('#addModal').modal('hide');
					}
				}
			})
		}else{
			$('#add_role_form').bootstrapValidator('validate');
		}
		
	});
	
	// 确认分配权限
	$('#confirm_add').bind('click', function() {
		var ids = "ids=";
		var checked = $('#tree').treeview('getChecked');
		if (checked.length == 0) {
			ids += "empty";
		} else {
			for (var i = 0; i < checked.length; i++) {
				if (i != checked.length - 1) {
					var permissionId = checked[i].permissionId;
					ids += permissionId + ",";
				} else {
					var permissionId1 = checked[i].permissionId;
					ids += permissionId1;
				}
			}
		}

		$.ajax({
			url : 'role/assignPermission/' + roleId,
			type : 'post',
			data : ids,
			success : function(msg) {
				if (msg.status == "ok") {
					$('#myModal').modal('hide');
					toastr.success("分配权限成功","",options);
				} else {
					$('#myModal').modal('hide');
					toastr.error("分配权限失败","",options);
				}
			}
		});
	});
	
	$('#confirm_delete').bind('click',function(){
		$.ajax({
			url:'role/delete/'+roleId,
			type:'get',
			success:function(msg){
				if(msg.status == "ok"){
					$('#delete_tip').modal('hide');
					$("#role_table").DataTable().ajax.reload();
					toastr.success("删除成功","",options);
				}else{
					$('#delete_tip').modal('hide');
					toastr.error("哎呀，出错了，宝宝也不知道什么情况","",options);
				}
			}
		})
	})

})

function initDataTable() {

	$('#role_table')
			.DataTable(
					{
						dom : '<"top"fl>rt<"bottom"ip><"clear">',
						processing : true,
						pagingType : "full_numbers",
						ajax : {
							url : baseUrl + "listData",
							dataSrc : ""
						},
						columns : [
								{
									title : "角色名",
									data : "roleName"
								},
								{
									title : "描述",
									data : "description"
								},
								{
									title : "标示",
									data : "roleSign"
								},
								{
									title : "操作",
									data : null,
									/*
									 * createdCell : function(td, tdData) { var
									 * operator = []; var delBtn =
									 * C.createDelBtn(tdData, baseUrl);
									 * operator.push(delBtn); var editBtn =
									 * C.createEditBtn(tdData, baseUrl);
									 * operator.push(editBtn);
									 * operator.push(createAssignBtn(tdData));
									 * $(td).html(operator); }
									 */
									fnCreatedCell : function(nTd, sData, oData,iRow, iCol) {
										$(nTd).html(
												"<button class='btn btn-primary'" +
												" style='margin-right: 13px' onclick='assign_permission("
												+ sData.id
												+ ")'>分配权限</button><button class='btn btn-danger' " +
												" onclick='deleteRole(" + sData.id + ")'>删除</button>");
									}
								} ],
						language : {
							lengthMenu : '<select class="form-control input-xsmall">'
									+ '<option value="5">5</option>'
									+ '<option value="10">10</option>'
									+ '<option value="20">20</option>'
									+ '<option value="30">30</option>'
									+ '<option value="40">40</option>'
									+ '</select>条记录',// 左上角的分页大小显示。
							processing : "载入中",// 处理页面数据的时候的显示
							paginate : {// 分页的样式文本内容。
								previous : "上一页",
								next : "下一页",
								first : "第一页",
								last : "最后一页"
							},
							zeroRecords : "没有内容",
							info : "总共_PAGES_ 页，显示第_START_ 到第 _END_ ，筛选之后得到 _TOTAL_ 条，初始_MAX_ 条 ",// 左下角的信息显示，大写的词为关键字。
							infoEmpty : "0条记录",// 筛选为空时左下角的显示。
						}
					});
	/* currentDt = tb; */
}

function assign_permission(id) {
	roleId = id;
	var treeData = null;
	$.ajax({
		url : 'permission/listData/' + id,
		type : 'get',
		async : false,
		success : function(msg) {
			treeData = msg.data;
		}
	});
	$('#tree').treeview({
		data : treeData, // data is not optional
		levels : 5,
		backColor : '#E4E4E4',
		showCheckbox : true
	});
	$('#myModal').modal('show');
	$('#tree').on('nodeSelected', function(event, data) {
		nodeData = data;
	});

}

function deleteRole(id){
	roleId = id;
	$('#delete_tip').modal('show');
}

