package com.gomeplus.im.customer.dao;

import java.util.List;
import java.util.Map;

import com.gomeplus.im.customer.model.TblBusinessConfig;

import org.apache.ibatis.annotations.Param;

/**
 * TblBusinessConfig
 * @author liyouhui
 **/
 
public interface TblBusinessConfigMapper {

	/**
	 * 插入方法
	 *
	 * @param bean
	 * @author liyouhui
	 */
	int insertTblBusinessConfig(TblBusinessConfig bean);
	
	
	/**
	 * 批量插入方法
	 *
	 * @param bean
	 * @author liyouhui
	 */
	int batchInsertTblBusinessConfig(List<TblBusinessConfig> bean);
	
	
	/**
	 * 修改方法
	 *
	 * @param bean
	 * @author liyouhui
	 */
	int updateTblBusinessConfig(TblBusinessConfig bean);
	
	/**
	 * 删除方法
	 *
	 * @param id
	 * @param version
	 * @author liyouhui
	 */
	int deleteTblBusinessConfig(@Param("id")long id);
	
	/**
	 * 批量删除方法
	 *
	 * @param id
	 * @author liyouhui
	 */
	int deleteBatchTblBusinessConfig(@Param("ids") long[] ids);
	
	/**
	 * 根据id查询的方法
	 *
	 * @param id
	 * @author liyouhui
	 */
	TblBusinessConfig getTblBusinessConfig(@Param("id")long id);
	
	/**
	 * 根据appid查询的方法
	 *
	 * @param appId
	 * @author liyouhui
	 */
	List<TblBusinessConfig> getTblBusinessConfigAppId(@Param("appId")long appId);
	
	/**
	 * 根据条件查询行数
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
	List<TblBusinessConfig> listTblBusinessConfig(Map<String, Object> param);
	
	
}