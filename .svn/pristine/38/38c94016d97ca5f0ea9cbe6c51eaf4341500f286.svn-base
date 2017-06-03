package com.wdkj.wf.service.house.impl;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;

import com.wdkj.wf.constraints.HouseConst;
import com.wdkj.wf.entity.house.HouseOwner;
import com.wdkj.wf.house.entity.VillageEntity;
import com.wdkj.wf.service.house.HouseOwnerService;
import com.wdkj.wf.service.street.impl.VillageService;
import com.wf.common.latLon.LatLon;
import com.wf.common.latLon.LatLonUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fh.dao.DaoSupport;
import com.fh.util.PageData;
import com.wdkj.wf.house.entity.HouseEntity;
import com.wdkj.wf.service.house.HouseManager;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("all")
@Service("houseService")
public class HouseService implements HouseManager{

	private static Log log = LogFactory.getLog(HouseService.class);

	@Resource(name = "daoSupport")
	private DaoSupport dao;

	@Autowired
	VillageService villageService;

	@Autowired
	HouseOwnerService houseOwnerService;
	
	@Override
	public void save(HouseEntity house) throws Exception {
		dao.save("HouseMapper.save", house);
		
	}

	@Override
	public List<PageData> listHistory(HouseEntity params) throws Exception {

		return (List<PageData>)dao.findForList("HouseMapper.listHistory", params);
	}

	@Override
	public List<HouseEntity> statistics(HouseEntity houseEntity) {

		return dao.list("HouseMapper.statis", houseEntity);
	}
	
	@Override
	public List<HouseEntity> integrative(HouseEntity houseEntity) {

		return dao.list("HouseMapper.integrative", houseEntity);
	}

	@Override
	public List<PageData> listExcel(HouseEntity params) throws Exception {

		return (List<PageData>)dao.findForList("HouseMapper.listExcel", params);
	}

	//历史回溯属性更新
	@Override
	public void historyUpdate(HouseEntity params) {
		// TODO Auto-generated method stub
		dao.updateOne("HouseMapper.historyUpdate", params); 
		dao.updateOne("HouseMapper.historyUpdate1", params); 

	}

	@Override
	public List<HouseEntity> listByLine(List<LatLon> linePoints, Double distance) {
		HouseEntity houseEntity = new HouseEntity();
		Map<String, Double> map = LatLonUtils.getBoundary(linePoints);

		//找出这个矩形边界内的房屋，减少数据量
		houseEntity.setXmax(map.get(LatLonUtils.MAX_LAT_KEY));
		houseEntity.setXmin(map.get(LatLonUtils.MIN_LAT_KEY));
		houseEntity.setXmax(map.get(LatLonUtils.MAX_LAT_KEY));
		houseEntity.setXmax(map.get(LatLonUtils.MAX_LAT_KEY));

		List<HouseEntity> houseEntities = this.page(houseEntity);
		List<HouseEntity> result = new LinkedList<>();
		//遍历房屋判断是否在线附近
		LatLon temp = new LatLon();
		for (HouseEntity h : houseEntities){
			temp.setLat(h.getY());
			temp.setLon(h.getX());
			if (LatLonUtils.isPointNearLine(linePoints, temp, distance)){
				result.add(h);
			}
		}

		return result;
	}

	/**
	 * 待测试哦
	 * @param polygonPoints
	 * @return
	 */
	@Override
	public List<HouseEntity> listByPolygon(List<LatLon> polygonPoints) {
		HouseEntity houseEntity = new HouseEntity();
		Map<String, Double> map = LatLonUtils.getBoundary(polygonPoints);

		//找出这个矩形边界内的房屋，减少数据量
		houseEntity.setXmax(map.get(LatLonUtils.MAX_LAT_KEY));
		houseEntity.setXmin(map.get(LatLonUtils.MIN_LAT_KEY));
		houseEntity.setXmax(map.get(LatLonUtils.MAX_LAT_KEY));
		houseEntity.setXmax(map.get(LatLonUtils.MAX_LAT_KEY));

		List<HouseEntity> houseEntities = this.page(houseEntity);
		List<HouseEntity> result = new LinkedList<>();
		//遍历房屋判断是否在多边形内
		LatLon temp = new LatLon();
		for (HouseEntity h : houseEntities){
			temp.setLat(h.getY());
			temp.setLon(h.getX());
			if (LatLonUtils.IsPointInPolygon(polygonPoints, temp)){
				result.add(h);
			}
		}

		return result;
	}

	@Override
	public List<PageData> listAll(HouseEntity house) throws Exception {

		return (List<PageData>)dao.findForList("HouseMapper.listAll", house);
	}

	@Override
	public HouseEntity insert(HouseEntity params) throws Exception{
		dao.save("HouseMapper.save", params);
		return params;
	}

	@Override
	public void update(HouseEntity params) {
		dao.updateOne("HouseMapper.update", params);
	}

    @Override
    public List<HouseEntity> page(HouseEntity params) {
        return dao.list("HouseMapper.page", params);
    }

    @Override
    public Integer count(HouseEntity params) {
        return dao.getOne("HouseMapper.count", params);
    }

    @Override
    public HouseEntity findById(HouseEntity house) throws Exception {
		HouseEntity houseEntity = (HouseEntity)dao.findForObject("HouseMapper.findById", house);
		if (houseEntity == null){
			return houseEntity;
		}
		HouseOwner houseOwner = new HouseOwner();
		houseOwner.setHouseCode(houseEntity.getBh());
		houseEntity.setHouseOwner(houseOwnerService.getOne(houseOwner));
        return houseEntity;
    }

	@Override
	public List<PageData> toExcel(HouseEntity params) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>)dao.findForList("HouseMapper.toExcel", params);
	}

	@Override
	@Transactional
	public void batchAdd(List<HouseEntity> params) throws Exception {
		for (HouseEntity house : params) {
			house.setZt(HouseConst.HOUSE_STATUS_UNDETERMINED);
			VillageEntity vParams = new VillageEntity();
			vParams.setCode(house.getVillageCode());
			house.setBh(villageService.getUniqueHouseNo(vParams));
			this.insert(house);
		}
	}


	@Override
	public  PageData getfile(PageData pd) throws Exception {
		// TODO Auto-generated method stub
		return (PageData)dao.findForObject("HouseMapper.listfile", pd);
	}

	
	//历史回溯搜索接口

	@Override
	public List<HouseEntity> pageHistory(HouseEntity params) {
		// TODO Auto-generated method stub
		  return dao.list("HouseMapper.pageHistory", params);
	}

	@Override
	public Integer countHistory(HouseEntity params) {
		// TODO Auto-generated method stub
		return dao.getOne("HouseMapper.countHistory", params);
	}
	//报表统计数目
	@Override
	public Integer countStatic(HouseEntity houseEntity) {
		// TODO Auto-generated method stub
		return dao.getOne("HouseMapper.countStatic", houseEntity);
	}

	@Override
	public Integer countIntegrative(HouseEntity houseEntity) {
		// TODO Auto-generated method stub
		return dao.getOne("HouseMapper.countIntegrative", houseEntity);
	}
	//属性更新
	@Override
	public void updateAttr(HouseEntity params) {
		dao.updateOne("HouseMapper.updateSxgx", params); 
		dao.updateOne("HouseMapper.updateOwner", params); 		
	}

}
