package com.wdkj.dzzh.entity.GoverMap;

import java.io.Serializable;

import com.weidekeji.common.entity.PagedEntity;

public class engineerproject extends PagedEntity implements Serializable{

	public int id;
	public String name;
	public int progress;
	public String basicInfo;
	public String governanceInfo;
	public String remark;
	public int headcount;
	public String create_time;
	public String type;
	public int hiddendanger_id;
	public String hiddendanger_name;
	
	public String getHiddendanger_name() {
		return hiddendanger_name;
	}
	public void setHiddendanger_name(String hiddendanger_name) {
		this.hiddendanger_name = hiddendanger_name;
	}
	public int getHiddendanger_id() {
		return hiddendanger_id;
	}
	public void setHiddendanger_id(int hiddendanger_id) {
		this.hiddendanger_id = hiddendanger_id;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getProgress() {
		return progress;
	}
	public void setProgress(int progress) {
		this.progress = progress;
	}
	public String getBasicInfo() {
		return basicInfo;
	}
	public void setBasicInfo(String basicInfo) {
		this.basicInfo = basicInfo;
	}
	public String getGovernanceInfo() {
		return governanceInfo;
	}
	public void setGovernanceInfo(String governanceInfo) {
		this.governanceInfo = governanceInfo;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public int getHeadcount() {
		return headcount;
	}
	public void setHeadcount(int headcount) {
		this.headcount = headcount;
	}
	public String getCreate_time() {
		return create_time;
	}
	public void setCreate_time(String create_time) {
		this.create_time = create_time;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
}