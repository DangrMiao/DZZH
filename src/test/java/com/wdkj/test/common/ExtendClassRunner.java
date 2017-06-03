package com.wdkj.test.common;

import org.junit.runners.model.InitializationError;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.util.Log4jConfigurer;

import java.io.FileNotFoundException;

/**
 * @author tianwenjian
 * @create 2017-04-28 9:14
 **/
public class ExtendClassRunner extends SpringJUnit4ClassRunner{
    static {
        try {
            //用了一个弃用的类，这个类弃用是因为Spring4.2推荐用log4j 2
            Log4jConfigurer.initLogging("classpath:log4j.properties");
            System.out.println("Initialized log4j");
        } catch (FileNotFoundException ex) {
            System.err.println("Cannot Initialize log4j");
        }
    }
    public ExtendClassRunner(Class<?> clazz) throws InitializationError {
        super(clazz);
    }
}
