package com.weidekeji.common.util;

import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;

/**
 * 
 * 
 * @author Administrator
 */
public class JSONUtil {
	
	private static final SerializerFeature[] features = {
			SerializerFeature.SkipTransientField,// 过滤transient字段
            SerializerFeature.WriteDateUseDateFormat,// 使用日期格式化
  		    SerializerFeature.WriteMapNullValue, // 输出空置字段
			SerializerFeature.WriteNullListAsEmpty, // list字段如果为null，输出为[]，而不是null
			SerializerFeature.WriteNullBooleanAsFalse, // Boolean字段如果为null，输出为false，而不是null
			SerializerFeature.WriteNullStringAsEmpty // 字符类型字段如果为null，输出为""，而不是null
			
	};
	
	public static String JsonString(Object object) {
		JSON.DEFFAULT_DATE_FORMAT = "yyyy-MM-dd";
		return JSONObject.toJSONString(object,
				SerializerFeature.SkipTransientField,// 过滤transient字段
	            SerializerFeature.WriteDateUseDateFormat,// 使用日期格式化
	  		    SerializerFeature.WriteMapNullValue, // 输出空置字段
				SerializerFeature.WriteNullListAsEmpty, // list字段如果为null，输出为[]，而不是null
				SerializerFeature.WriteNullBooleanAsFalse, // Boolean字段如果为null，输出为false，而不是null
				SerializerFeature.WriteNullStringAsEmpty);// 字符类型字段如果为null，输出为""，而不是null );
	}
	/**
	 *zhege you went 
	 * @param object
	 * @return
	 */
	public static String toJsonString(Object object) {
		return JSONObject.toJSONString(object, features);
	}

	public static String toJsonpString(Object obj, String callback) {
		return callback + "(" + toJsonString(obj) + ")";
	}

	public static Object parseObjectOrArray(String json, Class<?> clazz) {
		Object o = JSON.parse(json);
		if (o instanceof JSONArray) {
			o = JSONObject.parseArray(json, clazz);
		} else {
			o = JSONObject.parseObject(json, clazz);
		}
		return o;
	}

	public static <T> T parseObject(String json, Class<T> clazz) {
		return JSONObject.parseObject(json, clazz);
	}

	public static <T> List<T> parseArray(String json, Class<T> clazz) {
		return JSONObject.parseArray(json, clazz);
	}

	/**
	 * 该方法在某些特殊场景使用，如果要转数组，可以使用parseArray方法
	 * 
	 * @param json
	 * @return
	 */
	public static Object[] parseObjectArray(String json) {
		List<Object> list = JSONObject.parseArray(json, Object.class);
		return list.toArray();
	}
}
