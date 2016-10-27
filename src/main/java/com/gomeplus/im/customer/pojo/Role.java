package com.gomeplus.im.customer.pojo;

public class Role {

	/*`id` bigint(20) NOT NULL AUTO_INCREMENT,
	  `description` varchar(255) DEFAULT NULL,
	  `roleName` varchar(255) NOT NULL,
	  `roleSign` varchar(255) NOT NULL,*/
	private Long id;
	private String description;
	private String roleName;
	private String roleSign;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getRoleSign() {
		return roleSign;
	}
	public void setRoleSign(String roleSign) {
		this.roleSign = roleSign;
	}
	
	
	
}
