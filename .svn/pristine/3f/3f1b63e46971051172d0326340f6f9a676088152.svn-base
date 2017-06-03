package com.wdkj.wf.service.house;

import com.wdkj.wf.entity.house.HouseDisposes;
import com.wdkj.wf.entity.house.HouseIdentifyEntity;
import com.wdkj.wf.house.entity.HouseEntity;

import java.util.List;

/**房屋鉴定
 * @author tianwenjian
 * @create 2017-05-08 15:08
 **/
public interface HouseIdentifyService {

    /**
     * 列表
     * @param identifyEntity
     * @return
     */
     List<HouseIdentifyEntity> list(HouseIdentifyEntity identifyEntity);

    /**
     * 添加
     * @param identifyEntity
     * @return
     */
     HouseIdentifyEntity insert(HouseIdentifyEntity identifyEntity);

    /**
     * 查询
     * @param identifyEntity
     * @return
     */
    HouseIdentifyEntity getOne(HouseIdentifyEntity identifyEntity);


    /**
     * 鉴定房屋
     * @param identifyEntity
     */
    void  identify(HouseIdentifyEntity identifyEntity) throws Exception;

    /**
     * 更新
     * @param identifyEntity
     */
    void update(HouseIdentifyEntity identifyEntity);
    
    /**
     * 更新状态zt
     * @param identifyEntity
     */
    void update1(HouseEntity houseEntity);

}
