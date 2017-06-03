package com.weidekeji.common.util;

import java.util.Calendar;
import java.util.Date;

/**
 * 时间工具类
 *
 * @author tianwenjain
 */
public class DateUtils {

    /**
     * 获取上一年
     *
     * @param date
     * @return
     */
    public Date getLastYear(Date date) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        int year = c.get(Calendar.YEAR);
        year--;
        c.set(Calendar.YEAR, year);
        return c.getTime();
    }

    /**
     * 获取年份 返回整形
     *
     * @return
     */
    public static Integer getCurrYear() {
        Calendar c = Calendar.getInstance();
        return c.get(Calendar.YEAR);
    }

    /**
     * 获取当前月份
     *
     * @return
     */
    public static Integer getCurrMonth() {
        Calendar c = Calendar.getInstance();
        return c.get(Calendar.MONTH) + 1; // 月份徐嘉怡
    }

    /**
     * 获取月份差,返回的Double
     *
     * @param a
     * @param b
     * @return
     */
    public static Double getMonthDiff(Date a, Date b) {
        return getDayDiff(a, b) / 30D;
    }

    /**
     * 获取天数差
     *
     * @param a
     * @param b
     * @return
     */
    public static Integer getDayDiff(Date a, Date b) {

        //比较一下
        if (a.compareTo(b) > 0){
            Date temp = a;
            a = b;
            b = temp;
        }

        Calendar cal1 = Calendar.getInstance();
        cal1.setTime(a);

        Calendar cal2 = Calendar.getInstance();
        cal2.setTime(b);
        int day1 = cal1.get(Calendar.DAY_OF_YEAR);
        int day2 = cal2.get(Calendar.DAY_OF_YEAR);

        int year1 = cal1.get(Calendar.YEAR);
        int year2 = cal2.get(Calendar.YEAR);
        if (year1 != year2) {   //同一年
            int timeDistance = 0;
            for (int i = year1; i < year2; i++) {
                if (i % 4 == 0 && i % 100 != 0 || i % 400 == 0) {   //闰年
                    timeDistance += 366;
                } else {  //不是闰年
                    timeDistance += 365;
                }
            }

            return timeDistance + (day2 - day1);
        } else {  //不同年
            //System.out.println("判断day2 - day1 : " + (day2 - day1));
            return day2 - day1;
        }
    }
}
