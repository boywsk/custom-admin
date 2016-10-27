package com.gomeplus.im.customer.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gomeplus.im.customer.dao.MenuMapper;
import com.gomeplus.im.customer.model.Menu;
import com.gomeplus.im.customer.service.MenuService;

@Service
public class MenuServiceImpl implements MenuService {

	@Autowired
	private MenuMapper menuMapper;
	
	/**
	 * 获取页面用户菜单
	 */
	public List<Menu> getMenu(Long userId) {
		List<Menu> list = menuMapper.getMenu(userId);
		return list;
	}

}
