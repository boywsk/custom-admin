package com.gomeplus.im.customer.pojo;

public class Permission {

	/*`id` bigint(20) NOT NULL AUTO_INCREMENT,
	  `isMenu` int NOT NULL,
	  `menuIcon` varchar(255) DEFAULT NULL,
	  `permissionName` varchar(255) NOT NULL,
	  `permissionSign` varchar(255) NOT NULL,
	  `sort` int(11) DEFAULT NULL,
	  `parent_id` bigint(20) DEFAULT NULL,
	  `menuType` int(11) DEFAULT NULL,*/
	private Long id;
	private Integer isMenu;
	private String menuIcon;
	private String permissionName;
	private String permissionUrl;
	private Long parent_id;
	private Integer level;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Integer getIsMenu() {
		return isMenu;
	}
	public void setIsMenu(Integer isMenu) {
		this.isMenu = isMenu;
	}
	public String getMenuIcon() {
		return menuIcon;
	}
	public void setMenuIcon(String menuIcon) {
		this.menuIcon = menuIcon;
	}
	public String getPermissionName() {
		return permissionName;
	}
	public void setPermissionName(String permissionName) {
		this.permissionName = permissionName;
	}
	
	public String getPermissionUrl() {
		return permissionUrl;
	}
	public void setPermissionUrl(String permissionUrl) {
		this.permissionUrl = permissionUrl;
	}
	public Long getParent_id() {
		return parent_id;
	}
	public void setParent_id(Long parent_id) {
		this.parent_id = parent_id;
	}
	public Integer getLevel() {
		return level;
	}
	public void setLevel(Integer level) {
		this.level = level;
	}
	
}
