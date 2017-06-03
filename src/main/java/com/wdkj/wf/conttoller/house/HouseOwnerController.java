package com.wdkj.wf.conttoller.house;

import com.fh.controller.base.BaseController;
import com.wdkj.wf.entity.house.HouseOwner;
import com.wdkj.wf.service.house.HouseOwnerService;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.util.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**产权人
 * @author tianwenjian
 * @create 2017-04-28 14:48
 **/
@RestController
public class HouseOwnerController extends BaseController {

    @Autowired
    private HouseOwnerService houseOwnerService;

    /**
     * 产权人列表(不分页)
     * @param params
     * @return
     */
    @RequestMapping(value = "owner/list", produces = "application/json;charset=UTF-8")
    public String list(HouseOwner params) {
        try {
            List<HouseOwner> owners = houseOwnerService.list(params);
            return JSONUtil.toJsonString(new JsonResult(1, "成功", owners));
        } catch (Exception e) {

            logger.error("错误：", e);
            return JSONUtil.toJsonString(new JsonResult(-1, "失败", null));
        }
    }

    /**
     * 新增产权人
     * @param params
     * @return
     */
    @RequestMapping(value = "owner/save", produces = "application/json;charset=UTF-8")
    public String save(HouseOwner params) {
        try {
            houseOwnerService.save(params);
            return JSONUtil.toJsonString(new JsonResult(1, "成功", null));
        } catch (Exception e) {

            logger.error("错误：", e);
            return JSONUtil.toJsonString(new JsonResult(-1, "失败", null));
        }
    }

    /**
     * 更新产权人
     * @param params
     * @return
     */
    @RequestMapping(value = "owner/update", produces = "application/json;charset=UTF-8")
    public String update(HouseOwner params) {
        try {
            houseOwnerService.update(params);
            return JSONUtil.toJsonString(new JsonResult(1, "成功", null));
        } catch (Exception e) {

            logger.error("错误：", e);
            return JSONUtil.toJsonString(new JsonResult(-1, "失败", null));
        }
    }
}
