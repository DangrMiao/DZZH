package com.wf.common;

/**
 * @author tianwenjian
 * @create 2017-04-13 17:18
 **/
public class MyStringUtils {

    /**
     * 获取固定长度的字符串编号,如果长了，就管不着了
     * @param no
     * @return
     */
    public static String getFixedLengthNo(int no, int length){

        StringBuilder noStr = new StringBuilder(String.valueOf(no));

        //前面补0
        while (noStr.length() < length){
            noStr.insert(0, '0');
        }

        return noStr.toString();
    }
}
