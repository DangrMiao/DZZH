package com.wdkj.wf.conttoller.sys;

import com.fh.controller.base.BaseController;
import com.wdkj.wf.common.FileHelper;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.util.JSONUtil;
import com.weidekeji.common.util.Property;
import org.apache.commons.io.FileUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.activation.MimetypesFileTypeMap;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileNotFoundException;
import java.net.URLDecoder;
import java.util.*;

/**
 * @author tianwenjian
 * @create 2017-05-08 17:06
 **/
@RestController
public class FileController extends BaseController{

    public static final String DOWNLOAD_MAPPING = "file/download/";
    public static final String DOWNLOAD_MAPPING_VALUE = DOWNLOAD_MAPPING + "**";

    /**
     * 下载文件的接口，**匹配的是 以file/download/ 开头所有的请求
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = DOWNLOAD_MAPPING_VALUE)
    public ResponseEntity<byte[]> download(HttpServletRequest request) throws Exception{
        String url = request.getRequestURI();
        try {
            //获取实际的文件名
            String requestPre = getRequest().getContextPath() + "/" + DOWNLOAD_MAPPING;  //接口的请求前缀
            String relativePath = url.substring(requestPre.length());
            relativePath = URLDecoder.decode(relativePath, "UTF-8");  //处理中文路径

            File file = FileHelper.getFile(relativePath);

            HttpHeaders headers = new HttpHeaders();
            MimetypesFileTypeMap mimeTypesMap = new MimetypesFileTypeMap();
            headers.setContentType(MediaType.parseMediaType(mimeTypesMap.getContentType(file)));

            //如果是其他文件类型，则作为下载文件
            if (headers.getContentType().equals(MediaType.APPLICATION_OCTET_STREAM)){
                headers.setContentDispositionFormData("attachment", file.getName());
            }
            return new ResponseEntity<>(FileUtils.readFileToByteArray(file), headers, HttpStatus.OK);
        }catch (FileNotFoundException nfe){
            HttpHeaders headers = new HttpHeaders();
            return new ResponseEntity<>(null, headers, HttpStatus.NOT_FOUND);
        } catch (Exception e){
            logger.error("下载文件出现了问题", e);
            throw e;
        }
    }

    /**
     * 上传文件的接口
     * @param files
     * @param type 保存的子文件夹名称
     * @return
     */
    @RequestMapping(value = "file/upload/{type}", produces = "application/json;charset=UTF-8")
    public String upload(@RequestParam(value = "file", required = true) MultipartFile[] files,
                         @PathVariable("type") String type){
        List<String> result = new ArrayList<>(10);
        try {
            for(MultipartFile file : files){
                String originalFilename = file.getOriginalFilename();
                String filePath = FileHelper.saveFile(file.getBytes(), type, originalFilename);
                String relativePath = DOWNLOAD_MAPPING + filePath;
                result.add(relativePath);
            }
        }catch (Exception e){
            logger.error("上传失败", e);
            return JSONUtil.toJsonString(new JsonResult(-1, "上传失败", null));
        }
        return JSONUtil.toJsonString(new JsonResult(1, "上传成功", result));
    }
}
