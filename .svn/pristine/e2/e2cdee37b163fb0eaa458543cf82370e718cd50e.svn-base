package com.wdkj.wf.conttoller.region;

import com.fh.controller.base.BaseController;
import com.fh.util.StringUtil;
import com.wdkj.wf.house.entity.VillageEntity;
import com.wdkj.wf.service.street.VillageManager;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.util.JSONUtil;
import com.wf.common.latLon.LatLonUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author tianwenjian
 * @create 2017-04-13 10:43
 **/
@RestController
public class VillageController extends BaseController{

    //private static Logger log = Logger.getLogger(VillageController.class);

    @Resource(name = "villageService")
    VillageManager villageManager;

    @RequestMapping(value = "village/list", produces = "application/json;charset=UTF-8")
    public String list(VillageEntity params){
        try {
            List<VillageEntity> villageEntities = villageManager.list(params);
            for(VillageEntity entity: villageEntities){
                if (StringUtils.isNotBlank(entity.getPoints())) {
                    entity.setBoundaryPoints(LatLonUtils.getLatLon(entity.getPoints()));
                }
            }
            return JSONUtil.toJsonString(new JsonResult(1, "", villageEntities));
        }catch (Exception e){
            logger.error("获取村数据发送错误", e);
            return JSONUtil.toJsonString(new JsonResult(-1, "查询失败", null));
        }
    }
}
