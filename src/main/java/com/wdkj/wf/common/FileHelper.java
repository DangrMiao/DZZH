package com.wdkj.wf.common;

import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.util.JSONUtil;
import com.weidekeji.common.util.Property;
import org.apache.commons.io.FileUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.File;
import java.util.UUID;

/**
 * 保存和获取文件的工具封装<br>
 * 使用这个工具来管理项目的文件即可, <br>
 * 这个工具依赖了配置文件的工具
 * @author tianwenjian
 * @create 2017-05-12 9:32
 **/
public class FileHelper {
    private static final Log logger = LogFactory.getLog(FileHelper.class);
    /**
     * 保存文件
     * @param file
     * @param type 文件所属的模块,作为文件夹
     * @param name 文件名
     * @return 文件相对于存储目录的路径，文件分隔符为 '/'
     * @throws Exception
     */
    public static String saveFile(byte[] file, String type, String name) throws Exception{
        String fileDir = Property.getProperty("file.dir");
        File rootDir = new File(fileDir);
        //判断保存文件的目录是否存在
        if (!rootDir.exists() && !rootDir.isDirectory()){
            return JSONUtil.toJsonString(new JsonResult(-1, "保存文件的目录不存在，请联系管理员！", null));
        }

        //判断是否存在type对应的目录
        String typeDirPath = rootDir.getCanonicalPath() + File.separator + type;
        File typeDir = new File(typeDirPath);
        if (!typeDir.exists()){
            typeDir.mkdir();
        }

        //松山那里传来的文件名后面有 引号, 抓包也有引号，可能是Android框架的问题
        if (name.endsWith("\"")){
            name = name.substring(0, name.length() - 1);
        }

        //保存到文件系统,对应的目录下面
        String fileType;
        try {
            fileType = "." + name.split("[.]")[1];
        }catch (Exception e){
            fileType = "";
            logger.debug("没有找到文件后缀", e);
        }

        //todo 可以考虑换成用户ID + 时间戳的方式，在用户账号不会多登录的情况下，也不会重复
        String fileName = UUID.randomUUID().toString() + fileType;
        String filePath = typeDirPath + File.separator + fileName;
        if (logger.isDebugEnabled()) {
            logger.debug("保存的文件名字是：" + filePath);
        }
        File target = new File(filePath);
        FileUtils.writeByteArrayToFile(target, file);

        return type + "/" + fileName;
    }

    /**
     * 获取文件
     * @param path
     * @return
     * @throws Exception
     */
    public static File getFile(String path) throws Exception {
        path = path.replace("/", File.separator); //windows 的文件夹分隔符的情况
        String fileDir = Property.getProperty("file.dir");
        String filePath = fileDir + File.separator + path;
        return new File(filePath);
    }

    /**
     * 删除
     * @param path
     * @throws Exception
     */
    public static void deleteFile(String path) throws Exception {
        path = path.replace("/", File.separator); //windows 的文件夹分隔符的情况
        String fileDir = Property.getProperty("file.dir");
        String filePath = fileDir + File.separator + path;
        File file = new File(filePath);
        file.delete();
    }
}
