package com.weidekeji.common.json;

/**
 * 支持分页的数据
 * 
 * @author Tianwenjian
 * 
 */
public class PagedJsonResult extends JsonResult {
	protected Integer total;
	protected Integer pageSize;
	protected Integer pageCount;

	protected Object footer;

	public PagedJsonResult(Object rows, Integer code, String message,
			Integer total, Integer pageSize) {
		this.rows = rows;
		this.code = code;
		this.message = message;
		this.total = total;
		this.pageSize = pageSize;

		if (pageSize == null || pageSize.intValue() == 0) {
			this.pageSize = Integer.MAX_VALUE;
		}

		int totalPage = total / this.pageSize;
		if (total % this.pageSize != 0) {
			totalPage++;
		}
		if (totalPage == 0)
			totalPage = 1;
		this.pageCount = totalPage;
	}

	public PagedJsonResult(Object rows, Integer error, String message, Integer total, Integer pageSize, Object footer) {
		this.rows = rows;
		this.code = error;
		this.message = message;
		this.total = total;
		this.pageSize = pageSize;
		this.footer = footer;

		if (pageSize == null || pageSize.intValue() == 0) {
			this.pageSize = Integer.MAX_VALUE;
		}

		int totalPage = total / this.pageSize;
		if (total % this.pageSize != 0) {
			totalPage++;
		}
		if (totalPage == 0)
			totalPage = 1;
		this.pageCount = totalPage;
	}

	public Object getFooter() {
		return footer;
	}

	public void setFooter(Object footer) {
		this.footer = footer;
	}

	public Integer getTotal() {
		return total;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public void setRows(Integer rows) {
		this.rows = rows;
	}

	public Integer getPageCount() {
		return pageCount;
	}

	public void setPageCount(Integer pageCount) {
		this.pageCount = pageCount;
	}
}
