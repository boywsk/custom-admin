package com.gomeplus.im.customer.service;

import java.util.List;

import com.gomeplus.im.customer.pojo.Role;

public interface RoleService {

	List<Role> queryRoleList();

	void assignPermission(Long roleId, List<Long> permissionIds);

	void add(Role role);

	List<Role> getRoleByUserId(Long id);

	void deleteById(Long id);

}
