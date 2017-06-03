package com.wdkj.test.sys;

import com.wdkj.test.common.BaseSpringMvcTest;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

/**
 * @author tianwenjian
 * @create 2017-05-11 9:55
 **/
public class LoginTest extends BaseSpringMvcTest{

    @Test
    public void testMobileLogin() throws  Exception{
        Map<String, String> map = new HashMap<>();
        map.put("USERNAME", "twj");
        map.put("PASSWORD", "123");
        doCodeSimpleTest(map, "/mobile_login");
    }
}
