package com.wdkj.wf.house.entity;

import com.wf.common.latLon.LatLon;

import java.util.List;

/**所属街道分类
 * @author 1
 *
 */
public class StreetEntity {
	public static final String NAME_SPACE = "StreetMapper";
	private Integer id;
	private String name;
	private String areacode;
	private Integer maxrecord;
	private String boundaryPoints; //街道乡镇的边界点
	private List<LatLon> points;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAreacode() {
		return areacode;
	}

	public void setAreacode(String areacode) {
		this.areacode = areacode;
	}

	public Integer getMaxrecord() {
		return maxrecord;
	}

	public void setMaxrecord(Integer maxrecord) {
		this.maxrecord = maxrecord;
	}

	public String getBoundaryPoints() {
		return boundaryPoints;
	}

	public void setBoundaryPoints(String boundaryPoints) {
		this.boundaryPoints = boundaryPoints;
	}

	public List<LatLon> getPoints() {
		return points;
	}

	public void setPoints(List<LatLon> points) {
		this.points = points;
	}
}
