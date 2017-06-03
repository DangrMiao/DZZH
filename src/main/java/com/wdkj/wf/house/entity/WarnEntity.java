package com.wdkj.wf.house.entity;


import com.weidekeji.common.entity.PagedEntity;

public class WarnEntity extends PagedEntity {

    public static final Integer THRESHOLD_TYPE_SLIP = 1; //滑移
    public static final Integer THRESHOLD_TYPE_SETTLEMENT = 0; //沉降

    private Integer id;
    private Double thresholdvalue;
    private String type;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getThresholdvalue() {
        return thresholdvalue;
    }

    public void setThresholdvalue(Double thresholdvalue) {
        this.thresholdvalue = thresholdvalue;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

}
