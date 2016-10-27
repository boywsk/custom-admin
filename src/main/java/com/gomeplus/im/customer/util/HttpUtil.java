package com.gomeplus.im.customer.util;

import com.alibaba.fastjson.JSON;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.URIException;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.commons.httpclient.util.URIUtil;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

public class HttpUtil {
	private static Logger log = LoggerFactory.getLogger(HttpUtil.class);

	private static HttpClient httpClient = new HttpClient();

	public static String httpRequest(String url,  Map<String, String> params,
			String requestType) {
		HttpMethod method = null;
		String json = null;
		try {
			if (requestType.equalsIgnoreCase("get")) {
				//method = getMethod(url, params);
			} else if (requestType.equalsIgnoreCase("post")) {
				method = postMethod(url, params);
			}
			httpClient.executeMethod(method);
			String response = method.getResponseBodyAsString();
			json = response;
		} catch (IOException e) {
			log.error("error:" + e);
		}
		return json;
	}

//	public static void main(String[] args) {
//		String json = httpRequest(
//				"http://10.69.16.27:8030/gomeplus-im-api/applyApp/createDatabase.json",
//				"appId=10000", "get");
//		System.out.println(json);
//	}

	private static HttpMethod getMethod(String url, String queryString)
			throws IOException {
		 String response = null; 
         HttpClient client = new HttpClient(); 
         HttpMethod method = new GetMethod(url); 
         try { 
                 if (StringUtils.isNotBlank(queryString)) 
                         method.setQueryString(URIUtil.encodeQuery(queryString)); 
                 client.executeMethod(method); 
                 if (method.getStatusCode() == HttpStatus.SC_OK) { 
                         response = method.getResponseBodyAsString(); 
                 } 
         } catch (URIException e) { 
                 log.error("执行HTTP Get请求时，编码查询字符串“" + queryString + "”发生异常！", e); 
         } catch (IOException e) { 
                 log.error("执行HTTP Get请求" + url + "时，发生异常！", e); 
         } finally { 
                 method.releaseConnection(); 
         } 
         return method; 
	}

	private static HttpMethod postMethod(String url, Map<String, String> params)
			throws IOException {
		String response = null; 
		PostMethod method = new PostMethod(url);
		if (params != null) {
			HttpMethodParams p = new HttpMethodParams();
			for (Map.Entry<String, String> entry : params.entrySet()) {
				p.setParameter(entry.getKey(), entry.getValue());
			}
			method.setParams(p);
		}
		try {
			httpClient.executeMethod(method);
			if (method.getStatusCode() == HttpStatus.SC_OK) {
				response = method.getResponseBodyAsString();
			}
		} catch (IOException e) {
			log.error("执行HTTP Post请求" + url + "时，发生异常！", e);
		} finally {
			method.releaseConnection();
		}
		
		return method;
	}

	/**
	 * 写回请求数据
	 * 
	 * @param data
	 *            list或map对象
	 */
	public static void writeResult(HttpServletResponse response, Object dataObj) {
		if (dataObj == null) {
			return;
		}
		String str = JSON.toJSONString(dataObj);
		writeResult(response, str);
	}

	/**
	 * 写回请求数据
	 * 
	 * @param data
	 *            字符串内容
	 */
	public static void writeResult(HttpServletResponse response, String dataStr) {
		if (dataStr == null) {
			return;
		}
		PrintWriter out = null;

		try {
			response.setHeader("Content-type", "text/plain;charset=UTF-8");
			response.setCharacterEncoding("UTF-8");
			response.setContentType("application/json");
			response.setContentLength(dataStr.getBytes("UTF-8").length);
			out = response.getWriter();
			out.write(dataStr);
			out.flush();
		} catch (Exception e) {
			log.error("写回数据出现异常： ", e);
		} finally {
			if (out != null) {
				out.close();
			}
		}
	}

}
