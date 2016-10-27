package com.gomeplus.im.customer.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("")
public class PageController {

	@RequestMapping("{page}")
	public String toPage(@PathVariable("page") String page){
		return page;
	}
	
}
