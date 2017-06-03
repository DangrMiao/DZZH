package com.wdkj.test.house;

import com.wdkj.test.common.BaseSpringMvcTest;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * @author tianwenjian
 * @create 2017-04-27 15:14
 **/
public class MonitorSpringMvcTest extends BaseSpringMvcTest {

    @Test
    @Rollback(false)
    public void testHistorySave() throws Exception{
        this.mockMvc.perform((post("/settlementMonitor/history/save")
                .param("pointId", "33")
                .param("positionX", "99999")
                .param("positionY", "99999")
                .param("elevation", "99")
                .param("userId", "2")))
                .andExpect(status().isOk()).andDo(print());
    }

    @Test
    public void testPointSave() throws Exception{
        MockHttpServletRequestBuilder builder = post("/settlementMonitor/point/save");

        //位置信息
        builder.param("pointId", "6")
                .param("positionX", "1234")
                .param("positionY", "125")
                .param("elevation", "12")
                .param("userId", "2")
                .param("recordTime", "2016-3-5 12:12:12");

        //点的信息
        builder.param("houseId", "2");
        builder.param("name", "西南观察点1");

        this.mockMvc.perform(builder)
                .andExpect(status().isOk()).andDo(print());
    }

    @Test
    public void testHistoryList() throws  Exception{
        Map map = new HashMap(8);
        map.put("pointId", "3");
        //mockMvc.perform(getSimpleBuilder(map, "/settlementMonitor/history/list")).andExpect(status().isOk()).andDo(print());
        doCodeSimpleTest(map, "/settlementMonitor/history/list");
    }

    @Test
    public void testPointList() throws  Exception{
        Map map = new HashMap(8);
        map.put("houseId", "3212");
        mockMvc.perform(getSimpleBuilder(map, "/settlementMonitor/points/list")).andExpect(status().isOk()).andDo(print());
    }
}
