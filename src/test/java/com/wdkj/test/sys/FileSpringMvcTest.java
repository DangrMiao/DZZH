package com.wdkj.test.sys;

import com.wdkj.test.common.BaseSpringMvcTest;
import org.junit.Test;

/**
 * @author tianwenjian
 * @create 2017-05-08 17:20
 **/
public class FileSpringMvcTest extends BaseSpringMvcTest {

    @Test
    public void testDown() throws Exception{
        doSimpleTest(null, "/file/download/house/dd0615a2-f09c-45b2-8c13-f4833dc16e.jpg");
    }
}
