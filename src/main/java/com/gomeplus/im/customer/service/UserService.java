package com.gomeplus.im.customer.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.gomeplus.im.customer.model.User;
import com.gomeplus.im.customer.pojo.CustomPojo;


public interface UserService {
	/**
	 * 客服添加
	 * @param customPojo
	 */
	//public String save(CustomPojo customPojo,HttpServletRequest request);
	public User save(CustomPojo customPojo,HttpServletRequest request);
	/**
	 * 保存用户数据（新增/修改）
	 * @param user
	 * @param request
	 * @return
	 */
	public String saveUser(User user,HttpServletRequest request);
	
	/**
	 * 删除用户数据
	 * @param param[ids businessIds roleLevel]
	 * @return
	 */
	public String delUser(Map<String,?> params);
	
	/**
	 * 查询用户
	 * @param id || userName
	 * @return
	 */
	public User getUserById(Long id);
	public User getUserByName(String userName);
	
	/**
	 * 客服列表
	 * @param createrId
	 * @param req
	 * @return
	 */
	public List<User> userList(HttpServletRequest req);
	
}
