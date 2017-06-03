package com.wdkj.wf.conttoller.house;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fh.controller.base.BaseController;
import com.wdkj.wf.entity.house.HouseIdentifyEntity;
import com.wdkj.wf.service.house.HouseIdentifyService;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.util.JSONUtil;

/**
 * 房屋鉴定的接口
 * @author tianwenjian
 * @create 2017-05-08 14:48
 **/
@RestController
public class HouseIdentifyController extends BaseController{

    @Autowired
    HouseIdentifyService houseIdentifyService;

    /**
     * 房屋鉴定
     * @param params
     * @return
     */
    @RequestMapping(value = "house/identify/identify", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public String identifyHouse(HouseIdentifyEntity params){

        try {
            params.setDate(new Date());
            houseIdentifyService.identify(params);
            return JSONUtil.toJsonString(new JsonResult(1, "鉴定成功！", null));
        }catch (Exception e){
            logger.error("鉴定房屋出错:", e);
            return JSONUtil.toJsonString(new JsonResult(-1, "鉴定房屋失败！", null));
        }
    }

    /**
     * 查询单个
     * @param params
     * @return
     */
    @RequestMapping(value = "house/identify/getOne", produces = "application/json;charset=UTF-8")
    public String getOne(HouseIdentifyEntity params){
        try {
            params = houseIdentifyService.getOne(params);
            return JSONUtil.toJsonString(new JsonResult(1, "", params));
        }catch (Exception e){
            logger.error("查询房屋出错:", e);
            return JSONUtil.toJsonString(new JsonResult(-1, "查询鉴定信息失败！", null));
        }
    }

}
