package com.wdkj.dzzh.service.GoverMap;

import java.util.List;

import com.wdkj.dzzh.entity.GoverMap.hiddendanger;
import com.wdkj.dzzh.entity.GoverMap.relocationProject;

public interface RelocationManager {
	List<relocationProject> list(relocationProject params) throws Exception;

	Integer countList(relocationProject params) throws Exception;
	
	void addRelocation(relocationProject params) throws Exception;
	
	void updatehdgovertype(hiddendanger h) throws Exception;

	void updateRelocation(relocationProject params) throws Exception;

	List<relocationProject> listRelocation(relocationProject params) throws Exception;
}
