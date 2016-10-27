package com.gomeplus.im.customer.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.ws.RespectBinding;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gomeplus.im.customer.pojo.Role;
import com.gomeplus.im.customer.service.RoleService;

/**
 * 角色
 * @author lixiangkai
 *
 */
@Controller
@RequestMapping("role")
public class RoleController {

	@Autowired
	private RoleService roleService;
	
	/**
	 * 查询角色列表
	 * @return
	 */
	@RequestMapping("listData")
	@ResponseBody
	public List<Role> queryRoleList(){
		List<Role> list = roleService.queryRoleList();
		return list;
	}
	
	/**
	 * 给指定的角色分配权限
	 * @param roleId
	 * @param ids
	 * @return
	 */
	@RequestMapping(value = "assignPermission/{id}",method = RequestMethod.POST)
	public ResponseEntity<Map<String,Object>> assignPermission(@PathVariable("id") Long roleId,
			@RequestParam("ids") String ids){
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			List<Long> permissionIds = new ArrayList<Long>();
			if("empty".equals(ids)){
				roleService.assignPermission(roleId,permissionIds);
			}else{
				String[] split = ids.split(",");
				for (String string : split) {
					permissionIds.add(Long.parseLong(string));
				}
			}
			
			roleService.assignPermission(roleId,permissionIds);
			map.put("status", "ok");
			return ResponseEntity.ok(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		map.put("status", "fail");
		return ResponseEntity.ok(map);
	}
	
	/**
	 * 新增角色
	 * @param role
	 * @return
	 */
	@RequestMapping(value = "add",method = RequestMethod.POST)
	public ResponseEntity<Map<String,Object>> addRole(@RequestBody Role role){
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			roleService.add(role);
			map.put("status", "ok");
			return ResponseEntity.ok(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		map.put("status", "fail");
		return ResponseEntity.ok(map);
	}
	
	/**
	 * 根据roleId删除角色
	 * @param id
	 * @return
	 */
	@RequestMapping("delete/{id}")
	public ResponseEntity<Map<String,Object>> deleteRole(@PathVariable("id") Long id){
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			roleService.deleteById(id);
			map.put("status", "ok");
			return ResponseEntity.ok(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		map.put("status", "fail");
		return ResponseEntity.ok(map);
	}
	
	@RequestMapping(value = "roleEdit",method = RequestMethod.POST)
	public String roleEditPage(){
		String s = "rolesEdit";
		return s;
	}
	
}
