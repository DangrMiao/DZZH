package com.wdkj.dzzh.service.GoverMap;

import java.util.List;

import com.wdkj.dzzh.entity.GoverMap.hiddendanger;

public interface MapManager {

	List<hiddendanger> list(hiddendanger params) throws Exception;

	Integer countList(hiddendanger params) throws Exception;

}
