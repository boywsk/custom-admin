//document.write("<script language=javascript src='../WebContent/js/md5.js'></script>");
function Constants(){
}
Constants.SESSION_LIST1;
Constants.uid;
Constants.msgUrl;
Constants.loginCount = false;
Constants.msgType;
Constants.groupId;
function Dictionarys(){}
Dictionarys.dictionary;
function ListOffileMsgData(){}
ListOffileMsgData.listOffileMsg;
function  ListGroupMsgsData(){}
ListGroupMsgsData.listGroupMsgs;
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

 /*function getToken(appId,imUserId){
	 
	  var token = "";
	  var timestamp = Date.parse(new Date());
	  var keyStr = appId+imUserId+timestamp;
	  var signature = md5(keyStr);
	   $.ajax({
	            //提交数据的类型 POST GET
	            type:"GET",
	            //提交的网址
	            // url:'http://10.69.16.23:8086/gomeplus-im-api/user/login.json?appId=123456789',
				   url:"http://10.69.16.23:8084/im-platform/token/getToken.json?appId="+appId+"&imUserId="+imUserId+"&timestamp="+timestamp+"&signature="+signature,
	            //提交的数据
	             //data:{phoneNumber:phoneNumber,password:password},
				 data:{},
	            //返回数据的格式
	              datatype: "application/jsonp",
				  //contentType:"application/json",
	            //在请求之前调用的函数
	          //beforeSend:function(){},
	            //成功返回之后调用的函数             
	            success:function(data){
				token=data.data.token;
				//$().html(data.data.token);
	            },
	            //调用执行后调用的函数
	            complete: function(XMLHttpRequest, textStatus){
	              // alert(XMLHttpRequest.responseText);
	              // alert(textStatus);
	            },
				crossDomain: true,
	            //调用出错执行的函数
	            error: function(){
	                //请求出错处理
	            }         
	         });
    }
  */
function ajaxFileUpload(appId,uid,file,traceId){
	   var imgUrl = null;
	   var appId = "100";
	   var  uid = "123";
	   var nowTime = (new Date()).valueOf();
	   var keyStr = appId+uid+nowTime;
	   var keys = md5(keyStr);
	   var traceId = '123456';
     var formData = new FormData();
     formData.append('file',$(file)[0].files[0]);    //将文件转成二进制形式
		formData.append('appId',appId);
		formData.append('uid',uid);
		formData.append('currentTime',nowTime);
		formData.append('key',keys);
	    formData.append('traceId',traceId);
     $.ajax({
         type:"post",
         url:IMConstants.IM_FILESERVERLIST+"/im-upload/ImageUploadServlet.do",
         async:false,
         contentType: false,    //这个一定要写
         processData: false, //这个也一定要写，不然会报错
         data:formData,
         dataType:'json',    //返回类型，有json，text，HTML。这里并没有jsonp格式，所以别妄想能用jsonp做跨域了。
         success:function(data){
			    console.log(data);
				Constants.msgUrl = data.data.imgSmallName;
				Constants.msgHeight = data.data.height;
				Constants.msgWidth = data.data.width;
				Constants.msgUploadTime = data.data.uploadTime;
				imgUrl = data.data.imgSmallName;
         },
         error:function(XMLHttpRequest, textStatus, errorThrown, data){
             alert("上传失败!!!");
         }            
     });
     return imgUrl;
 }
       
       function getGroupName(groupName){
        $.ajax({
            type:"post",
            url:"http://10.69.16.5:8084/center-im-api/group/getGroupInfo.json?appId=TEST_APP_ID",
           // async:false,
           // processData: false, //这个也一定要写，不然会报错
           //contentType:"application/json",
            data: {"groupIds":groupName},  
            dataType:'json',    //返回类型，有json，text，HTML。这里并没有jsonp格式，所以别妄想能用jsonp做跨域了。
            success:function(data){
			     console.log(data);
				//Constants.msgUrl = data.data.smallAvatarUrl;
				//alert(data);
            },
            error:function(XMLHttpRequest, textStatus, errorThrown, data){
                alert("获取失败!!!");
            }            
        });
    }
       
       function sendListOffileMsgs(groupId,imUserId,token,msgSeqId){
           $.ajax({
               type:"GET",
                //url:"http://10.125.3.61:8080/im-platform/msg/jsPullMsg.json?appId=TEST_APP_ID&groupId=658_853&imUserId=658&token=696cab163afb4a50bec0adea95420a48",
                async:false,
            	url:IMConf.IM_API_URL+"msg/jsPullMsg.json?appId="+IMConf.APPID
					+ "&groupId=" + groupId + "&imUserId=" + imUserId
					+ "&token=" + token
					+"&deviceType="
					+IMConf.DEVICE_TYPE,
               data:{"pageSize":20,"msgSeqId":msgSeqId},
               dataType:'json',
               success:function(data){
            	   ListOffileMsgData.listOffileMsg = data;
            	   console.log(data);
               },
               error:function(XMLHttpRequest, textStatus, errorThrown, data){
            	   
                   alert("获取失败!!!");
               }         
           });
       }
       
   function sendListGroupMsgs(imUserId,time,token){
	   $.ajax({
           type:"GET",
            async:false,
           // http://localhost:8081/im-platform/msg/listGroup.json?appId=gomeplus_pre&imUserId=658&time=1464271262966&token=696cab163afb4a50bec0adea95420a48
        	url:IMConf.IM_API_URL+"msg/jsListGroup.json?appId="+IMConf.APPID
				+ "&imUserId=" + imUserId+"&time="+time
				+ "&token=" + token
				+"&deviceType="
				+IMConf.DEVICE_TYPE,
           dataType:'json',
           success:function(data){
        	   /*alert("url:"+IMConf.IM_API_URL+",imUserId:"+imUserId+",time:"+time+",token:"+token);*/
        	   console.log(data);
        	   ListGroupMsgsData.listGroupMsgs = data;
           },
           error:function(XMLHttpRequest, textStatus, errorThrown, data){
        	   
               alert(data);
           }         
       });
	   
   }
       
		  function Dictionary(){
			  this.data = new Array();
			  
			  this.put = function(key,value){
			   this.data[key] = value;
			  };

			  this.get = function(key){
			   return this.data[key];
			  };

			  this.remove = function(key){
			   this.data[key] = null;
			  };
			  
			  this.isEmpty = function(){
			   return this.data.length == 0;
			  };

			  this.size = function(){
			   return this.data.length;
			  };
			 }
		  
	 function unique(arr) {
      var result = [], isRepeated;
     for (var i = 0, len = arr.length; i < len; i++) {
          isRepeated = false;
         for (var j = 0, len = result.length; j < len; j++) {
             if (arr[i] == result[j]) {   
                 isRepeated = true;
                 break;
             }
        }
        if (!isRepeated) {
             result.push(arr[i]);
         }
    }
     return result;
}
	/* $(function(){
			$('.emotion').qqFace({
				id : 'facebox', 
				assign:'talkInputId', 
				path:'../jQuery-qqFace/arclist/'	//表情存放的路径
			});
		});*/
		//查看结果
	 function replace_em(str){
		 
			str = str.replace(/\</g,'&lt;');
			str = str.replace(/\>/g,'&gt;');
			str = str.replace(/\n/g,'<br/>');
			str = str.replace(/\[em_([0-9]*)\]/g,'<img src="../jQuery-qqFace/arclist/$1.gif" border="0" />');
			return str;
		}