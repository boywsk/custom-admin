package com.gomeplus.im.customer.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.gomeplus.im.customer.model.User;
import com.gomeplus.im.customer.pojo.CustomPojo;
import com.gomeplus.im.customer.pojo.TblBusinessConfigPojo;
import com.gomeplus.im.customer.service.TblBusinessConfigService;
import com.gomeplus.im.customer.service.UserService;
import com.gomeplus.im.customer.util.BeanTransUtils;
import com.gomeplus.im.customer.util.FileUtils;
import com.gomeplus.im.customer.util.HttpUtil;

/**
 * 用户控制[2016-8-24]
 * 
 * @author yeqian
 *
 */
@Controller
@RequestMapping("user")
public class UserController {

	private static final Logger log = LoggerFactory
			.getLogger(UserController.class);

	@Autowired
	private UserService userService;
	@Autowired
	private TblBusinessConfigService businessConfigService;

	private String msg;

	/**
	 * 客服团队
	 * 
	 * @param model
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "customer")
	public String customer(Model model, HttpServletRequest req) {
		try {
			List<User> list = userService.userList(req);
			if (list != null && list.size() > 0) {
				model.addAttribute("user_list", list);
			}
		} catch (Exception e) {
			log.error("查询客服列表异常，params:"
					+ JSONObject.toJSONString(req.getSession().getAttribute(
							"createrId")) + "，message：" + e.getMessage());
		}
		return "customer_team";
	}

	/**
	 * 获取客服用户数据
	 * 
	 * @param model
	 * @param id
	 * @param resp
	 */
	@RequestMapping(value = "getSysUser", method = RequestMethod.POST)
	public void getSysUser(Model model, Long id, HttpServletResponse resp) {
		try {
			User user = userService.getUserById(id);

			if (user != null) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("user", user);

				HttpUtil.writeResult(resp, map);
			}
		} catch (Exception e) {
			log.error("查询用户信息异常，params:" + JSONObject.toJSONString(id)
					+ "，message：" + e.getMessage());
		}
	}

	/**
	 * 账户信息
	 * 
	 * @param model
	 * @param req
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "customerInfo", method = RequestMethod.GET)
	public String customerInfo(Model model, HttpServletRequest req, Long id) {
		try {
			User user = userService.getUserById(id);
			TblBusinessConfigPojo businessConfig = null;
			if (user != null) {
				if (user.getBusinessId() != null) {
					businessConfig = businessConfigService
							.getTblBusinessConfig(user.getBusinessId());
					if (businessConfig != null) {
						model.addAttribute("businessConfig", businessConfig);
					}

				}
				model.addAttribute("user", user);
			}

		} catch (Exception e) {
			log.error("查询用户信息异常，params:" + JSONObject.toJSONString(id)
					+ "，message：" + e.getMessage());
		}
		return "customer_info";
	}

	/**
	 * 创建客服或商户
	 * 
	 * @param customPojo
	 * @param req
	 */
	@RequestMapping(value = "save", method = RequestMethod.POST)
	public String save(Model model, CustomPojo customPojo,
			HttpServletRequest req) {
		try {
			model.addAttribute("user", userService.save(customPojo, req));
		} catch (Exception e) {
			log.error("保存信息异常，params:" + JSONObject.toJSONString(customPojo)
					+ "，message：" + e.getMessage());
		}

		return "team_item";
	}

	/**
	 * 保存
	 * 
	 * @param user
	 * @param req
	 * @param resp
	 */
	@RequestMapping(value = "saveUser", method = RequestMethod.POST)
	public void saveUser(User user, HttpServletRequest req,
			HttpServletResponse resp) {
		try {
			msg = userService.saveUser(user, req);
			if (StringUtils.isBlank(msg)) {
				msg = "保存成功";
			}

			resp.getWriter().print(msg);
		} catch (Exception e) {
			log.error("保存用户信息异常，params:" + JSONObject.toJSONString(user)
					+ "，message：" + e.getMessage());

		}
	}

	/**
	 * 删除
	 * 
	 * @param resp
	 * @param ids
	 */
	@RequestMapping(value = "delUser", method = RequestMethod.POST)
	public void delUser(HttpServletResponse resp, String params) {
		try {
			msg = userService.delUser(BeanTransUtils.bean2Map(JSONObject
					.parse(params)));
			if (StringUtils.isBlank(msg)) {
				msg = "1";
			}

			resp.getWriter().print(msg);
		} catch (Exception e) {
			log.error("删除异常，params:" + JSONObject.toJSONString(params)
					+ "，message：" + e.getMessage());

		}
	}

	/**
	 * 上传头像
	 * 
	 * @param response
	 * @param req
	 * @param id
	 * @param files
	 * @throws IOException
	 */
	@RequestMapping(value = "/upload")
	public void upload(HttpServletResponse response, HttpServletRequest req,
			@RequestParam(value = "files", required = false) MultipartFile files)
			throws IOException {
		PrintWriter out = response.getWriter();
		if (files != null && files.isEmpty() == false) {
			msg = FileUtils.checkImages(files);
			if (!StringUtils.isBlank(msg)) {
				out.print(msg);
			} else {
				String s = FileUtils.upload(req, files); // 上传附件
				if (!"-1".equals(s)) {
					out.print(s);

				} else {
					this.msg = "error:文件错误！";
					out.print(msg);
				}
			}
		}
	}

}
