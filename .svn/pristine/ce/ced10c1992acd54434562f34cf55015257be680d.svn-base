package com.wdkj.wf.house.entity;

import java.io.Serializable;
import java.util.List;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageInfo;
public class BaseEntity<T> implements Serializable {
	/**
	 * 分页工具类
	 */
	private static final long serialVersionUID = 1L;
	//总记录数
	private int count;
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	private T baseEntity;
	//当前页数
	private int pageNum;
	//总页数
	private int pages;
	
	public int getPages() {
		return pages;
	}

	public void setPages(int pages) {
		this.pages = pages;
	}

	public int getPageNum() {
		return pageNum;
	}

	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}

	public BaseEntity(){
		
	}
	
	public BaseEntity(List<T> list){
		if (list instanceof Page) {
            Page page = (Page) list;
            this.baseEntity = (T) page;
            this.count = (int) page.getTotal();
            this.pageNum=page.getPageNum();
            this.pages=page.getPages();
		}
	}
	

	public T getBaseEntity() {
		return baseEntity;
	}

	public void setBaseEntity(T baseEntity) {
		this.baseEntity = baseEntity;
	}

	
	
	
	
}
