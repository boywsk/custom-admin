package com.gomeplus.im.customer.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.alibaba.fastjson.JSONObject;
import com.gomeplus.im.customer.model.TblCustomConfig;
import com.gomeplus.im.customer.model.User;
import com.gomeplus.im.customer.service.TblCustomConfigService;
import com.gomeplus.im.customer.util.BeanTransUtils;

/**
 * 配置管理【2016-8-31】
 * 
 * @author yeqian
 *
 */
@Controller
@RequestMapping("c_config")
public class CustomConfigController {
	private static final Logger log = LoggerFactory
			.getLogger(CustomConfigController.class);

	@Autowired
	private TblCustomConfigService configService;

	private String msg;

	/**
	 * 配置管理
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "doConfig")
	public String doConfig(Model model,HttpServletRequest req) {
		User user=(User) req.getSession().getAttribute("user");
		try{
			
			List<TblCustomConfig> list=configService.configList(user.getBusinessId());
			if(list!=null && list.size()>0){
				model.addAttribute("config_list", list);
			}
		}catch(Exception e){
			log.error("查询客服列表异常，params:" + JSONObject.toJSONString(user.getBusinessId())
					+ "，message：" + e.getMessage());
		}
		return "custom_config";
	}
	
	/**
	 * 获取配置项
	 * @param model
	 * @param resp
	 * @param id
	 */
	@RequestMapping(value = "editConfig/{id}", method = RequestMethod.POST)
	public String editConfig(Model model,@PathVariable("id")Long id){
		try{
			TblCustomConfig config=configService.getConfigById(id);
			if(config!=null){
				model.addAttribute("config", config);
			}
		}catch(Exception e){
			log.error("获取配置项异常，params:" + JSONObject.toJSONString(id)
					+ "，message：" + e.getMessage());
		}
		return "config_edit";
	}

	/**
	 * 保存配置信息
	 * 
	 * @param model
	 * @param req
	 * @param c_config
	 */
	@RequestMapping(value = "save", method = RequestMethod.POST)
	
	public void save(Model model, HttpServletRequest req,
			HttpServletResponse resp, TblCustomConfig c_config) {
		try {
			msg = configService.save(c_config, req);
			if (StringUtils.isBlank(msg)) {
				msg = "保存成功";
			}

			resp.getWriter().print(msg);
			
		} catch (Exception e) {
			log.error("保存配置信息异常，params:" + JSONObject.toJSONString(c_config)
					+ "，message：" + e.getMessage());
		}
	}
//	public String save(Model model, HttpServletRequest req,
//			HttpServletResponse resp, TblCustomConfig c_config) {
//		try {
//			msg = configService.save(c_config, req);
//			if (StringUtils.isBlank(msg)) {
//				msg = "保存成功";
//			}
//
//			
//			
//		} catch (Exception e) {
//			log.error("保存配置信息异常，params:" + JSONObject.toJSONString(c_config)
//					+ "，message：" + e.getMessage());
//		}
//		return "config_item";
//	}

	
	@RequestMapping(value = "delConfig/{id}", method = RequestMethod.GET)
	public String delConfig(Model model,@PathVariable("id")String id){
		try {
			msg=configService.delConfig(id);
			if (StringUtils.isBlank(msg)) {
				msg = "删除成功";
			}
			model.addAttribute("msg", msg);
		} catch (Exception e) {
			log.error("删除异常，params:" + JSONObject.toJSONString(id)
					+ "，message：" + e.getMessage());

		}
		return "redirect:../doConfig";
	}
}
