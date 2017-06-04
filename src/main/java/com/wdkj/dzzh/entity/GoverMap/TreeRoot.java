package com.wdkj.dzzh.entity.GoverMap;

import java.util.ArrayList;

public class TreeRoot {
	int id;
	String type;//�ļ�����
	String text;
	ArrayList<String> tags;
	String realname;
	String location;
	String virtuallocation;
	String govertype;
	int goverid;
	boolean iscategory;//�Ƿ��Ǹ��ڵ�
	ArrayList<TreeRoot> nodes;
	ArrayList<TreeRoot> files;
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
	
	
	

	public ArrayList<String> getTags() {
		return tags;
	}
	public void setTags(ArrayList<String> tags) {
		this.tags = tags;
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
	public boolean isIscategory() {
		return iscategory;
	}
	public void setIscategory(boolean iscategory) {
		this.iscategory = iscategory;
	}
	public ArrayList<TreeRoot> getNodes() {
		return nodes;
	}
	public void setNodes(ArrayList<TreeRoot> nodes) {
		this.nodes = nodes;
	}
	public ArrayList<TreeRoot> getFiles() {
		return files;
	}
	public void setFiles(ArrayList<TreeRoot> files) {
		this.files = files;
	}



}
