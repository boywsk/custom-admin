package com.gomeplus.im.customer.controller;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("chat")
public class ChatController {

	/**
	 * 获取默认表情
	 * @return
	 */
	@RequestMapping(value = "defaultFaces",method = RequestMethod.GET)
	public ResponseEntity<Map<String,Object>> getFaces(){
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			URL resource = ChatController.class.getClassLoader().getResource("./images/faces/default_face");
			String path = "./images/faces/default_face";
			File dir = new File(path);
			File[] tempList = null;
			if(dir.isDirectory()){
				tempList = dir.listFiles();
			}
			List<String> list = new ArrayList<String>();
			if(tempList.length == 0){
				map.put("fail", "文件夹路径错误或不存在表情");
				return ResponseEntity.ok(map);
			}else{
				for (File file : tempList) {
					list.add(file.getName());
				}
				map.put("ok", list);
				return ResponseEntity.ok(map);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		map.put("fail", "系统错误");
		return ResponseEntity.ok(map);
		
		
	}
	
	public static void main(String[] args) {
		URL resource = ChatController.class.getClassLoader().getResource("./images/faces/default_face");
		String path = "images/faces/default_face";
		File dir = null;
			dir = new File(path);
		File[] tempList = null;
		if(dir.isDirectory()){
			tempList = dir.listFiles();
		}
	}
	
}
