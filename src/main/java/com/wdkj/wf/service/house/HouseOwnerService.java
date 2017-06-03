package com.wdkj.wf.service.house;

import com.wdkj.wf.entity.house.HouseOwner;

import java.util.List;

/**
 * @author tianwenjian
 * @create 2017-04-28 15:14
 **/
public interface HouseOwnerService {

    /**
     * 列表
     * @param params
     * @return
     */
    List<HouseOwner> list(HouseOwner params);

    /**
     * 保存
     * @param owner
     * @return
     */
    HouseOwner save(HouseOwner owner);

    /**
     * 更新
     * @param owner
     */
    void update(HouseOwner owner);

    /**
     * 获取单个
     * @param houseOwner
     * @return
     */
    HouseOwner getOne(HouseOwner houseOwner);
}
