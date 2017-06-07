package com.wdkj.dzzh.service.GoverMap;

import java.util.List;

import com.wdkj.dzzh.entity.GoverMap.hiddendanger;
import com.wdkj.dzzh.entity.GoverMap.person;

public interface MapManager {

	List<hiddendanger> list(hiddendanger params) throws Exception;

	Integer countList(hiddendanger params) throws Exception;

	List<hiddendanger> listSearch(hiddendanger params) throws Exception;

	void updateMap(hiddendanger params) throws Exception;

}
