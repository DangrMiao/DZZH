package com.weidekeji.common.bean.validate;

/**
 * @author tianwenjian
 * @create 2017-04-21 14:36
 **/
public @interface BeanField {

    /**
     * 校验组
     * @return
     */
    String validateClass() default "";

    /**
     * 是否为null或者“”（如果String）
     * @return
     */
    boolean required() default false;

    /**
     * 整形的最大值，如果是默认的则不考虑
     * @return
     */
    int intMax() default Integer.MIN_VALUE;

    /**
     * 与最大相反
     * @return
     */
    int intMin() default Integer.MAX_VALUE;

    /**
     * 字符串最小长度
     * @return
     */
    int minLength() default 0;

    /**
     * 字符串最大长度,如果再长的话有问题
     * @return
     */
    int maxLength() default Integer.MAX_VALUE;

    //todo 根据实际情况添加更多的规则
}
