package com.wdkj.dzzh.entity.GoverMap;

import java.util.ArrayList;

public class file {
	int id;
	String type;//�ļ�����
	String text;
	String realname;
	String location;
	String virtuallocation;
	String govertype;
	int goverid;
	int goverstage;
	
	
	boolean iscategory;//�Ƿ��Ǹ��ڵ�
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getRealname() {
		return realname;
	}
	public void setRealname(String realname) {
		this.realname = realname;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getVirtuallocation() {
		return virtuallocation;
	}
	public void setVirtuallocation(String virtuallocation) {
		this.virtuallocation = virtuallocation;
	}
	
	public String getGovertype() {
		return govertype;
	}
	public void setGovertype(String govertype) {
		this.govertype = govertype;
	}
	public int getGoverid() {
		return goverid;
	}
	public void setGoverid(int goverid) {
		this.goverid = goverid;
	}
	
	
	
	public int getGoverstage() {
		return goverstage;
	}
	public void setGoverstage(int goverstage) {
		this.goverstage = goverstage;
	}
	public boolean isIscategory() {
		return iscategory;
	}
	public void setIscategory(boolean iscategory) {
		this.iscategory = iscategory;
	}



}
