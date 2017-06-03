package com.weidekeji.common.util;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

public class MyStringUtils {

	/**
	 * 获取异常信息
	 * 
	 * @param t
	 * @return
	 *
	 */
	public static String getExceptionInfo(Throwable t) {
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw, true);
		t.printStackTrace(pw);
		pw.flush();
		sw.flush();
		String s = sw.toString();
		try {
			sw.close();
			pw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return s;
	}

	/**
	 * 判断是否空字串
	 * 
	 * @param s
	 * @return
	 *
	 */
	public static boolean isNotNullOrEmpty(String s) {
		if (s == null || s.equals("")) {
			return false;
		}
		return true;
	}

	/**
	 * 按截取字符串来获取整形链表
	 * 
	 * @param str
	 * @return
	 *
	 */
	public static List<Integer> getIntListFormStr(String str, String separator) {
		if (!MyStringUtils.isNotNullOrEmpty(str)) {
			return null;
		}

		List<Integer> list = new ArrayList<Integer>();

		String[] arr = str.split(separator);

		for (String s : arr) {
			list.add(Integer.valueOf(s.trim()));
		}

		return list;
	}
}
