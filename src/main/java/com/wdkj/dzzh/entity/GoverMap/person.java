package com.wdkj.dzzh.entity.GoverMap;

import java.io.Serializable;
import java.util.Date;

import com.weidekeji.common.entity.PagedEntity;

public class person extends PagedEntity implements Serializable{
	
	public int id;
	public String name;
	public int family;
	public int relocate_flag;
	public String relocate_time;
	public int project_id;
	public String type;
	public int level;
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
	public int getRelocate_flag() {
		return relocate_flag;
	}
	public void setRelocate_flag(int relocate_flag) {
		this.relocate_flag = relocate_flag;
	}
	public String getRelocate_time() {
		return relocate_time;
	}
	public void setRelocate_time(String relocate_time) {
		this.relocate_time = relocate_time;
	}
	public int getProject_id() {
		return project_id;
	}
	public void setProject_id(int project_id) {
		this.project_id = project_id;
	}
	public int getFamily() {
		return family;
	}
	public void setFamily(int family) {
		this.family = family;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	
}
