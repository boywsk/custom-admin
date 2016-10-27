package com.gomeplus.im.customer.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.gomeplus.im.customer.dao.TblCustomConfigMapper;
import com.gomeplus.im.customer.model.TblCustomConfig;
import com.gomeplus.im.customer.model.User;
import com.gomeplus.im.customer.service.TblCustomConfigService;
import com.gomeplus.im.customer.util.BeanTransUtils;

/**
 * 配置管理【2016-8-31】
 * @author yeqian
 *
 */
@Service
public class TblCustomConfigServiceImpl implements TblCustomConfigService {
	
	@Autowired
	private TblCustomConfigMapper configMapper;

	@Override
	public List<TblCustomConfig> configList(Long businessId) {
		if(businessId!=null){
			return configMapper.configList(businessId);
		}
		return null;
	}

	@Override
	public TblCustomConfig getConfigById(Long id) {
		if(id!=null){
			return configMapper.getConfigById(id);
		}
		return null;
	}

	@Override
	public String save(TblCustomConfig c_config, HttpServletRequest req) {
		User user=(User)req.getSession().getAttribute("user");
		
		if(c_config==null){
			return "参数错误";
		}
		
		c_config.setLastOperateTime(System.currentTimeMillis());
		c_config.setLastOperator(user.getId());
		
		if(c_config.getId()==null){
			c_config.setBusinessId(user.getBusinessId());
			configMapper.saveConfig(c_config);
		}else{
			configMapper.updateConfigByid(c_config);
		}
		return null;
	}

	@Override
	public String delConfig(String ids) {
		if(StringUtils.isBlank(ids)){
			return "参数错误";
		}
		Map<String, String> param = new HashMap<String, String>();
		param.put("ids", ids);
		configMapper.delConfig(param);
		return null;
	}

}
