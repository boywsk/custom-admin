package com.gomeplus.im.customer.dao;

import com.gomeplus.im.customer.model.User;

public interface AuthMapper {

	User login(String userName);

}
