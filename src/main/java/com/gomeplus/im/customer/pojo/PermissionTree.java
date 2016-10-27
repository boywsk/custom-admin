package com.gomeplus.im.customer.pojo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PermissionTree {

	private Long permissionId;
	private String text;
	private String href;
	private Integer isMenu;
	private String permissionUrl;
	private Long parent_id;
	private Map<String, Boolean> state;
	private List<PermissionTree> nodes;
	private Integer level;
	
	public PermissionTree() {
		Map<String,Boolean> map = new HashMap<String,Boolean>();
		map.put("expanded", false);
		this.state = map;
	}


	public Long getPermissionId() {
		return permissionId;
	}


	public void setPermissionId(Long permissionId) {
		this.permissionId = permissionId;
	}


	public Long getParent_id() {
		return parent_id;
	}

	public void setParent_id(Long parent_id) {
		this.parent_id = parent_id;
	}

	public Integer getIsMenu() {
		return isMenu;
	}

	public void setIsMenu(Integer isMenu) {
		this.isMenu = isMenu;
	}

	public String getPermissionUrl() {
		return permissionUrl;
	}

	public void setPermissionUrl(String permissionUrl) {
		this.permissionUrl = permissionUrl;
	}

	public Map<String, Boolean> getState() {
		return state;
	}

	public void setState(String key,Boolean value) {
		Map<String, Boolean> state2 = getState();
		state2.put(key, value);
		this.state = state2;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getHref() {
		return href;
	}

	public void setHref(String href) {
		this.href = href;
	}

	public List<PermissionTree> getNodes() {
		return nodes;
	}

	public void setNodes(List<PermissionTree> nodes) {
		this.nodes = nodes;
	}


	public Integer getLevel() {
		return level;
	}


	public void setLevel(Integer level) {
		this.level = level;
	}

	
}
