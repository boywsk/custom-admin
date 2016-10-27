package com.gomeplus.im.customer.dao;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.gomeplus.im.customer.model.TblCustomConfig;

public interface TblCustomConfigMapper {
	
	public List<TblCustomConfig> configList(Long businessId);
	
	public TblCustomConfig getConfigById(Long id);
	
	public void saveConfig(TblCustomConfig c_config);
	
	public void updateConfigByid(TblCustomConfig c_config);
	
	public void delConfig(Map<String, String> map);
	
}
