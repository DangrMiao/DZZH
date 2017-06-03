package com.weidekeji.common.util;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class SpringAppUtils implements ApplicationContextAware {
	private static ApplicationContext context = null;
	private static SpringAppUtils stools = null;

	public synchronized static SpringAppUtils init() {
		if (stools == null) {
			stools = new SpringAppUtils();
		}
		return stools;
	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		context = applicationContext;
	}

	/**
	 * 获取bean by名称
	 * 
	 * @param beanName
	 * @return
	 *
	 */
	public synchronized static Object getBean(String beanName) {
		return context.getBean(beanName);
	}

	/**
	 * 按类型获取bean
	 * 
	 * @param beanType
	 * @return
	 *
	 */
	public synchronized static Object getBean(Class<?> beanType) {
		return context.getBean(beanType);
	}

}
