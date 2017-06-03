package com.weidekeji.common.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.log4j.Logger;

import jxl.Cell;
import jxl.CellView;
import jxl.Sheet;
import jxl.SheetSettings;
import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.Border;
import jxl.format.BorderLineStyle;
import jxl.format.VerticalAlignment;
import jxl.read.biff.BiffException;
import jxl.write.Label;
import jxl.write.WritableCell;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

public class ImportUtils {

	private static final Logger logger = Logger.getLogger(ImportUtils.class);
	// 成功
	public static final Integer STATUS_OK = Integer.valueOf(1);
	// 失败
	public static final Integer STATUS_NO = Integer.valueOf(0);

	/**
	     * 私有化构造器
	     */
	private ImportUtils() {
	 
	}

	/**
	 * 获取excel文件中的数据对象
	 *
	 * @param is
	 *            excel
	 * @param excelColumnNames
	 *            excel中每个字段的英文名(应该与pojo对象的字段名一致,顺序与excel一致)
	 * @return excel每行是list一条记录，map是对应的"字段名-->值"
	 * @throws Exception
	 */
	public static List<Map<String, String>> getImportData(InputStream is, List<String> excelColumnNames)
			throws Exception {

		if (is == null) {
			return Collections.emptyList();
		}

		Workbook workbook = null;
		try {
			// 拿到excel
			workbook = Workbook.getWorkbook(is);
		} catch (BiffException e) {
			logger.error(e.getMessage(), e);
			return Collections.EMPTY_LIST;
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
			return Collections.EMPTY_LIST;
		}
		// logger.debug("workbook:{}", workbook);

		if (workbook == null) {
			return Collections.emptyList();
		}

		// 第一个sheet
		Sheet sheet = workbook.getSheet(0);
		// 行数
		int rowCounts = sheet.getRows();
		// logger.debug("rowCounts:{}", rowCounts);
		List<Map<String, String>> list = new ArrayList<Map<String, String>>(rowCounts);

		// 双重for循环取出数据
		for (int i = 1; i < rowCounts; i++) {
			Map<String, String> params = new HashMap<String, String>();
			// i,j i:行 j:列
			for (int j = 0; j < excelColumnNames.size(); j++) {
				Cell cell = sheet.getCell(j, i);
				params.put(excelColumnNames.get(j), cell.getContents());
			}

			list.add(params);
		}

		return list;
	}

	/**
	 * 获取导入数据为对象的List
	 *
	 * @param data
	 * @param clazz
	 * @param excelColumnNames
	 * @param <T>
	 * @return
	 * @throws Exception
	 */
	public static <T> List<T> makeData(List<Map<String, String>> data, Class<T> clazz, List<String> excelColumnNames) throws Exception {
		if (data == null || data.isEmpty() || clazz == null) {
			if (logger.isDebugEnabled()) {
				logger.debug("Excel没有数据");
			}
			return Collections.EMPTY_LIST;
		}

		List<T> result = new ArrayList<T>(data.size());
		for (Map<String, String> d : data) {
			T entity = clazz.newInstance();
			for (String column : excelColumnNames) {
				BeanUtils.setProperty(entity, column, d.get(column));
			}

			result.add(entity);
		}

		return result;
	}

	/**
	 * 封装
	 * 
	 * @param is
	 * @param clazz
	 * @param excelColumnNames
	 *            实体属性名称，按excel的顺序排列
	 * @return
	 * @throws Exception
	 *
	 */
	public static <T> List<T> getEntityList(InputStream is, Class<T> clazz,
			String[] excelColumnNames) throws Exception {
		List<String> columns = Arrays.asList(excelColumnNames);
		List<T> result = ImportUtils.makeData(ImportUtils.getImportData(is, columns), clazz, columns);
		return result;
	}

	/**
	 * 传List参数
	 * 
	 * @param is
	 * @param clazz
	 * @param columns
	 * @return
	 * @throws Exception
	 *
	 */
	public static <T> List<T> getEntityList(InputStream is, Class<T> clazz, List<String> columns)
			throws Exception {
		return ImportUtils.makeData(ImportUtils.getImportData(is, columns), clazz, columns);
	}

	/**
	 * 导出Excel<br>
	 * 方 法 名：getExcelStream <br>
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static int getExcelStream(String sheetName, LinkedHashMap<String, String> keyMap, List listContent,
			OutputStream os) {

		int flag = 0;
		// 声明工作簿
		WritableWorkbook workbook;
		try {
			// 根据传进来的file对象创建可写入的Excel工作薄
			workbook = Workbook.createWorkbook(os);
			// 创建一个工作表
			WritableSheet ws = workbook.createSheet(sheetName, 0);

			SheetSettings ss = ws.getSettings();
			ss.setVerticalFreeze(1);// 冻结表头

			// 设置字体
			WritableFont NormalFont = new WritableFont(WritableFont.ARIAL, 12);
			WritableFont BoldFont = new WritableFont(WritableFont.ARIAL, 12, WritableFont.BOLD);

			// 标题居中
			WritableCellFormat titleFormat = new WritableCellFormat(BoldFont);
			titleFormat.setBorder(Border.ALL, BorderLineStyle.THIN); // 线条
			titleFormat.setVerticalAlignment(VerticalAlignment.CENTRE); // 文字垂直对齐
			titleFormat.setAlignment(Alignment.CENTRE); // 文字水平对齐
			titleFormat.setWrap(false); // 文字是否换行

			// 正文居中
			WritableCellFormat contentCenterFormat = new WritableCellFormat(NormalFont);
			contentCenterFormat.setBorder(Border.ALL, BorderLineStyle.THIN);
			contentCenterFormat.setVerticalAlignment(VerticalAlignment.CENTRE);
			contentCenterFormat.setAlignment(Alignment.CENTRE);
			contentCenterFormat.setWrap(false);

			// 正文右对齐
			WritableCellFormat contentRightFormat = new WritableCellFormat(NormalFont);
			contentRightFormat.setBorder(Border.ALL, BorderLineStyle.THIN);
			contentRightFormat.setVerticalAlignment(VerticalAlignment.CENTRE);
			contentRightFormat.setAlignment(Alignment.RIGHT);
			contentRightFormat.setWrap(false);

			// 设置标题,标题内容为keyMap中的value值,标题居中粗体显示
			Iterator titleIter = keyMap.entrySet().iterator();
			int titleIndex = 0;
			while (titleIter.hasNext()) {
				Map.Entry<String, String> entry = (Map.Entry<String, String>) titleIter.next();
				ws.addCell(new Label(titleIndex++, 0, entry.getValue(), titleFormat));
			}

			// 设置正文内容
			for (int i = 0; i < listContent.size(); i++) {
				Iterator contentIter = keyMap.entrySet().iterator();
				int colIndex = 0;
				while (contentIter.hasNext()) {
					Map.Entry<String, String> entry = (Map.Entry<String, String>) contentIter.next();
					String key = entry.getKey().toString();
					Field field = listContent.get(i).getClass().getDeclaredField(key);
					field.setAccessible(true);
					Object content = field.get(listContent.get(i));
					String value = "";
					if (null != content) {
						value = content.toString();
					}
					// if (methodMap != null) {
					// String methodName = methodMap.get(key);
					// if (methodName != null) {
					// Method convertMethod =
					// this.getClass().getDeclaredMethod(methodName,
					// String.class);
					// value = (String) convertMethod.invoke(this, value);
					// }
					// }

					ws.addCell(new Label(colIndex++, i + 1, value, contentCenterFormat));
				}

			}

			// 宽度自适应。能够根据内容增加宽度，但对中文的支持不好，如果内容中包含中文，会有部分内容被遮盖
			for (int i = 0; i < keyMap.size(); i++) {
				CellView cell = ws.getColumnView(i);
				cell.setAutosize(true);
				ws.setColumnView(i, cell);
			}

			// 写入Exel工作表
			workbook.write();
			os.flush();
			// 关闭Excel工作薄对象
			workbook.close();
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			flag = 0;
			ex.printStackTrace();
		}
		return flag;
	}

	// 以字节数组的方式获得
	public static byte[] getBytes(String sheetName, LinkedHashMap<String, String> keyMap, List listContent) {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();

		ImportUtils.getExcelStream(sheetName, keyMap, listContent, baos);

		byte[] b = baos.toByteArray();
		try {
			baos.flush();
			baos.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return b;
	}

	/**
	 * 替换Excel中的字符,excel中的key 以{}包裹
	 * 
	 * @param map
	 * @throws WriteException
	 * @throws RowsExceededException
	 */
	public static void replaceField(Map<String, String> map, WritableWorkbook workbook)
			throws RowsExceededException, WriteException {
		// 第一个sheet
		WritableSheet sheet = workbook.getSheet(0);
		// 行数
		int rowCounts = sheet.getRows();
		int collumnCount = sheet.getColumns();
		// 双重for循环取出数据
		for (int i = 0; i < rowCounts; i++) {

			// i,j i:行 j:列
			for (int j = 0; j < collumnCount; j++) {
				WritableCell cell = sheet.getWritableCell(j, i);

				String value = cell.getContents();

				// 遍历字段
				Iterator<Map.Entry<String, String>> iteraor = map.entrySet().iterator();
				while (iteraor.hasNext()) {
					Map.Entry<String, String> entry = iteraor.next();
					String key = "{" + entry.getKey() + "}";
					if (value.contains(key)) {
						value = value.replaceAll("\\{" + entry.getKey() + "\\}", entry.getValue());
						sheet.addCell(new Label(j, i, value, cell.getCellFormat()));
					}
				}
			}
		}
	}

}
