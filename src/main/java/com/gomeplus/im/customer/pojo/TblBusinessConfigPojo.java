package com.gomeplus.im.customer.pojo;


/**
 * TblBusinessConfig
 * @author lyh
 **/
 
public class TblBusinessConfigPojo{

	private Long id;		 //主键
	
	private Long appId;		 //appId
	
	private String businessName;		 //商户名称
	
	private Integer businessType;		 //商户类型（1.一级商户 2.二级商户 3.三级商户）
	
	private String businessDesc;		 //商户描述
	
	private String greetings;		 //问候语
	
	private Integer seats;		 //坐席数量
	
	private Integer visitors;		 //咨询人数上限
	
	private String remark;		 //备注
	
	private Long createrId;		 //创建人id
	
	private Long createTime;		 //创建时间
	
	private Long configId;			//配置id
	
	public Long getId(){
		return this.id;
	}
	
	public void setId(Long id){
		this.id = id;
	}
	
	public Long getAppId(){
		return this.appId;
	}
	
	public void setAppId(Long appId){
		this.appId = appId;
	}
	
	public String getBusinessName(){
		return this.businessName;
	}
	
	public void setBusinessName(String businessName){
		this.businessName = businessName;
	}
	
	public Integer getBusinessType(){
		return this.businessType;
	}
	
	public void setBusinessType(Integer businessType){
		this.businessType = businessType;
	}
	
	public String getBusinessDesc(){
		return this.businessDesc;
	}
	
	public void setBusinessDesc(String businessDesc){
		this.businessDesc = businessDesc;
	}
	
	public String getGreetings(){
		return this.greetings;
	}
	
	public void setGreetings(String greetings){
		this.greetings = greetings;
	}
	
	public Integer getSeats(){
		return this.seats;
	}
	
	public void setSeats(Integer seats){
		this.seats = seats;
	}
	
	public Integer getVisitors(){
		return this.visitors;
	}
	
	public void setVisitors(Integer visitors){
		this.visitors = visitors;
	}
	
	public String getRemark(){
		return this.remark;
	}
	
	public void setRemark(String remark){
		this.remark = remark;
	}
	
	public Long getCreaterId(){
		return this.createrId;
	}
	
	public void setCreaterId(Long createrId){
		this.createrId = createrId;
	}
	
	public Long getCreateTime(){
		return this.createTime;
	}
	
	public void setCreateTime(Long createTime){
		this.createTime = createTime;
	}

	public Long getConfigId() {
		return configId;
	}

	public void setConfigId(Long configId) {
		this.configId = configId;
	}
	
	
	
}