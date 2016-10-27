<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
	<form id="fm" enctype="multipart/form-data">
		<input type="hidden" name="id" value="${config.id }">
		<input type="hidden" name="businessId" value="${user.businessId }">
		<div class="form-group">
			<label for="config-name" class="control-label">配置名称:</label> <input
				type="text" name="configName" class="form-control-2"
				id="config-name" value="${config.configName }">
		</div>
		<div class="form-group">
			<label for="config-unit" class="control-label">单位:</label> <input
				type="text" name="configUnit" class="form-control-2"
				id="config-unit" value="${config.configUnit }">
		</div>
		<div class="form-group">
			<label for="config-remark" class="control-label">配置说明:</label>
			<textarea name="configRemark" class="form-control-2"
				id="config-remark" >${config.configRemark }</textarea>
		</div>
		<div class="form-group">
			<label for="config-val" class="control-label">配置值:</label>
			<textarea name="configVal" class="form-control-2" id="config-val"
				>${config.configVal}</textarea>
		</div>
	</form>
