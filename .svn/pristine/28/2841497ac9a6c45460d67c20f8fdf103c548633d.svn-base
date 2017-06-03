package com.wdkj.wf.service.house.impl;

import com.fh.dao.DaoSupport;
import com.wdkj.wf.constraints.HouseConst;
import com.wdkj.wf.entity.house.HouseIdentifyEntity;
import com.wdkj.wf.house.entity.HouseEntity;
import com.wdkj.wf.service.house.HouseIdentifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * @author tianwenjian
 * @create 2017-05-08 15:10
 **/
@Service
public class HouseIdentifyServiceImpl implements HouseIdentifyService {
    @Resource(name = "daoSupport")
    DaoSupport daoSupport;

    @Autowired
    HouseService houseService;

    @Override
    public List<HouseIdentifyEntity> list(HouseIdentifyEntity identifyEntity) {
        return daoSupport.list(HouseIdentifyEntity.NAME_SPACE + ".list", identifyEntity);
    }

    @Override
    public HouseIdentifyEntity insert(HouseIdentifyEntity identifyEntity) {
        daoSupport.insert(HouseIdentifyEntity.NAME_SPACE + ".save", identifyEntity);
        return identifyEntity;
    }

    @Override
    public HouseIdentifyEntity getOne(HouseIdentifyEntity identifyEntity) {
        return daoSupport.getOne(HouseIdentifyEntity.NAME_SPACE + ".getOne", identifyEntity);
    }

    @Override
    @Transactional
    public void identify(HouseIdentifyEntity identifyEntity)  throws Exception{
        //   现按房屋编号寻找是否已经鉴定过，如果鉴定过则更新之
        identifyEntity.setDate(new Date());
        HouseIdentifyEntity old = new HouseIdentifyEntity();
        old.setHouseCode(identifyEntity.getHouseCode());
        old = this.getOne(old);
        if (old != null){
            old.setDate(identifyEntity.getDate());
            old.setCompany(identifyEntity.getCompany());
            old.setIdentifier(identifyEntity.getIdentifier());
            old.setLevel(identifyEntity.getLevel());
            this.update(old);
        }else{
            this.insert(identifyEntity);
        }

        HouseEntity houseEntity = new HouseEntity();
        houseEntity.setBh(identifyEntity.getHouseCode());
        houseEntity = houseService.findById(houseEntity);
        houseEntity.setZt(HouseConst.HOUSE_STATUS_APPRAISED);
        houseService.update(houseEntity);
    }

   @Override
    public void update(HouseIdentifyEntity identifyEntity) {
        daoSupport.updateOne(HouseIdentifyEntity.NAME_SPACE + ".update", identifyEntity);
    }
   @Override
   public void update1(HouseEntity houseEntity) {
       daoSupport.updateOne(HouseIdentifyEntity.NAME_SPACE + ".update1", houseEntity);
   }
}
