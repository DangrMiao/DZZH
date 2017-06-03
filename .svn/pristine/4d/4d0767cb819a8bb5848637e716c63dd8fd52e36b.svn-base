package com.wf.common.latLon;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author tianwenjian
 * @create 2017-04-10 11:46
 **/
public class LatLonUtils {
    private static Log log = LogFactory.getLog(LatLonUtils.class);

    public static final Double LINE_SEARCH_DISTANCE = 25D;  //25米
    public static final Double MAP_RADIUS = 6371004D;  //地图半径 米
    public static final Double OFFSET_LAT = 0.005;  //大约500米(估计值)
    public static final Double OFFSET_LON = 0.005;  //大约500米(估计值)
    
    public static final String MAX_LAT_KEY = "maxLat";
    public static final String MIN_LAT_KEY = "minLat";
    public static final String MAX_LON_KEY = "maxLon";
    public static final String MIN_LON_KEY = "minLon";

    /**
     * 获取坐标list
     * @param jsonArray  数据库中的json数组
     * @return
     */
    public static List<LatLon> getLatLon(String jsonArray) {

        List<LatLon> list = new ArrayList<>(100);

        String[] latLons = jsonArray.split("\\],\\[");
        for (int i = 0; i < latLons.length; i++) {
            String subStr = latLons[i];
            if (i == 0) {
                subStr = subStr.substring(2);
            }
            if (i == latLons.length - 1){
                subStr = subStr.substring(0, subStr.length() - 2);
            }

            String[] value = subStr.split(",");
            LatLon latLon = new LatLon();
            latLon.setLat(Double.valueOf(value[1]));
            latLon.setLon(Double.valueOf(value[0]));
            list.add(latLon);
        }
        return list;
    }

    /**
     * 判断是否在多边形中
     * @param points
     * @param point
     * @return
     */
    public static boolean IsPointInPolygon(List<LatLon> points, LatLon point) {
        if (points.size() == 0) {
            return false;
        }
        int i;
        int j = points.size() - 1;
        boolean inPoly = false;
        for (i = 0; i < points.size(); i++) {
            if (points.get(i).getLon() < point.getLon() && points.get(j).getLon() >= point.getLon()
                    || points.get(j).getLon() < point.getLon() && points.get(i).getLon() >= point.getLon()) {
                if (points.get(i).getLat() + (point.getLon() - points.get(i).getLon()) / (points.get(j).getLon() - points.get(i).getLon()) * (points.get(j).getLat() - points.get(i).getLat()) < point.getLat()) {
                    inPoly = !inPoly;
                }
            }
            j = i;
        }
        return inPoly;
    }

    /**
     * 字符串数组转坐标点数组, string 以，分隔坐标, 经度在前维度在后
     * @param list
     * @return
     */
    public static List<LatLon> getLatLonFromStringList(List<String> list){
        List<LatLon> latLons = new ArrayList<>(256);
        if (list == null){
            return latLons;
        }

        for (String s: list){
            String[] split = s.split(",");
            LatLon latLon = new LatLon();
            latLon.setLon(Double.valueOf(split[0]));
            latLon.setLat(Double.valueOf(split[1]));
            
            latLons.add(latLon);
        }

        return latLons;
    }

    /**
     * 获取边界的点值,最大值和最小值，最大的经度，最小维度等
     * @param points
     * @return
     */
    public static Map<String, Double> getBoundary(List<LatLon> points){
        Map<String, Double> result = new HashMap<>(4);
        
        Double maxLon = null;  //最大经度
        Double maxLat = null;   //组大纬度
        Double minLon = null;  //最小经度
        Double minLat = null;  //最小维度
        
        //遍历点集合
        for (LatLon latLon : points){
            
            if (maxLon == null || maxLon < latLon.getLon()){
                maxLon = latLon.getLon();
            }

            if (maxLat == null || maxLat < latLon.getLat()){
                maxLat = latLon.getLat();
            }

            if (minLon == null || minLon > latLon.getLon()){
                minLon = latLon.getLon();
            }

            if (minLat == null || minLat > latLon.getLat()){
                minLat = latLon.getLat();
            }
            
        }

        //加上或者减去冗余值
        result.put(MAX_LAT_KEY, maxLat + OFFSET_LAT);
        result.put(MAX_LON_KEY, maxLon + OFFSET_LON);
        result.put(MIN_LAT_KEY, minLat - OFFSET_LAT);
        result.put(MIN_LON_KEY, minLon - OFFSET_LON);
        
        return result;
    }

    /**
     * 点是否在线附近
     * @param linePoints
     * @param point 线的点集合
     * @param distance
     * @return
     */
    @Deprecated
    public static boolean isPointNearLine(List<LatLon> linePoints, LatLon point, Double distance){
        if (linePoints == null || linePoints.size() == 0 || point == null){
            return false;
        }

        //若果有更好的算法，修改之
        //遍历点,这个点和下一个点连成一条线段，判断这个点是否在这个线段附近，迭代之
        for(int i = 0; i < linePoints.size() - 1; i++){
            LatLon pointA = linePoints.get(i);
            LatLon pointB = linePoints.get(i + 1);
            //计算点到线的经纬度单位的距
        }
        return false;
    }

    /**
     * 获取计算点到点的经纬度单位的距
     * @param a
     * @param b
     * @return
     */
    private Double getLatLonDistance(LatLon a, LatLon b){
        return  null;
    }

    /**
     * 获取两个点的实际距离
     * @param a
     * @param b
     * @return
     */
    public Double getDistDoublePoints(LatLon a, LatLon b){
        //C = sin(MLatA)*sin(MLatB)*cos(MLonA-MLonB) + cos(MLatA)*cos(MLatB)
        //Distance = R*Arccos(C)*Pi/180

        Double C = Math.sin(a.getLat()) * Math.sin(b.getLat()) * Math.cos(a.getLon() - b.getLon()) + Math.cos(a.getLat()) * Math.cos(b.getLat());
        return MAP_RADIUS * Math.acos(C) * Math.PI / 180;
    }
}
