package com.gomeplus.im.customer.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.gomeplus.im.customer.model.TblBusinessConfig;
import com.gomeplus.im.customer.pojo.TblBusinessConfigPojo;
import com.gomeplus.im.customer.service.TblBusinessConfigService;
import com.gomeplus.im.customer.util.BeanTransUtils;

@Controller
@RequestMapping("/tblBusinessConfig")
public class TblBusinessConfigController {

	private static final Logger log = LoggerFactory.getLogger(TblBusinessConfigController.class);
	
	@Autowired
	private TblBusinessConfigService service;

	/**
	 * 插入方法
	 *
	 * @param bean
	 * @author liyouhui
	 */
	@RequestMapping(value="/insertTblBusinessConfig", method = RequestMethod.POST)
	public void insertTblBusinessConfig(@RequestBody TblBusinessConfigPojo tblBusinessConfigPojo, Model model){
		boolean handleFlag = false;
		try {
			if(service.insertTblBusinessConfig(BeanTransUtils.beanCopy(
					tblBusinessConfigPojo, TblBusinessConfig.class))>0){
				handleFlag = true;
			}
		} catch (Exception e) {
			log.error("保存商户信息异常，params:"+JSONObject.toJSONString(tblBusinessConfigPojo)+"，message："+e.getMessage());
		}
		model.addAttribute("success", handleFlag);
		
	}
	
	
	/**
	 * 修改方法
	 *
	 * @param bean
	 * @author liyouhui
	 */
	@RequestMapping(value="/updateTblBusinessConfig", method = RequestMethod.POST)
	public void updateTblBusinessConfig(TblBusinessConfigPojo tblBusinessConfigPojo, Model model){
		boolean handleFlag = false;
		try {
			if(service.updateTblBusinessConfig(tblBusinessConfigPojo) > 0){
				handleFlag = true;
			}
			System.out.println(JSONObject.toJSONString(tblBusinessConfigPojo));
		} catch (Exception e) {
			log.error("修改商户信息异常，params:"+JSONObject.toJSONString(tblBusinessConfigPojo)+"，message："+e.getMessage());
		}
		model.addAttribute("success", handleFlag);
	}
	
	/**
	 * 删除方法
	 *
	 * @param id
	 * @author liyouhui
	 */
	@RequestMapping(value="/deleteTblBusinessConfig/{id}", method = RequestMethod.POST)
	public void deleteTblBusinessConfig(@PathVariable("id")long id, Model model){
		boolean handleFlag = false;
		try {
			if(service.deleteTblBusinessConfig(id) > 0){
				handleFlag = true;
			}
		} catch (Exception e) {
			log.error("删除商户信息异常，params:id="+id+"，message："+e.getMessage());
		}
		model.addAttribute("success", handleFlag);
	}
	
	
	/**
	 * 根据id查询的方法
	 *
	 * @param id
	 * @author liyouhui
	 */
	@RequestMapping(value="/getTblBusinessConfig/{id}", method = RequestMethod.GET)
	public void getTblBusinessConfig(@PathVariable("id")long id, Model model){
		try {
			boolean handleFlag = false;
			if(id <= 0){
				model.addAttribute("success", handleFlag);
				return;
			}
			model.addAttribute("tblBusinessConfigPojo", service.getTblBusinessConfig(id));
			System.out.println(JSONObject.toJSONString(service.getTblBusinessConfig(id)));
			model.addAttribute("success", handleFlag);
		} catch (Exception e) {
			log.error("根据id查询商户信息异常，params:id="+id+"，message："+e.getMessage());
		} 
	}
	
	
	/**
	 * 根据条件查询数据
	 * @param param
	 * @return
	 */
	@RequestMapping(value="/listTblBusinessConfig", method = RequestMethod.POST)
	public void listTblBusinessConfig(Map<String, Object> param, Model model){
		try {
			List<TblBusinessConfigPojo> data = service.listTblBusinessConfig(param);
			model.addAttribute("data", data);
		} catch (Exception e) {
			log.error("条件查询商户信息异常，params:"+JSONObject.toJSONString(param)+"，message："+e.getMessage());
		}
	}
	
	@ExceptionHandler
	public ModelAndView exceptionHandler(Exception e){
	    ModelAndView mv = new ModelAndView("error");
	    mv.addObject("exception", e);
	    return mv;
	}
	
}