package com.wdkj.wf.service.house.impl;

import com.fh.dao.DaoSupport;
import com.wdkj.wf.entity.house.HouseOwner;
import com.wdkj.wf.service.house.HouseOwnerService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author tianwenjian
 * @create 2017-04-28 15:16
 **/
@Service
public class HouseOwnerServiceImpl implements HouseOwnerService{

    @Resource(name = "daoSupport")
    DaoSupport daoSupport;

    @Override
    public List<HouseOwner> list(HouseOwner params) {
        return daoSupport.list(HouseOwner.NAME_SPACE + ".list", params);
    }

    @Override
    public HouseOwner save(HouseOwner owner) {
        daoSupport.insert(HouseOwner.NAME_SPACE + ".save", owner);
        return owner;
    }

    @Override
    public void update(HouseOwner owner) {
        daoSupport.updateOne(HouseOwner.NAME_SPACE + ".update", owner);
    }

    @Override
    public HouseOwner getOne(HouseOwner houseOwner) {
        return daoSupport.getOne(HouseOwner.NAME_SPACE + ".getOne", houseOwner);
    }
}
