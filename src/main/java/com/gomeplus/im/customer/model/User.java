package com.gomeplus.im.customer.model;

public class User {

	/*
	 * `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT, `appId` bigint(20) NOT
	 * NULL, `businessId` bigint(20) DEFAULT NULL, `userName` varchar(64)
	 * DEFAULT NULL, `nickName` varchar(64) NOT NULL, `password` varchar(64)
	 * DEFAULT NULL, `createTime` bigint(20) DEFAULT NULL, `roleLevel` int(10)
	 * DEFAULT '2', `businessType` int(10) DEFAULT NULL, `createrId` bigint(20)
	 * DEFAULT '0',
	 */

	private Long id;
	private Long appId;
	private Long businessId;
	private String userName;
	private String nickName;
	private String password;
	private Long createTime;
	private Integer roleLevel;
	private Integer businessType;
	private Long createrId;
	private String picture;
	private String telephone;
	private String phone;
	private String email;
	private Integer state;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getAppId() {
		return appId;
	}

	public void setAppId(Long appId) {
		this.appId = appId;
	}

	public Long getBusinessId() {
		return businessId;
	}

	public void setBusinessId(Long businessId) {
		this.businessId = businessId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Long getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Long createTime) {
		this.createTime = createTime;
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

	public Long getCreaterId() {
		return createrId;
	}

	public void setCreaterId(Long createrId) {
		this.createrId = createrId;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	public User() {
		super();
	}

	public User(Long appId, Long businessId, String userName,
			Long createrId, String password, Integer roleLevel,
			Integer businessType, Long createTime,String picture) {
		super();
		this.appId = appId;
		this.businessId = businessId;
		this.userName = userName;
		this.createrId = createrId;
		this.password = password;
		this.roleLevel = roleLevel;
		this.businessType = businessType;
		this.createTime = createTime;
		this.picture = picture;
	}

}
