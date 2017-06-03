package com.wdkj.wf.conttoller.house;

import com.fh.controller.base.BaseController;
import com.wdkj.wf.entity.house.HouseDisposes;
import com.wdkj.wf.service.house.HouseDisposesService;
import com.weidekeji.common.constraint.ResConst;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.util.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author tianwenjian
 * @create 2017-05-09 16:36
 **/
@RestController
public class HouseDisposesController extends BaseController{

    @Autowired
    HouseDisposesService houseDisposesService;

    /**
     * 房屋处置
     * @param disposes
     * @return
     */
    @RequestMapping(value = "house/disposes/disposes", produces = "application/json;charset=UTF-8")
    public String disposes(HouseDisposes disposes){
        try {
            houseDisposesService.disposes(disposes);
            return JSONUtil.toJsonString(new JsonResult(1, "保存成功", null));
        }catch (Exception e){
            logger.error("操作失败！", e);
            return JSONUtil.toJsonString(new JsonResult(-1, "保存失败:", e));
        }
    }

    /**
     * 获取单个详情
     * @param disposes
     * @return
     */
    @RequestMapping(value = "house/disposes/getOne", produces = "application/json;charset=UTF-8")
    public String getOne(HouseDisposes disposes){
        try {
            disposes = houseDisposesService.getOne(disposes);
            return JSONUtil.toJsonString(new JsonResult(1, "查询成功!", disposes));
        }catch (Exception e){
            logger.error("操作失败！", e);
            return JSONUtil.toJsonString(new JsonResult(ResConst.CODE_FAIL, ResConst.QUERY_FAIL, null));
        }
    }

    /**
     * 列表详情
     * @param disposes
     * @return
     */
    @RequestMapping(value = "house/disposes/list", produces = "application/json;charset=UTF-8")
    public String list(HouseDisposes disposes){
        try {
            List<HouseDisposes> list = houseDisposesService.list(disposes);
            return JSONUtil.toJsonString(new JsonResult(ResConst.CODE_OK, "查询成功!", list));
        }catch (Exception e){
            logger.error("操作失败！", e);
            return JSONUtil.toJsonString(new JsonResult(ResConst.CODE_FAIL, ResConst.QUERY_FAIL, null));
        }
    }

    /**
     * 更新
     * @param disposes
     * @return
     */
    @RequestMapping(value = "house/disposes/update", produces = "application/json;charset=UTF-8")
    public String update(HouseDisposes disposes){
        try {
            houseDisposesService.update(disposes);
            return JSONUtil.toJsonString(new JsonResult(ResConst.CODE_OK, ResConst.UPDATE_OK, null));
        }catch (Exception e){
            logger.error("操作失败！", e);
            return JSONUtil.toJsonString(new JsonResult(ResConst.CODE_FAIL, ResConst.UPDATE_FAIL, null));
        }
    }
}
