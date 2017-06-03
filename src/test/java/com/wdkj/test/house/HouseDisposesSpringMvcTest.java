package com.wdkj.test.house;

import com.wdkj.test.common.BaseSpringMvcTest;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import java.util.HashMap;
import java.util.Map;

/**
 * @author tianwenjian
 * @create 2017-05-09 16:33
 **/
public class HouseDisposesSpringMvcTest extends BaseSpringMvcTest {

    @Test
    @Rollback(false)
    public void testSave() throws Exception{
        Map<String, String> map = new HashMap<>(8);
        map.put("file", "23423445454.png");
        map.put("dismantleTime", "2016-02-03 21:21:25");
        map.put("reformTime", "2016-02-03 21:21:25");
        map.put("completeTime", "2016-02-03 21:21:25");
        map.put("reformType", "2");
        map.put("houseCode", "33010010200142");
        doCodeSimpleTest(map, "/house/disposes/disposes");
    }

    @Test
    public void testList() throws Exception{
        Map<String, String> map = new HashMap<>(8);
        //map.put("", "");
        doCodeSimpleTest(map, "/house/disposes/list");
    }

    @Test
    public void testGetOne() throws Exception{
        Map<String, String> map = new HashMap<>(8);
        map.put("id", "2");
        //map.put("houseCode", "33010010200155");
        doCodeSimpleTest(map, "/house/disposes/getOne");
    }

    @Test
    @Rollback(false)
    public void testUpdate() throws Exception{
        Map<String, String> map = new HashMap<>(8);
        map.put("id", "2");
        map.put("file", "11111111111.png");
        map.put("dismantleTime", "2016-02-03 21:21:25");
        map.put("reformTime", "2016-02-03 21:21:25");
        map.put("completeTime", "2016-02-03 21:21:25");
        map.put("reformType", "2");
        map.put("houseCode", "33010010200155");
        doCodeSimpleTest(map, "/house/disposes/update");
    }
}
