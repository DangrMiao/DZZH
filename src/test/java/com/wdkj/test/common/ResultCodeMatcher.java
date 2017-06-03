package com.wdkj.test.common;

import com.alibaba.fastjson.JSONObject;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultMatcher;

import javax.servlet.http.HttpServletResponse;

/**比较封装的数据结构中的code值是否大于1
 * @author tianwenjian
 * @create 2017-04-28 16:34
 **/
public class ResultCodeMatcher implements ResultMatcher {
    @Override
    public void match(MvcResult result) throws Exception {
        if(result.getResponse().getStatus() != HttpServletResponse.SC_OK){
            throw new Exception("HTTP 请求失败 ：" + result.getResponse().getStatus());
        }

        String body = result.getResponse().getContentAsString();
        JSONObject object = JSONObject.parseObject(body);
        Integer code = object.getInteger("code");
        if(code == null || code < 0){
            throw new Exception("返回值为" + code + " 信息：" + object.getString("message"));
        }
    }
}
