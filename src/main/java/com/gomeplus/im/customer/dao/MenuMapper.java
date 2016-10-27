package com.gomeplus.im.customer.dao;

import java.util.List;

import com.gomeplus.im.customer.model.Menu;

public interface MenuMapper {

	List<Menu> getMenu(Long userId);

}
