package com.gomeplus.im.customer.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gomeplus.im.customer.dao.AuthMapper;
import com.gomeplus.im.customer.model.User;
import com.gomeplus.im.customer.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService{

	@Autowired
	private AuthMapper authMapper;
	
	@Override
	public User login(String userName, String password) {

		User user = authMapper.login(userName);
		if(user != null){
			if(password.equals(user.getPassword())){
				return user;
			}else{
				return null;
			}
		}else{
			return null;
		}
	}

}
