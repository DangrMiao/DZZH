package com.fh.controller.menu.qinwei;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.util.Streams;


public class UploadServlet{

	private static final long serialVersionUID = -5036264969905378310L;

	public void file(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		// 设置接收的编码格式
		request.setCharacterEncoding("UTF-8");
		Date date = new Date();// 获取当前时间
		SimpleDateFormat sdfFileName = new SimpleDateFormat("yyyyMMddHHmmss");
		SimpleDateFormat sdfFolderName = new SimpleDateFormat("yyyyMMdd");

		String newfileName = sdfFileName.format(date);// 存放文件名称
		String newFolderName = sdfFolderName.format(date); // 存放文件夹名

		String fileRealPath = "";// 文件存放真实地址
		String fileRealResistPath = "";// 文件存放真实相对路径

		// 获得容器中上传文件夹所在的物理路径
		 ServletContext sc = request.getSession().getServletContext();
	        String savePath = sc.getRealPath("/uploads");//附件存放服务器的路径
	     
		/*ServletContext sc = request.getSession().getServletContext();
	String savePath = request.getSession().getServletContext().getRealPath("/") + "\\" + "uploads\\"
				+ newFolderName + "\\";*/
	
		System.out.println("上传文件存放路径" + savePath + "; ");
		File file = new File(savePath);
		if (!file.isDirectory()) {
			file.mkdirs();
		}

		try {
			// 名称 界面编码 必须 和request 保存一致..否则乱码
			String firstFileName = "";

			DiskFileItemFactory fac = new DiskFileItemFactory();
			ServletFileUpload upload = new ServletFileUpload(fac);
			upload.setHeaderEncoding("UTF-8");
			// 获取多个上传文件
			List fileList = upload.parseRequest(request);
			// 遍历上传文件写入磁盘
			Iterator it = fileList.iterator();
			while (it.hasNext()) {
				Object obit = it.next();
				if (obit instanceof DiskFileItem) {
					DiskFileItem item = (DiskFileItem) obit;

					// 如果item是文件上传表单域
					// 获得文件名及路径
					String fileName = item.getName();
					if (fileName != null) {
						firstFileName = item.getName().substring(item.getName().lastIndexOf("\\") + 1); // 上传的源文件名
						String formatName = firstFileName.substring(firstFileName.lastIndexOf("."));// 获取文件后缀名
						fileRealPath = savePath + newfileName + formatName;// 文件存放真实地址

						BufferedInputStream in = new BufferedInputStream(item.getInputStream());// 获得文件输入流
						BufferedOutputStream outStream = new BufferedOutputStream(
								new FileOutputStream(new File(fileRealPath)));// 获得文件输出流
						Streams.copy(in, outStream, true);// 开始把文件写到你指定的上传文件夹
						// 上传成功，则插入数据库
						if (new File(fileRealPath).exists()) {
							// 相对路径赋值
							fileRealResistPath = "uploads/" + newFolderName + "/"
									+ fileRealPath.substring(fileRealPath.lastIndexOf("\\") + 1);

							// 保存到数据库
							System.out.println("处理的文件名:" + fileName);
							System.out.println("存放的相对路径:" + fileRealResistPath);
						}

					}
				}
			}
		} catch (org.apache.commons.fileupload.FileUploadException ex) {
			ex.printStackTrace();
			System.out.println("没有上传文件");
			return;
		}
		response.getWriter().write("1");

	}

}
