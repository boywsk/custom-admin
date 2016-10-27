package com.gomeplus.im.customer.service;

import com.gomeplus.im.customer.model.User;

public interface AuthService {

	User login(String userName, String password);

}
