<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

	<td>qqq</td>
	<td>1</td>
	<td>1</td>
	<td>1</td>
	<td>无</td>
	<td>
		<button type="button" class="btn btn-danger" style="font-size: 10px;"
			data-target="#exampleModal" data-toggle="modal" data-whatever="编辑配置项"
			onclick="edit(${c_config.id})">
			<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span><span
				style="margin-left: 3px; vertical-align: middle;">编辑</span>
		</button> <a class="btn btn-danger" style="font-size: 10px;"
		href="javascript:window.location.href='../c_config/delConfig/${c_config.id}'"><span
			class="glyphicon glyphicon-trash" aria-hidden="true"></span><span
			style="margin-left: 3px; vertical-align: middle;">删除</span></a>
	</td>

