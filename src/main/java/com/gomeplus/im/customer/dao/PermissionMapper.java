package com.gomeplus.im.customer.dao;

import java.util.List;

import com.gomeplus.im.customer.pojo.Permission;

public interface PermissionMapper {

	List<Permission> queryAllPermission();

	Long add(Permission permission);

	List<Permission> getPermissionByRoleId(Long roleId);

	List<Permission> getAllPermission();

}
