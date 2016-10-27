<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<th scope="row"><c:if test="${user.picture==null || user.picture==''}">
		<img src="../images/default.png" class="img-circle">
	</c:if> <c:if test="${user.picture!=null && user.picture!=''}">
		<img src="${ user.picture}" class="img-circle"
			style="width: 50px; height: 50px;">
	</c:if></th>
<td><c:if test="${user.nickName==null}">${user.userName}</c:if> <c:if
		test="${user.nickName!=null}">${user.nickName}</c:if></td>
<td><c:if test="${user.roleLevel==1}">管理员</c:if> <c:if
		test="${user.roleLevel==2}">普通客服</c:if></td>
<td><c:if test="${user.state==1}">
		<span class="label label-success">在线</span>
	</c:if> <c:if test="${user.state==0 || user.state==null}">
		<span class="label label-danger">离线</span>
	</c:if></td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td><a href="javascript:void(0);" class="del"
	rev='{"ids":${user.id},"businessId":${user.businessId},"roleLevel":${user.roleLevel}}'><span
		class="glyphicon glyphicon-trash"></span></a></td>
		
<script>
$('.del').on('click',function(e){
	 $tr=$(this).parent().parent();
	 $.post('../user/delUser', { 'params': $(e.target).parent().attr('rev') }, function (msg) {
			 if(msg=="1"){
				 $tr.fadeOut('slow');
			 }
		
	 });
})
</script>
