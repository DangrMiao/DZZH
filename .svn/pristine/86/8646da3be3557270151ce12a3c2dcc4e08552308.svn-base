package com.fh.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import com.fh.entity.system.User;
import com.fh.util.Const;
import com.fh.util.Jurisdiction;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * 
* 类名称：登录过滤，权限验证
* 类描述： 
* @author FH qq313596790[青苔]
* 作者单位： 
* 联系方式：
* 创建时间：2015年11月2日
* @version 1.6
 */
public class LoginHandlerInterceptor extends HandlerInterceptorAdapter{

	private static List<String> urls = new ArrayList<>(8);
	static {
		urls.add("street/list");
		urls.add("house/saveOrUpdate");
		urls.add("village/list");
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

		String path = request.getServletPath();
		if(path.matches(Const.NO_INTERCEPTOR_PATH)){
			return true;
		}else{
			for(String url: urls) {
				if (path.contains(url)) {
					return true;
				}
			}
			User user = (User)Jurisdiction.getSession().getAttribute(Const.SESSION_USER);
			if(user!=null){
				path = path.substring(1, path.length());
				boolean b = Jurisdiction.hasJurisdiction(path); //访问权限校验
				if(!b){
					response.sendRedirect(request.getContextPath() + Const.LOGIN);
				}
				return b;
			}else{
				//登陆过滤
				response.sendRedirect(request.getContextPath() + Const.LOGIN);
				return false;		
			}
		}
	}
	
}
