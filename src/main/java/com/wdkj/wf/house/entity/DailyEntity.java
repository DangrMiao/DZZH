package com.wdkj.wf.house.entity;

import org.apache.james.mime4j.field.datetime.DateTime;

/**日报工具类
 * @author 1
 *
 */
public class DailyEntity {
private Integer id;
private String title;
private String content;
private DateTime creattime;
private String user_id;
public Integer getId() {
	return id;
}
public void setId(Integer id) {
	this.id = id;
}
public String getTitle() {
	return title;
}
public void setTitle(String title) {
	this.title = title;
}
public String getContent() {
	return content;
}
public void setContent(String content) {
	this.content = content;
}
public DateTime getCreattime() {
	return creattime;
}
public void setCreattime(DateTime creattime) {
	this.creattime = creattime;
}
public String getUser_id() {
	return user_id;
}
public void setUser_id(String user_id) {
	this.user_id = user_id;
}

}
