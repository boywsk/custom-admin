package com.gomeplus.im.customer.model;

public class TblCustomConfig {
	private Long id;
	private String configName;
	private String configRemark;
	private String configVal;
	private String configUnit;
	private String configExt;
	private Long lastOperateTime;
	private Long lastOperator;
	private Long businessId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getConfigName() {
		return configName;
	}

	public void setConfigName(String configName) {
		this.configName = configName;
	}

	public String getConfigRemark() {
		return configRemark;
	}

	public void setConfigRemark(String configRemark) {
		this.configRemark = configRemark;
	}

	public String getConfigVal() {
		return configVal;
	}

	public void setConfigVal(String configVal) {
		this.configVal = configVal;
	}

	public String getConfigUnit() {
		return configUnit;
	}

	public void setConfigUnit(String configUnit) {
		this.configUnit = configUnit;
	}

	public String getConfigExt() {
		return configExt;
	}

	public void setConfigExt(String configExt) {
		this.configExt = configExt;
	}

	public Long getLastOperateTime() {
		return lastOperateTime;
	}

	public void setLastOperateTime(Long lastOperateTime) {
		this.lastOperateTime = lastOperateTime;
	}

	public Long getLastOperator() {
		return lastOperator;
	}

	public void setLastOperator(Long lastOperator) {
		this.lastOperator = lastOperator;
	}

	public Long getBusinessId() {
		return businessId;
	}

	public void setBusinessId(Long businessId) {
		this.businessId = businessId;
	}

}
