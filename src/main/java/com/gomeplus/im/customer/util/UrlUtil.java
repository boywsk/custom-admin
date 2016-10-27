package com.gomeplus.im.customer.util;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

public class UrlUtil {

	private static List<String> allUrls;

	public static List<String> getAllUrl() {
		return getAllUrls();
	}

	private static List<String> getAllUrls() {
		allUrls = new ArrayList<String>();
		for (Class<?> clazz : getClasses("com.gomeplus.im.customer.controller")) {
			RequestMapping parentAnno = clazz.getAnnotation(RequestMapping.class);
			Controller controller = clazz.getAnnotation(Controller.class);
			if (controller == null) {
				continue;
			}
			String parentMapping = "";
			if (parentAnno != null) {
				parentMapping = parentAnno.value().length > 0 ? parentAnno.value()[0] : "";
				if(!"".equals(parentMapping)){
					parentMapping = parentMapping.startsWith("/") ? parentMapping : "/" + parentMapping;
				}
			}
			findBeanMapping(clazz, parentMapping);
		}
		return allUrls;
	}
	
	private static void findBeanMapping(Class<?> clazz, String parentMapping) {
		Method[] methods = clazz.getMethods();
		for (Method method : methods) {
			RequestMapping anno = method.getAnnotation(RequestMapping.class);
			if(anno!=null){
				String mapping = anno.value().length>0?anno.value()[0]:"";
				mapping = mapping.startsWith("/")?mapping:"/"+mapping;
				String url = parentMapping+mapping;
				/*UrlMappingDto urlMapping = new UrlMappingDto();
				urlMapping.setUrl(url);
				urlMapping.setClassName(clazz.getSimpleName());
				urlMapping.setParamsClass(method.getParameterTypes());
				urlMapping.setMethodName(method.getName());
				urlMapping.setRequestMethods(anno.method());
				urlMapping.setHeaders(anno.headers());
				urlMapping.setProduces(anno.produces());
				urlMapping.setParams(anno.params());
				urlMapping.setConsumes(anno.consumes());
				if(method.getAnnotation(ResponseBody.class)!=null){
					urlMapping.setReturnType("Json:"+method.getReturnType().getSimpleName());
				}else{
					urlMapping.setReturnType("View:"+method.getReturnType().getSimpleName());
				}*/
				allUrls.add(url);
			}
		}
		
	}

	public static Set<Class<?>> getClasses(String packageName) {

		String packageDir = packageName.replace(".", "/");
		Set<Class<?>> classes = new HashSet<Class<?>>();
		try {
			Enumeration<URL> s = Thread.currentThread().getContextClassLoader()
					.getResources(packageDir);
			while (s.hasMoreElements()) {
				String filePath = URLDecoder.decode(s.nextElement().getFile(),
						"UTF-8");
				findAllFilePathClasses(packageName, filePath, classes);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		return classes;
	}
	
	public static void findAllFilePathClasses(String packageName,
			String packagePath, Set<Class<?>> classes) {
		File dir = new File(packagePath);
		if(dir.isDirectory()){
			File [] dirFiles = dir.listFiles(new FileFilter() {
				@Override
				public boolean accept(File file) {
					return file.isDirectory()||file.getName().endsWith(".class");
				}
			});
			for (File f: dirFiles) {
				if(f.isDirectory()){
					findAllFilePathClasses(packageName+"."+f.getName(), f.getAbsolutePath(), classes);
				}else{
					String className = packageName+"."+f.getName().replace(".class", "");
					try {
						classes.add(Thread.currentThread().getContextClassLoader().loadClass(className));
					} catch (ClassNotFoundException e) {
						e.printStackTrace();
					}
				}
			}
		}
	}
}
