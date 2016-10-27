package com.gomeplus.im.customer.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSON;
import com.gomeplus.im.customer.model.Menu;
import com.gomeplus.im.customer.service.MenuService;

@Controller
@RequestMapping("menu")
public class MenuController {

	@Autowired
	private MenuService menuService;
	
	@RequestMapping("menuPage")
	public String menuPage(){
		return "menuPage";
	}
	
	/**
	 * 初始化页面获取用户菜单
	 * @param userId
	 * @return
	 */
	@RequestMapping("{userId}")
	public ResponseEntity<Map<String,Object>> getMenu(@PathVariable("userId") Long userId){
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			List<Menu> list = menuService.getMenu(userId);
			map.put("status", "ok");
			map.put("data", list);
			return ResponseEntity.ok(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		map.put("status", "fail");
		return ResponseEntity.ok(map);
	}
	
}
