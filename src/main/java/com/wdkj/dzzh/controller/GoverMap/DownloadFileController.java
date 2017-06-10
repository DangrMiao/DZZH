package com.wdkj.dzzh.controller.GoverMap;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(value = "/DownloadFile")
public class DownloadFileController {

/*	下载一个文件
	 @RequestMapping(value="/download")
     public ResponseEntity<byte[]> download(HttpServletRequest request,
             @RequestParam("fileid") ArrayList<Integer> fileid,
             Model model)throws Exception {
    	System.out.println(fileid.get(0));
    	String path = "c:/DisasterupLoadFile/photo/1.jpg";
        File file = new File(path);
        
        HttpHeaders headers = new HttpHeaders();  
        //下载显示的文件名，解决中文名称乱码问题  
        String downloadFielName = new String("123.jpg".getBytes("UTF-8"),"iso-8859-1");
        //通知浏览器以attachment（下载方式）打开图片
        headers.setContentDispositionFormData("attachment", downloadFielName); 
        //application/octet-stream ： 二进制流数据（最常见的文件下载）。
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(file),    
                headers, HttpStatus.CREATED);  
     }
     */
	/*	打包成zip下载*/
	 @RequestMapping(value="/download")
     public ResponseEntity<byte[]> download(HttpServletRequest request,
             @RequestParam("location") ArrayList<String> location,
             Model model)throws Exception {
    	 List<File> files = new ArrayList<File>();
    	  for (int i=0;i<location.size();i++) {
    		  if(!(location.get(i).equals("")))
              files.add(new File(location.get(i)));
    	  }
    	 

         File fileZip = new File("c:/DisasterFile/下载.zip");
       // 文件输出流
         FileOutputStream outStream = new FileOutputStream(fileZip);
          // 压缩流
         ZipOutputStream toClient = new ZipOutputStream(outStream);
    	  
         zipFile(files, toClient);
         toClient.close();
         outStream.close();
        
        HttpHeaders headers = new HttpHeaders();  
        //下载显示的文件名，解决中文名称乱码问题  
        String downloadFielName = new String("下载.zip".getBytes("UTF-8"),"iso-8859-1");
        //通知浏览器以attachment（下载方式）打开图片
        headers.setContentDispositionFormData("attachment", downloadFielName); 
        //application/octet-stream ： 二进制流数据（最常见的文件下载）。
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(fileZip),    
                headers, HttpStatus.CREATED);  
     }
     
     
     public static void zipFile(List<File> files, ZipOutputStream outputStream) throws IOException, ServletException {
         try {
             int size = files.size();
             // 压缩列表中的文件
             for (int i = 0; i < size; i++) {
                 File file = (File) files.get(i);
                 zipFile(file, outputStream);
             }
         } catch (IOException e) {
             throw e;
         }
     }
     public static void zipFile(File inputFile, ZipOutputStream outputstream) throws IOException, ServletException {
         try {
             if (inputFile.exists()) {
                 if (inputFile.isFile()) {
                     FileInputStream inStream = new FileInputStream(inputFile);
                     BufferedInputStream bInStream = new BufferedInputStream(inStream);
                     ZipEntry entry = new ZipEntry(inputFile.getName());
                     outputstream.putNextEntry(entry);

                     final int MAX_BYTE = 10 * 1024 * 1024; // 最大的流为10M
                     long streamTotal = 0; // 接受流的容量
                     int streamNum = 0; // 流需要分开的数量
                     int leaveByte = 0; // 文件剩下的字符数
                     byte[] inOutbyte; // byte数组接受文件的数据

                     streamTotal = bInStream.available(); // 通过available方法取得流的最大字符数
                     streamNum = (int) Math.floor(streamTotal / MAX_BYTE); // 取得流文件需要分开的数量
                     leaveByte = (int) streamTotal % MAX_BYTE; // 分开文件之后,剩余的数量

                     if (streamNum > 0) {
                         for (int j = 0; j < streamNum; ++j) {
                             inOutbyte = new byte[MAX_BYTE];
                             // 读入流,保存在byte数组
                             bInStream.read(inOutbyte, 0, MAX_BYTE);
                             outputstream.write(inOutbyte, 0, MAX_BYTE); // 写出流
                         }
                     }
                     // 写出剩下的流数据
                     inOutbyte = new byte[leaveByte];
                     bInStream.read(inOutbyte, 0, leaveByte);
                     outputstream.write(inOutbyte);
                     outputstream.closeEntry(); // Closes the current ZIP entry
                     // and positions the stream for
                     // writing the next entry
                     bInStream.close(); // 关闭
                     inStream.close();
                 }
             } else {
                 throw new ServletException("文件不存在！");
             }
         } catch (IOException e) {
             throw e;
         }
     }
     
     

}

