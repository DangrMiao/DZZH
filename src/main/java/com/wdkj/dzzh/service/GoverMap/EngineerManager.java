package com.wdkj.dzzh.service.GoverMap;

import java.util.List;

import com.wdkj.dzzh.entity.GoverMap.engineerproject;

public interface EngineerManager {
	List<engineerproject> list(engineerproject params) throws Exception;

	Integer countList(engineerproject params) throws Exception;

}
