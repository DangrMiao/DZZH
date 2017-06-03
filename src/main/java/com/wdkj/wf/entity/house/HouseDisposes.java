package com.wdkj.wf.entity.house;

import java.util.Date;
import java.util.List;

/**房屋处置
 * @author tianwenjian
 * @create 2017-05-09 15:53
 **/
public class HouseDisposes {

    public static String NAME_SPACE = "HouseDisposesMapper";

    private Integer id;
    private String file;
    private Date dismantleTime;   //拆除时间
    private Date reformTime;  //改造时间
    private Date completeTime;  //验收时间
    private String reformType; //改造类型
    private String houseCode;   //房屋编号

    public Date getReformTime() {
        return reformTime;
    }

    public void setReformTime(Date reformTime) {
        this.reformTime = reformTime;
    }

    public Date getCompleteTime() {
        return completeTime;
    }

    public void setCompleteTime(Date completeTime) {
        this.completeTime = completeTime;
    }

    public String getReformType() {
        return reformType;
    }

    public void setReformType(String reformType) {
        this.reformType = reformType;
    }

    public String getHouseCode() {
        return houseCode;
    }

    public void setHouseCode(String houseCode) {
        this.houseCode = houseCode;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public Date getDismantleTime() {
        return dismantleTime;
    }

    public void setDismantleTime(Date dismantleTime) {
        this.dismantleTime = dismantleTime;
    }
}
