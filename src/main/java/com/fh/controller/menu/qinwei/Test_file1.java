package com.fh.controller.menu.qinwei;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
@Controller
public class Test_file1 {
	
    public void uploadify(@RequestParam("Filedata") MultipartFile multiFile,HttpServletRequest request, HttpServletResponse response) throws IOException, FileUploadException{
    	   System.out.println("上传文件");
           System.out.println("name:"+multiFile.getOriginalFilename());
           System.out.println("inputstream"+multiFile.getInputStream());


        ServletContext sc = request.getSession().getServletContext();
        String dir = sc.getRealPath("/upload");//附件存放服务器的路径
        System.out.println(dir);
        File file = new File(dir);
        if(!file.exists()){
            file.mkdirs();
        }
        String filename = multiFile.getOriginalFilename();
        String realname = filename.substring(0, filename.indexOf("."));
        //防止文件被覆盖，以纳秒生成文件
        Long _l = System.nanoTime();
        String _extfilename = filename.substring(filename.indexOf("."));
        filename = _l+_extfilename;
        String uploadPath = request.getContextPath()+""+dir+"/"+filename;
        String responseStr = "";
        try {
            FileUtils.writeByteArrayToFile(new File(dir, filename), multiFile.getBytes());
            responseStr = "上传成功！";
            
        } catch (Exception e) {
            e.printStackTrace();
            responseStr = "fail";
            System.out.println("上传失败！");
        }
}
}
