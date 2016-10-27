package com.gomeplus.im.customer.security;

import java.util.List;

import javax.annotation.Resource;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.authz.UnauthorizedException;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.gomeplus.im.customer.model.User;
import com.gomeplus.im.customer.pojo.Permission;
import com.gomeplus.im.customer.pojo.Role;
import com.gomeplus.im.customer.service.AuthService;
import com.gomeplus.im.customer.service.PermissionService;
import com.gomeplus.im.customer.service.RoleService;
import com.gomeplus.im.customer.service.UserService;

/**
 * 身份验证及授权组件
 * @author lixiangkai
 *
 */
@Component
public class SecurityRealm extends AuthorizingRealm{
	
	private static final Logger logger = LoggerFactory.getLogger(SecurityRealm.class);
	
	@Resource
	private AuthService authService;
	
	@Resource
	private UserService userService;
	
	@Resource
	private RoleService roleService;
	
	@Resource
	private PermissionService permissionService;

	/**
	 * 授权认证
	 */
	protected AuthorizationInfo doGetAuthorizationInfo(
			PrincipalCollection principals) {
		
		logger.info("进行权限验证");
		SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
		String userName = String.valueOf(principals.getPrimaryPrincipal());
		if("leigoudan".equals(userName)){
			List<Permission> list = permissionService.getAllPermission();
			for (Permission permission : list) {
				authorizationInfo.addStringPermission(permission.getPermissionUrl());
			}
			return authorizationInfo;
		}
		User user = userService.getUserByName(userName);
		List<Role> roleList = roleService.getRoleByUserId(user.getId());
		if(roleList != null && !roleList.isEmpty()){
			for (Role role : roleList) {
				if(role == null){
					continue;
				}
				authorizationInfo.addRole(role.getRoleSign());
				List<Permission> permissionList = permissionService.getPermissionByRoleId(role.getId());
				if(permissionList != null){
					for (Permission permission : permissionList) {
						authorizationInfo.addStringPermission(permission.getPermissionUrl());
					}
				}
			}
		}
		return authorizationInfo;
	}

	/**
	 * 身份认证
	 */
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken token) throws AuthenticationException {
		
		logger.info("进行身份验证");
		String userName = String.valueOf(token.getPrincipal());
		String password = new String((char[]) token.getCredentials());
		User user = authService.login(userName, password);
		if(user == null){
			throw new AuthenticationException("用户名或密码错误");
		}
		SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(userName, password, getName());
        return authenticationInfo;
	
	}

}
