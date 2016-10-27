package com.gomeplus.im.customer.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.gomeplus.im.customer.model.TblCustomConfig;

/**
 * 配置管理【2016-8-31】
 * @author yeqian
 *
 */
public interface TblCustomConfigService {
	
	/**
	 * 配置列表
	 * @param businessId
	 * @return
	 */
	public List<TblCustomConfig> configList(Long businessId);
	
	/**
	 * 获取一条配置项
	 * @param id
	 * @return
	 */
	public TblCustomConfig getConfigById(Long id);
	
	/**
	 * 保存配置
	 * @param c_config
	 * @param req
	 * @return
	 */
	public String save(TblCustomConfig c_config,HttpServletRequest req);
	
	/**
	 * 删除配置
	 * @param ids
	 * @return
	 */
	public String delConfig(String ids);

}
