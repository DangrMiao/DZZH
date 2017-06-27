package com.wdkj.dzzh.entity.GoverMap;

import java.io.Serializable;
import java.util.Date;

import com.weidekeji.common.entity.PagedEntity;

public class relocationProject extends PagedEntity implements Serializable{
	
	public int id;
	public String name;
	public int progress;
	public int progress2;
	public String basicInfo;//�������
	public String governanceInfo;//�������
	public String remark;//��Ŀ��ע
	public int headcount;
	public String create_time;
	public String type;
	public int hiddendanger_id;
	public String hiddendanger_name;
	public String  x;
	public String  y;
	private double xcoordinate;
	private double ycoordinate;
	public Date plancompletiontime;
	public int completion;
	public int color;
	public int Handle;
	public int getHandle() {
		return Handle;
	}
	public void setHandle(int handle) {
		Handle = handle;
	}
	public int getColor() {
		return color;
	}
	public void setColor(int color) {
		this.color = color;
	}
	public int getCompletion() {
		return completion;
	}
	public void setCompletion(int completion) {
		this.completion = completion;
	}
	public Date getPlancompletiontime() {
		return plancompletiontime;
	}
	public void setPlancompletiontime(Date plancompletiontime) {
		this.plancompletiontime = plancompletiontime;
	}
	public double getXcoordinate() {
		return xcoordinate;
	}
	public void setXcoordinate(double xcoordinate) {
		this.xcoordinate = xcoordinate;
	}
	public double getYcoordinate() {
		return ycoordinate;
	}
	public void setYcoordinate(double ycoordinate) {
		this.ycoordinate = ycoordinate;
	}
	public String getX() {
		return x;
	}
	public void setX(String x) {
		this.x = x;
	}
	public String getY() {
		return y;
	}
	public void setY(String y) {
		this.y = y;
	}
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
	public int getProgress2() {
		return progress2;
	}
	public void setProgress2(int progress2) {
		this.progress2 = progress2;
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
