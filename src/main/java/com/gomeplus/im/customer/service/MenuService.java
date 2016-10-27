package com.gomeplus.im.customer.service;

import java.util.List;

import com.gomeplus.im.customer.model.Menu;


public interface MenuService {

	List<Menu> getMenu(Long userId);

}
