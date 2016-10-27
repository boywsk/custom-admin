package com.gomeplus.im.customer.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gomeplus.im.customer.dao.PermissionMapper;
import com.gomeplus.im.customer.dao.RoleMapper;
import com.gomeplus.im.customer.pojo.Permission;
import com.gomeplus.im.customer.pojo.PermissionTree;
import com.gomeplus.im.customer.pojo.RolePermission;
import com.gomeplus.im.customer.service.PermissionService;

@Service
public class PermissionServiceImpl implements PermissionService {

	@Autowired
	private PermissionMapper permissionMapper;

	@Autowired
	private RoleMapper roleMapper;

	/**
	 * 查询所有权限
	 */
	public List<PermissionTree> queryAllPermission() {
		List<Permission> list = permissionMapper.queryAllPermission();

		// 构造所有权限的容器
		Map<Long, List<Permission>> containerMap = new HashMap<Long, List<Permission>>();
		for (Permission permission : list) {
			if (!containerMap.containsKey(permission.getParent_id())) {
				containerMap.put(permission.getParent_id(),
						new ArrayList<Permission>());
			}
			containerMap.get(permission.getParent_id()).add(permission);
		}

		List<PermissionTree> result = new ArrayList<PermissionTree>();
		// 获得一级权限
		List<Permission> first = containerMap.get(0L);
		if (first != null) {
			for (Permission permission : first) {
				PermissionTree tree = new PermissionTree();
				tree.setPermissionId(permission.getId());
				tree.setText(permission.getPermissionName());
				tree.setHref(permission.getPermissionUrl());
				tree.setIsMenu(permission.getIsMenu());
				tree.setLevel(permission.getLevel());
				tree.setParent_id(0L);
				tree.setPermissionUrl(permission.getPermissionUrl());

				// 获得该一级权限下的二级权限
				List<PermissionTree> listTree2 = new ArrayList<PermissionTree>();
				List<Permission> list2 = containerMap.get(permission.getId());
				if (list2 != null) {
					for (Permission permission2 : list2) {
						PermissionTree tree2 = new PermissionTree();
						tree2.setPermissionId(permission2.getId());
						tree2.setText(permission2.getPermissionName());
						tree2.setHref(permission2.getPermissionUrl());
						tree2.setIsMenu(permission2.getIsMenu());
						tree2.setPermissionUrl(permission2.getPermissionUrl());
						tree2.setLevel(permission2.getLevel());
						tree2.setParent_id(permission.getId());

						// 获得该二级权限下的三级权限
						List<PermissionTree> listTree3 = new ArrayList<PermissionTree>();
						List<Permission> list3 = containerMap.get(permission2.getId());
						if (list3 != null) {
							for (Permission permission3 : list3) {
								PermissionTree tree3 = new PermissionTree();
								tree3.setPermissionId(permission3.getId());
								tree3.setText(permission3.getPermissionName());
								tree3.setHref(permission3.getPermissionUrl());
								tree3.setIsMenu(permission3.getIsMenu());
								tree3.setPermissionUrl(permission3
										.getPermissionUrl());
								tree3.setLevel(permission3.getLevel());
								tree3.setParent_id(permission2.getId());
								
								//获得三级权限下四级权限
								List<PermissionTree> listTree4 = new ArrayList<PermissionTree>();
								List<Permission> list4 = containerMap.get(permission3.getId());
								if(list4 != null){
									for (Permission permission4 : list4) {
										PermissionTree tree4 = new PermissionTree();
										tree4.setPermissionId(permission4.getId());
										tree4.setText(permission4.getPermissionName());
										tree4.setHref(permission4.getPermissionUrl());
										tree4.setIsMenu(permission4.getIsMenu());
										tree4.setPermissionUrl(permission4
												.getPermissionUrl());
										tree4.setLevel(permission4.getLevel());
										tree4.setParent_id(permission3.getId());
										listTree4.add(tree4);
									}
									tree3.setNodes(listTree4);
								}
								listTree3.add(tree3);
							}
							tree2.setNodes(listTree3);
						}
						listTree2.add(tree2);
					}
					tree.setNodes(listTree2);
				}
				result.add(tree);
			}
		}
		return result;
	}

	/**
	 * 根据roleId获取权限treeData
	 */
	public List<PermissionTree> queryPermissionByRole(Long roleId) {
		List<Permission> list = permissionMapper.queryAllPermission();

		// 构造所有权限的容器
		Map<Long, List<Permission>> containerMap = new HashMap<Long, List<Permission>>();
		for (Permission permission : list) {
			if (!containerMap.containsKey(permission.getParent_id())) {
				containerMap.put(permission.getParent_id(),
						new ArrayList<Permission>());
			}
			containerMap.get(permission.getParent_id()).add(permission);
		}

		// 获得角色权限关联信息
		List<RolePermission> rolePermissionList = roleMapper
				.queryRolePermission(roleId);
		// 构造权限容器
		List<Long> permissionIdContainer = new ArrayList<Long>();
		if (rolePermissionList != null) {
			for (RolePermission rolePermission : rolePermissionList) {
				permissionIdContainer.add(rolePermission.getPermissionId());
			}
		}

		List<PermissionTree> result = new ArrayList<PermissionTree>();
		//获得一级权限
		List<Permission> top = containerMap.get(0L);
		Long topId = top.get(0).getId();
		List<Permission> first = containerMap.get(topId);
		if(first != null){
			for (Permission permission : first) {
				PermissionTree tree = new PermissionTree();
				if(permissionIdContainer.contains(permission.getId())){
					tree.setState("checked", true);
				}
				tree.setPermissionId(permission.getId());
				tree.setText(permission.getPermissionName());
				tree.setIsMenu(permission.getIsMenu());
				
				//获得该一级权限下的二级权限
				List<PermissionTree> listTree2 = new ArrayList<PermissionTree>();
				List<Permission> list2 = containerMap.get(permission.getId());
				if(list2 != null){
					for (Permission permission2 : list2) {
						PermissionTree tree2 = new PermissionTree();
						if(permissionIdContainer.contains(permission2.getId())){
							tree2.setState("checked", true);
						}
						tree2.setPermissionId(permission2.getId());
						tree2.setText(permission2.getPermissionName());
						tree2.setIsMenu(permission2.getIsMenu());
						
						//获得该二级权限下的三级权限
						List<PermissionTree> listTree3 = new ArrayList<PermissionTree>();
						List<Permission> list3 = containerMap.get(permission2.getId());
						if(list3 != null){
							for (Permission permission3 : list3) {
								PermissionTree tree3 = new PermissionTree();
								if(permissionIdContainer.contains(permission3.getId())){
									tree3.setState("checked", true);
								}
								tree3.setPermissionId(permission3.getId());
								tree3.setText(permission3.getPermissionName());
								tree3.setIsMenu(permission3.getIsMenu());
								listTree3.add(tree3);
							}
							tree2.setNodes(listTree3);
						}
						listTree2.add(tree2);
					}
					tree.setNodes(listTree2);
				}
				result.add(tree);
			}
		}
		return result;
	}

	/**
	 * 新增权限
	 * @return 
	 */
	public Long add(Permission permission) {
		permissionMapper.add(permission);
		return permission.getId();
	}

	/**
	 * 根据角色Id获取权限
	 */
	public List<Permission> getPermissionByRoleId(Long roleId) {
		return permissionMapper.getPermissionByRoleId(roleId);
	}

	/**
	 * 获取所有权限
	 */
	public List<Permission> getAllPermission() {
		return permissionMapper.getAllPermission();
	}
	
}
