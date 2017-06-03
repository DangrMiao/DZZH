package com.wdkj.test.house;

import com.wdkj.test.common.BaseSpringMvcTest;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import java.util.HashMap;
import java.util.Map;

/**
 * @author tianwenjian
 * @create 2017-05-02 9:51
 **/
public class HouseSpringMvcTest extends BaseSpringMvcTest {

    @Test
    public void testHouseList() throws Exception{
        Map<String, String> param = new HashMap<>();

        param.put("start", "0");
        param.put("rows", "5");

        doCodeSimpleTest(param, "/house/page");
    }

    @Test
    public void testGetOne() throws Exception{
        Map<String, String> map = new HashMap<>();
        //map.put("id", "3211");
        map.put("bh", "33010010100001");
        doCodeSimpleTest(map, "/house/getOne");
    }

    @Test
    @Rollback(false)
    public void testSaveOrUpdate() throws Exception{
        Map<String, String> map = new HashMap<>();
        map.put("bh", "33010010300001");  //加了编号的话 是  update
        map.put("jzmj", "1200");
        map.put("tdxz", "国有");
        map.put("jglx", "1111");
        map.put("mph", "108");
        map.put("admj", "108");
        map.put("jznd", "90");
        map.put("cs", "90");
        map.put("js", "90");
        map.put("zdmj", "90");
        doCodeSimpleTest(map, "/house/saveOrUpdate");
    }
}
