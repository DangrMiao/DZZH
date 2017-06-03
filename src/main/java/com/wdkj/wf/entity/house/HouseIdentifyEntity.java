package com.wdkj.wf.entity.house;

import java.util.Date;

/**
 * @author tianwenjian
 * @create 2017-05-08 14:53
 **/
public class HouseIdentifyEntity {
    public static String NAME_SPACE = "HouseIdentificationMapper";

    private Integer id;
    private String company; //鉴定机构
    private String identifier; // 鉴定人
    private String level; //鉴定等级 危险等级
    private Date date;    //鉴定时间
    private String houseCode;   //房屋编号
    private String file;
    private String photos;
    private Integer type;

    public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}
	public String getFile() {
		return file;
	}

 
 

	public void setFile(String file) {
		this.file = file;
	}

	public String getPhotos() {
		return photos;
	}

	public void setPhotos(String photos) {
		this.photos = photos;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getHouseCode() {
        return houseCode;
    }

    public void setHouseCode(String houseCode) {
        this.houseCode = houseCode;
    }
}
