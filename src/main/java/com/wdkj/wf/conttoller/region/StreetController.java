package com.wdkj.wf.conttoller.region;

import com.fh.controller.base.BaseController;
import com.wdkj.wf.service.street.StreetService;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.util.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.wf.common.latLon.LatLonUtils;
import com.wdkj.wf.house.entity.StreetEntity;
import java.util.List;

/**
 * @author tianwenjian
 * @create 2017-04-07 15:02
 **/
@RestController
public class StreetController extends BaseController{

    @Autowired
    StreetService streetService;

    /**
     * 获取street列表
     * @param params
     * @return
     */
    @RequestMapping(value = "street/list", produces = "application/json;charset=UTF-8")
    public String getStreetList(StreetEntity params){
        try {
            List<StreetEntity> streetEntities = streetService.list(params);
            //处理json的格式
            for (StreetEntity streetEntity: streetEntities){
                streetEntity.setPoints(LatLonUtils.getLatLon(streetEntity.getBoundaryPoints()));
                streetEntity.setBoundaryPoints(null);
            }

            return JSONUtil.toJsonString(new JsonResult(1, "ok", streetEntities));
        } catch (Exception e) {
            logger.error(e);
            return JSONUtil.toJsonString(new JsonResult(-1, "查询失败", e));
        }
    }
}