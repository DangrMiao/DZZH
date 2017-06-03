package com.wdkj.wf.service.directory;

import java.util.List;

import com.fh.util.PageData;
import com.wdkj.wf.house.entity.BulltetinEntity;
import com.wdkj.wf.house.entity.LocationEntity;

public interface DirectoryManager {
	List<PageData> listAll(BulltetinEntity content) throws Exception;
	List<PageData> listLocation(LocationEntity location) throws Exception;

}
