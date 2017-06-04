package com.wdkj.dzzh.service.GoverMap;

import java.util.List;

import com.wdkj.dzzh.entity.GoverMap.engineerproject;
import com.wdkj.dzzh.entity.GoverMap.hiddendanger;
import com.wdkj.dzzh.entity.GoverMap.person;
import com.wdkj.dzzh.entity.GoverMap.relocationProject;

public interface PersonManager {
	List<person> list(relocationProject params) throws Exception;

	Integer countList(relocationProject params) throws Exception;
	
	void addPerson(person params) throws Exception;

}
