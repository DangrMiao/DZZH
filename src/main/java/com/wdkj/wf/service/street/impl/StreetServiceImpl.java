package com.wdkj.wf.service.street.impl;/**
 * Created by 1 on 2017/4/7.
 */

import com.fh.dao.DaoSupport;

import com.wdkj.wf.house.entity.StreetEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author tianwenjian
 * @create 2017-04-07 15:47
 **/
@Service
public class StreetServiceImpl implements com.wdkj.wf.service.street.StreetService{

    @Resource(name = "daoSupport")
    DaoSupport daoSupport;
    @Override
    public StreetEntity getOne(StreetEntity params) {
        return null;
    }

    @Override
    public List<StreetEntity> list(StreetEntity params) {
        return daoSupport.list(StreetEntity.NAME_SPACE + ".list", params);
    }

    @Override
    public List<StreetEntity> page(StreetEntity params) {
        return null;
    }

    @Override
    public StreetEntity insert(StreetEntity params) {
        return null;
    }

    @Override
    public void update(StreetEntity params) {

    }

    @Override
    public void delete(StreetEntity params) {

    }
}
