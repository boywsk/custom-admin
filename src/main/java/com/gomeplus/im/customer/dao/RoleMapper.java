package com.gomeplus.im.customer.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.gomeplus.im.customer.pojo.Role;
import com.gomeplus.im.customer.pojo.RolePermission;

public interface RoleMapper {

	List<Role> queryRoleList();

	List<RolePermission> queryRolePermission(Long roleId);

	void assignPermission(@Param("roleId")Long roleId,@Param("permissionIds") List<Long> permissionIds);

	void deleteRolePermission(Long roleId);

	void add(Role role);

	List<Role> getRoleByUserId(Long userId);

	void deleteById(Long id);

}
