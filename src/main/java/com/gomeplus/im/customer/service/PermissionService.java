package com.gomeplus.im.customer.service;

import java.util.List;

import com.gomeplus.im.customer.pojo.Permission;
import com.gomeplus.im.customer.pojo.PermissionTree;

public interface PermissionService {

	List<PermissionTree> queryAllPermission();

	List<PermissionTree> queryPermissionByRole(Long roleId);

	Long add(Permission permission);

	List<Permission> getPermissionByRoleId(Long id);

	List<Permission> getAllPermission();

}
