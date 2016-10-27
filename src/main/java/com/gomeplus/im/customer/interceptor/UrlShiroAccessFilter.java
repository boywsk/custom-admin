package com.gomeplus.im.customer.interceptor;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.AccessControlFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.gomeplus.im.customer.model.User;

public class UrlShiroAccessFilter extends AccessControlFilter{
	
	private static final Logger logger = LoggerFactory.getLogger(UrlShiroAccessFilter.class);

	@Override
	protected boolean isAccessAllowed(ServletRequest req,
			ServletResponse resp, Object object) throws Exception {
		HttpServletRequest request = (HttpServletRequest)req;
        HttpServletResponse response = (HttpServletResponse)resp;
        
        String path = request.getRequestURI().substring(request.getContextPath().length());
        Subject subject = SecurityUtils.getSubject();
        User user = (User) subject.getSession().getAttribute("user");
        if(!subject.isAuthenticated()){
        	logger.info("未登录");
        	response.sendRedirect("login");
        	return false;
        }else if(user == null){
        	logger.info("登录过期");
        	response.sendRedirect("login");
        	return false;
        }else{
        	if(!subject.isPermitted(path)){
        		logger.info("无权限进行此操作");
        		response.getWriter().write("您没有权限进行此操作");
        		return false;
        	}else{
        		return true;
        	}
        }
	}

	@Override
	protected boolean onAccessDenied(ServletRequest req, ServletResponse resp)
			throws Exception {
		return true;
	}
	
	/**
     * 获得请求路径
     *
     * @param request
     * @return
     */
    private String getRequestPath(HttpServletRequest request) {
        String requestPath = request.getRequestURI();
        if(request.getQueryString() != null){

            requestPath += "?" + request.getQueryString();
        }
        if (requestPath.indexOf("&") > -1) {// 去掉其他参数
            requestPath = requestPath.substring(0, requestPath.indexOf("&"));
        }
        requestPath = requestPath.substring(request.getContextPath().length());// 去掉项目路径

        //下面这句代码，是对?id=xx的字符串进行替换，而?edit这种字符串则不替换
        requestPath = regexReplace(requestPath, "[\\?]*([0-9a-zA-Z]*=[0-9a-zA-Z\\-]*)", "");

        return requestPath;
    }
    
    private String regexReplace(String content,String search,String replacement){
        Pattern p = Pattern.compile(search);
        Matcher m = p.matcher(content);
        String s = m.replaceAll(replacement);
        return s;
    }

}
