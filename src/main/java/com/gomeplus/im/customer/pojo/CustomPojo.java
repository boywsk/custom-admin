package com.gomeplus.im.customer.pojo;

import java.io.Serializable;

import org.springframework.transaction.annotation.Transactional;

/**
 * CustomPojo
 * 
 * @author yeqian
 *
 */
public class CustomPojo {
	private String userName; // 用户名
	private String password; // 密码
	private Integer visitors; // 咨询人数上限
	private Integer seats; // 坐席数量
	private Integer roleLevel; // 用户角色
	private Integer businessType; // 商户角色
	private String businessName; // 商户名称
	private String picture; // 头像

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getVisitors() {
		return visitors;
	}

	public void setVisitors(Integer visitors) {
		this.visitors = visitors;
	}

	public Integer getSeats() {
		return seats;
	}

	public void setSeats(Integer seats) {
		this.seats = seats;
	}

	public Integer getRoleLevel() {
		return roleLevel;
	}

	public void setRoleLevel(Integer roleLevel) {
		this.roleLevel = roleLevel;
	}

	public Integer getBusinessType() {
		return businessType;
	}

	public void setBusinessType(Integer businessType) {
		this.businessType = businessType;
	}

	public String getBusinessName() {
		return businessName;
	}

	public void setBusinessName(String businessName) {
		this.businessName = businessName;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

}
