package com.gomeplus.im.customer.util;

public class Constant {

	public enum ROLE_LEVEL{
		ROLE_LEVEL_TYPE1(1), 	// 一级用户
		ROLE_LEVEL_TYPE2(2); // 二级用户

		public int value;

		ROLE_LEVEL(int value) {
			this.value = value;
		}
	}
	
	public enum BUSINESS_TYPE{
		BUSINESS_TYPE1(1), 	// 一级商户
		BUSINESS_TYPE2(2), // 二级商户
		BUSINESS_TYPE0(0); 	// 非商户

		public int value;

		BUSINESS_TYPE(int value) {
			this.value = value;
		}
	}
	
	public enum STATE{
		STATE0(0), 	// 离线
		STATE1(1); // 在线

		public int value;

		STATE(int value) {
			this.value = value;
		}
	}
}
