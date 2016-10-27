package com.gomeplus.im.customer.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.ws.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.gomeplus.im.customer.pojo.Permission;
import com.gomeplus.im.customer.pojo.PermissionTree;
import com.gomeplus.im.customer.service.PermissionService;
import com.gomeplus.im.customer.util.UrlUtil;

@Controller
@RequestMapping("permission")
public class PermissionController {

	@Autowired
	private PermissionService permissionService;
	
	/**
	 * 获得权限tree
	 * @return
	 */
	@RequestMapping("listData")
	public ResponseEntity<Map<String,Object>> queryAllPermission(){
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			List<PermissionTree> list = permissionService.queryAllPermission();
			map.put("data", list);
			return ResponseEntity.ok(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
	
	/**
	 * 根据角色Id获取该角色拥有的权限treeData
	 * @param roleId
	 * @return
	 */
	@RequestMapping("listData/{id}")
	public ResponseEntity<Map<String,Object>> queryPermissionByRole(@PathVariable("id") Long roleId){
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			List<PermissionTree> list = permissionService.queryPermissionByRole(roleId);
			map.put("data", list);
			return ResponseEntity.ok(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
	
	/**
	 * 新增权限
	 * @param permission
	 * @return
	 */
	@RequestMapping(value = "add",method = RequestMethod.POST)
	public ResponseEntity<Map<String,Object>> addPermission(@RequestBody Permission permission){
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			Long id = permissionService.add(permission);
			map.put("status", "ok");
			map.put("id", id);
			map.put("level", permission.getLevel());
			return ResponseEntity.ok(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		map.put("status", "fail");
		return ResponseEntity.ok(map);
	}
	
	/**
	 * 获得所有权限mapping路径
	 * @return
	 */
	@RequestMapping("allUrl")
	public ResponseEntity<Map<String,Object>> getAllUrl(){
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			List<String> list = UrlUtil.getAllUrl();
			map.put("status", "ok");
			map.put("data", list);
			return ResponseEntity.ok(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		map.put("status", "fail");
		return ResponseEntity.ok(map);
	}
	
	
}
