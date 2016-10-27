package com.gomeplus.im.customer.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gomeplus.im.customer.dao.RoleMapper;
import com.gomeplus.im.customer.pojo.Role;
import com.gomeplus.im.customer.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {

	@Autowired
	private RoleMapper roleMapper;
	
	/**
	 * 角色列表
	 */
	public List<Role> queryRoleList() {
		List<Role> list = roleMapper.queryRoleList();
		return list;
	}

	/**
	 * 角色分配权限
	 */
	public void assignPermission(Long roleId, List<Long> permissionIds) {
		if(permissionIds.size() == 0){
			roleMapper.deleteRolePermission(roleId);
		}else{
			roleMapper.deleteRolePermission(roleId);
			roleMapper.assignPermission(roleId,permissionIds);
		}
		
	}

	/**
	 * 新增角色
	 */
	public void add(Role role) {
		roleMapper.add(role);
	}

	/**
	 * 根据userId获得角色列表
	 */
	public List<Role> getRoleByUserId(Long userId) {
		return roleMapper.getRoleByUserId(userId);
	}

	/**
	 * 根据roleId删除角色
	 */
	public void deleteById(Long id) {
		roleMapper.deleteById(id);	
	}

}
