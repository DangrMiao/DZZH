package com.weidekeji.common.bean.validate;

import com.sun.istack.internal.NotNull;
import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Field;

/**
 * @author tianwenjian
 * @create 2017-04-21 14:48
 **/
public class BeanValidator {

    public static String REQUIRED_MSG = "字段%s不能为空";

    /**
     * 验证
     *
     * @param bean
     */
    public static ValidateResult validate(Object bean) throws Exception {

        Class<?> clazz = bean.getClass();
        Field[] fields = clazz.getDeclaredFields();

        for (Field field : fields) {
            field.setAccessible(true);
            BeanField beanField = field.getAnnotation(BeanField.class);
            if (beanField != null) {
                ValidateResult result = validateOne(beanField, field, bean);
                if (!result.getResult()) {
                    return result;
                }
            }
        }

        return new ValidateResult(true);
    }

    /**
     * 单个字段验证
     *
     * @param field
     * @param f
     * @param bean
     * @return
     */
    public static ValidateResult validateOne(BeanField field, Field f, Object bean) throws Exception {
        Class<?> type = f.getType();
        Object value = f.get(bean);

        //判断必要性
        if (field.required()) {
            //判断字符串
            if (type.equals(String.class)) {
                if (StringUtils.isBlank((String) value)) {
                    return new ValidateResult(false, String.format(REQUIRED_MSG, f.getName()));
                }
            } else if (value == null) {
                return new ValidateResult(false);
            }

        }

        return new ValidateResult(true);
    }

    /**
     * 通过名字验证一个bean是否存在指定的字段空值
     *
     * @param names
     * @return
     * @throws Exception
     */
    public static ValidateResult validateBlankByName(@NotNull Object bean, String... names) throws Exception {
        if (names == null || bean == null) {
            throw new Exception("待验证的实体和属性名不能为空！");
        }
        Class<?> clazz = bean.getClass();
        for (String name : names) {
            Field field = clazz.getDeclaredField(name);
            field.setAccessible(true);
            Object value = field.get(bean);

            Class<?> type = field.getType();
            //判断字符串
            if (type.equals(String.class) && StringUtils.isBlank((String) value)) {
                return new ValidateResult(false, String.format(REQUIRED_MSG, field.getName()));
            } else if (value == null) {
                return new ValidateResult(false, String.format(REQUIRED_MSG, field.getName()));
            }
        }

        return new ValidateResult(true);
    }
}
