package com.gomeplus.im.customer.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.FormBodyPart;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.gomeplus.im.customer.model.User;
import com.gomeplus.im.customer.pojo.ReqAvatar;

/**
 * 上传文件
 * 
 * @author yeqian
 *
 */
public class FileUtils {
	private static Logger log = LoggerFactory.getLogger(FileUtils.class);
	private static HttpClient httpClient = new DefaultHttpClient();
	private static String serverUri = "http://10.125.3.61:80/im-upload/ImageUploadServlet.do";
	private static String tfs_pre = "http://10.125.2.30/v1/img/";

	private static final String[] IMAGE_TYPE = { ".jpg", ".jpge", ".png",
			".bmp", ".gif" };

	public static String upload(HttpServletRequest request, MultipartFile files)
			throws IOException {
		String response = null;
		long random = (long) (Math.random() * 10000);
		try {
			Map<String, Object> reqAvatar = new HashMap<String, Object>();

			long millis = System.currentTimeMillis();
			String appId = ((User) request.getSession().getAttribute("user"))
					.getAppId().toString();
			String md5Str = Md5Util.md5Encode(appId + random + millis);

			reqAvatar.put("uid", random);
			reqAvatar.put("currentTime", millis);
			reqAvatar.put("appId", appId);
			reqAvatar.put("key", md5Str);
			reqAvatar.put("traceId", "123");
			reqAvatar.put("file", files);

			response = httpPost(reqAvatar, files, request);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return response;
	}

	public static String checkImages(MultipartFile files) {
		String filesFileName = files.getOriginalFilename();
		Boolean flag = false;

		for (String type : IMAGE_TYPE) {
			if (StringUtils.endsWithIgnoreCase(filesFileName, type)) {
				flag = true;
				break;
			}
		}

		if (files != null && files.isEmpty() == false) {
			// 文件后缀名
			int index = StringUtils.lastIndexOf(filesFileName, '.');
			if (index == -1) {
				return "error:附件类型错误";
			} else if (flag == false) {
				return "error:文件类型不正确，必须为jpg,jpeg,gif,png文件";

			} else if (files.getSize() > (1024 * 1024 * 1.5)) {
				return "error:文件太大，不能超过1.5M！";
			}
		}
		return null;
	}

	public static String httpPost(Map<String, Object> reqAvatar,
			MultipartFile files, HttpServletRequest request) {
		String pic_path = null;
		if (reqAvatar != null) {
			try {
				HttpPost httpPost = new HttpPost(serverUri);

				httpPost.setHeader("User-Agent", "SOHUWapRebot");
				httpPost.setHeader("Accept-Language", "zh-cn,zh;q=0.5");
				httpPost.setHeader("Accept-Charset", "GBK,utf-8;q=0.7,*;q=0.7");
				httpPost.setHeader("Connection", "keep-alive");

				MultipartEntity mutiEntity = new MultipartEntity();
				
				mutiEntity.addPart("file", new FileBody(transferTo(files, request)));
				for (Map.Entry<String, Object> paramEntry : reqAvatar
						.entrySet()) {
					mutiEntity.addPart(new FormBodyPart(paramEntry.getKey(),
							new StringBody(
									String.valueOf(paramEntry.getValue()))));
				}

				httpPost.setEntity(mutiEntity);

				try {
					HttpResponse httpResponse = httpClient.execute(httpPost);
					String httpEntity = EntityUtils.toString(httpResponse
							.getEntity());
					JSONObject data = JSONObject.parseObject(JSONObject
							.parseObject(httpEntity).getString("data"));
					pic_path = tfs_pre + data.getString("imgSmallName");

					log.info("返回数据：" + httpEntity);

				} catch (Exception e) {
					e.printStackTrace();
					log.debug("返回失败:" + e.getMessage());
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}

		return pic_path;
	}

	public static File transferTo(MultipartFile files,
			HttpServletRequest request) {
		try {
			InputStream stream = files.getInputStream();
			String filesFileName = files.getOriginalFilename();
			/** 分隔符 **/
			String separator = java.io.File.separator;
			/** 定义上传位置 **/

			String rootpath = request.getSession().getServletContext()
					.getRealPath("")
					+ separator;// 项目所在位置
			String filesPath = "file" + separator + "customer" + separator;
			int random = (int) (Math.random() * 10000);
			String filename = random + filesFileName;// 定义文件名称

			File cacheDir = new File(rootpath + filesPath);
			if (!cacheDir.exists()) {
				cacheDir.mkdirs();
			}
			File cacheFile = new File(cacheDir, filename);// 设置参数
			if (!cacheFile.isFile()) {
				cacheFile.createNewFile();// 生成文件
			}

			FileOutputStream fs = new FileOutputStream(rootpath + filesPath
					+ filename);
			byte[] buffer = new byte[1024 * 1024];
			int bytesum = 0;
			int byteread = 0;
			while ((byteread = stream.read(buffer)) != -1) {
				bytesum += byteread;
				fs.write(buffer, 0, byteread);
				fs.flush();
			}
			fs.close();
			stream.close();

			return cacheFile;
		} catch (Exception e) {
			e.printStackTrace();
			log.debug("图片上传失败，" + e.getMessage());
		}

		return null;
	}

}
