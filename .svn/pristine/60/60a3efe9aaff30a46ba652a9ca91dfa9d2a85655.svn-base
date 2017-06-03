package com.wdkj.test.house;

import com.wdkj.test.common.BaseSpringMvcTest;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import java.util.HashMap;
import java.util.Map;

/**
 * @author tianwenjian
 * @create 2017-05-08 16:20
 **/
public class IdentifySpringMvcTest extends BaseSpringMvcTest {

    @Rollback(false)
    @Test
    public void testSave() throws Exception{
        Map<String, String> map = new HashMap<>();
        map.put("company", "company");
        map.put("identifier", "identifier");
        map.put("level", "D");
        map.put("houseCode", "33010010200142");
        doCodeSimpleTest(map, "/house/identify/identify");
    }

    @Test
    public void testGetOne() throws Exception{
        Map<String, String> map = new HashMap<>();
        map.put("id", "1");
        doCodeSimpleTest(map, "/house/identify/getOne");
    }
}
