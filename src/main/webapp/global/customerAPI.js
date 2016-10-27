/**
 * 2015年10月28日 
 * @author Diamond
 */
var C = function(){	
	this.currentDialog = null;
	this.ajaxError= function(xhr){
		var errorDialog = new dialog({
			title:xhr.status+" "+xhr.statusText,
			content:xhr.responseText,
			width:$(window).width()*.7
		});
		errorDialog.show();
		console.error("error:",xhr);
	}
	
	this.ajax = function(url,data,successcallback,errorcallback,type){
		if(!successcallback){
			successcallback=function(result){
				console.log("默认成功处理方式",result);
			}
		}
		if(!errorcallback){
			errorcallback = function(xhr){
				ajaxError(xhr);
			}
		}
		$.ajax({
			url:url,
			data:data,
			type:type||"post",
			success:successcallback,
			error:errorcallback,
			complete:function(){
				App.stopPageLoading();	
			}
		});
	}
	
	this.ajaxForm =  function(form,success,error,type){
    	ajax($(form).attr("action"),$(form).serialize(),success,error,type||"post");
    } 
	
	
	/**
	 * 加载表单，并绑定默认表单 错误提示 和 相关处理
	 */
	this.loadForm = function loadForm(options){
		var defaults = {
			title:"表单",
			url:options,
			data:null,
			success:null,
			error:null,
			aftersuccess:null,
			aftererror:null,
			autoclose:true,
			formaction:null,
			afterload:null,
			width:400
		};
		options  = $.extend(defaults,options);
		
		App.startPageLoading();
		var formDialogId = "dialog_id_"+new Date().getTime();
		var formDialog = new dialog({
			id:formDialogId,
			width:options.width,
			title:options.title,
			onremove:function(){
				C.currentDialog = null;
			}
		});
		C.currentDialog = formDialog;
		ajax(options.url,options.data,function(res){
			var formDom = $(res);
			if(options.formaction){
				formDom.attr("action",options.formaction);
			}
			if(options.afterload){
				options.afterload(formDom);
			}
			formDom.attr("data-dialogid",formDialogId);
			formDialog.content(formDom);
			formDialog.showModal();
			handlerDatePicker();
			var formNode = $(formDialog.node);
			formNode.find("select").each(function(){
				var defaultData = $(this).data("selected");
				defaultData&&$(this).val(defaultData).trigger("change");
			});
			
			formDialog.button([{
				value:"关闭",
				callback:function(){}
			},{
				value:"提交",
				callback:function(){
					formDialog.statusbar("");
					var form = formNode.find("form");
					ajaxForm(form,function(result){
						if(result.success){
							if(options.success){
								options.success(result,form,formDialog);
							}else{
								formDialog.statusbar('<span style="color:green;">提交成功</span>');
								closeDialog(formDialog);
								simpleMsg("提交成功");
							}
							options.aftersuccess&&options.aftersuccess(result,form,formDialog);
						}else{
							if(options.error){
								options.error(result,form,formDialog);	
							}else{
								if(result.data){
									failedMsgAddToInput(form,result.data);
								}else{
									formDialog.statusbar('<span class="vailderror">'+result.message+'</span>');
								}
							}
							options.aftererror&&options.aftererror(result,form,formDialog);
						}
					},function(xhr,msg,e){
						var errorText = xhr.status+" "+xhr.statusText+":"+form.attr("action");
						formDialog.statusbar('<span style="color:red">'+errorText+'</span>');
					});
					return false;
				},
				autofocus:true
			}]);
			App.initAjax();
		});
		return formDialog;
	}
	
	this.handlerFormAjax = function(form,options){
		var defaults = {
			url:options,
			success:null,
			error:null,
			aftersuccess:null,
			aftererror:null,
			formaction:null,
		};
		options  = $.extend(defaults,options);
		form.submit(function(e){
			e.preventDefault();
			form.attr('action',options.formaction||form.attr('action'));
			ajaxForm(form,function(result){
				if(result.success){
					if(options.success){
						options.success(result,form);
					}else{
						simpleMsg("提交成功");
					}
					options.aftersuccess&&options.aftersuccess(result,form);
				}else{
					if(options.error){
						options.error(result,form);	
					}else{
						if(result.data){
							failedMsgAddToInput(form,result.data);
						}else{
							errorMsg(result.message);
						}
					}
					options.aftererror&&options.aftererror(result,form);
				}
			},function(xhr,msg,e){
				var errorText = xhr.status+" "+xhr.statusText+":"+form.attr("action");
				errorMsg(errorText);
			});
		});
	}
	
	function failedMsgAddToInput(form,failedData){
		var errorClass="text-danger";
		for(var i in failedData){
			var errMsg = failedData[i];
			var n =0;
			for(var name in errMsg){
				var input = form.find("[name='"+name+"']");
				if(input.length>0&&n++==0){
					input.focus();
				}
				var vailderror = input.parent().find("span."+errorClass);
				if(vailderror.length==0){
					vailderror = $("<span>"+errMsg[name]+"</span>").addClass(errorClass);
					input.parent().append(vailderror);	
				}else{
					vailderror.html(errMsg[name]);
					vailderror.show();
				}
				input.change(function(e){
					$(this).parent().find('span.'+errorClass).hide();
					$(this).unbind(e);
				})
			}
		}
	}
	
	var handlerDatePicker=function(){
		if($().datetimepicker){
			$(".datetime-picker").prop("readonly",true).css({
				background:"none",
				cursor:"pointer"
			});
			$(".datetime-picker").each(function(){
				var options = {	autoclose:true,language:"zh-CN"	};
				var dom = $(this);
				if(dom.hasClass("time")){
					options.minView="hour";
					options.format="yyyy-mm-dd hh:ii";
				}else{ 
					options.minView="month";  //默认时间选择器都是 选择日期 
					options.format="yyyy-mm-dd"
				}
				if(dom.hasClass("now")){
					options.startDate=new Date();
				}
				$(this).datetimepicker(options);
				
			})
		}
	}
	
	this.handlerAutoComplete= function(){
		 if ($().autocomplete) {
			 $(".autocomplete2me").each(function(){
				var id =$(this).attr("id");
				var dataDiv = $("[data-autocompletefor='"+id+"']");
				var dataSource = [];
				dataDiv.children().each(function(){
					var d = $(this).text();
					dataSource.push(d);
				});
				$(this).autocomplete({
					source:dataSource,
				});
			 });
		 }
	}
	
	this.handlerAddBtn=function(baseUrl){
		if(baseUrl){
			$(".formbtn-add").unbind("click");
			$(".formbtn-add").on('click',function(){
				var action= $(this).data("action")||"addData";
				loadForm({
					url:baseUrl+"add",
					formaction :baseUrl+action,
					aftersuccess:function(){
						reloadDatatable();
					}
				});
			});
			$(".export-excel").unbind("click");
			$(".export-excel").on('click',function(){
				var action = $(this).data("action")||"list_export";  //服务器实现list_export
				C.exportExcel(baseUrl+action);
			});
		}
	}
	
	this.exportExcel = function(url){
		C.simpleMsg("正在导出..");
		action = action||"list_export";
		var iframe=$("<iframe hidden>").attr("src",url);
		iframe.appendTo("body");
		iframe.load(function(){
			C.simpleMsg("数据导出异常");
			iframe.remove();
		});
	}
	
	this.initAjax = function (baseUrl){
		handlerAddBtn(baseUrl);
		handlerDatePicker();
	}
	
	/**
	 * 创建表单按钮
	 * o{
	 *  name:string,       按钮名称
	 *  style:classString, 按钮样式
	 *  **以下下全部对应loadForm 方法参数选项**
	 * 	data:object,    数据
	 *  url:string,     表单URL
	 *  formaction:string, 表单动作 
	 *  afterload:function,  加载成功后回调
	 *  aftersuccess:function  成功回调  
	 * }
	 */
	this.createFormBtn=function(o){
		var classString = o.style||"btn btn-xs blue";
		var button = $("<button>");
		button.addClass(classString);
		button.html(o.name);
		o.title=o.name;
		button.click(function(){
			loadForm(o);
		});
		return button;
	}
	
	this.createEditBtn = function(value,baseUrl,name,action){
		name = name||"编辑";
		action = action||"editData";
		var url=baseUrl+"roleEdit";
		var formaction = baseUrl+action;
		var classStyle = "btn btn-xs blue";
		return C.createFormBtn({
			name:name,
			formaction:formaction,
			url:url,
			data:{id:value},
			aftersuccess:function(){ reloadDatatable()},
			style:classStyle
		});
	}
	
	this.createDelBtn = function(value,baseUrl,name,action){
		name = name||"删除";
		action = action||"delete";
		var button = $("<button class='btn btn-xs red'>");
		button.html(name);
		button.click(function(){
			C.confirmDialog("你确定要删除吗?","提醒",function(){
				var that = this;
				var delUrl = baseUrl+action;
				C.ajax(delUrl,{id:value},function(result){
					if(result.success){
						simpleMsg("删除成功");
						C.reloadDatatable();
					}else{
						errorMsg(result.message);
					}
				});
			});
		});
		return button;
	}
	
	this.createConfirmDialogBtn=function(name,successcbk,cancelcbk,opt){
		var o= {
				style:"btn btn-xs red",
				title:"",
				text:"",
		};
		$.extend(o,opt);
		var button = $("<button>",{"class":o.style}).html(name);
		button.click(function(){
			C.confirmDialog(o.text,o.title,successcbk,cancelcbk);
		});
	}
	
	this.confirmDialog=function(text,title,successcbk,cancelcbk){
		var cDialog = new dialog({
			title:title||"",
			content:text||"",
			width:200,
			ok:function(){
				successcbk&&successcbk();
			},
			cancel:function(){
				cancelcbk&&cancelcbk()
			}
		});
		cDialog.showModal();
	}
	
	this.simpleMsg = function(message,time){
		var d = new dialog({content:message});
		d.show();
		time = time||800;
		removeDialog(d,time);
		return d;
	}
	
	this.errorMsg = function(message,title){
		title = title||"错误";
		var d = new dialog({content:message,title:title});
		d.show();
		return d;
	}
	
	this.loadMsg = function(title){
		var d = new dialog({title:title});
		d.showModal();
		return d;
	}
	
	this.closeDialog = function(dlg){
		removeDialog(dlg,0);
	}
	
	this.removeDialog = function(dlg,time){
		setTimeout(function(){
			dlg.close();
			dlg.remove();
		},time);
	} 
	
	this.reloadDatatable = function reloadDatatable(){
		if(currentDt){
			currentDt.ajax.reload();
		}
	}
	
	return this;
}();

Date.prototype.format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}