package com.wdkj.wf.entity.monitor;

import java.io.Serializable;
import java.util.Date;

import com.weidekeji.common.entity.PagedEntity;

/**
 * 沉降观测记录
 * @author tianwenjian
 * @create 2017-04-17 14:17
 **/
public class SettlementObHistory extends PagedEntity implements Serializable{

    public static String NAME_SPACE = "SettlementHistoryMapper";

    private Integer id;
    private Integer pointId;
    private Double positionX;
    private Double positionY;
    private Double elevation;   //高程
    private String userId;
    private Date recordTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPointId() {
        return pointId;
    }

    public void setPointId(Integer pointId) {
        this.pointId = pointId;
    }

    public Double getPositionX() {
        return positionX;
    }

    public void setPositionX(Double positionX) {
        this.positionX = positionX;
    }

    public Double getPositionY() {
        return positionY;
    }

    public void setPositionY(Double positionY) {
        this.positionY = positionY;
    }

    public Double getElevation() {
        return elevation;
    }

    public void setElevation(Double elevation) {
        this.elevation = elevation;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Date getRecordTime() {
        return recordTime;
    }

    public void setRecordTime(Date recordTime) {
        this.recordTime = recordTime;
    }
}
