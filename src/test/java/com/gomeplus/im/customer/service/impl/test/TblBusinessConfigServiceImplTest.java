package com.gomeplus.im.customer.service.impl.test;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.alibaba.fastjson.JSONObject;
import com.gomeplus.im.customer.controller.TblBusinessConfigController;
import com.gomeplus.im.customer.model.TblBusinessConfig;
import com.gomeplus.im.customer.pojo.TblBusinessConfigPojo;
import com.gomeplus.im.customer.service.TblBusinessConfigService;
import com.gomeplus.im.customer.service.impl.TblBusinessConfigServiceImpl;
import com.gomeplus.im.customer.util.BeanTransUtils;

public class TblBusinessConfigServiceImplTest {
	
	private static ApplicationContext con ;
	private static TblBusinessConfigService ts;
	private static TblBusinessConfigController tc;

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		con = new ClassPathXmlApplicationContext("./spring.xml");
		ts = con.getBean(TblBusinessConfigServiceImpl.class);
		tc = con.getBean(TblBusinessConfigController.class);
	}

	@Test
	public void testInsertTblBusinessConfig() {
		TblBusinessConfigPojo tblBusinessConfigPojo = new TblBusinessConfigPojo();
		tblBusinessConfigPojo.setAppId(222L);
		tblBusinessConfigPojo.setBusinessName("一级商户");
		tblBusinessConfigPojo.setBusinessDesc("商户描述");
		tblBusinessConfigPojo.setRemark("备注");
		tblBusinessConfigPojo.setBusinessType(1);
		tblBusinessConfigPojo.setCreaterId(11L);
		tblBusinessConfigPojo.setCreateTime(new Date().getTime());
		tblBusinessConfigPojo.setId(1000L);
		tblBusinessConfigPojo.setSeats(100);
		tblBusinessConfigPojo.setVisitors(20);
		
		//ts.insertTblBusinessConfig(tblBusinessConfigPojo);
		ts.insertTblBusinessConfig(BeanTransUtils.beanCopy(tblBusinessConfigPojo, TblBusinessConfig.class));
	}

	public List<TblBusinessConfigPojo> creatBean(int count){
		List<TblBusinessConfigPojo> beans = new ArrayList<>();
		for(int i=0;i<count;i++){
			TblBusinessConfigPojo tblBusinessConfigPojo = new TblBusinessConfigPojo();
			tblBusinessConfigPojo.setAppId(222L);
			tblBusinessConfigPojo.setBusinessName("一级商户");
			tblBusinessConfigPojo.setBusinessDesc("商户描述");
			tblBusinessConfigPojo.setRemark("备注");
			tblBusinessConfigPojo.setBusinessType(1);
			tblBusinessConfigPojo.setCreaterId(11L);
			tblBusinessConfigPojo.setCreateTime(new Date().getTime());
			tblBusinessConfigPojo.setId(1000L);
			tblBusinessConfigPojo.setSeats(100);
			tblBusinessConfigPojo.setVisitors(20);
			tblBusinessConfigPojo.setGreetings("你好好好好");
			beans.add(tblBusinessConfigPojo);
		}
		return beans;
	}
	@Test
	public void testBatchInsertTblBusinessConfig() {
		ts.batchInsertTblBusinessConfig(creatBean(3));
	}

	@Test
	public void testUpdateTblBusinessConfig() {
		TblBusinessConfigPojo tblBusinessConfigPojo = new TblBusinessConfigPojo();
		tblBusinessConfigPojo.setAppId(222L);
		tblBusinessConfigPojo.setBusinessName("一级商户");
		tblBusinessConfigPojo.setBusinessType(1);
		tblBusinessConfigPojo.setCreaterId(11L);
		tblBusinessConfigPojo.setCreateTime(new Date().getTime());
		tblBusinessConfigPojo.setId(3L);
		tblBusinessConfigPojo.setSeats(100);
		tblBusinessConfigPojo.setVisitors(20);
		tblBusinessConfigPojo.setGreetings("你好好好好");
		ts.updateTblBusinessConfig(tblBusinessConfigPojo);
	}

	@Test
	public void testDeleteTblBusinessConfig() {
		ts.deleteTblBusinessConfig(5);
	}

	@Test
	public void testDeleteBatchTblBusinessConfig() {
		ts.deleteBatchTblBusinessConfig(new long[]{7, 5, 9});
	}

	@Test
	public void testGetTblBusinessConfig() {
		System.out.println(JSONObject.toJSONString(ts.getTblBusinessConfig(3L)));
	}

	@Test
	public void testGetTblBusinessConfigAppId() {
		System.out.println(JSONObject.toJSONString(ts.getTblBusinessConfigAppId(222L)));
	}

	@Test
	public void testCountTblBusinessConfig() {
		HashMap<String, Object> param = new HashMap<>();
		param.put("appId", "222");
		System.out.println(JSONObject.toJSONString(ts.countTblBusinessConfig(param)));
	}

	@Test
	public void testListTblBusinessConfig() {
		HashMap<String, Object> param = new HashMap<>();
		param.put("appId", "222");
		param.put("pageIndex", 0);
		param.put("pageSize", 20);
		System.out.println(JSONObject.toJSONString(ts.listTblBusinessConfig(param)));
	}

}
