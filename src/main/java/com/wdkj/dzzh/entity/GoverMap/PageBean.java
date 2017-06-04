package com.wdkj.dzzh.entity.GoverMap;
import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PageBean implements Serializable{

	private static final long serialVersionUID = 1L;
	private int page;
	private int rows;
	private String sidx = null;//����
	private String sord = null;
    private int begin;//��ʼ��¼��
    private int end;  //������¼��
    private boolean  havenest;  //������¼��
	private String name ;
	private String goveertype ;
	
	public String getGoveertype() {
		return goveertype;
	}

	public void setGoveertype(String goveertype) {
		this.goveertype = goveertype;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isHavenest() {
		return havenest;
	}

	public void setHavenest(boolean havenest) {
		this.havenest = havenest;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public String getSidx() {
		return sidx;
	}

	public void setSidx(String sidx) {
		this.sidx = sidx;
	}

	public String getSord() {
		return sord;
	}

	public void setSord(String sord) {
		this.sord = sord;
	}
	public int getBegin() {
		return begin;
	}

	public void setBegin(int begin) {
		this.begin = begin;
	}
	public int getEnd() {
		return end;
	}

	public void setEnd(int end) {
		this.end = end;
	}
}
