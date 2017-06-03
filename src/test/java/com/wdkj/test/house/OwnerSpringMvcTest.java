package com.wdkj.test.house;

import com.wdkj.test.common.BaseSpringMvcTest;
import com.wdkj.test.common.ResultCodeMatcher;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * @author tianwenjian
 * @create 2017-04-28 15:39
 **/
public class OwnerSpringMvcTest extends BaseSpringMvcTest {

    @Test
    @Rollback(false)
    public void testAdd() throws Exception {
        Map map = new HashMap(8);
        map.put("name", "田文健");
        map.put("identity", "425545189885856523");
        map.put("phoneNum", "15689899898");

        mockMvc.perform(getSimpleBuilder(map, "/owner/save")).andExpect(status().isOk()).andDo(print());
    }

    @Test
    @Rollback(false)
    public void testUpdate() throws Exception {
        Map map = new HashMap(8);
        map.put("name", "田文健3");
        map.put("identity", "111111111111111111");
        map.put("phoneNum", "88888888");
        map.put("id", "1");

        mockMvc.perform(getSimpleBuilder(map, "/owner/update")).andExpect(status().isOk()).andDo(print());
    }

    @Test
    public void list() throws Exception {
        mockMvc.perform(getSimpleBuilder(null, "/owner/list")).andExpect(new ResultCodeMatcher()).andDo(print());
    }
}
