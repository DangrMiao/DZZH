package com.wdkj.wf.service.house.impl;

import com.fh.dao.DaoSupport;
import com.wdkj.wf.constraints.HouseConst;
import com.wdkj.wf.entity.house.HouseDisposes;
import com.wdkj.wf.house.entity.HouseEntity;
import com.wdkj.wf.service.house.HouseDisposesService;
import com.wdkj.wf.service.house.HouseManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author tianwenjian
 * @create 2017-05-09 16:13
 **/
@Service
public class HouseDisposesServiceImpl implements HouseDisposesService{

    @Resource(name = "daoSupport")
    DaoSupport daoSupport;

    @Autowired
    HouseManager houseService;

    @Override
    public List<HouseDisposes> list(HouseDisposes houseDisposes) {
        return daoSupport.list(HouseDisposes.NAME_SPACE + ".list", houseDisposes);
    }

    @Override
    public HouseDisposes getOne(HouseDisposes houseDisposes) {
        return daoSupport.getOne(HouseDisposes.NAME_SPACE + ".getOne", houseDisposes);
    }

    @Override
    public HouseDisposes save(HouseDisposes houseDisposes) {
        daoSupport.insert(HouseDisposes.NAME_SPACE + ".save", houseDisposes);
        return houseDisposes;
    }

    @Override
    @Transactional
    public void update(HouseDisposes houseDisposes) {
        daoSupport.updateOne(HouseDisposes.NAME_SPACE + ".update", houseDisposes);
    }

    @Override
    @Transactional
    public void disposes(HouseDisposes houseDisposes) throws Exception{
        HouseEntity houseEntity = new HouseEntity();
        houseEntity.setBh(houseDisposes.getHouseCode());
        houseEntity = houseService.findById(houseEntity);
        if (houseEntity == null){
            throw new RuntimeException("无法找到房屋");
        }
        if (houseEntity.getZt() != HouseConst.HOUSE_STATUS_APPRAISED){
            throw new RuntimeException("不能鉴定这类房屋,该房屋不在待处置状态");
        }

        houseEntity.setZt(HouseConst.HOUSE_STATUS_HANDLED);
        houseService.update(houseEntity);

        this.save(houseDisposes);
    }

	
}
