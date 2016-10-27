package com.gomeplus.im.customer.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.gomeplus.im.customer.dao.UserMapper;
import com.gomeplus.im.customer.model.TblBusinessConfig;
import com.gomeplus.im.customer.model.User;
import com.gomeplus.im.customer.pojo.CustomPojo;
import com.gomeplus.im.customer.pojo.TblBusinessConfigPojo;
import com.gomeplus.im.customer.service.TblBusinessConfigService;
import com.gomeplus.im.customer.service.UserService;
import com.gomeplus.im.customer.util.BeanTransUtils;
import com.gomeplus.im.customer.util.Constant;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserMapper userMapper;
	@Autowired
	private TblBusinessConfigService tblBusinessConfigService;

	@Override
	public User save(CustomPojo customPojo, HttpServletRequest request) {
		User u = (User) request.getSession().getAttribute("user");
		if (customPojo == null) {
			return null;
		}
		User user = null;
		if (Constant.ROLE_LEVEL.ROLE_LEVEL_TYPE1.value == customPojo
				.getRoleLevel()) { // 商户
			TblBusinessConfigPojo tblBusinessConfigPojo = new TblBusinessConfigPojo();

			tblBusinessConfigPojo.setAppId(u.getAppId());
			tblBusinessConfigPojo.setCreaterId(u.getCreaterId());
			tblBusinessConfigPojo
					.setBusinessType(Constant.BUSINESS_TYPE.BUSINESS_TYPE2.value);
			tblBusinessConfigPojo.setSeats(customPojo.getSeats());
			tblBusinessConfigPojo.setVisitors(customPojo.getVisitors());
			tblBusinessConfigPojo.setBusinessName(customPojo.getBusinessName());

			TblBusinessConfig business = BeanTransUtils.beanCopy(
					tblBusinessConfigPojo, TblBusinessConfig.class);
			tblBusinessConfigService.insertTblBusinessConfig(business);

			user = new User(u.getAppId(), business.getId(),
					customPojo.getUserName(), u.getId(),
					customPojo.getPassword(),
					Constant.ROLE_LEVEL.ROLE_LEVEL_TYPE1.value,
					Constant.BUSINESS_TYPE.BUSINESS_TYPE2.value,
					System.currentTimeMillis(), customPojo.getPicture());
		} else { // 普通客服
			user = new User(u.getAppId(), u.getBusinessId(),
					customPojo.getUserName(), u.getId(),
					customPojo.getPassword(),
					Constant.ROLE_LEVEL.ROLE_LEVEL_TYPE2.value,
					Constant.BUSINESS_TYPE.BUSINESS_TYPE0.value,
					System.currentTimeMillis(), customPojo.getPicture());

		}
		
		this.saveUser(user, request);
		
		return user;

	}

	@Override
	public String saveUser(User user, HttpServletRequest request) {
		if (user == null) {
			return "数据错误";
		} else {
			if (user.getId() == null) {
				userMapper.saveUser(user);
			} else {
				userMapper.updateUserByid(user);

				this.changeSession(request, user);
			}

		}

		return null;
	}

	@Override
	public String delUser(Map<String, ?> params) {
		if (params == null) {
			return "数据错误";
		}
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("ids", params.get("ids"));
		userMapper.delUser(param);
		if (params.get("roleLevel") == "1") {
			tblBusinessConfigService.deleteTblBusinessConfig((Long) params
					.get("businessId"));
		}
		return null;
	}

	@Override
	public User getUserById(Long id) {
		return userMapper.getUserById(id);
	}

	@Override
	public User getUserByName(String userName) {
		return userMapper.getUserByName(userName);
	}

	@Override
	public List<User> userList(HttpServletRequest req) {
		User u = (User) req.getSession().getAttribute("user");
		List<User> uList = userMapper.userList(u.getId());
		if (uList != null && uList.size() > 0) {
			return BeanTransUtils.beansCopy(uList, User.class);
		}
		return null;
	}

	void changeSession(HttpServletRequest req, User user) {
		User u = (User) req.getSession().getAttribute("user");
		if (u != null) {
			user.setAppId(u.getAppId());
			user.setBusinessId(u.getBusinessId());
			user.setCreaterId(u.getCreaterId());
			user.setCreateTime(u.getCreateTime());
			user.setRoleLevel(u.getRoleLevel());
			user.setState(u.getState());

			user.setPassword(null);
		}
		req.getSession().setAttribute("user", user);
	}

}
