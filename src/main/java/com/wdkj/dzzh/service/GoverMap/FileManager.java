package com.wdkj.dzzh.service.GoverMap;

import java.util.ArrayList;
import java.util.List;

import com.wdkj.dzzh.entity.GoverMap.TreeRoot;
import com.wdkj.dzzh.entity.GoverMap.file;

public interface FileManager {
	public boolean F_add_file(file f);
	List<TreeRoot> F_list_by_goverid(file f);
	public void deletelist(ArrayList<Integer> nodeids) ;
}
