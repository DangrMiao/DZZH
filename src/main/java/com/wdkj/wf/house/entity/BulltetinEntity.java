package com.wdkj.wf.house.entity;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

/**
 * 公告表
 * 
 * @author 1
 *
 */
public class BulltetinEntity {
	private Integer bid;
	private String uid;
	private Date fbtime;

	private String release_name;
	private String title;
	private String depart_id;
	
	public String getDepart_id() {
		return depart_id;
	}

	public void setDepart_id(String depart_id) {
		this.depart_id = depart_id;
	}
	private String fblr;
	private String name;
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFblr() {
		return fblr;
	}

	public void setFblr(String fblr) {
		this.fblr = fblr;
	}
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getFbtime() {
		return fbtime;
	}

	public void setFbtime(Date fbtime) {
		this.fbtime = fbtime;
	}
	public String getRelease_name() {
		return release_name;
	}
	public void setRelease_name(String release_name) {
		this.release_name = release_name;
	}
	public Integer getBid() {
		return bid;
	}

	public void setBid(Integer bid) {
		this.bid = bid;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
}
