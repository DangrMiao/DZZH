package com.wf.controller.region;

import com.fh.controller.base.BaseController;
import com.fh.util.Jurisdiction;
import com.fh.util.ObjectExcelView;
import com.fh.util.PageData;
import com.wdkj.wf.house.entity.HouseEntity;
import com.wdkj.wf.service.house.HouseManager;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by 1 on 2017/4/26.
 */

@Controller
@RequestMapping(value="/history")
public class HistoryController extends BaseController{
	
	@Autowired
	private HouseManager houseService;

    /**
     * 历史回溯模块
     * @param modelAndView
     * @return
     */
    @RequestMapping("/list")
    public ModelAndView toMaoPage(ModelAndView modelAndView){

        modelAndView.setViewName("system/history/history");
        return modelAndView;
    }
    
	/**
	 * 导出到excel
	 * @return
	 */
	@RequestMapping(value="/excel")
	public ModelAndView exportExcel(HouseEntity params) throws Exception{
		ModelAndView mv = new ModelAndView();
		Map<String,Object> dataMap = new HashMap<String,Object>();
		List<String> titles = new ArrayList<String>();	        
			titles.add("ID");	//1
			titles.add("编号");	//2
			titles.add("乡镇街道");	//3
			titles.add("所属村");	//4
			titles.add("门牌号");	//5
			titles.add("户主");	//6
			titles.add("身份证号");	//7
			titles.add("联系电话");	//8	
			titles.add("鉴定时间");	//9	
			titles.add("鉴定等级");	//10	
			titles.add("住房类别");	//11
			titles.add("层数");	//12		
			titles.add("建筑面积");	//13
			titles.add("间数");	//14
			titles.add("占地面积");	//15
			titles.add("房屋使用情况");	//16
			titles.add("房产证");	//17
			titles.add("拆除时间");	//18
			titles.add("改造时间");	//19 
			titles.add("验收时间");	//20
			titles.add("改造类型");	//21
			titles.add("X");	//22
			titles.add("Y");	//23
			
			dataMap.put("titles", titles);
			List<PageData> varOList = houseService.listExcel(params);
			List<PageData> varList = new ArrayList<PageData>();
			for(int i=0;i<varOList.size();i++){
				PageData vpd = new PageData();
				vpd.put("var1", varOList.get(i).get("id")==null?"":varOList.get(i).get("id").toString());	//1
				vpd.put("var2", varOList.get(i).get("bh")==null?"":varOList.get(i).get("bh").toString());	//2
				vpd.put("var3", varOList.get(i).get("xzjd")==null?"":varOList.get(i).get("xzjd").toString());	//3 
				vpd.put("var4", varOList.get(i).get("ssc")==null?"":varOList.get(i).get("ssc").toString());	//4
				vpd.put("var5", varOList.get(i).get("mph")==null?"":varOList.get(i).get("mph").toString());	//5
				vpd.put("var6", varOList.get(i).get("name")==null?"":varOList.get(i).get("name").toString());	//6
				vpd.put("var7", varOList.get(i).get("identity")==null?"":varOList.get(i).get("identity").toString());	//7
				vpd.put("var8", varOList.get(i).get("phonenum")==null?"":varOList.get(i).get("phonenum").toString());	//8
				vpd.put("var9", varOList.get(i).get("date")==null?"":varOList.get(i).get("date").toString());	//9
		        vpd.put("var10", varOList.get(i).get("level")==null?"":varOList.get(i).get("level").toString());	//10
				vpd.put("var11", varOList.get(i).get("zflb")==null?"":varOList.get(i).get("zflb").toString());	//11
				vpd.put("var12", varOList.get(i).get("cs")==null?"":varOList.get(i).get("cs").toString());	//12
				vpd.put("var13", varOList.get(i).get("jzmj")==null?"":varOList.get(i).get("jzmj").toString());	//13
				vpd.put("var14", varOList.get(i).get("js")==null?"":varOList.get(i).get("js").toString());	//14
				vpd.put("var15", varOList.get(i).get("zdmj")==null?"":varOList.get(i).get("zdmj").toString());	//15
				vpd.put("var16", varOList.get(i).get("zfsyqk")==null?"":varOList.get(i).get("zfsyqk").toString());	//16
				vpd.put("var17", varOList.get(i).get("fcz")==null?"":varOList.get(i).get("fcz").toString());	//17
				vpd.put("var18", varOList.get(i).get("dismantle_time")==null?"":varOList.get(i).get("dismantle_time").toString());	//18
				vpd.put("var19", varOList.get(i).get("reform_time")==null?"":varOList.get(i).get("reform_time").toString());	//19
				vpd.put("var20", varOList.get(i).get("complete_time")==null?"":varOList.get(i).get("complete_time").toString());	//20
				if(varOList.get(i).get("reform_type")!=null&&varOList.get(i).get("reform_type").toString().equals("0")){
					vpd.put("var21", "原拆原建");	//21
				}else if(varOList.get(i).get("reform_type")!=null&&varOList.get(i).get("reform_type").toString().equals("1")){
					vpd.put("var21", "修缮加固");	//21
				}
				else if(varOList.get(i).get("reform_type")!=null&&varOList.get(i).get("reform_type").toString().equals("2")){
					vpd.put("var21", "拆除");	//21
				}				
				vpd.put("var22", varOList.get(i).get("x")==null?"":varOList.get(i).get("x").toString());	//22
				vpd.put("var23", varOList.get(i).get("y")==null?"":varOList.get(i).get("y").toString());	//23
				varList.add(vpd);
			}
			dataMap.put("varList", varList);
			ObjectExcelView erv = new ObjectExcelView();
			mv = new ModelAndView(erv,dataMap);
		 
		return mv;
	}
	
	@InitBinder
	public void initBinder(WebDataBinder binder){
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(format,true));
	}
	
}