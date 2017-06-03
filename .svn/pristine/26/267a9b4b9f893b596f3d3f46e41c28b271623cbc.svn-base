package com.weidekeji.common.json;

/**
 * 返回json封装对象<br>
 * 如果失败code = -1 ,如果成功 code = 1，特殊情况请自己定义返回码<br >
 * 如果错误信息，code小于0<br >
 * 如果成功信息，code大于0
 */
public class JsonResult {
	protected Integer code;
	protected String message;
	protected Object rows;

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getRows() {
		return rows;
	}

	public void setRows(Object rows) {
		this.rows = rows;
	}

	public JsonResult() {
		this.code = 0;
		this.message = null;
		this.rows = null;
	}

	public JsonResult(Integer code, String message, Object rows) {
		this.code = code;
		this.message = message;
		this.rows = rows;
	}
}
