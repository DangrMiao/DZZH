package com.wdkj.wf.service.GoverMap.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.wdkj.dzzh.entity.GoverMap.TreeRoot;
import com.wdkj.dzzh.entity.GoverMap.file;
import com.wdkj.dzzh.entity.GoverMap.hiddendanger;
import com.wdkj.dzzh.service.GoverMap.FileManager;

@Service("FileService")
@SuppressWarnings("all")
public class FileService  implements FileManager{

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	@Override
	public boolean F_add_file(file f) {
		dao.insert("FileDao.add_f", f);
		return true;
	}

	@Override
	public List<TreeRoot> F_list_by_goverid(file f) throws Exception {
		List<TreeRoot> datalist= (List<TreeRoot> )dao.findForList("FileDao.filelist", f);
		return datalist;
	}

	@Override
	public void deletelist(ArrayList<Integer> list) throws Exception {
		dao.delete("FileDao.deletelist", list);
		
	}

}
