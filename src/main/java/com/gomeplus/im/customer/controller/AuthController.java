package com.gomeplus.im.customer.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.gomeplus.im.customer.model.User;
import com.gomeplus.im.customer.service.AuthService;

@Controller
@RequestMapping("auth")
public class AuthController {
	
	@Autowired
	private AuthService authService;

	/**
	 * 登录
	 * @param userName
	 * @param password
	 * @param request
	 * @param redirectAttributes
	 * @return
	 */
	@RequestMapping(value = "login",method = RequestMethod.POST)
	public ResponseEntity<Map<String,Object>> login(@RequestParam("username") String userName,@RequestParam("password") String password,
			HttpServletRequest request,RedirectAttributes redirectAttributes){
		Map<String,Object> map = new HashMap<String,Object>();
		/*Subject subject = SecurityUtils.getSubject();
		subject.login(new UsernamePasswordToken(userName,password));*/
		try {
			User user = authService.login(userName,password);
			/*subject.getSession().setAttribute("user", user);*/
			if(user != null){
				user.setPassword(null);
				request.getSession().setAttribute("user", user);
				map.put("status", "ok");
				map.put("data", user);
				return ResponseEntity.ok(map);
				/*return "redirect:/index";*/
			}else{
				/*redirectAttributes.addFlashAttribute("error", "登录失败，用户名或密码错误！");
				return "redirect:/login";*/
				map.put("status", "fail");
				return ResponseEntity.ok(map);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
	
	/**
	 * 注销登录
	 * @param request
	 * @return
	 */
	@RequestMapping("logout")
	public ResponseEntity<Map<String,Object>> logout(HttpServletRequest request){
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			/*Subject subject = SecurityUtils.getSubject();
	        subject.logout();*/
			map.put("status","ok");
			return ResponseEntity.ok(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		map.put("status", "fail");
		return ResponseEntity.ok(map);
	}
	
}
