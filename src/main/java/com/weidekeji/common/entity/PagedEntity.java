package com.weidekeji.common.entity;

/**
 * 分页实体，统一封装
 * @author tianwenjian
 * @create 2017-04-19 14:23
 **/
public class PagedEntity {
    private transient Integer pageNo; //页号
    private transient Integer rows;   //行数
    private transient Integer start;  //起始位置

    public Integer getPageNo() {
        return pageNo;
    }

    public void setPageNo(Integer pageNo) {
        this.pageNo = pageNo;
    }

    public Integer getRows() {
        return rows;
    }

    public void setRows(Integer rows) {
        this.rows = rows;
    }

    public Integer getStart() {
        return start;
    }

    public void setStart(Integer start) {
        this.start = start;
    }
}
