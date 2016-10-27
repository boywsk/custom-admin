package com.gomeplus.im.customer.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gomeplus.im.customer.dao.TblBusinessConfigMapper;
import com.gomeplus.im.customer.model.TblBusinessConfig;
import com.gomeplus.im.customer.pojo.TblBusinessConfigPojo;
import com.gomeplus.im.customer.service.TblBusinessConfigService;
import com.gomeplus.im.customer.util.BeanTransUtils;

@Service
public class TblBusinessConfigServiceImpl implements TblBusinessConfigService{

	@Autowired
	private TblBusinessConfigMapper tblBusinessConfigDao;
	
	
	/**
	 * 插入方法
	 *
	 * @param bean
	 * @author liyouhui
	 */
	@Transactional
//	public long insertTblBusinessConfig(TblBusinessConfigPojo tblBusinessConfigPojo){
//		return tblBusinessConfigDao.insertTblBusinessConfig(BeanTransUtils.beanCopy(tblBusinessConfigPojo, TblBusinessConfig.class));
//	}
	public int insertTblBusinessConfig(TblBusinessConfig tblBusinessConfig){
		return tblBusinessConfigDao.insertTblBusinessConfig(tblBusinessConfig);
	}
	
	/**
	 * 批量插入方法
	 *
	 * @param bean
	 * @author liyouhui
	 */
	@Transactional
	public int batchInsertTblBusinessConfig(List<TblBusinessConfigPojo> tblBusinessConfigPojos){
		if(tblBusinessConfigPojos == null || tblBusinessConfigPojos.size() == 0){
			return 0;
		}
		return tblBusinessConfigDao.batchInsertTblBusinessConfig(BeanTransUtils.beansCopy(tblBusinessConfigPojos, TblBusinessConfig.class));
	}
	
	/**
	 * 修改方法
	 *
	 * @param bean
	 * @author liyouhui
	 */
	@Transactional
	public int updateTblBusinessConfig(TblBusinessConfigPojo tblBusinessConfigPojo){
		TblBusinessConfig tblBusinessConfig = new TblBusinessConfig();
		BeanUtils.copyProperties(tblBusinessConfigPojo, tblBusinessConfig);
		return tblBusinessConfigDao.updateTblBusinessConfig(BeanTransUtils.beanCopy(tblBusinessConfigPojo, TblBusinessConfig.class));
	}
	
	/**
	 * 删除方法
	 *
	 * @param id
	 * @author liyouhui
	 */
	@Transactional
	public int deleteTblBusinessConfig(long id){
		return tblBusinessConfigDao.deleteTblBusinessConfig(id);		
	}
	
	/**
	 * 批量删除方法
	 *
	 * @param id
	 * @author liyouhui
	 */
	@Transactional
	public int deleteBatchTblBusinessConfig(long[] ids){
		return tblBusinessConfigDao.deleteBatchTblBusinessConfig(ids);		
	}
	
	
	/**
	 * 根据id查询的方法
	 *
	 * @param id
	 * @author liyouhui
	 */
	public TblBusinessConfigPojo getTblBusinessConfig(long id){
		TblBusinessConfig tblBusinessConfig = tblBusinessConfigDao.getTblBusinessConfig(id);
		if(tblBusinessConfig == null){
			return null;
		}
		return BeanTransUtils.beanCopy(tblBusinessConfig, TblBusinessConfigPojo.class);
	}
	
	/**
	 * 根据appid查询的方法
	 *
	 * @param appId
	 * @author liyouhui
	 */
	public List<TblBusinessConfigPojo> getTblBusinessConfigAppId(long appId){
		List<TblBusinessConfig> tblBusinessConfigs = tblBusinessConfigDao.getTblBusinessConfigAppId(appId);
		if(tblBusinessConfigs == null){
			return null;
		}
		return BeanTransUtils.beansCopy(tblBusinessConfigs, TblBusinessConfigPojo.class);
	}
	
	
	
	/**
	 * 根据条件查询行数
	 * @param param
	 * @return
	 */
	public int countTblBusinessConfig(Map<String, Object> param){
		return tblBusinessConfigDao.countTblBusinessConfig(param);
	}
	
	
	/**
	 * 根据条件查询数据
	 * @param param
	 * @return
	 */
	public List<TblBusinessConfigPojo> listTblBusinessConfig(Map<String, Object> param){
		List<TblBusinessConfig> tblBusinessConfigs = tblBusinessConfigDao.listTblBusinessConfig(param);
		if(tblBusinessConfigs == null || tblBusinessConfigs.size() == 0){
			return null;
		}
		return BeanTransUtils.beansCopy(tblBusinessConfigs, TblBusinessConfigPojo.class);
	}
	
}