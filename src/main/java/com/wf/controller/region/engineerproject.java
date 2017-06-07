package com.wf.controller.region;

import com.fh.controller.base.BaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by 1 on 2017/4/6.
 */
@RestController
public class engineerproject extends BaseController{

    /**
     * 搬迁避让
     * @param modelAndView
     * @return
     */
    @RequestMapping("engineerproject/engineerproject")
    public ModelAndView toMaoPage(ModelAndView modelAndView){

        modelAndView.setViewName("system/engineerproject/engineerproject");
        return modelAndView;
    }
}
