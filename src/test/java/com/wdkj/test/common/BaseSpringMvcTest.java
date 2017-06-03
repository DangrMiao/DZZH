package com.wdkj.test.common;

import com.fh.controller.system.login.LoginController;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import java.util.Iterator;
import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * @author tianwenjian
 * @create 2017-04-27 15:15
 **/
@RunWith(ExtendClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(locations = {
        "classpath*:/spring/ApplicationContext-main.xml",
        "classpath*:/spring/ApplicationContext-mvc.xml",
        "classpath*:/spring/ApplicationContext-redis.xml",
        "classpath*:/spring/ApplicationContext-dataSource.xml"
})
//当然 你可以声明一个事务管理 每个单元测试都进行事务回滚 无论成功与否
@Rollback()
@Transactional
public class BaseSpringMvcTest {
    @Autowired
    private WebApplicationContext wac;

    protected Log log = LogFactory.getLog(this.getClass());

    protected MockMvc mockMvc;

    @Before
    public void setup() {

        this.mockMvc = webAppContextSetup(this.wac).build();
    }

    /**
     * 构建测试请求
     * @param params
     * @param url
     * @return
     */
    public MockHttpServletRequestBuilder getSimpleBuilder(Map<String, String> params, String url){

        MockHttpServletRequestBuilder builder = post(url);

        if (params != null){
            Iterator<Map.Entry<String, String>> iterator = params.entrySet().iterator();
            while (iterator.hasNext()){
                Map.Entry<String, String> entry = iterator.next();
                builder.param(entry.getKey(), entry.getValue());
            }
        }
        return builder;
    }

    /**
     * 简单的测试code 返回的值是否为1
     * @param params
     * @param url
     * @throws Exception
     */
    protected void doCodeSimpleTest(Map params, String url) throws Exception{
        mockMvc.perform(getSimpleBuilder(params, url)).andExpect(new ResultCodeMatcher()).andDo(print());
    }


    /**
     * 简单的测试 http status
     * @param params
     * @param url
     * @throws Exception
     */
    protected void doSimpleTest(Map params, String url) throws Exception{
        mockMvc.perform(getSimpleBuilder(params, url)).andExpect(status().isOk()).andDo(print());
    }

    /*@Test
    //有些单元测试你不希望回滚
    @Rollback(false)
	public void testInsert() throws Exception {
	    mockMvc.perform((post("/insertTest"))).andExpect(status().isOk())
	            .andDo(print());
	} */
}
