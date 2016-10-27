package com.gomeplus.im.customer.controller;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;

import org.apache.commons.lang3.StringUtils;
import org.glassfish.jersey.client.ClientConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gomeplus.im.customer.pojo.ReqAvatar;
import com.gomeplus.im.customer.util.Md5Util;


/**
 * 图片上传
 * @author lixiangkai
 *
 */
@Controller
@RequestMapping("pic")
public class PictureController {
	
	private final Client client = ClientBuilder.newClient(new ClientConfig());
	
	private static final ObjectMapper MAPPER = new ObjectMapper();

	private static final Logger logger = LoggerFactory.getLogger(PictureController.class);
	
	private static final String[] IMAGE_TYPE = { ".jpg", ".jpge", ".png", ".bmp", ".gif" };
	
	@RequestMapping(value = "avatar",method = RequestMethod.POST)
	public ResponseEntity<Map<String,Object>> upload(@RequestParam("uid") Long uid,@RequestParam("appId") String appId,
			@RequestParam("file") MultipartFile file){
		
		Map<String,Object> map = new HashMap<String,Object>();
		Boolean flag = false;
		
		for (String type : IMAGE_TYPE) {
			if(StringUtils.endsWithIgnoreCase(file.getOriginalFilename(), type)){
				flag = true;
				break;
			}
		}
		
		if(flag == false){
			map.put("status", "fail");
			return ResponseEntity.ok(map);
		}else{
			try {
				ReqAvatar reqAvatar = new ReqAvatar();
				reqAvatar.setAppId(appId);
				reqAvatar.setUid(uid);
				reqAvatar.setFile(file);
				
				long millis = System.currentTimeMillis();
				reqAvatar.setCurrentTime(millis);
				String md5Str = Md5Util.md5Encode(reqAvatar.getAppId() + reqAvatar.getUid() + millis);
				reqAvatar.setKey(md5Str);
			
				//接口调用
				WebTarget target = client.target("http:10.125.3.61:8080").
						path("/im-upload/ImageUploadServlet.do");
				target.request(MediaType.APPLICATION_JSON_TYPE).post(Entity.entity(JSON.toJSONString(reqAvatar), MediaType.APPLICATION_JSON_TYPE));
				String result = target.request().get().readEntity(String.class);
				
				map.put("status", "ok");
				map.put("data", result);
				return ResponseEntity.ok(map);
			} catch (Exception e) {
				e.printStackTrace();
				map.put("status", "fail");
				return ResponseEntity.ok(map);
			}
		}
	}

}
