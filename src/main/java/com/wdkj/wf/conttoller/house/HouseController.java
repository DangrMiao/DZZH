package com.wdkj.wf.conttoller.house;

import static com.wdkj.wf.constraints.HouseConst.HOUSE_FILE_DIR;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.fh.controller.base.BaseController;
import com.fh.util.ObjectExcelView;
import com.fh.util.PageData;
import com.wdkj.wf.common.FileHelper;
import com.wdkj.wf.constraints.HouseConst;
import com.wdkj.wf.conttoller.sys.FileController;
import com.wdkj.wf.house.entity.EnumtableEntity;
import com.wdkj.wf.house.entity.HouseEntity;
import com.wdkj.wf.house.entity.StreetEntity;
import com.wdkj.wf.house.entity.VillageEntity;
import com.wdkj.wf.service.house.HouseManager;
import com.wdkj.wf.service.street.EnumtableManager;
import com.wdkj.wf.service.street.StreetManager;
import com.wdkj.wf.service.street.VillageManager;
import com.weidekeji.common.constraint.ResConst;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.json.PagedJsonResult;
import com.weidekeji.common.util.ImportUtils;
import com.weidekeji.common.util.JSONUtil;
import com.wf.common.latLon.LatLon;
import com.wf.common.latLon.LatLonUtils;

/**
 * 房屋接口
 *
 * @author 1
 */
@Controller
@RequestMapping(value = "/house")
public class HouseController extends BaseController {

	@Autowired
	private HouseManager houseService;

	@Autowired
	private StreetManager streetService;

	@Autowired
	private VillageManager villageService;

	@Autowired
	private EnumtableManager enumtableService;

	/**
	 * 添加或者修改，如果有id 则是修改
	 *
	 * @param params
	 * @return
	 */
	@RequestMapping(value = "/saveOrUpdate", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String saveOrUpdate(HouseEntity params, HttpServletRequest request) {
		Map map = request.getParameterMap();

		try {
			if (params.getBh() == null) {
				params.setZt(HouseConst.HOUSE_STATUS_UNDETERMINED);
				VillageEntity vParams = new VillageEntity();
				vParams.setId(params.getVillageId());
				params.setBh(villageService.getUniqueHouseNo(vParams));
				houseService.insert(params);
			} else {
				HouseEntity old = houseService.findById(params);
				old.setJglx(params.getJglx());
				old.setCs(params.getCs());
				old.setJs(params.getJs());
				old.setJznd(params.getJznd());
				old.setJzmj(params.getJzmj());
				old.setFcz(params.getFcz());
				old.setMph(params.getMph());
				old.setTdxz(params.getTdxz());
				old.setZfsyqk(params.getZfsyqk());
				old.setZflb(params.getZflb());
				old.setZdmj(params.getZdmj());
				houseService.update(old);
			}
			Map<String, String> result = new HashMap<>(4);
			result.put("code", params.getBh());

			return JSONUtil.toJsonString(new JsonResult(1, "保存成功", result));
		} catch (Exception e) {
			logger.error("保存失败", e);
			return JSONUtil.toJsonString(new JsonResult(-1, "保存失败", null));
		}
	}

	/**
	 * 更新房屋图片
	 *
	 * @param files
	 * @param houseCode
	 * @return
	 */
	@RequestMapping(value = "/uploadPhoto", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String uploadPhoto(@RequestParam(value = "file", required = true) MultipartFile[] files, String houseCode) {
		try {
			if (houseCode == null) {
				return JSONUtil
						.toJsonString(new JsonResult(ResConst.CODE_FAIL, ResConst.SAVE_FAIL + " 房屋编号不能为空", null));
			}

			houseCode = houseCode.replace("\"", "");
			HouseEntity houseEntity = new HouseEntity();
			houseEntity.setBh(houseCode);
			houseEntity = houseService.findById(houseEntity);
			if (houseEntity == null) {
				return JSONUtil.toJsonString(new JsonResult(ResConst.CODE_FAIL, ResConst.SAVE_FAIL + " 房屋不存在", null));
			}
			String housePhoto = houseEntity.getPhotos() == null ? "" : houseEntity.getPhotos();
			for (MultipartFile file : files) {
				String filePath = FileHelper.saveFile(file.getBytes(), HOUSE_FILE_DIR, file.getOriginalFilename());
				housePhoto += (";" + filePath);
			}

			houseEntity.setPhotos(housePhoto);
			houseService.update(houseEntity);
		} catch (Exception e) {
			logger.error("房屋图片更新失败！", e);
			return JSONUtil.toJsonString(new JsonResult(ResConst.CODE_FAIL, ResConst.SAVE_FAIL, e.getMessage()));
		}

		return JSONUtil.toJsonString(new JsonResult(1, "保存成功", null));
	}

	/**
	 * 文件列表信息
	 *
	 * @param houseEntity
	 * @return
	 */
	@RequestMapping(value = "/listfile", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String listfile() {
		PageData pd = new PageData();
		pd = this.getPageData();
		logger.info("参数:"+pd.getString("house_code"));
		try {
			PageData all = houseService.getfile(pd);
			List<String> listfile = new ArrayList<>();
			List<String> listphoto = new ArrayList<>();
			if (all.getString("file") != null && all.getString("file") != "") {
				String[] file = all.get("file").toString().split("[;]");
				for (String f : file) {
					listfile.add(f);
				}
			}
			if (all.getString("photos") != null && all.getString("photos") != "") {
				String[] photo = all.get("photos").toString().split("[;]");
				for (String p : photo) {
					listphoto.add(p);
				}
			}
			List<PageData> data = new ArrayList<>();
			if(listfile.size()>=listphoto.size()){
				for (int i = 0; i < listfile.size(); i++) {
					PageData p=new PageData();
					p.put("file", listfile.get(i));
					if(i<listphoto.size()){
					p.put("photo",listphoto.get(i));
					}
					data.add(p);
				}
			}
			else{
				for (int i = 0; i < listphoto.size(); i++) {
					PageData p=new PageData();
					if(i<=listfile.size()){
						p.put("file", listfile.get(i));
					}
					p.put("photo",listphoto.get(i));
					data.add(p);
				}
			}
			return JSONUtil.toJsonString(new JsonResult(1, "查询成功", data));
		} catch (Exception e) {
			logger.error("查询失败", e);
			return JSONUtil.toJsonString(new JsonResult(-1, "没有数据", null));
		}
	}

	/**
	 * 查询房屋信息
	 *
	 * @param houseEntity
	 * @return
	 */
	@RequestMapping(value = "/getOne", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getOne(HouseEntity houseEntity) {
		try {
			houseEntity = houseService.findById(houseEntity);

			// 设置房屋图片的地址
			if (houseEntity.getPhotos() != null) {
				String[] photos = houseEntity.getPhotos().split("[;]");
				List<String> list = new ArrayList<>(16);
				for (String p : photos) {
					if (StringUtils.isBlank(p)) {
						continue;
					}
					list.add(getServerPath() + FileController.DOWNLOAD_MAPPING + p);
				}
				houseEntity.setPhotoArray(list);
			}
			return JSONUtil.toJsonString(new JsonResult(1, "查询成功", houseEntity));
		} catch (Exception e) {
			logger.error("查询失败", e);
			return JSONUtil.toJsonString(new JsonResult(-1, "查询失败", null));
		}
	}

	/**
	 * 导入房屋
	 *
	 * @param file
	 * @return
	 */
	@RequestMapping(value = "/importHouse", produces = "application/json;charset=UTF-8")
	public String importHouse(@RequestParam(value = "file", required = true) MultipartFile file) {
		try {
			List<HouseEntity> houseEntities = ImportUtils.getEntityList(file.getInputStream(), HouseEntity.class,
					HouseConst.HOUSE_IMPORT_PROPERTIES);
			houseService.batchAdd(houseEntities);
			return JSONUtil.toJsonString(new JsonResult(ResConst.CODE_OK, ResConst.QUERY_OK, null));
		} catch (Exception e) {
			logger.error("导入房屋错误", e);
			return JSONUtil.toJsonString(new JsonResult(ResConst.CODE_FAIL, ResConst.QUERY_FAIL, e));
		}
	}

	/**
	 * 查询街道
	 *
	 * @param str
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/list_street", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object list_street(StreetEntity str) {
		List<PageData> list;

		try {
			list = streetService.listAll(str);
			logBefore(logger, "结果集:" + list.toString());
			return JSONUtil.toJsonString(new JsonResult(200, "成功", list));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}

	}

	/**
	 * 查询房屋信息
	 *
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/list_house", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object list_house(HouseEntity house) {
		List<PageData> list;
		System.out.println(house.getYmax() + "参数");
		try {
			list = houseService.listAll(house);
			logBefore(logger, "结果集:" + list.toString());
			return JSONUtil.toJsonString(new JsonResult(200, "成功", list));
		} catch (Exception e) {
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}
	}

	/**
	 * 分页
	 *
	 * @param params
	 *            房屋参数
	 * @param linePoints
	 *            查询线选
	 * @param polygonPoints
	 *            多边形
	 * @return
	 */
	@RequestMapping(value = "/page", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String page(HouseEntity params, @RequestParam(value = "linePoints[]", required = false) String[] linePoints,
			@RequestParam(value = "polygonPoints[]", required = false) String[] polygonPoints) {
		logger.info("查询开始");
		try {
			List<HouseEntity> houseList = null;
			int count = 0;
			// 线选
			if (linePoints != null) {
				List<LatLon> latLons = LatLonUtils.getLatLonFromStringList(Arrays.asList(linePoints));
				List<HouseEntity> all = houseService.listByLine(latLons, 36D);
				// 分页
				if (all != null && params.getStart() != null && params.getRows() != null
						&& all.size() > params.getRows()) {
					if (all.size() > params.getStart() + params.getRows()) {
						houseList = all.subList(params.getStart(), params.getStart() + params.getRows());
					} else {
						houseList = all.subList(params.getStart(), all.size());
					}
				} else {
					houseList = all;
				}
				count = all.size();
			} else if (polygonPoints != null) { // 多边形选
				List<LatLon> latLons = LatLonUtils.getLatLonFromStringList(Arrays.asList(polygonPoints));
				List<HouseEntity> all = houseService.listByPolygon(latLons);
				// 分页
				if (all != null && params.getStart() != null && params.getRows() != null
						&& all.size() > params.getRows()) {
					if (all.size() > params.getStart() + params.getRows()) {
						houseList = all.subList(params.getStart(), params.getStart() + params.getRows());
					} else {
						houseList = all.subList(params.getStart(), all.size());
					}
				} else {
					houseList = all;
				}
				count = all.size();
			} else {
				houseList = houseService.page(params);
				count = houseService.count(params);
			}
			return JSONUtil.toJsonString(new PagedJsonResult(houseList, 1, "成功", count, params.getRows()));
		} catch (Exception e) {
			logger.error("查询发生错误", e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));
		}
	}

	/**
	 * 导出到excel
	 *
	 * @return
	 */
	@RequestMapping(value = "/toexcel")
	public ModelAndView exportExcel(HouseEntity params) throws Exception {
		ModelAndView mv = new ModelAndView();
		Map<String, Object> dataMap = new HashMap<String, Object>();
		List<String> titles = new ArrayList<String>();
		logger.info("开始导表");
		titles.add("ID"); // 1
		titles.add("编号"); // 2
		titles.add("乡镇街道"); // 3
		titles.add("所属村"); // 4
		titles.add("门牌号"); // 5
		titles.add("户主"); // 6
		titles.add("身份证号"); // 7
		titles.add("联系电话"); // 8
		titles.add("建造年代"); // 9
		titles.add("住房类别"); // 10
		titles.add("层数"); // 11
		titles.add("建筑面积"); // 12
		titles.add("间数"); // 13
		titles.add("占地面积"); // 14
		titles.add("房屋使用情况"); // 15
		//titles.add("状态"); // 16
		//titles.add("拆除时间"); // 17
		//titles.add("验收时间"); // 18
		titles.add("土地性质"); // 19
		titles.add("房产证"); // 20
		titles.add("X"); // 21
		titles.add("Y"); // 22
		titles.add("结构类型");// 23
		titles.add("鉴定等级");// 24
		dataMap.put("titles", titles);
		logger.info("状态："+params.getZt());
		List<PageData> varOList = houseService.toExcel(params);
		logger.info("导出数据：" + varOList.size());
		List<PageData> varList = new ArrayList<PageData>();
		for (int i = 0; i < varOList.size(); i++) {
			PageData vpd = new PageData();
			vpd.put("var1", varOList.get(i).get("id") == null ? "" : varOList.get(i).get("id").toString()); // 1
			vpd.put("var2", varOList.get(i).get("bh") == null ? "" : varOList.get(i).get("bh").toString()); // 2
			vpd.put("var3", varOList.get(i).get("xzjd") == null ? "" : varOList.get(i).get("xzjd").toString()); // 3
			vpd.put("var4", varOList.get(i).get("ssc") == null ? "" : varOList.get(i).get("ssc").toString()); // 4
			vpd.put("var5", varOList.get(i).get("mph") == null ? "" : varOList.get(i).get("mph").toString()); // 5
			vpd.put("var6", varOList.get(i).get("name") == null ? "" : varOList.get(i).get("name")); // 6
			vpd.put("var7", varOList.get(i).get("identity") == null ? "" : varOList.get(i).get("identity").toString()); // 7
			vpd.put("var8", varOList.get(i).get("phonenum") == null ? "" : varOList.get(i).get("phonenum").toString()); // 8
			vpd.put("var9", varOList.get(i).get("jznd") == null ? "" : varOList.get(i).get("jznd").toString()); // 9
			vpd.put("var10", varOList.get(i).get("zflb") == null ? "" : varOList.get(i).get("zflb").toString()); // 10
			vpd.put("var11", varOList.get(i).get("cs") == null ? "" : varOList.get(i).get("cs").toString()); // 11
			vpd.put("var12", varOList.get(i).get("jzmj") == null ? "" : varOList.get(i).get("jzmj").toString()); // 12
			vpd.put("var13", varOList.get(i).get("js") == null ? "" : varOList.get(i).get("js").toString()); // 13
			vpd.put("var14", varOList.get(i).get("zdmj") == null ? "" : varOList.get(i).get("zdmj").toString()); // 14
			vpd.put("var15", varOList.get(i).get("zfsyqk") == null ? "" : varOList.get(i).get("zfsyqk").toString()); // 15
			//vpd.put("var16", varOList.get(i).get("zt") == null ? "" : varOList.get(i).get("zt").toString()); // 16
			//vpd.put("var16", varOList.get(i).get("dismantle_time") == null ? "": varOList.get(i).get("dismantle_time").toString()); // 17
			//vpd.put("var17", varOList.get(i).get("complete_time") == null ? "": varOList.get(i).get("complete_time").toString()); // 18
			vpd.put("var16", varOList.get(i).get("tdxz") == null ? "" : varOList.get(i).get("tdxz").toString()); // 19
			vpd.put("var17", varOList.get(i).get("fcz") == null ? "" : varOList.get(i).get("fcz").toString()); // 20
			vpd.put("var18", varOList.get(i).get("x") == null ? "" : varOList.get(i).get("x").toString()); // 21
			vpd.put("var19", varOList.get(i).get("y") == null ? "" : varOList.get(i).get("y").toString()); // 22
			vpd.put("var20", varOList.get(i).get("jglx") == null ? "" : varOList.get(i).get("jglx").toString());// 23
			vpd.put("var21", varOList.get(i).get("level") == null ? "" : varOList.get(i).get("level").toString());// 24
			varList.add(vpd);
		}
		dataMap.put("varList", varList);
		ObjectExcelView erv = new ObjectExcelView();
		mv = new ModelAndView(erv, dataMap);
		return mv;
	}

	/**
	 * 房屋信息统计
	 *
	 * @param houseEntity
	 * @return
	 */
	// @RequestMapping(value = "/statistics", produces =
	// "application/json;charset=UTF-8")
	@RequestMapping(value = "/statis", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String statistics(HouseEntity houseEntity) {
		try {
			List<HouseEntity> statistics = houseService.statistics(houseEntity);
			int count = houseService.countStatic(houseEntity);
			return JSONUtil.toJsonString(new PagedJsonResult(statistics, 1, "成功", count, houseEntity.getRows()));
		} catch (Exception e) {
			logger.error("查询发生错误", e);
			return JSONUtil.toJsonString(new JsonResult(ResConst.CODE_FAIL, ResConst.QUERY_FAIL, null));
		}
	}

	/**
	 * 房屋综合信息统计
	 * 
	 * @param houseEntity
	 * @return
	 */
	@RequestMapping(value = "/integrative", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String integrative(HouseEntity houseEntity) {
		try {
			List<HouseEntity> integrative = houseService.integrative(houseEntity);
			int counts = houseService.countIntegrative(houseEntity);
			return JSONUtil.toJsonString(new PagedJsonResult(integrative, 1, "成功", counts, houseEntity.getRows()));
		} catch (Exception e) {
			logger.error("查询发生错误", e);
			return JSONUtil.toJsonString(new JsonResult(ResConst.CODE_FAIL, ResConst.QUERY_FAIL, null));
		}
	}

	/**
	 * 查询乡村
	 *
	 * @param v
	 * @return
	 */
	@RequestMapping(value = "/list_viallage", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object list_viallage(VillageEntity v) {
		try {
			List<PageData> list = villageService.listAll(v);
			logBefore(logger, "结果集:" + list.toString());
			return JSONUtil.toJsonString(new JsonResult(200, "成功", list));
		} catch (Exception e) {
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}
	}

	/**
	 * 保存房屋
	 *
	 * @param house
	 * @return
	 */
	@RequestMapping(value = "/save_house", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object save_house(HouseEntity house) {
		try {
			houseService.save(house);
			return JSONUtil.toJsonString(new JsonResult(200, "成功", null));
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}
	}


    /**
     * 查询常量
     *
     * @param
     * @return
     */
    @RequestMapping(value = "/list_enum", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Object list_enumtable(EnumtableEntity enu) {
        List<PageData> list;
        try {
            list = enumtableService.listAll(enu);
            Map<String, Object> mapPre = null;
            Map<String, Object> mapPre1 = new HashMap<String, Object>();
            List<String> val = null;
            String a = "";
            int i = 1;
            for (PageData data : list) {
                if (a == "" || !a.trim().equals(String.valueOf(data.get("fieldName")).trim())) {
                    if (mapPre != null) {
                        mapPre.put("enumvalue", val);
                        mapPre1.put("data" + i, mapPre);
                        i++;
                    }
                    mapPre = new HashMap<String, Object>();
                    mapPre.put("fieldName", data.get("fieldName"));
                    val = new ArrayList<>();
                    a = data.get("fieldName").toString();
                }
                val.add(data.get("enumvalue").toString());
            }
            mapPre.put("enumvalue", val);
            mapPre1.put("data" + i, mapPre);
            return JSONUtil.toJsonString(new JsonResult(200, "成功", mapPre1));
        } catch (Exception e) {
            logger.error("错误：", e);
            return JSONUtil.toJsonString(new JsonResult(400, "错误", null));
        }
    }
    
	/**
	 * 属性更新
	 * @Param params
	 * @return
	 */
	@RequestMapping(value = "/wf_update", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String wf_update(HouseEntity params){
		try {  
			houseService.updateAttr(params);
	        return JSONUtil.toJsonString(new JsonResult(1, "更新成功！", null));
		} catch (Exception e) {
			logger.error("操作失败！", e);
			return JSONUtil.toJsonString(new JsonResult(-1,"更新失败！", null));
		}	
	}

}
