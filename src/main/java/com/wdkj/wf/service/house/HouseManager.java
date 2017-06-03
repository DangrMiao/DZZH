package com.wdkj.wf.service.house;

import com.fh.util.PageData;
import com.wdkj.wf.house.entity.HouseEntity;
import com.wf.common.latLon.LatLon;

import java.util.List;

public interface HouseManager {

    void save(HouseEntity house) throws Exception;

    List<PageData> listAll(HouseEntity params) throws Exception;
    
    HouseEntity findById(HouseEntity house)throws Exception;
    /**
     * insert
     * @param params
     * @return
     */
    HouseEntity insert(HouseEntity params) throws Exception;

    /**
     * 批量添加房屋
     * @param params
     */
    void batchAdd(List<HouseEntity> params) throws Exception;

    /**
     * 更新
     * @param params
     */
    void update(HouseEntity params);

    /**
     *
     * @param params
     * @return
     */
    List<HouseEntity> page(HouseEntity params);

    /**
     * 数目
     * @param params
     * @return
     */
    Integer count(HouseEntity params);

    /**
     * 展示
     * @param params
     * @return
     */
	List<PageData> listHistory(HouseEntity params) throws Exception;

    /**
     * 统计
     * @param houseEntity
     * @return
     */
    List<HouseEntity> statistics(HouseEntity houseEntity);

    
    /**
     * 综合统计
     * @param houseEntity
     * @return
     */
    List<HouseEntity> integrative(HouseEntity houseEntity);
    /**
     * 历史导出excel
     * @param pd
     * @return
     */
    List<PageData> listExcel(HouseEntity params) throws Exception;
    /**
     * 地基检测导出excel
     * @param pd
     * @return
     */
    List<PageData> toExcel(HouseEntity params) throws Exception;

    /**
     * 历史回溯属性更新
     * @param params
     * @return
     */
    void historyUpdate(HouseEntity params);

    /**
     * 搜索线附近的
     * @param linePoints
     * @param distance 距离
     * @return
     */
    List<HouseEntity> listByLine(List<LatLon> linePoints, Double distance);

    /**
     * 搜索多边形或者任意图形的
     * @param polygonPoints
     * @return
     */
    List<HouseEntity> listByPolygon(List<LatLon> polygonPoints);

    /**获取文件路径
     * @return
     * @throws Exception
     */
    PageData getfile(PageData pd)throws Exception;

    
    
    
    
    //历史回溯搜索功能
    /**
    *
    * @param params
    * @return
    */
   List<HouseEntity> pageHistory(HouseEntity params);

   /**
    * 数目
    * @param params
    * @return
    */
   Integer countHistory(HouseEntity params);

   /**
    * 报表数目
    * @param params
    * @return
    */
  Integer countStatic(HouseEntity houseEntity);

  /**
   * 综合统计数目
   * @param params
   * @return
   */
  Integer countIntegrative(HouseEntity houseEntity);

  /**
   * 属性更新
   * @param params
   */
  void updateAttr(HouseEntity params);

}


