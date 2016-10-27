package com.gomeplus.im.customer.listener;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import org.apache.shiro.session.Session;
import org.apache.shiro.session.SessionListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * shiro session监听器
 * @author lixiangkai
 *
 */
public class NotifySessionListener implements SessionListener{
	
	private static final Logger logger = LoggerFactory.getLogger(NotifySessionListener.class);

	private static Map<Serializable,Session> sessionMap = new HashMap<Serializable, Session>();
	
	/**
	 * 登录及更新session
	 */
	public void onStart(Session session) {
		sessionMap.put(session.getId(), session);
		logger.info("session start:"+session.getId());
	}

	/**
	 * 登出
	 */
	public void onStop(Session session) {
		sessionMap.remove(session.getId());
		logger.info("session stop:"+session.getId());
	}

	/**
	 * Session过期
	 */
	public void onExpiration(Session session) {
		sessionMap.remove(session.getId());
		logger.info("登陆过期:"+session.getId());
	}
	
	/**
	 * 将消息通知到每个登录的 用户里面
	 * @param key
	 * @param obj
	 */
	public static void notifyToSession(String key,Object obj) {
		for(Session session:sessionMap.values()){
			logger.info("try to notify session:"+session.getId());
			if(session.getAttribute("user")!=null){
				logger.info("has notify session:"+session.getId());
				session.setAttribute(key, obj);
			}
		}
	}

}
