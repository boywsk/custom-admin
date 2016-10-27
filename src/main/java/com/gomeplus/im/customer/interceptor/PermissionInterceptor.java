package com.gomeplus.im.customer.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;


/**
 * 权限拦截器
 * @author lixiangkai
 *
 */
public class PermissionInterceptor implements HandlerInterceptor {
	
	private static final Logger logger = LoggerFactory.getLogger(PermissionInterceptor.class);
	
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		
		String path = request.getRequestURI().substring(request.getContextPath().length());
		
		if(path.contains(";")){  //防止权限绕过
			path = path.substring(0,path.indexOf(";"));
		}
		if(path.contains("_")){	 //子权限连接 识别
			path = path.substring(0,path.indexOf("_"));
		}
		
		Subject subject = SecurityUtils.getSubject();
		logger.info("拦截路径进行权限验证："+path);
		subject.checkPermission(path);
		return true;
		
	}

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

}
