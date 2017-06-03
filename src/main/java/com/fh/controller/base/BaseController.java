package com.fh.controller.base;

import javax.servlet.http.HttpServletRequest;
import javax.swing.*;

import com.wf.common.MyStringUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import com.fh.entity.Page;
import com.fh.util.Logger;
import com.fh.util.PageData;
import com.fh.util.UuidUtil;

import java.beans.PropertyEditorSupport;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author FH Q313596790 修改时间：2015、12、11
 */
public class BaseController {

	protected Log logger = LogFactory.getLog(this.getClass());

	private static final long serialVersionUID = 6357869213649815390L;

	/**
	 * new PageData对象
	 * 
	 * @return
	 */
	public PageData getPageData() {
		return new PageData(this.getRequest());
	}

	/**
	 * 得到ModelAndView
	 * 
	 * @return
	 */
	public ModelAndView getModelAndView() {
		return new ModelAndView();
	}

	/**
	 * 得到request对象
	 * 
	 * @return
	 */
	public HttpServletRequest getRequest() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
				.getRequest();
		return request;
	}

	/**
	 * 得到32位的uuid
	 * 
	 * @return
	 */
	public String get32UUID() {
		return UuidUtil.get32UUID();
	}

	/**
	 * 得到分页列表的信息
	 * 
	 * @return
	 */
	public Page getPage() {
		return new Page();
	}

	/**
	 * 请直接使用logger.debug 或者 logger.info logger.error，不要用这玩意儿，蓝看不说，完全没必要
	 * 
	 * @param logger
	 * @param interfaceName
	 */
	@Deprecated
	public static void logBefore(Log logger, String interfaceName) {
		logger.info("");
		logger.info("start");
		logger.info(interfaceName);
	}

	public static void logAfter(Log logger) {
		logger.info("end");
		logger.info("");
	}

	/**
	 * 获取服务器的网络路径
	 * 
	 * @return
	 */
	protected String getServerPath() {
		HttpServletRequest request = getRequest();
		String path = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
				+ request.getContextPath() + "/";
		return path;
	}

	/**
	 * 获取系统当前时间
	 * 
	 * @return
	 */
	protected String getNowTime() {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmssS");
		String time = simpleDateFormat.format(new Date());
		return time;
	}

	protected Date getDate() throws ParseException {
		Date date=new Date();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		date= sdf.parse(sdf.format(new Date()));
		return date;
	}

	@InitBinder
	protected void initBinder(HttpServletRequest request, ServletRequestDataBinder binder) throws Exception {
		// 对于需要转换为Date类型的属性，使用DateEditor进行处理
		binder.registerCustomEditor(Date.class, new DateEditor());
	}
}

/**
 * 日期绑定器
 */
class DateEditor extends PropertyEditorSupport {

	private static final DateFormat DATEFORMAT = new SimpleDateFormat("yyyy-MM-dd");
	private static final DateFormat TIMEFORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	private DateFormat dateFormat;
	private boolean allowEmpty = true;

	public DateEditor() {
	}

	public DateEditor(DateFormat dateFormat) {
		this.dateFormat = dateFormat;
	}

	public DateEditor(DateFormat dateFormat, boolean allowEmpty) {
		this.dateFormat = dateFormat;
		this.allowEmpty = allowEmpty;
	}

	/**
	 * Parse the Date from the given text, using the specified DateFormat.
	 */
	@Override
	public void setAsText(String text) throws IllegalArgumentException {
		if (this.allowEmpty && StringUtils.isBlank(text)) {
			// Treat empty String as null value.
			setValue(null);
		} else {
			try {
				if (this.dateFormat != null)
					setValue(this.dateFormat.parse(text));
				else {
					if (text.contains(":"))
						setValue(TIMEFORMAT.parse(text));
					else
						setValue(DATEFORMAT.parse(text));
				}
			} catch (ParseException ex) {
				throw new IllegalArgumentException("Could not parse date: " + ex.getMessage(), ex);
			}
		}
	}

	/**
	 * Format the Date as String, using the specified DateFormat.
	 */
	@Override
	public String getAsText() {
		Date value = (Date) getValue();
		DateFormat dateFormat = this.dateFormat;
		if (dateFormat == null)
			dateFormat = TIMEFORMAT;
		return (value != null ? dateFormat.format(value) : "");
	}
}
