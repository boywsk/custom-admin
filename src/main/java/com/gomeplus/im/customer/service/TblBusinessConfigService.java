package com.gomeplus.im.customer.service;

import java.util.List;
import java.util.Map;

import com.gomeplus.im.customer.model.TblBusinessConfig;
import com.gomeplus.im.customer.pojo.TblBusinessConfigPojo;

/**
 * TblBusinessConfig
 * @author liyouhui
 **/
 
 
public interface TblBusinessConfigService {

	/**
	 * 插入方法
	 *
	 * @param bean
	 * @author liyouhui
	 */
//	long insertTblBusinessConfig(TblBusinessConfigPojo tblBusinessConfigPojo);
	
	int insertTblBusinessConfig(TblBusinessConfig tblBusinessConfig);
	
	/**
	 * 批量插入方法
	 *
	 * @param bean
	 * @author liyouhui
	 */
	int batchInsertTblBusinessConfig(List<TblBusinessConfigPojo> tblBusinessConfigPojo);
	
	/**
	 * 修改方法
	 *
	 * @param bean
	 * @author liyouhui
	 */
	int updateTblBusinessConfig(TblBusinessConfigPojo tblBusinessConfigPojo);
	
	/**
	 * 删除方法
	 *
	 * @param id
	 * @author liyouhui
	 */
	int deleteTblBusinessConfig(long id);
	
	/**
	 * 批量删除方法
	 *
	 * @param id
	 * @author liyouhui
	 */
	int deleteBatchTblBusinessConfig(long[] ids);
	
	
	/**
	 * 根据id查询的方法
	 *
	 * @param id
	 * @author liyouhui
	 */
	TblBusinessConfigPojo getTblBusinessConfig(long id);
	
	
	/**
	 * 根据appid查询的方法
	 *
	 * @param appId
	 * @author liyouhui
	 */
	List<TblBusinessConfigPojo> getTblBusinessConfigAppId(long appId);
	
	/**
	 * 根据条件查询行数
	 * @author liyouhui
	 * @param param
	 * @return
	 */
	int countTblBusinessConfig(Map<String, Object> param);
	
	
	/**
	 * 根据条件查询数据
	 * @author liyouhui
	 * @param param
	 * @return
	 */
	List<TblBusinessConfigPojo> listTblBusinessConfig(Map<String, Object> param);
	
}