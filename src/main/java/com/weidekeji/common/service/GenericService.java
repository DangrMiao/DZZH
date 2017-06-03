package com.weidekeji.common.service;

import java.util.List;

/**
 * Created by 1 on 2017/4/7.
 */
public interface GenericService<T extends Object> {

    /**
     * getOne
     * @param params
     * @return
     */
    T getOne(T params);

    /**
     * list
     */
     List<T> list(T params);

    /**
     * page
     * @param params
     * @return
     */
     List<T> page(T params);

    /**
     * insert
     * @param params
     * @return
     */
     T insert(T params);

    /**
     * update
     * @param params
     */
    void update(T params);

    /**
     * delete
     * @param params
     */
    void delete(T params);
}
