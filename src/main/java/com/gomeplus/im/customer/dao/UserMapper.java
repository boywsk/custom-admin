package com.gomeplus.im.customer.dao;

import java.util.List;
import java.util.Map;

import com.gomeplus.im.customer.model.User;

/**
 * 用户数据
 */
public interface UserMapper {
	public void saveUser(User user);
	
	public void updateUserByid(User user);
	
	public User getUserByName(String userName);
	
	public void delUser(Map<String,Object> map);
	
	public User getUserById(Long id);
	
	public List<User> userList(Long createrId);
}
