package com.wdkj.wf.entity.monitor;

import java.io.Serializable;

import com.weidekeji.common.entity.PagedEntity;

/**
 * 沉降观测点
 * @author tianwenjian
 * @create 2017-04-17 14:02
 **/
public class SettlementObPoint extends PagedEntity implements Serializable{

    public static String NAME_SPACE = "SettlementPointMapper";

    public static final Integer STATUS_NORMAL = 0;
    public static final Integer STATUS_DANGER = 0;

    private Integer id;
    private Integer houseId;
    private String name;
    private Double slipSpeed;
    private Double sedimentationSpeed;
    private Integer status;

    public Integer getHouseId() {
        return houseId;
    }

    public void setHouseId(Integer houseId) {
        this.houseId = houseId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getSlipSpeed() {
        return slipSpeed;
    }

    public void setSlipSpeed(Double slipSpeed) {
        this.slipSpeed = slipSpeed;
    }

    public Double getSedimentationSpeed() {
        return sedimentationSpeed;
    }

    public void setSedimentationSpeed(Double sedimentationSpeed) {
        this.sedimentationSpeed = sedimentationSpeed;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
