package com.wdkj.wf.house.entity;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

/**
 * 任务实体类
 * 
 * @author 1
 *
 */
public class TaskEntity {

	public String getSname() {
		return sname;
	}

	public void setSname(String sname) {
		this.sname = sname;
	}

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}
    private String num;
	public String getNum() {
		return num;
	}

	public void setNum(String num) {
		this.num = num;
	}
	private Integer id;
	private String content;
	private Integer type;
	private String target;
	private Integer status;
	private String creator_id;
	private String name;
	private String sharer_id;
	private String sname;
	private String performer_id;
	private String pname;
	private Integer time_id;
	private String user_id;
	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public Integer getTime_id() {
		return time_id;
	}

	public void setTime_id(Integer time_id) {
		this.time_id = time_id;
	}

	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date starttime;
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date endtime;
	private Date overtime;
	public Date getOvertime() {
		return overtime;
	}

	public void setOvertime(Date overtime) {
		this.overtime = overtime;
	}

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getStarttime() {
		return starttime;
	}

	public Date getEndtime() {
		return endtime;
	}

	public void setStarttime(Date starttime) {
		this.starttime = starttime;
	}

	public void setEndtime(Date endtime) {
		this.endtime = endtime;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getCreator_id() {
		return creator_id;
	}

	public void setCreator_id(String creator_id) {
		this.creator_id = creator_id;
	}

	public String getSharer_id() {
		return sharer_id;
	}

	public void setSharer_id(String sharer_id) {
		this.sharer_id = sharer_id;
	}

	public String getPerformer_id() {
		return performer_id;
	}

	public void setPerformer_id(String performer_id) {
		this.performer_id = performer_id;
	}

}
