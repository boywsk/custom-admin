package com.gomeplus.im.customer.model;

public class Menu {

	/*`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
	  `pid` bigint(20) NOT NULL DEFAULT '0',
	  `name` varchar(128) DEFAULT '',
	  `url` varchar(256) DEFAULT '',
	  `orderBy` bigint(11) NOT NULL DEFAULT '0',*/
	private Long id;
	private Long pid;
	private String name;
	private String url;
	private Long orderBy;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getPid() {
		return pid;
	}
	public void setPid(Long pid) {
		this.pid = pid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Long getOrderBy() {
		return orderBy;
	}
	public void setOrderBy(Long orderBy) {
		this.orderBy = orderBy;
	}
	
}
