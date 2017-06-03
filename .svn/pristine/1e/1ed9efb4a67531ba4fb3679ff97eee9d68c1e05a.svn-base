package com.wdkj.wf.conttoller.sys;

import com.fh.controller.base.BaseController;
import com.wdkj.wf.house.entity.EnumtableEntity;
import com.wdkj.wf.service.street.EnumtableManager;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.util.JSONUtil;
import org.apache.commons.codec.StringDecoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.net.URLDecoder;
import java.util.List;

/**
 * @author tianwenjian
 * @create 2017-04-12 15:52
 **/
@RestController
public class EnumController extends BaseController{

    @Resource(name = "enumtableService")
    EnumtableManager enumtableManager;

    /**
     * 查询枚举值,查询特定的枚举时，参数中应当包含字段名称和表名
     * @param params
     * @return
     */
    @RequestMapping(value = "enum/list", produces = "application/json;charset=UTF-8")
    public String list(EnumtableEntity params){

        try {
            List<EnumtableEntity> enumtableEntities = enumtableManager.list(params);
            return JSONUtil.toJsonString(new JsonResult(1, "", enumtableEntities));
        }catch (Exception e){
            logger.error(e);
            return JSONUtil.toJsonString(new JsonResult(-1, "查询失败", null));
        }
    }
}
