package com.wf.controller.region;

import com.fh.controller.base.BaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by 1 on 2017/4/6.
 */
@RestController
public class MapController extends BaseController{

    /**
     * 地图页面
     * @param modelAndView
     * @return
     */
    @RequestMapping("map/page")
    public ModelAndView toMaoPage(ModelAndView modelAndView){

        modelAndView.setViewName("system/map/map");
        return modelAndView;
    }
}
