package com.wdkj.wf.conttoller.file;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping(value="/file")
public class File_Controller {
	@RequestMapping(value = "/file")
	public void uploadify(@RequestParam("fileupload") MultipartFile[] multiFiles, HttpServletRequest request,
			HttpServletResponse response) throws IOException {

		for (MultipartFile multipartFile : multiFiles) {
			System.out.println(multiFiles.length + "~~~~~~~~~~~~~~~~~");
			System.out.println("上传文件");
			System.out.println("name:" + multipartFile.getOriginalFilename());
			System.out.println("inputstream" + multipartFile.getInputStream());

			ServletContext sc = request.getSession().getServletContext();
			String dir = sc.getRealPath("/upload");// 附件存放服务器的路径
			System.out.println(dir);
			File file = new File(dir);
			if (!file.exists()) {
				file.mkdirs();
			}
			String filename = multipartFile.getOriginalFilename();
			String realname = filename.substring(0, filename.indexOf("."));
			// 防止文件被覆盖，以纳秒生成文件
			Long _l = System.nanoTime();
			String _extfilename = filename.substring(filename.indexOf("."));
			filename = _l + _extfilename;
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
