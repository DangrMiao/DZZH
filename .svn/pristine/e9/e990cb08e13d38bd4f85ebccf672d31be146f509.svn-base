package com.fh.controller.menu.qinwei;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.springframework.web.multipart.MultipartFile;

public class File_upload {
	public static void uploadify(MultipartFile[] multiFiles, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		for (MultipartFile multipartFile : multiFiles) {
			ServletContext sc = request.getSession().getServletContext();
			String dir = sc.getRealPath("/upload");// 附件存放服务器的路径
			System.out.println(dir);
			File file = new File(dir);
			if (!file.exists()) {
				file.mkdirs();
			}
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmssS"); 
			String time=simpleDateFormat.format(new Date());
			String filename = multipartFile.getOriginalFilename();
			// 防止文件被覆盖，以纳秒生成文件
			String _extfilename = filename.substring(filename.indexOf("."));
			filename = time + _extfilename;
			String uploadPath = request.getContextPath() + "" + dir + "/" + filename;
			String responseStr = "";
			try {
				FileUtils.writeByteArrayToFile(new File("d://upload//", filename), multipartFile.getBytes());
				responseStr = "上传成功！";
			} catch (Exception e) {
				e.printStackTrace();
				responseStr = "fail";
				System.out.println("上传失败！");
			}

		}

	}
}
