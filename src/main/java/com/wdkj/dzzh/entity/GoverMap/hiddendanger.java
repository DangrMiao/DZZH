package com.wdkj.dzzh.entity.GoverMap;

import java.io.Serializable;
import java.util.Date;

import com.weidekeji.common.entity.PagedEntity;

public class  hiddendanger extends PagedEntity implements Serializable{
	
	public int id;////////////////
	public String name;///////////////
	public String coordinate;
	private double xcoordinate;
	private double ycoordinate;
	public String location;///////////////////
	public String governancetype;/////////////////
	public int governancetypeid;
	public int getGovernancetypeid() {
		return governancetypeid;
	}
	public void setGovernancetypeid(int governancetypeid) {
		this.governancetypeid = governancetypeid;
	}
	public String thisstage;//////////////////
	public int completion;///////////////////
	public Date plancompletiontime;
	public String  strplancompletiontime;///////////
	public String  type;
	
	public String  x;
	public String  y;
	public String  govertype;///////////////////
	public String  scale;////////////////////
	public String  scalegrad;/////////////////////
	public String  district;////////////////////
	public String  Township;////////////////////////
	
	
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	public String getTownship() {
		return Township;
	}
	public void setTownship(String township) {
		Township = township;
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
	public String getGovertype() {
		return govertype;
	}
	public void setGovertype(String govertype) {
		this.govertype = govertype;
	}
	public String getScale() {
		return scale;
	}
	public void setScale(String scale) {
		this.scale = scale;
	}
	public String getScalegrad() {
		return scalegrad;
	}
	public void setScalegrad(String scalegrad) {
		this.scalegrad = scalegrad;
	}
	public String getStrplancompletiontime() {
		return strplancompletiontime;
	}
	public void setStrplancompletiontime(String strplancompletiontime) {
		this.strplancompletiontime = strplancompletiontime;
	}
	public int color;
	public int page;
	
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getColor() {
		return color;
	}
	public void setColor(int color) {
		this.color = color;
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
	public String getCoordinate() {
		return coordinate;
	}
	public void setCoordinate(String coordinate) {
		this.coordinate = coordinate;
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
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getGovernancetype() {
		return governancetype;
	}
	public void setGovernancetype(String governancetype) {
		this.governancetype = governancetype;
	}
	public String getThisstage() {
		return thisstage;
	}
	public void setThisstage(String thisstage) {
		this.thisstage = thisstage;
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
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

}
