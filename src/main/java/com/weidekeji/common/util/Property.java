package com.weidekeji.common.util;

/**
 * 读配置文件的工具类，在bean中init了才能用
 * 
 * @author Tianwenjian
 * 
 */
public class Property {
	
	private static java.util.Properties property;

	private Property() {
	}

	static void init(java.util.Properties props) {
		property = props;
	}

	public static String getProperty(String key) {
		return property.getProperty(key);
	}

	public String getProperty(String key, String defaultValue) {
		return property.getProperty(key, defaultValue);

	}
}
