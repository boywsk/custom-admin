package com.gomeplus.im.customer.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

/**
 * 对象转换工具类
 */
public class BeanTransUtils {
	static Logger log = LoggerFactory.getLogger(BeanTransUtils.class);

	/**
	 * Map --> Bean
	 * 
	 * @param map
	 * @param obj
	 */
	public static void map2Bean(Map<String, Object> map, Object obj) {
		if (map == null || obj == null) {
			return;
		}
		try {
			BeanUtils.populate(obj, map);
		} catch (Exception e) {
			log.error("transMap2Bean2 Error", e);
		}
	}

	/**
	 * Bean --> Map
	 * @param bean
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, Object> bean2Map(Object bean) {
		if (bean == null) {
			return null;
		}
		String json = JSON.toJSONString(bean);
		Map<String, Object> map = JSON.parseObject(json, Map.class);
		return map;
	}

	/**
	 * Document --> bean
	 * 
	 * @param doc
	 * @param clazz
	 * @return
	 */
	public static <T> Object document2Bean(Document doc, Class<T> clazz) {
		if(null == doc || null == clazz) {
			return null;
		}
		String json = JSON.toJSONString(doc);
		try {
			return JSON.parseObject(json, clazz);
		} catch (Exception e) {
			log.error("", e);
		}

		return null;
	}

	/**
	 * bean --> Document
	 * 
	 * @param bean
	 * @return
	 */
	public static Document bean2Document(Object bean) {
		if(null == bean) {
			return null;
		}
		String json = JSON.toJSONString(bean);
		Document doc = Document.parse(json);

		return doc;
	}

	/**
	 * List<bean> --> List<Document>
	 * 
	 * @param <T>
	 * @param beans
	 * @return
	 */
	public static <T> List<Document> bean2Document2(List<T> beans) {
		if(null == beans) {
			return null;
		}
		List<Document> docs = new ArrayList<Document>();
		for (Object bean : beans) {
			String json = JSON.toJSONString(bean);
			Document doc = Document.parse(json);
			docs.add(doc);
		}

		return docs;
	}
	
	/**
	 * bean ---> otherbean
	 * 
	 * @return Object
	 * @author liyouhui
	 * @param <T>
	 * @date 2016年8月19日
	 */
	public static <T> T beanCopy(Object dest, Class<T> clazz){
		if(dest == null){
			return null;
		}
		T t = null;
		try {
			t = clazz.newInstance();
			org.springframework.beans.BeanUtils.copyProperties(dest, t);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return t;
	}
	
	/**
	 * beans ---> otherbeans
	 * 
	 * @return List<T>
	 * @author liyouhui
	 * @date 2016年8月19日
	 */
	@SuppressWarnings({ "rawtypes" })
	public static <T> List<T> beansCopy(List dests, Class<T> clazz){
		if(dests == null){
			return null;
		}
		List<T> ts = new ArrayList<>();
		for(Object o : dests){
			ts.add((T) beanCopy(o, clazz));
		}
		return ts;
	}
	/**
	 * javaObject--->jsonObject
	 * @param o
	 * @return
	 */
	public static JSONObject toJsonObj(Object o){
		JSONObject jsonObject = (JSONObject) JSONObject.toJSON(o);
		return jsonObject;
	}
}
