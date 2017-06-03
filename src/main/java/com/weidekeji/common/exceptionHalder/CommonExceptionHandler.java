package com.weidekeji.common.exceptionHalder;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.util.JSONUtil;

public class CommonExceptionHandler implements HandlerExceptionResolver {

	private static Logger log = Logger.getLogger(CommonExceptionHandler.class);

	@Override
	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object arg2, Exception ex) {
		Map<String, Object> model = new HashMap<String, Object>();

		String eMessage = ex.getMessage();
		//String trace = MyStringUtils.getExceptionInfo(ex);

		// ex.printStackTrace();
		log.error("错误我啦", ex);

		String res = "";

		// get 请求的URL， 分析后缀判断ajax
		String requestType = request.getHeader("X-Requested-With");
		if (requestType != null && requestType.equals("XMLHttpRequest")) {

			res = JSONUtil.toJsonString(new JsonResult(-1, eMessage, null));

			PrintWriter writer = null;
			try {
				writer = response.getWriter();
				writer.write(res);

			} catch (IOException e) {
				e.printStackTrace();
				model.put("error", e.getMessage());
				return new ModelAndView("error/error", model);
			} finally {
				if (writer != null) {
					writer.flush();
					writer.close();
				}
			}

			return null;
		} else {
			model.put("error", "服务器内部错误！" + ex.toString());
			return new ModelAndView("error", model);
		}
	}

}
